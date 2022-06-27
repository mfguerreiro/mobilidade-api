//helpers
import ResponseBuilder from '../../helpers/responseBuilder';
import StateService from '../../services/State/StateService';
import StateAddressService from '../../services/Address/AddressStateService';

//services

const response = new ResponseBuilder();

class StateController {
  static async getAllStates(req, res) {
    try {
      const states = await StateService.getAllStates();

      response.setSuccess(200, 'We returned all registered states.', states);
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

      const Company = await StateAddressService.getAllTable(
        start,
        length,
        search && search['value'] ? search['value'] : null,
        col,
        dir
      );

      let total = await StateAddressService.countStates();
      let filter = total;
      if (search && search['value'] && search['value'].trim() != '')
        filter = await StateAddressService.countStates(search['value']);

      if (Company) {
        //response.setSuccess(200, 'Company founded successfully!', Company);
        //return response.send(res);
        const mapData = Company.map(function (row) {
          const result = row.get();
          result.fkUser =
            result.fkUser +
            ' | ' +
            row.UserCad.get('fullName') +
            ' | ' +
            row.UserCad.get('email');
          delete result.Usercad;
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

export default StateController;
