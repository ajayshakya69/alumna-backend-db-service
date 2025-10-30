import {
  Model,
  DataTypes,
  Sequelize,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';

export class CollegeModel extends Model<
  InferAttributes<CollegeModel>,
  InferCreationAttributes<CollegeModel>
> {
  declare id: CreationOptional<string>;
  declare college_type?: string;
  declare college_name?: string;
  declare short_name?: string;
  declare phone_number?: string;
  declare alt_phone_number?: string;
  declare email?: string;
  declare affiliated_by?: object[]; // array of objects
  declare college_or_university_type?: object[]; // array of objects
  declare established_year?: string;
  declare logo?: string;
  declare logo_compressed?: string;
  declare featured_image?: string;
  declare featured_image_compressed?: string;
  declare status?: string;
  declare readonly createdAt?: Date;
  declare readonly updatedAt?: Date;

  static setup(sequelize: Sequelize) {
    CollegeModel.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        college_type: { type: DataTypes.STRING, allowNull: true },
        college_name: { type: DataTypes.STRING, allowNull: true },
        short_name: { type: DataTypes.STRING, allowNull: true },
        phone_number: { type: DataTypes.STRING, allowNull: true },
        alt_phone_number: { type: DataTypes.STRING, allowNull: true },
        email: { type: DataTypes.STRING, allowNull: true },
        affiliated_by: { type: DataTypes.JSONB, allowNull: true },
        college_or_university_type: { type: DataTypes.JSONB, allowNull: true },
        established_year: { type: DataTypes.STRING, allowNull: true },
        logo: { type: DataTypes.STRING, allowNull: true },
        logo_compressed: { type: DataTypes.STRING, allowNull: true },
        featured_image: { type: DataTypes.STRING, allowNull: true },
        featured_image_compressed: { type: DataTypes.STRING, allowNull: true },
        status: { type: DataTypes.STRING, allowNull: true },
      },
      {
        sequelize,
        tableName: 'colleges',
        modelName: 'college',
        timestamps: true,
      },
    );

    return CollegeModel;
  }
}
