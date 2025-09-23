// src/core/services/db-service/db.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { Chat, ChatRoom, Recommendation } from './chatbot.schema';
import axios from 'axios';
import { SenderType } from './chatbot.dto';

@Injectable()
export class ChatbotService {
  // expose models
  readonly ChatModel = Chat;
  readonly ChatRoomModel = ChatRoom;
  readonly RecommendationModel = Recommendation;

  /* -------------------- ChatRoom Operations -------------------- */
  async findChatRoomById(id: string) {
    const data = await this.ChatRoomModel.findOne({ where: { id } });
    if (!data) throw new NotFoundException('Chat room does not exists');
    return data?.dataValues;
  }

  async createChatRoom(data: {
    user: string;
    title?: string;
    description?: string;
  }) {
    return this.ChatRoomModel.create(data);
  }

  async updateChatRoom(
    id: string,
    data: Partial<{ title: string; description: string; feedback: any }>,
  ) {
    this.ChatRoomModel.update(data, { where: { id } });
  }

  async deleteChatRoom(id: string) {
    return this.ChatRoomModel.destroy({ where: { id } });
  }

  async getAllChatRoomsOfUser(userId: string) {
    return this.ChatRoomModel.findAll({
      where: { user: userId },
      order: [['updatedAt', 'DESC']],
    });
  }

  /* -------------------- Chat Operations -------------------- */
  async sendMessage(data: {
    chatId: string;
    sender: string;
    message: string;
    isTimeout?: boolean;
  }) {
    // Save user message

    const userMessage = await this.ChatModel.create(data);

    // Don't call ML for BOT messages (avoid loops)
    if (data.sender !== SenderType.BOT) {
      try {
        const mlResponse = await axios.post(
          `${process.env.ML_MODEL_URL}/chat?chat_id=${data.chatId}`,
          { message: data.message },
        );

        const checkTitle = await this.findChatRoomById(data.chatId);

        if (!checkTitle.title) {
          this.updateChatRoom(data.chatId, {
            title: mlResponse.data?.conversation_title,
          });
        }

        const botMessage = await this.ChatModel.create({
          chatId: data.chatId,
          sender: SenderType.BOT,
          message: mlResponse.data?.response || '...',
        });

        let recommendations = mlResponse.data?.recommendations;

        // Save recommendations if present
        if (Array.isArray(recommendations) && recommendations.length > 0) {
          const recsToCreate = recommendations.map((rec) => ({
            ...rec,
            messageId: botMessage.id,
            id: undefined,
          }));

          recommendations =
            await this.RecommendationModel.bulkCreate(recsToCreate);
        }

        return { ...botMessage.dataValues, recommendations };
      } catch (error) {
        console.error('Error calling ML API or saving recommendations:', error);
      }

      return userMessage;
    }
  }

  async findMessagesByChatId(chatId: string) {
    return this.ChatModel.findAll({
      where: { chatId },
      order: [['createdAt', 'asc']],
      include: [
        {
          model: this.RecommendationModel,
          as: 'recommendations',
        },
      ],
    });
  }

  async updateMessage(
    id: string,
    data: Partial<{ message: string; isTimeout: boolean }>,
  ) {
    return this.ChatModel.update(data, { where: { id } });
  }

  async deleteMessagesByChatId(chatId: string) {
    return this.ChatModel.destroy({ where: { chatId } });
  }
}
