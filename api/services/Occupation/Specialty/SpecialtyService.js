import Specialty from '../../../models/sql/Occupation/Specialty/Specialty';
import moment from 'moment';

class SpecialtyService {
  static async getAll(idOccupation) {
    try {

      const where = {};
      if(idOccupation){
        where.fkOccupation = idOccupation;
      }

      return Specialty.findAll({
        where,
        attributes: ['id', 'specialty', 'fkArea', 'fkOccupation'],
        raw: true,
      });
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  static async create(specialty, fkOccupation, fkArea) {
    try {
      const upperSpecialty = specialty.toUpperCase();

      const existingSpecialty = await Specialty.findOne({
        where: { specialty: upperSpecialty },
      });

      if (!existingSpecialty) return null;

      return Specialty.create({ specialty, fkOccupation, fkArea });
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  static async delete(id) {
    try {
      const specialty = await Specialty.findOne({ where: { id } });

      if (!specialty) return null;

      return Specialty.update(
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

export default SpecialtyService;
