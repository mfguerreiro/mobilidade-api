import { Model, DataTypes } from 'sequelize';

class AddressType extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          primaryKey: true,
          type: DataTypes.INTEGER,
          field: 'idAddressType',
          autoIncrement: true,
        },
        type: {
          type: DataTypes.STRING,
          field: 'type',
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
        tableName: 'AddressType',
        modelName: 'AddressType',
      }
    );
    return this;
  }

  static associate(models) {
    this.hasMany(models.AddressType, {
      foreignKey: 'fkAddressType',
    });
  }
}

export default AddressType;
