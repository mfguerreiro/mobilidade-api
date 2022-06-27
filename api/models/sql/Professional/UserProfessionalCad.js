import { Model, DataTypes } from 'sequelize';

class UserProfessionalCad extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          primaryKey: true,
          type: DataTypes.INTEGER,
          field: 'idUserProfessional',
          autoIncrement: true,
        },
        document: {
          type: DataTypes.STRING,
          field: 'document',
        },
        fkUser: {
          type: DataTypes.INTEGER,
          field: 'fkUser',
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
        tableName: 'UserProfessionalCad',
        modelName: 'UserProfessionalCad',
      }
    );
    return this;
  }

  static associate(models) {
    this.hasOne(models.UserCad, {
      foreignKey: 'idUser',
    });
  }
}

export default UserProfessionalCad;
