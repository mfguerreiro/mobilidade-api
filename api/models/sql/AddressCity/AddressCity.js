import { Model, DataTypes } from 'sequelize';

class AddressCity extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          primaryKey: true,
          type: DataTypes.INTEGER,
          field: 'idCity',
          autoIncrement: true,
        },
        city: {
          type: DataTypes.STRING,
          field: 'city',
        },
        cityUpperCase: {
          type: DataTypes.STRING,
          field: 'cityUpperCase',
        },
        ddd: {
          type: DataTypes.INTEGER,
          field: 'ddd',
        },
        latitude: {
          type: DataTypes.DOUBLE,
          field: 'latitude',
        },
        longitude: {
          type: DataTypes.DOUBLE,
          field: 'longitude',
        },
        fkState: {
          type: DataTypes.BIGINT,
          field: 'fkState',
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
        tableName: 'AddressCity',
        modelName: 'AddressCity',
      }
    );
    return this;
  }

  //associate
}

export default AddressCity;
