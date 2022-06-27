//helpers
import ResponseBuilder from '../../helpers/responseBuilder';
import Helper from '../../helpers/index';

//services
import UserService from '../../services/User/UserService';

import Validation from '../../helpers/validations';

const response = new ResponseBuilder();
class UserController {
  static async auth(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        response.setError(
          400,
          'Mandatory parameters are not informed correctly',
          email
        );
        return response.send(res);
      }

      const login = await UserService.auth(email, password);

      if (login.statusCode !== 200) {
        response.setError(login.statusCode, login.msg);
        return response.send(res);
      } else {
        response.setSuccess(login.statusCode, login.msg, login.data);
        return response.send(res);
      }
    } catch (error) {
      console.error(error);
      response.setError(500, 'Erro!' + JSON.stringify(error));
      return response.send(res);
    }
  }

  static async getUserById(req, res) {
    try {
      const { userId } = req.query;

      const user = await UserService.getUserById(userId);

      if (user) {
        response.setSuccess(200, 'User found successfully!', user);
        return response.send(res);
      } else {
        response.setError(
          400,
          'User are not found. Check the informed parameters'
        );
        return response.send(res);
      }
    } catch (error) {
      console.error(error);
      response.setError(500, 'Erro!' + JSON.stringify(error));
      return response.send(res);
    }
  }

  static async getUsers(req, res) {
    try {
      const { start, length, search, col, dir } = req.query;

      const user = await UserService.getUsers(start, length, search, col, dir);
      let total = await UserService.countUsers();
      let filter = total;
      if (search && search.trim() != '')
        filter = await UserService.countUsers(search);

      if (user) {
        response.setSuccess(200, 'User found successfully!', {
          list: user,
          total,
          filter,
        });
        return response.send(res);
      } else {
        response.setError(
          400,
          'User are not found. Check the informed parameters'
        );
        return response.send(res);
      }
    } catch (error) {
      console.error(error);
      response.setError(500, 'Erro!' + JSON.stringify(error));
      return response.send(res);
    }
  }

  static async createUser(req, res) {
    try {
      const { fullName, nick, phone, mobile, birthDate, email, password } =
        req.body;

      const paramValidation = await Validation.createUserValidation(
        fullName,
        nick,
        phone,
        mobile,
        birthDate,
        email,
        password
      ).catch((error) => {
        //console.log('\n\n entrou no catch!!!!!!!!');
        response.setError(400, error.message);
        return error;
      });
      console.log('\n\nparamValidation');

      // if (
      //   paramValidation &&
      //   paramValidation.errors &&
      //   paramValidation.errors.length > 0
      // ) {
      //   response.setError(400, paramValidation.errors, req.body);
      //   return response.send(res);
      // }

      //TODO: nick, phone, mobile, birthDate -> Checar com base no parâmetro
      console.log('\n\n antes create user');
      const createdUser = await UserService.createUser({
        fullName,
        nick,
        phone,
        mobile,
        birthDate,
        email,
        password,
      });

      if (createdUser) {
        response.setSuccess(200, 'User created successfully!', createdUser);
        return response.send(res);
      } else {
        response.setError(
          400,
          'User are not created. Check the informed parameters'
        );
        return response.send(res);
      }
    } catch (error) {
      console.error(error);
      response.setError(500, error);
      return response.send(res);
    }
  }

  static async updateUser(req, res) {
    try {
      const { userId } = req.query;

      const {
        fullName,
        nick,
        fkUserStatus,
        phone,
        mobile,
        birthDate,
        email,
        password,
      } = req.body;

      if (!userId) {
        response.setError(
          400,
          'Mandatory parameters are not informed correctly',
          userId
        );
        return response.send(res);
      }

      const updatedUser = await UserService.updateUser({
        userId,
        fullName,
        nick,
        fkUserStatus,
        phone,
        mobile,
        birthDate,
        email,
        password,
      });

      if (Array.isArray(updatedUser)) {
        response.setSuccess(200, 'User updated successfully!', updatedUser);
        return response.send(res);
      } else {
        response.setError(
          400,
          'User are not updated. Check the informed parameters. ' +
            JSON.stringify(updatedUser)
        );
        return response.send(res);
      }
    } catch (error) {
      console.error(error);
      response.setError(500, 'Erro!' + JSON.stringify(error));
      return response.send(res);
    }
  }

  static async removeUser(req, res) {
    try {
      const { userId } = req.query;

      if (!userId) {
        response.setError(
          400,
          'Mandatory parameters are not informed correctly',
          userId
        );
        return response.send(res);
      }

      const userRemoved = await UserService.removeUser(userId);

      if (userRemoved) {
        response.setSuccess(200, 'User removed successfully!', userRemoved);
        return response.send(res);
      } else {
        response.setError(
          400,
          'User are not removed. Check the informed parameters'
        );
        return response.send(res);
      }
    } catch (error) {
      console.error(error);
      response.setError(500, 'Erro!' + JSON.stringify(error));
      return response.send(res);
    }
  }

  static async createUserPicture(req, res) {
    try {
      const { picture, idUser, type, clean } = req.body;

      const createdImage = await UserService.saveUserPicture(
        picture,
        idUser,
        type,
        clean
      );

      if (createdImage) {
        response.setSuccess(
          200,
          'User Imagem created successfully!',
          createdImage
        );
        return response.send(res);
      } else {
        response.setError(
          400,
          'User are not created. Check the informed parameters'
        );
        return response.send(res);
      }
    } catch (error) {
      console.error(error);
      response.setError(500, error);
      return response.send(res);
    }
  }

  static async removeUserPicture(req, res) {
    try {
      const { picture, idUser, type, clean } = req.query;

      const removeImage = await UserService.removeUserPicture(
        picture,
        idUser,
        type
      );

      if (removeImage) {
        response.setSuccess(
          200,
          'User Imagem remove successfully!',
          removeImage
        );
        return response.send(res);
      } else {
        response.setError(
          400,
          'User are not created. Check the informed parameters'
        );
        return response.send(res);
      }
    } catch (error) {
      console.error(error);
      response.setError(500, error);
      return response.send(res);
    }
  }
  static async getUserPictures(req, res) {
    try {
      const { idUser, type, all } = req.query;

      const userPicture = await UserService.getUserPictures(idUser, type, all);

      if (userPicture) {
        response.setSuccess(200, 'User found successfully!', userPicture);
        return response.send(res);
      } else {
        response.setError(
          400,
          'User are not found. Check the informed parameters'
        );
        return response.send(res);
      }
    } catch (error) {
      console.error(error);
      response.setError(500, 'Erro!' + JSON.stringify(error));
      return response.send(res);
    }
  }
}

export default UserController;
