import { Model, DataTypes } from 'sequelize';

class UserStatus extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          primaryKey: true,
          type: DataTypes.INTEGER,
          field: 'idUserStatus',
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
        tableName: 'UserStatus',
        modelName: 'UserStatus',
      }
    );
    return this;
  }

  static associate(models) {
    this.hasMany(models.UserStatus, {
      foreignKey: 'fkUserStatus',
    });
  }
}

export default UserStatus;
