import { Model, DataTypes } from 'sequelize';

class Qualification extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          primaryKey: true,
          type: DataTypes.INTEGER,
          field: 'idQualification',
          autoIncrement: true,
        },
        fkQualificationType: {
          type: DataTypes.INTEGER,
          field: 'fkQualificationType',
        },
        level: {
          type: DataTypes.INTEGER,
          field: 'fkQualificationLevel',
        },        
        fkUser: {
          type: DataTypes.INTEGER,
          field: 'fkUser',
        },
        title: {
          type: DataTypes.STRING,
          field: 'title',
        },
        institution: {
          type: DataTypes.STRING,
          field: 'institution',
        },
        description: {
          type: DataTypes.STRING,
          field: 'description',
        },
        initialDate: {
          type: DataTypes.DATE,
          field: 'initialDate',
        },
        finalDate: {
          type: DataTypes.DATE,
          field: 'finalDate',
        },
      },
      {
        sequelize,
        tableName: 'Qualification',
        modelName: 'Qualification',
      }
    );
    return this;
  }
}

export default Qualification;
