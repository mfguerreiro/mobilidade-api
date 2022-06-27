//helpers
import ResponseBuilder from '../../../helpers/responseBuilder';

//services
import SpecialtyService from '../../../services/Occupation/Specialty/SpecialtyService';

const response = new ResponseBuilder();

class SpecialtyController {
  static async getAll(req, res) {
    try {
      const { idOccupation } = req.body;

      const specialty = await SpecialtyService.getAll(idOccupation);

      response.setSuccess(
        200,
        'We returned all registered specialty.',
        specialty
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
      const { specialty, fkOccupation, fkArea } = req.body;

      if (!(specialty && fkOccupation && fkArea)) {
        response.setError(
          400,
          'Mandatory parameters are not informed correctly'
        );
        return response.send(res);
      }

      const createdSpecialty = await SpecialtyService.create(
        specialty,
        fkOccupation,
        fkArea
      );

      if (createdSpecialty) {
        response.setSuccess(200, 'Specialty created successfully!', {
          id: createdSpecialty.id,
        });
        return response.send(res);
      } else {
        response.setError(
          400,
          'Specialty are not created. Check the informed parameters'
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
      const { specialtyId } = req.query;

      if (!specialtyId) {
        response.setError(
          400,
          'Mandatory parameters are not informed correctly',
          specialtyId
        );
        return response.send(res);
      }

      const specialtyRemoved = await SpecialtyService.delete(specialtyId);

      if (specialtyRemoved) {
        response.setSuccess(
          200,
          'Specialty removed successfully!',
          specialtyRemoved
        );
        return response.send(res);
      } else {
        response.setError(
          400,
          'Specialty are not removed. Check the informed parameters'
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

export default SpecialtyController;
