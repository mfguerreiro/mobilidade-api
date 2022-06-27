import { Model, DataTypes } from 'sequelize';

class AddressState extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          primaryKey: true,
          type: DataTypes.INTEGER,
          field: 'idState',
          autoIncrement: true,
        },
        state: {
          type: DataTypes.STRING,
          field: 'state',
        },
        stateCode: {
          type: DataTypes.STRING,
          field: 'stateCode',
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
        tableName: 'AddressState',
        modelName: 'AddressState',
      }
    );
    return this;
  }

  //associate
}

export default AddressState;
