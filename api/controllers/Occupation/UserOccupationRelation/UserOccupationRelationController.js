//helpers
import ResponseBuilder from '../../../helpers/responseBuilder';

//services
import UserOccupationRelationService from '../../../services/Occupation/UserOccupationRelation/UserOccupationRelationService';

const response = new ResponseBuilder();

class UserOccupationRelationController {
  static async getAllByUser(req, res) {
    try {
      const { userId } = req.body;

      const UserOccupationRelations =
        await UserOccupationRelationService.getAllByUser(userId);

      response.setSuccess(
        200,
        'We returned all registered user occupation relations.',
        UserOccupationRelations
      );
      return response.send(res);
    } catch (error) {
      console.error(error);
      response.setError(500, 'Erro!' + JSON.stringify(error));
      return response.send(res);
    }
  }

  static async create(req, res) {
    try {
      const { fkUser, fkArea, fkOccupation, fkSpecialty } = req.body;

      if (!(fkUser && fkArea)) {
        response.setError(
          400,
          'Mandatory parameters are not informed correctly'
        );
        return response.send(res);
      }

      const createdRelation = await UserOccupationRelationService.create(
        fkUser,
        fkArea,
        fkOccupation,
        fkSpecialty
      );

      if (createdRelation) {
        response.setSuccess(200, 'Relation created successfully!', {
          id: createdRelation.id,
        });
        return response.send(res);
      } else {
        response.setError(
          400,
          'Relation are not created. Check the informed parameters'
        );
        return response.send(res);
      }
    } catch (error) {
      console.error(error);
      response.setError(500, 'Erro!' + JSON.stringify(error));
      return response.send(res);
    }
  }

  static async delete(req, res) {
    try {
      const { userOccupationRelationId } = req.query;

      if (!userOccupationRelationId) {
        response.setError(
          400,
          'Mandatory parameters are not informed correctly'
        );
        return response.send(res);
      }

      const relationRemoved = await UserOccupationRelationService.delete(
        userOccupationRelationId
      );

      if (relationRemoved) {
        response.setSuccess(
          200,
          'Relation removed successfully!',
          relationRemoved
        );
        return response.send(res);
      } else {
        response.setError(
          400,
          'Relation are not removed. Check the informed parameters'
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

export default UserOccupationRelationController;
