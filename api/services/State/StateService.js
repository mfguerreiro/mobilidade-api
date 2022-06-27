import AddressState from '../../models/sql/AddressState/AddressState';

class StateService {
  static async getAllStates() {
    try {
      return AddressState.findAll({
        attributes: ['id', 'state', 'stateCode'],
        order: [['stateCode', 'ASC']],
        raw: true,
      });
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }
}

export default StateService;
