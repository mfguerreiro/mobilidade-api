import Qualification from '../../models/sql/Qualification/Qualification';

import moment from 'moment';

class QualificationService {
  static async createOrUpdateQualification(
    qualificationId,
    userId,
    type,
    title,
    institution,
    initialDate,
    finalDate,
    description,
    level
  ) {
    try {
      const createdOrUpdatedQualification = qualificationId
        ? await this._updateQualification({
            qualificationId,
            userId,
            type,
            title,
            institution,
            initialDate,
            finalDate,
            description,
            level
          })
        : await this._createQualification({
            userId,
            type,
            title,
            institution,
            initialDate,
            finalDate,
            description,
            level
          });

      return createdOrUpdatedQualification || null;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  static async _createQualification({
    userId,
    type,
    title,
    institution,
    initialDate,
    finalDate,
    description,
    level
  }) {
    try {
      if (!userId || !type) return null;

      return Qualification.create({
        fkUser: userId,
        fkQualificationType: type,
        title,
        institution,
        initialDate,
        finalDate,
        description,
        level
      });
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  static async _updateQualification(data) {
    try {
      const qualification = await Qualification.findByPk(data.qualificationId);

      if (!qualification) return null;

      const objectToUpdate = this._getObjectToUpdate(data);

      const updatedQualification = await Qualification.update(objectToUpdate, {
        where: { id: data.qualificationId },
      });

      return updatedQualification.length ? updatedQualification : null;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  static _getObjectToUpdate(data) {
    try {
      const objectToUpdate = {};

      if (data.userId) {
        objectToUpdate.fkUser = data.userId;
      }

      if (data.type) {
        objectToUpdate.fkQualificationType = data.type;
      }

      if (data.title) {
        objectToUpdate.title = data.title;
      }

      if (data.institution) {
        objectToUpdate.institution = data.institution;
      }

      if (data.initialDate) {
        objectToUpdate.initialDate = data.initialDate;
      }

      if (data.finalDate) {
        objectToUpdate.finalDate = data.finalDate;
      }

      if (data.description) {
        objectToUpdate.description = data.description;
      }

      return objectToUpdate;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  static async getByUserId(userId, type) {
    try {
      const where= { fkUser: userId }

      if(type){
        where.fkQualificationType = type;
      }

      const qualification = await Qualification.findAll({
        where,
      });

      return qualification || null;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  static async getById(id) {
    try {
      const qualification = await Qualification.findByPk(id);

      return qualification || null;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  static async delete(qualificationId) {
    try {
      const deletedQualification = await Qualification.update(
        {
          deletedAt: moment(),
        },
        { where: { id: qualificationId } }
      );

      return deletedQualification[0] > 0 ? deletedQualification : null;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }
}

export default QualificationService;
