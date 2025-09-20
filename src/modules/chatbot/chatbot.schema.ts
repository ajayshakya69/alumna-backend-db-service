import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
  Sequelize,
} from 'sequelize';

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
        title: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        description: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        lastMessage: {
          type: DataTypes.TEXT,
          allowNull: true,
        },

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
          primaryKey: true,
          autoIncrement: true,
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
          allowNull: false,
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
