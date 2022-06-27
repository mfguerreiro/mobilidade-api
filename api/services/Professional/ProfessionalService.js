import { Op } from 'sequelize';

//models
import UserProfessionalCad from '../../models/sql/Professional/UserProfessionalCad';
import MongoService from '../../services/Log/MongoService';

//services
import UserService from '../User/UserService';

//helpers
import { EnumProfessionalAppColors } from '../../helpers/Enums';

class ProfessionalService {
  static async createProfessional(document, userId) {
    try {
      //check if user exists
      const existingUser = await UserService.getUserActiveById(userId);

      if (!existingUser) {
        return null;
      }

      const existingProfessional = await this.getProfessionalByDocument(
        document
      );

      if (existingProfessional) {
        return null;
      }

      const professionalCreated = await UserProfessionalCad.create({
        document,
        fkUser: userId,
      });

      return professionalCreated ? professionalCreated.dataValues : null;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  static async getProfessionalByDocument(document) {
    try {
      if (!document) {
        return null;
      }

      const professional = await UserProfessionalCad.findOne({
        where: {
          document,
        },
      });

      return professional || null;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  static async getProfessionalParameters() {
    try {
      const mongo = await MongoService.get('appParameters');

      return { appColor: mongo.appColor };
    } catch (error) {
      console.error(error);
    }
  }
}

export default ProfessionalService;
