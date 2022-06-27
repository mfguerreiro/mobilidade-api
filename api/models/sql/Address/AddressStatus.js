import { Model, DataTypes } from 'sequelize';

class AddressStatus extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          primaryKey: true,
          type: DataTypes.INTEGER,
          field: 'idAddressStatus',
          autoIncrement: true,
        },
        status: {
          type: DataTypes.STRING,
          field: 'status',
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
        tableName: 'AddressStatus',
        modelName: 'AddressStatus',
      }
    );
    return this;
  }

  static associate(models) {
    this.hasMany(models.AddressStatus, {
      foreignKey: 'fkAddressStatus',
    });
  }
}

export default AddressStatus;
