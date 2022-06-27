import Company from '../../models/sql/Company/Company';
import UserCad from '../../models/sql/User/UserCad';
import UserService from '../User/UserService';
import moment from 'moment';
import { Op } from 'sequelize';

class CompanyService {
  static async createOrUpdateCompany(
    companyId,
    userId,
    companyName,
    tradingName,
    employeeNumber
  ) {
    try {
      const createdOrUpdatedCompany = companyId
        ? await this._updateCompany({
            companyId,
            userId,
            companyName,
            tradingName,
            employeeNumber,
          })
        : await this._createCompany({
            userId,
            companyName,
            tradingName,
            employeeNumber,
          });

      return createdOrUpdatedCompany || null;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  static async _createCompany(data) {
    try {
      if (!data.userId || !data.companyName) return null;

      const user = await UserService.getUserById(data.userId);

      if (!user) return null;

      return Company.create({
        fkUser: data.userId,
        companyName: data.companyName,
        tradingName: data.tradingName,
        employeeNumber: data.employeeNumber,
      });
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  static async _updateCompany(data) {
    try {
      const company = await Company.findByPk(data.companyId);

      if (!company) return null;

      const objectToUpdate = this._getObjectToUpdate(data);

      const updatedCompany = await Company.update(objectToUpdate, {
        where: { id: data.companyId },
      });

      return updatedCompany.length ? updatedCompany : null;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  static async _getObjectToUpdate(data) {
    const objectToUpdate = {};

    if (data?.userId) {
      objectToUpdate.fkUser = data.userId;
    }

    if (data?.companyName) {
      objectToUpdate.companyName = data.companyName;
    }

    if (data?.tradingName) {
      objectToUpdate.tradingName = data.tradingName;
    }

    if (data?.employeeNumber) {
      objectToUpdate.employeeNumber = data.employeeNumber;
    }

    return objectToUpdate;
  }

  static async getById(companyId) {
    try {
      const company = await Company.findByPk(companyId, { include: UserCad });

      return company || null;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  static async getByUserId(userId) {
    try {
      const company = await Company.findAll({ where: { fkUser: userId } });

      return company || null;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  static async getAll(
    start = 0,
    length = 25,
    search = '',
    col = null,
    dir = null
  ) {
    try {
      let where = {};

      if (search && search.trim() != '') {
        where = {
          [Op.or]: [
            { id: { [Op.like]: `%${search.trim()}%` } },
            { fkUser: { [Op.like]: `%${search.trim()}%` } },
            { companyName: { [Op.like]: `%${search.trim()}%` } },
            { tradingName: { [Op.like]: `%${search.trim()}%` } },
            { employeeNumber: { [Op.like]: `%${search.trim()}%` } },
          ],
        };
      }

      const order = [];
      if (col != null && dir != null) {
        order.push([col, dir]);
      }

      const company = await Company.findAll({
        attributes: [
          'id',
          'companyName',
          'tradingName',
          'employeeNumber',
          'createdAt',
          'updatedAt',
          'deletedAt',
          'fkUser',
        ],
        where,
        offset: parseInt(start),
        limit: parseInt(length),
        order,
        include: [
          {
            attributes: ['id', 'nick', 'email', 'fullName', 'phone', 'mobile'],
            model: UserCad,
          },
        ],
      });

      return company || null;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  static async countCompanies(search = '') {
    try {
      let where = {};

      if (search.trim() != '') {
        where = {
          [Op.or]: [
            { id: { [Op.like]: `%${search.trim()}%` } },
            { fkUser: { [Op.like]: `%${search.trim()}%` } },
            { companyName: { [Op.like]: `%${search.trim()}%` } },
            { tradingName: { [Op.like]: `%${search.trim()}%` } },
            { employeeNumber: { [Op.like]: `%${search.trim()}%` } },
          ],
        };
      }

      const company = await Company.count({
        where,
      });

      return company || 0;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  static async delete(companyId) {
    try {
      const deletedCompany = await Company.update(
        { deletedAt: moment() },
        {
          where: {
            id: companyId,
          },
        }
      );

      return deletedCompany[0] > 0 ? deletedCompany : null;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }
}

export default CompanyService;
