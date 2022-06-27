//helpers
import ResponseBuilder from '../../../helpers/responseBuilder';

//services
import AreaService from '../../../services/Occupation/Area/AreaService';

const response = new ResponseBuilder();

class AreaController {
  static async getAll(req, res) {
    try {
      const areas = await AreaService.getAll();

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
      const { area } = req.body;

      if (!area) {
        response.setError(
          400,
          'Mandatory parameters are not informed correctly',
          {
            document,
          }
        );
        return response.send(res);
      }

      const createdArea = await AreaService.create(area);

      if (createdArea) {
        response.setSuccess(200, 'Area created successfully!', {
          id: createdArea.id,
        });
        return response.send(res);
      } else {
        response.setError(
          400,
          'Area are not created. Check the informed parameters'
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
      const { areaId } = req.query;

      if (!areaId) {
        response.setError(
          400,
          'Mandatory parameters are not informed correctly',
          areaId
        );
        return response.send(res);
      }

      const areaRemoved = await AreaService.delete(areaId);

      if (areaRemoved) {
        response.setSuccess(200, 'Area removed successfully!', areaRemoved);
        return response.send(res);
      } else {
        response.setError(
          400,
          'Area are not removed. Check the informed parameters'
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

export default AreaController;
