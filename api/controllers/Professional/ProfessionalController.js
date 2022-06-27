//helpers
import ResponseBuilder from '../../helpers/responseBuilder';

//services
import ProfessionalService from '../../services/Professional/ProfessionalService';

const response = new ResponseBuilder();

class ProfessionalController {
  static async createProfessional(req, res) {
    try {
      const { document, userId } = req.body;
      console.log('\n\n create professional: ', document, userId);

      if (!document || !userId) {
        response.setError(
          400,
          'Mandatory parameters are not informed correctly',
          {
            document,
          }
        );
        return response.send(res);
      }

      const createdProfessional = await ProfessionalService.createProfessional(
        document,
        userId
      );

      if (createdProfessional) {
        response.setSuccess(200, 'Professional created successfully!', {
          createdAt: createdProfessional.createdAt,
          document: createdProfessional.document,
          id: createdProfessional.id,
        });
        return response.send(res);
      } else {
        response.setError(
          400,
          'Professional are not created. Check the informed parameters'
        );
        return response.send(res);
      }
    } catch (error) {
      console.error(error);
      response.setError(500, 'Erro!' + JSON.stringify(error));
      return response.send(res);
    }
  }

  static async getProfessionalParameters(req, res) {
    try {
      console.log('\n\n entrou no get parameters');
      const parameters = await ProfessionalService.getProfessionalParameters();

      response.setSuccess(200, 'Parameters loaded successfully', parameters);
      return response.send(res);
    } catch (error) {
      console.error(error);
    }
  }
}

export default ProfessionalController;
