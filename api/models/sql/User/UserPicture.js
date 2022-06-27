import { Model, DataTypes } from 'sequelize';

class UserPicture extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          primaryKey: true,
          type: DataTypes.INTEGER,
          field: 'idUserPicture',
          autoIncrement: true,
        },
        picture: {
          type: DataTypes.STRING,
          field: 'picture',
        },
        fkUser: {
          type: DataTypes.INTEGER,
          field: 'fkUser',
        },
        type: {
          type: DataTypes.INTEGER,
          field: 'fkUserPictureType',
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
        tableName: 'UserPicture',
        modelName: 'UserPicture',
      }
    );
    return this;
  }

  static associate(models) {
    this.hasMany(models.UserCad, {
      foreignKey: 'fkUser',
    });    
  }
}

export default UserPicture;
