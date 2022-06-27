import Vacancy from '../../models/sql/Vacancy/Vacancy';
import moment from 'moment';

class VacancyService {
  static async createOrUpdateVacancy(
    vacancyId,
    companyId,
    title,
    description,
    workTime,
    basicSchooling,
    technicalProfile,
    behaviorProfile,
    salary,
    benefits
  ) {
    try {
      const createdOrUpdatedVacancy = vacancyId
        ? await this._updateVacancy({
            vacancyId,
            fkCompany: companyId,
            title,
            description,
            workTime,
            basicSchooling,
            technicalProfile,
            behaviorProfile,
            salary,
            benefits,
          })
        : await this._createVacancy({
            fkCompany: companyId,
            title,
            description,
            workTime,
            basicSchooling,
            technicalProfile,
            behaviorProfile,
            salary,
            benefits,
          });

      return createdOrUpdatedVacancy || null;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  static async _createVacancy({
    companyId,
    title,
    description,
    workTime,
    basicSchooling,
    technicalProfile,
    behaviorProfile,
    salary,
    benefits,
  }) {
    if (!companyId || !title) return null;

    return Vacancy.create({
      fkCompany: companyId,
      title,
      description,
      workTime,
      basicSchooling,
      technicalProfile,
      behaviorProfile,
      salary,
      benefits,
    });
  }

  static async _updateVacancy(data) {
    const vacancyFounded = await Vacancy.findByPk(data.vacancyId);

    if (!vacancyFounded) return null;

    const objToUpdate = this._getObjectToUpdate(data);

    const updatedVacancy = await Vacancy.update(objToUpdate, {
      where: {
        id: data.vacancyId,
      },
    });

    return updatedVacancy.length ? updatedVacancy : null;
  }

  static _getObjectToUpdate(data) {
    const objToUpdate = {};

    if (data?.fkCompany) {
      objToUpdate.fkCompany = data.fkCompany;
    }

    if (data.title) {
      objToUpdate.title = data.title;
    }

    if (data.description) {
      objToUpdate.description = data.description;
    }

    if (data.workTime) {
      objToUpdate.workTime = data.workTime;
    }

    if (data.basicSchooling) {
      objToUpdate.basicSchooling = data.basicSchooling;
    }

    if (data.technicalProfile) {
      objToUpdate.technicalProfile = data.technicalProfile;
    }

    if (data.behaviorProfile) {
      objToUpdate.behaviorProfile = data.behaviorProfile;
    }

    if (data.salary) {
      objToUpdate.salary = data.salary;
    }

    if (data.benefits) {
      objToUpdate.benefits = data.benefits;
    }

    return objToUpdate;
  }

  static async getById(vacancyId) {
    try {
      const vacancy = await Vacancy.findByPk(vacancyId);

      return vacancy || null;
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

      if (search.trim() != '') {
        where = {
          [Op.or]: [
            { id: { [Op.like]: `%${search.trim()}%` } },
            { fkCompany: { [Op.like]: `%${search.trim()}%` } },
            { title: { [Op.like]: `%${search.trim()}%` } },
            { description: { [Op.like]: `%${search.trim()}%` } },
            { salary: { [Op.like]: `%${search.trim()}%` } },
          ],
        };
      }

      const order = [];
      if (col != null && dir != null) {
        order.push([col, dir]);
      }

      const vacancy = await Vacancy.findAll({
        where,
        offset: parseInt(start),
        limit: parseInt(length),
        order,
      });

      return vacancy || null;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  static async countVacancies(search = '') {
    try {
      let where = {};

      if (search.trim() != '') {
        where = {
          [Op.or]: [
            { id: { [Op.like]: `%${search.trim()}%` } },
            { fkCompany: { [Op.like]: `%${search.trim()}%` } },
            { title: { [Op.like]: `%${search.trim()}%` } },
            { description: { [Op.like]: `%${search.trim()}%` } },
            { salary: { [Op.like]: `%${search.trim()}%` } },
          ],
        };
      }

      const vacancy = await Vacancy.count({
        where,
      });

      return vacancy || 0;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  static async delete(vacancyId) {
    try {
      const deletedVacancy = await Vacancy.update(
        { deletedAt: moment() },
        {
          where: {
            id: vacancyId,
          },
        }
      );

      return deletedVacancy[0] > 0 ? deletedVacancy : null;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }
}

export default VacancyService;
