import { Model, DataTypes } from 'sequelize';

class AddressCad extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          primaryKey: true,
          type: DataTypes.INTEGER,
          field: 'idAddress',
          autoIncrement: true,
        },
        fkAddressStatus: {
          type: DataTypes.INTEGER,
          field: 'fkAddressStatus',
        },
        fkAddressType: {
          type: DataTypes.INTEGER,
          field: 'fkAddressType',
        },
        fkCity: {
          type: DataTypes.INTEGER,
          field: 'fkCity',
        },
        fkState: {
          type: DataTypes.INTEGER,
          field: 'fkState',
        },
        name: {
          type: DataTypes.STRING,
          field: 'name',
        },
        address: {
          type: DataTypes.STRING,
          field: 'address',
        },
        addressNumber: {
          type: DataTypes.STRING,
          field: 'addressNumber',
        },
        neighborhood: {
          type: DataTypes.STRING,
          field: 'neighborhood',
        },
        addressPostalCode: {
          type: DataTypes.STRING,
          field: 'addressPostalCode',
        },
        reference: {
          type: DataTypes.STRING,
          field: 'reference',
        },
        complement: {
          type: DataTypes.STRING,
          field: 'complement',
        },
        latitude: {
          type: DataTypes.FLOAT,
          field: 'latitude',
        },
        longitude: {
          type: DataTypes.FLOAT,
          field: 'longitude',
        },
        checked: {
          type: DataTypes.TINYINT,
          field: 'checked',
        },
        deletedAt: {
          type: DataTypes.DATE,
          defaultValue: null,
        },
        createdAt: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
        updatedAt: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
      },
      {
        sequelize,
        tableName: 'AddressCad',
        modelName: 'AddressCad',
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.AddressStatus, {
      foreignKey: 'fkAddressStatus',
    });
  }

  static associate(models) {
    this.belongsTo(models.AddressType, {
      foreignKey: 'fkAddressType',
    });
  }

  static associate(models) {
    this.belongsTo(models.AddressCity, {
      foreignKey: 'fkCity',
    });
  }
}

export default AddressCad;
