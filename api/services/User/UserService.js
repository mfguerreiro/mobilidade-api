import { Op } from 'sequelize';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import moment from 'moment';
//models
import UserCad from '../../models/sql/User/UserCad';
import UserPicture from '../../models/sql/User/UserPicture';

//helpers
import { EnumUserStatus } from '../../helpers/Enums';
import ResponseBuilder from '../../helpers/responseBuilder';

class UserService {
  static async auth(email, password) {
    try {
      let response = {};

      password = password.toString().trim();

      const existingUser = await this.getUserByEmail(email);

      if (!existingUser) {
        response = {
          statusCode: 404,
          msg: 'User not found.',
        };

        return response;
      }

      if (!(await bcrypt.compare(password, existingUser.passwordHash))) {
        response = {
          statusCode: 401,
          msg: 'Incorrect e-mail or password.',
        };
        return response;
      }

      if (existingUser.fkUserStatus === EnumUserStatus.Blocked) {
        response = {
          statusCode: 401,
          msg: 'User blocked.',
        };
        return response;
      }

      response = this.generateLoginObject(existingUser);

      return response;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  static async refresh(refreshToken) {
    try {
      return jwt.verify(
        refreshToken,
        ResponseBuilder.getTokenSecret(),
        async function (err) {
          if (err) {
            return {
              statusCode: 401,
              msg: 'Refresh token expired.',
            };
          }

          const user = await UserService.getUserById(
            jwt.decode(refreshToken).id
          );
          return UserService.generateLoginObject(user);
        }
      );
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  static async authByToken(token, refreshToken) {
    console.log('\n\n entrou no authByToken');

    try {
      let response = {};

      if (!token) {
        response = {
          statusCode: 401,
          msg: 'No token provided.',
        };

        return response;
      }

      const user = await this.getUserById(jwt.decode(token).id);

      return jwt.verify(
        token,
        ResponseBuilder.getTokenSecret(),
        function (err) {
          if (err) {
            return jwt.verify(
              refreshToken,
              ResponseBuilder.getTokenSecret(),
              function (refreshErr) {
                if (refreshErr) {
                  return {
                    statusCode: 401,
                    msg: 'Token expired.',
                  };
                }

                return UserService.generateLoginObject(user);
              }
            );
          }

          return UserService.generateLoginObject(user);
        }
      );
    } catch (error) {
      console.log('\n\n entrou no catch');
      console.error(error);
      throw new Error(error);
    }
  }

  static generateLoginObject(existingUser) {
    try {
      const { token, refreshToken } = this.generateToken(existingUser.id);

      //verificar se existe device id, se não, preencher aqui

      return {
        statusCode: 200,
        msg: 'authenticated.',
        data: {
          token,
          refreshToken,
          id: existingUser.id,
          email: existingUser.email,
          fullName: existingUser.fullName,
          nick: existingUser.nick,
          phone: existingUser.phone,
          mobile: existingUser.mobile,
          birthDate: existingUser.birthDate,
        },
      };
    } catch (error) {
      throw new Error();
    }
  }

  static generateToken(userId) {
    try {
      const token = jwt.sign({ id: userId }, ResponseBuilder.getTokenSecret(), {
        expiresIn: '10h',
      });

      const refreshToken = jwt.sign(
        { id: userId },
        ResponseBuilder.getTokenSecret(),
        {
          expiresIn: '30d',
        }
      );

      return { token, refreshToken };
    } catch (error) {
      throw new Error();
    }
  }

  static async createUser(userObj) {
    try {
      console.log('\n\n entrou no create user');

      // phone normalization
      const validPhone = userObj.phone
        ? await this.standardizePhone(userObj.phone)
        : null;
      const validMobile = userObj.mobile
        ? await this.standardizePhone(userObj.mobile)
        : null;

      console.log('\n\n standardizePhone');

      //check if exists some user with email, phone or mobile informed
      const existingUser = await UserCad.findOne({
        attributes: ['id'],
        where: {
          [Op.or]: [
            { email: userObj.email },
            { phone: validPhone },
            { mobile: validMobile },
          ],
        },
      });

      console.log('\n\n log do existingUser: ', existingUser);

      if (existingUser) {
        return null;
      }

      const passwordHash = await bcrypt.hash(userObj.password, 10);

      const userCreated = await UserCad.create({
        fkUserStatus: EnumUserStatus.New,
        fullName: userObj.fullName,
        nick: userObj.nick || null,
        phone: validPhone || null,
        mobile: validMobile || null,
        birthDate: userObj.birthDate || null,
        email: userObj.email,
        passwordHash: passwordHash,
      });

      return userCreated
        ? { id: userCreated.id, email: userCreated.email }
        : null;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  static async updateUser(userObj) {
    try {
      const existingUser = await UserCad.findOne({
        attributes: ['id'],
        where: { id: userObj.userId },
        raw: true,
      });

      if (!existingUser) {
        return null;
      }

      let objectToUpdate = {};

      if (userObj.fkUserStatus) {
        objectToUpdate.fkUserStatus = userObj.fkUserStatus;
      }

      if (userObj.fullName) {
        objectToUpdate.fullName = userObj.fullName;
      }

      if (userObj.nick) {
        objectToUpdate.nick = userObj.nick;
      }

      if (userObj.email) {
        const existingUserByEmail = await this.getUserByEmail(
          userObj.email,
          userObj.userId
        );

        if (existingUserByEmail) {
          return 'E-Mail Exists';
        }

        objectToUpdate.email = userObj.email;
      }

      if (userObj.phone) {
        const standardizedPhone = await this.standardizePhone(userObj.phone);

        const existingUserByPhone = await this.getUserByPhoneOrMobile(
          standardizedPhone,
          userObj.userId
        );

        if (existingUserByPhone) {
          return 'Phone Exists';
        }

        objectToUpdate.phone = standardizedPhone;
      }

      if (userObj.mobile) {
        const standardizedMobile = await this.standardizePhone(userObj.mobile);

        const existingUserByMobile = await this.getUserByPhoneOrMobile(
          standardizedMobile,
          userObj.userId
        );

        if (existingUserByMobile) {
          return 'Mobile Exists';
        }

        objectToUpdate.mobile = standardizedMobile;
      }

      if (userObj.birthDate) {
        objectToUpdate.birthDate = userObj.birthDate;
      }

      if (userObj.password) {
        const passwordHash = await bcrypt.hash(userObj.password, 10);

        objectToUpdate.passwordHash = passwordHash;
      }

      const userUpdated = await UserCad.update(objectToUpdate, {
        where: { id: userObj.userId },
      });

      return userUpdated;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  static async removeUser(userId) {
    const removedUser = await UserCad.update(
      { deletedAt: moment() },
      {
        where: {
          id: userId,
        },
      }
    );

    return removedUser || null;
  }

  static async getUserById(userId) {
    try {
      if (!userId) {
        return null;
      }

      const user = await UserCad.findOne({
        where: {
          id: userId,
        },
        include: [
          {
            model: UserProfessionalCad,
            required: true,
            attributes: ['document'],
          },
        ],
        attributes: [
          'id',
          'email',
          'fullName',
          'nick',
          'phone',
          'mobile',
          'fkUserStatus',
          'birthDate',
        ],
        raw: true,
      });

      return user || null;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  static async getUsers(
    start = 0,
    length = 25,
    search = '',
    col = null,
    dir = null
  ) {
    try {
      let where = {};

      if (search.trim() != '') {
        where = {
          [Op.or]: [
            { id: { [Op.like]: `%${search.trim()}%` } },
            { email: { [Op.like]: `%${search.trim()}%` } },
            { fullName: { [Op.like]: `%${search.trim()}%` } },
            { phone: { [Op.like]: `%${search.trim()}%` } },
            { mobile: { [Op.like]: `%${search.trim()}%` } },
          ],
        };
      }

      const order = [];
      if (col != null && dir != null) {
        order.push([col, dir]);
      }

      const user = await UserCad.findAll({
        where,
        attributes: [
          'id',
          'email',
          'fullName',
          'nick',
          'phone',
          'mobile',
          'fkUserStatus',
          'birthDate',
        ],
        offset: parseInt(start),
        limit: parseInt(length),
        order,
      });

      return user || null;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }
  static async countUsers(search = '') {
    try {
      let where = {};

      if (search.trim() != '') {
        where = {
          [Op.or]: [
            { id: { [Op.like]: `%${search.trim()}%` } },
            { email: { [Op.like]: `%${search.trim()}%` } },
            { fullName: { [Op.like]: `%${search.trim()}%` } },
            { phone: { [Op.like]: `%${search.trim()}%` } },
            { mobile: { [Op.like]: `%${search.trim()}%` } },
          ],
        };
      }

      const user = await UserCad.count({
        where,
      });

      return user || 0;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  static async getUserActiveById(userId) {
    try {
      if (!userId) {
        return null;
      }

      const user = await UserCad.findOne({
        where: {
          [Op.and]: [
            { id: userId },
            {
              fkUserStatus: {
                [Op.or]: [EnumUserStatus.Active, EnumUserStatus.New],
              },
            },
          ],
        },
      });

      return user || null;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  static async getUserByEmail(email, notId = null) {
    try {
      if (!email) {
        return null;
      }

      const where = { email };

      if (notId) {
        where.id = { [Op.not]: notId };
      }

      const user = await UserCad.findOne({
        where,
        raw: true,
      });

      return user || null;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  static async getUserByPhoneOrMobile(phone, notId = null) {
    try {
      if (!phone) {
        return null;
      }

      const where = {
        [Op.or]: [{ phone }, { mobile: phone }],
      };

      if (notId) {
        where.id = { [Op.not]: notId };
      }

      const user = await UserCad.findOne({
        where,
        raw: true,
      });

      return user || null;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  static async standardizePhone(phone, ddi = '55') {
    let str = `${phone}`;
    str = str.replace(/[^0-9]/g, '');

    if (str.length <= 9) {
      return ''; //erro ddd
    } else if (str.length >= 12) {
      return str;
    } else {
      return ddi + str;
    }
  }

  static async saveUserPicture(picture, fkUser, type = 1, clean = false) {
    const createdPicture = await UserPicture.create({
      picture,
      fkUser,
      type,
    });

    if (clean && createdPicture.id) {
      UserPicture.update(
        { deletedAt: moment() },
        {
          where: {
            fkUser,
            type,
            id: { [Op.not]: createdPicture.id },
          },
        }
      );
    }

    return createdPicture || null;
  }
  static async removeUserPicture(id, fkUser = null, type = null) {
    const where = {
      id,
    };

    if (fkUser) {
      where.fkUser = fkUser;
    }

    if (type) {
      where.type = type;
    }

    const removePicture = await UserPicture.update(
      { deletedAt: moment() },
      {
        where,
      }
    );

    return removePicture || null;
  }
  static async getUserPictures(fkUser, type = 1, all = false) {
    let limit;
    if (!all) {
      limit = 1;
    }

    const userPictures = await UserPicture.findAll({
      where: {
        fkUser,
        type,
      },
      order: [['id', 'DESC']],
      limit,
      raw: true,
    });

    return userPictures || null;
  }
}

export default UserService;
