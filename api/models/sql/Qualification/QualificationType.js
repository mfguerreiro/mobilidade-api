import { Model, DataTypes } from 'sequelize';

class QualificationType extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          primaryKey: true,
          type: DataTypes.INTEGER,
          field: 'idQualificationType',
          autoIncrement: true,
        },
        qualificationType: {
          type: DataTypes.INTEGER,
          field: 'qualificationType',
        },
      },
      {
        sequelize,
        tableName: 'QualificationType',
        modelName: 'QualificationType',
      }
    );
    return this;
  }
}

export default QualificationType;
