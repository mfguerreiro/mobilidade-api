//helpers
import ResponseBuilder from '../../helpers/responseBuilder';

//services
import ProfileService from '../../services/Profile/ProfileService';

const response = new ResponseBuilder();

class ProfileController {
  static async changeProfile(req, res) {
    try {
      const { userId } = req.query;
      
      const { profile, professional } = req.body;

      if (!userId) {
        response.setError(
          400,
          'Mandatory parameters are not informed correctly',
          {
          }
        );
        return response.send(res);
      }

      const createdProfile = await ProfileService.createUpdateProfile(
        profile, professional,
        userId
      );

      if (createdProfile) {
        response.setSuccess(200, 'Professional created successfully!');
        return response.send(res);
      } else {
        response.setError(
          400,
          'Professional are not created. Check the informed parameters',
          createdProfile
        );
        return response.send(res);
      }
    } catch (error) {
      console.error(error);
      response.setError(
        500,
        'Erro!' + JSON.stringify(error)
      );
      return response.send(res);
    }
  }

  static async getProfile(req, res) {
    try {

      const {idUser} = req.query;

      const parameters = await ProfileService.getProfile(idUser);

      response.setSuccess(200, 'Parameters loaded successfully', parameters);
      return response.send(res);
    } catch (error) {
      console.error(error);
      response.setError(
        500,
        'Erro!' + JSON.stringify(error)
      );
      return response.send(res);      
    }
  }
}

export default ProfileController;
