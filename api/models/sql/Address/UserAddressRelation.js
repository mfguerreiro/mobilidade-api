import { Model, DataTypes } from 'sequelize';

class UserAddressRelation extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          primaryKey: true,
          type: DataTypes.INTEGER,
          field: 'idUserAddressRelation',
          autoIncrement: true,
        },
        fkUser: {
          type: DataTypes.INTEGER,
          field: 'fkUser',
        },
        fkAddress: {
          type: DataTypes.INTEGER,
          field: 'fkAddress',
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
        tableName: 'UserAddressRelation',
        modelName: 'UserAddressRelation',
      }
    );
    return this;
  }
  static associate(models) {
    this.belongsTo(models.UserCad, {
      foreignKey: 'fkUser',
    });
  }

  static associate(models) {
    this.belongsTo(models.AddressCad, {
      foreignKey: 'fkAddress',
    });
  }
}

export default UserAddressRelation;
