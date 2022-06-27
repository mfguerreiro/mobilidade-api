import { Model, DataTypes } from 'sequelize';

class UserCad extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          primaryKey: true,
          type: DataTypes.INTEGER,
          field: 'idUser',
          autoIncrement: true,
        },
        nick: {
          type: DataTypes.STRING,
          field: 'nick',
        },
        email: {
          type: DataTypes.STRING,
          field: 'email',
        },
        fullName: {
          type: DataTypes.STRING,
          field: 'fullName',
        },
        passwordHash: {
          type: DataTypes.STRING,
          field: 'passwordHash',
        },
        fkUserStatus: {
          type: DataTypes.INTEGER,
          field: 'fkUserStatus',
        },
        phone: {
          type: DataTypes.STRING,
          field: 'phone',
        },
        mobile: {
          type: DataTypes.STRING,
          field: 'mobile',
        },
        birthDate: {
          type: DataTypes.DATE,
          field: 'birthDate',
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
        tableName: 'UserCad',
        modelName: 'UserCad',
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.UserStatus, {
      foreignKey: 'fkUserStatus',
    });
    this.belongsTo(models.UserPicture, {
      foreignKey: 'fkUser',
    });
    this.hasMany(models.Company, {
      foreignKey: 'idUser',
    });
  }
}

export default UserCad;
