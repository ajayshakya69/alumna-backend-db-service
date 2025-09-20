// chatbot.schema.ts
import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
  Sequelize,
} from 'sequelize';

// ChatRoom Model
export class ChatRoom extends Model<
  InferAttributes<ChatRoom>,
  InferCreationAttributes<ChatRoom>
> {
  declare id: CreationOptional<string>;
  declare title?: string;
  declare description?: string;
  declare user: string;
  declare lastMessage?: string;
  declare readonly createdAt?: CreationOptional<Date>;
  declare readonly updatedAt?: CreationOptional<Date>;

  static setup(sequelize: Sequelize) {
    ChatRoom.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        lastMessage: DataTypes.TEXT,
        user: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'chat_rooms',
        modelName: 'chatRoom',
        timestamps: true,
      },
    );
    return ChatRoom;
  }
}

// Chat Model
export class Chat extends Model<
  InferAttributes<Chat>,
  InferCreationAttributes<Chat>
> {
  declare id: CreationOptional<number>;
  declare chatId: string;
  declare sender: string;
  declare message: string;
  declare isTimeout?: CreationOptional<boolean>;
  declare readonly createdAt?: CreationOptional<Date>;
  declare readonly updatedAt?: CreationOptional<Date>;

  static setup(sequelize: Sequelize) {
    Chat.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        chatId: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: 'chat_rooms',
            key: 'id',
          },
          onDelete: 'CASCADE',
        },
        sender: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        message: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        isTimeout: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
      },
      {
        sequelize,
        tableName: 'chats',
        modelName: 'chat',
        timestamps: true,
      },
    );
    return Chat;
  }
}

// Recommendation Model
export class Recommendation extends Model<
  InferAttributes<Recommendation>,
  InferCreationAttributes<Recommendation>
> {
  declare id: CreationOptional<number>;
  declare chatId: number;
  declare name: string;
  declare location: string;
  declare type: string;
  declare courses_offered: string;
  declare website: string;
  declare admission_process: string;
  declare approximate_fees: string;
  declare notable_features: string;
  declare source: string;
  declare readonly createdAt?: CreationOptional<Date>;
  declare readonly updatedAt?: CreationOptional<Date>;

  static setup(sequelize: Sequelize) {
    Recommendation.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        chatId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'chats',
            key: 'id',
          },
          onDelete: 'CASCADE',
        },
        name: DataTypes.STRING,
        location: DataTypes.STRING,
        type: DataTypes.STRING,
        courses_offered: DataTypes.TEXT,
        website: DataTypes.STRING,
        admission_process: DataTypes.TEXT,
        approximate_fees: DataTypes.STRING,
        notable_features: DataTypes.TEXT,
        source: DataTypes.STRING,
      },
      {
        sequelize,
        tableName: 'recommendations',
        modelName: 'recommendation',
        timestamps: true,
      },
    );
    return Recommendation;
  }
}

// chatbot.schema.ts
export function setupAssociations() {
  Chat.hasMany(Recommendation, {
    foreignKey: 'chatId',
    as: 'recommendations',
  });

  Recommendation.belongsTo(Chat, {
    foreignKey: 'chatId',
    as: 'chat',
  });
}
