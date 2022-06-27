//helpers
import ResponseBuilder from '../../../helpers/responseBuilder';

//services
import OccupationService from '../../../services/Occupation/Occupation/OccupationService';

const response = new ResponseBuilder();

class OccupationController {
  static async getAll(req, res) {
    try {
      const { idArea } = req.body;

      const areas = await OccupationService.getAll(idArea);

      response.setSuccess(200, 'We returned all registered areas.', areas);
      return response.send(res);
    } catch (error) {
      console.error(error);
      response.setError(500, 'Erro!' + JSON.stringify(error));
      return response.send(res);
    }
  }

  static async create(req, res) {
    try {
      const { occupation, fkArea } = req.body;

      if (!(occupation && fkArea)) {
        response.setError(
          400,
          'Mandatory parameters are not informed correctly'
        );
        return response.send(res);
      }

      const createdOccupation = await OccupationService.create(
        occupation,
        fkArea
      );

      if (createdOccupation) {
        response.setSuccess(200, 'Occupation created successfully!', {
          id: createdOccupation.id,
        });
        return response.send(res);
      } else {
        response.setError(
          400,
          'Occupation are not created. Check the informed parameters'
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
      const { occupationId } = req.query;

      if (!occupationId) {
        response.setError(
          400,
          'Mandatory parameters are not informed correctly',
          occupationId
        );
        return response.send(res);
      }

      const occupationRemoved = await OccupationService.delete(occupationId);

      if (occupationRemoved) {
        response.setSuccess(
          200,
          'Occupation removed successfully!',
          occupationRemoved
        );
        return response.send(res);
      } else {
        response.setError(
          400,
          'Occupation are not removed. Check the informed parameters'
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

export default OccupationController;
