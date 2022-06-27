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
        fkCountry: {
          type: DataTypes.INTEGER,
          field: 'fkCountry',
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

  static associate(models) {
    this.belongsTo(models.AddressCountry, {
      foreignKey: 'fkCountry',
    });
  }
}

export default AddressState;
