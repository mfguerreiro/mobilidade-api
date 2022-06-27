import Occupation from '../../../models/sql/Occupation/Occupation/Occupation';
import moment from 'moment';

class OccupationService {
  static async getAll(idArea) {
    try {

      const where = {};
      if(idArea){
        where.fkArea = idArea;
      }

      return Occupation.findAll({
        where,
        attributes: ['id', 'occupation', 'fkArea'],
        raw: true,
      });
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  static async create(occupation, fkArea) {
    try {
      const upperOccupation = occupation.toUpperCase();

      const existingOccupation = await Occupation.findOne({
        where: { occupation: upperOccupation },
      });

      if (!existingOccupation) return null;

      return Occupation.create({ occupation, fkArea });
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  static async delete(id) {
    try {
      const occupation = await Occupation.findOne({ where: { id } });

      if (!occupation) return null;

      return Occupation.update(
        { deletedAt: moment() },
        {
          where: {
            id,
          },
        }
      );
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }
}

export default OccupationService;
