import UserOccupationRelation from '../../../models/sql/Occupation/UserOccupationRelation/UserOccupationRelation';
import Area from '../../../models/sql/Occupation/Area/Area';
import Ocuppation from '../../../models/sql/Occupation/Occupation/Occupation';
import Specialty from '../../../models/sql/Occupation/Specialty/Specialty';

import moment from 'moment';

class UserOccupationRelationService {
  static async getAllByUser(userId) {
    try {
      return UserOccupationRelation.findAll({
        where: { fkuser: userId },
        attributes: ['id', 'fkUser', 'fkArea', 'fkOccupation', 'fkSpecialty'],
        include:[{model:Area}, {model:Ocuppation}, {model:Specialty}],
        raw: true,
      });
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  static async create(fkUser, fkArea, fkOccupation=null, fkSpecialty=null) {
    try {
      return UserOccupationRelation.create({
        fkUser,
        fkArea,
        fkOccupation,
        fkSpecialty,
      });
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  static async delete(id) {
    try {
      const userOccupationRelation = await UserOccupationRelation.findOne({
        where: { id },
      });

      if (!userOccupationRelation) return null;

      return UserOccupationRelation.update(
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

export default UserOccupationRelationService;
