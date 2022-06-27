//helpers
import ResponseBuilder from '../../helpers/responseBuilder';

//Services
import QualificationService from '../../services/Qualification/QualificationService';

const response = new ResponseBuilder();

class QualificationController {
  static async createOrUpdateQualification(req, res) {
    try {
      const { qualificationId } = req.query;

      const {
        userId,
        type,
        title,
        institution,
        initialDate,
        finalDate,
        description,
        level,
      } = req.body;

      const createdOrUpdatedQualification =
        await QualificationService.createOrUpdateQualification(
          qualificationId,
          parseInt(userId),
          parseInt(type),
          title,
          institution,
          initialDate,
          finalDate,
          description,
          level
        );

      if (createdOrUpdatedQualification) {
        response.setSuccess(
          200,
          'Qualification created or updated successfully!',
          createdOrUpdatedQualification
        );
        return response.send(res);
      } else {
        response.setError(
          400,
          'Qualification are not created or updated. Check the informed parameters'
        );
        return response.send(res);
      }
    } catch (error) {
      console.error(error);
      response.setError(500, 'Erro!' + JSON.stringify(error));
      return response.send(res);
    }
  }

  static async getByUserId(req, res) {
    try {
      const { userId, type } = req.query;

      const qualification = await QualificationService.getByUserId(
        userId,
        type
      );

      if (qualification) {
        response.setSuccess(
          200,
          'Qualification founded successfully!',
          qualification
        );
        return response.send(res);
      } else {
        response.setError(
          400,
          'Qualification are not founded. Check the informed parameters'
        );
        return response.send(res);
      }
    } catch (error) {
      console.error(error);
      response.setError(500, 'Erro!' + JSON.stringify(error));
      return response.send(res);
    }
  }

  static async getById(req, res) {
    try {
      const { id } = req.query;

      const qualification = await QualificationService.getById(id);

      if (qualification) {
        response.setSuccess(
          200,
          'Qualification founded successfully!',
          qualification
        );
        return response.send(res);
      } else {
        response.setError(
          400,
          'Qualification are not founded. Check the informed parameters'
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
      const { id } = req.query;

      const deletedQualification = await QualificationService.delete(id);

      if (deletedQualification) {
        response.setSuccess(
          200,
          'Qualification deleted successfully!',
          deletedQualification
        );
        return response.send(res);
      } else {
        response.setError(
          400,
          'Qualification are not deleted. Check the informed parameters'
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

export default QualificationController;
