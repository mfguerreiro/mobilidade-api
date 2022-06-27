import AddressState from '../../models/sql/Address/AddressState';

class AddressStateService {
  static async getStateByUf(uf) {
    try {
      if (!uf) {
        return null;
      }

      const state = await AddressState.findOne({
        where: {
          stateCode: uf,
        },
        raw: true,
      });

      if (!state) {
        return null;
      } else {
        return state;
      }
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }
  static async getStates() {
    try {

      const state = await AddressState.findAll({
        raw: true,
        order:[['state', 'ASC']]
      });

      if (!state) {
        return null;
      } else {
        return state;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }  

  static async getAllTable(
    start = 0,
    length = 25,
    search = '',
    col = null,
    dir = null
  ) {
    try {
      let where = {};

      if (search && search.trim() != '') {
        where = {
          [Op.or]: [
            { state: { [Op.like]: `%${search.trim()}%` } },
            { stateCode: { [Op.like]: `%${search.trim()}%` } }
          ],
        };
      }

      const order = [];
      if (col != null && dir != null) {
        order.push([col, dir]);
      }

      const state = await AddressState.findAll({
        where,
        offset: parseInt(start),
        limit: parseInt(length),
        order
      });

      return state || null;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }  
  static async countStates(search = '') {
    try {
      let where = {};

      if (search.trim() != '') {
        where = {
          [Op.or]: [
            { state: { [Op.like]: `%${search.trim()}%` } },
            { stateCode: { [Op.like]: `%${search.trim()}%` } }
          ],
        };
      }

      const state = await AddressState.count({
        where,
      });

      return state || 0;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }   
}

export default AddressStateService;
