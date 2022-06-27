//helpers
import ResponseBuilder from '../../helpers/responseBuilder';

//services
import AddressService from '../../services/Address/AddressService';
import AddressCityService from '../../services/Address/AddressCityService';
import AddressStateService from '../../services/Address/AddressStateService';

const response = new ResponseBuilder();

class AddressController {
  static async getCity(req, res) {
    try {
      const { idState } = req.query;

      if (!idState) {
        response.setError(
          400,
          'Mandatory parameters are not informed correctly'
        );
        return response.send(res);
      }

      const getCity = await AddressCityService.getCityByState(idState);

      if (getCity) {
        response.setSuccess(200, 'Address created successfully!', getCity);
        return response.send(res);
      } else {
        response.setError(
          400,
          'Address are not created. Check the informed parameters'
        );
        return response.send(res);
      }
    } catch (error) {
      console.error(error);
      response.setError(500, 'Erro!' + JSON.stringify(error));
      return response.send(res);
    }
  }
  static async getState(req, res) {
    try {
      const getState = await AddressStateService.getStates();

      if (getState) {
        response.setSuccess(200, 'Address created successfully!', getState);
        return response.send(res);
      } else {
        response.setError(
          400,
          'Address are not created. Check the informed parameters'
        );
        return response.send(res);
      }
    } catch (error) {
      console.error(error);
      response.setError(500, 'Erro!' + JSON.stringify(error));
      return response.send(res);
    }
  }
  static async getAddress(req, res) {
    try {
      const { idUser } = req.query;

      if (!idUser) {
        response.setError(
          400,
          'Mandatory parameters are not informed correctly'
        );
        return response.send(res);
      }

      const getAddress = await AddressService.getLastAddressUser(idUser);

      if (getAddress) {
        response.setSuccess(200, 'Address created successfully!', getAddress);
        return response.send(res);
      } else {
        response.setError(
          400,
          'Address are not created. Check the informed parameters'
        );
        return response.send(res);
      }
    } catch (error) {
      console.error(error);
      response.setError(500, 'Erro!' + JSON.stringify(error));
      return response.send(res);
    }
  }
  static async createAddress(req, res) {
    try {
      const {
        idUser,
        name,
        address,
        addressNumber,
        complement,
        neighborhood,
        addressPostalCode,
        city,
        state, // LEMBRETE ! Checar se o UF é válido. Sugestão: Criar enum e ver se o que veio na request tá dentro
        reference,
      } = req.body;

      if (
        !idUser ||
        !address ||
        !addressNumber ||
        !neighborhood ||
        !city ||
        !state
      ) {
        response.setError(
          400,
          'Mandatory parameters are not informed correctly',
          {
            address,
            addressNumber,
            neighborhood,
          }
        );
        return response.send(res);
      }

      const createdAddress = await AddressService.createAddress(
        idUser,
        name,
        address,
        addressNumber,
        complement,
        neighborhood,
        addressPostalCode,
        city,
        state,
        reference
      );

      if (createdAddress) {
        response.setSuccess(200, 'Address created successfully!', {
          name: createdAddress.name,
          address: createdAddress.address,
          addressNumber: createdAddress.addressNumber,
          complement: createdAddress.complement,
          neighborhood: createdAddress.neighborhood,
          addressPostalCode: createdAddress.addressPostalCode,
          reference: createdAddress.reference,
        });
        return response.send(res);
      } else {
        response.setError(
          400,
          'Address are not created. Check the informed parameters'
        );
        return response.send(res);
      }
    } catch (error) {
      console.error(error);
      response.setError(500, 'Erro!' + JSON.stringify(error));
      return response.send(res);
    }
  }
  static async updateAddress(req, res) {
    try {
      const { idUser } = req.query;

      const {
        name,
        address,
        addressNumber,
        complement,
        neighborhood,
        addressPostalCode,
        city,
        state, // LEMBRETE ! Checar se o UF é válido. Sugestão: Criar enum e ver se o que veio na request tá dentro
        reference,
      } = req.body;

      if (
        !idUser ||
        !address ||
        !addressNumber ||
        !neighborhood ||
        !city ||
        !state
      ) {
        response.setError(
          400,
          'Mandatory parameters are not informed correctly',
          {
            address,
            addressNumber,
            neighborhood,
          }
        );
        return response.send(res);
      }

      const createdAddress = await AddressService.createAddress(
        idUser,
        name,
        address,
        addressNumber,
        complement,
        neighborhood,
        addressPostalCode,
        city,
        state,
        reference
      );

      if (createdAddress) {
        response.setSuccess(200, 'Address created successfully!', {
          name: createdAddress.name,
          address: createdAddress.address,
          addressNumber: createdAddress.addressNumber,
          complement: createdAddress.complement,
          neighborhood: createdAddress.neighborhood,
          addressPostalCode: createdAddress.addressPostalCode,
          reference: createdAddress.reference,
        });
        return response.send(res);
      } else {
        response.setError(
          400,
          'Address are not created. Check the informed parameters'
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

export default AddressController;
