//models
import AddressCad from '../../models/sql/Address/AddressCad';
import UserAddressRelation from '../../models/sql/Address/UserAddressRelation';
import UserCad from '../../models/sql/User/UserCad';

//helpers
import { EnumAddressStatus, EnumAddressType } from '../../helpers/Enums';
import AddressCityService from './AddressCityService';
import AddressStateService from './AddressStateService';

class AddressService {
  static async createAddress(
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
  ) {
    try {
      //check if user exists
      const user = await UserCad.findOne({
        attributes: ['idUser'],
        where: {
          id: idUser,
        },
      });

      if (!user) {
        return null;
      }

      //check if user has an address
      const userAddressObj = await this.getAddressByUser(idUser);

      //if some address already exists, update then with inactive status and no checked
      if (userAddressObj) {
        await Promise.all(
          userAddressObj.map(async (address) => {
            await this.updateAddress(address.fkAddress, {
              fkAddressStatus: EnumAddressStatus.Inactive,
              checked: 0,
            });
          })
        );
      }

      //get fkCity and fkState
      const cityObj = await AddressCityService.getCityByName(city);
      const stateObj = await AddressStateService.getStateByUf(state);

      if (!cityObj || !stateObj) {
        return null;
      }

      const addressCreate = await AddressCad.create({
        fkAddressStatus: EnumAddressStatus.Active,
        fkAddressType: EnumAddressType.Professional,
        name,
        address,
        addressNumber,
        complement,
        neighborhood,
        addressPostalCode,
        reference,
        fkCity: cityObj.id,
        fkState: stateObj.id,
        checked: 1,
      });

      if (!addressCreate) {
        return null;
      }

      const relationUserAddress = await UserAddressRelation.create({
        fkUser: idUser,
        fkAddress: addressCreate.id,
      });

      return relationUserAddress ? addressCreate : null;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  static async getLastAddressUser(userId) {
    try {
      if (!userId) {
        return null;
      }

      const address = await UserAddressRelation.findOne({
        where: {
          fkUser: userId,
        },
        include: [{model:AddressCad, order:[['idAddress', 'DESC']]}],
      });

      if (!address.AddressCad) {
        return null;
      } else {
        return address.get('AddressCad');
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async getAddressByUser(userId) {
    try {
      if (!userId) {
        return null;
      }

      const address = await UserAddressRelation.findAll({
        where: {
          fkUser: userId,
        },
        include: [AddressCad],
        raw: true,
      });

      if (!address) {
        return null;
      } else {
        return address;
      }
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  static async updateAddress(addressId, objToUpdate) {
    try {
      if (!addressId || !objToUpdate) {
        return null;
      }

      const updatedAddress = await AddressCad.update(objToUpdate, {
        where: {
          id: addressId,
        },
      });

      if (!updatedAddress) {
        return null;
      } else {
        return updatedAddress;
      }
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }
}

export default AddressService;
