//helpers
import ResponseBuilder from '../../helpers/responseBuilder';

//services
import CityService from '../../services/City/CityService';
import CityAddressService from '../../services/Address/AddressCityService';

const response = new ResponseBuilder();

class CityController {
  static async getCitiesByState(req, res) {
    try {
      const cities = await CityService.getCitiesByState(req.query.stateId);

      response.setSuccess(
        200,
        'We returned all registered cities in the informed state.',
        cities
      );
      return response.send(res);
    } catch (error) {
      console.error(error);
      response.setError(500, 'Erro!' + JSON.stringify(error));
      return response.send(res);
    }
  }
  static async getAll(req, res) {
    try {
      const { start, length, search, col, dir, draw } = req.body;

      const Cities = await CityAddressService.getAllTable(
        start,
        length,
        search && search['value'] ? search['value'] : null,
        col,
        dir
      );

      let total = await CityAddressService.countCities();
      let filter = total;
      if (search && search['value'] && search['value'].trim() != '')
        filter = await CityAddressService.countCities(search['value']);

      if (Cities) {
        //response.setSuccess(200, 'Company founded successfully!', Company);
        //return response.send(res);
        const mapData = Cities.map(function (row) {
          const result = row.get();
          //result.fkUser = result.fkUser+' | '+row.UserCad.get('fullName')+' | '+row.UserCad.get('email');
          //delete result.Usercad;
          return result;
        });

        return res.send({
          draw,
          recordsTotal: total,
          recordsFiltered: filter,
          data: mapData,
        });
      } else {
        response.setError(
          400,
          'Company are not founded. Check the informed parameters'
        );
        return response.send(res);
      }
    } catch (error) {
      console.error(error);
      response.setError(
        500,
        'Company are not founded. Check the informed parameters'
      );
      throw error;
    }
  }
}

export default CityController;
