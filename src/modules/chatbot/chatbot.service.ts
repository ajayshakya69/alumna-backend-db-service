// src/core/services/db-service/db.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { Chat, ChatRoom } from './chatbot.schema';
import axios from 'axios';
import { SenderType } from './chatbot.dto';

@Injectable()
export class ChatbotService {
  // expose models
  readonly ChatModel = Chat;
  readonly ChatRoomModel = ChatRoom;

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
    return this.ChatRoomModel.update(data, { where: { id } });
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
    // Save user's message
    const userMessage = await this.ChatModel.create(data);

    // If the sender is not the AI (to avoid loops), get AI response
    if (data.sender !== SenderType.BOT) {
      try {
        const mlResponse = await axios.post(
          `${process.env.ML_MODEL_URL}/chat?chat_id=${data.chatId}`,
          { message: data.message },
        );
        console.log(mlResponse.data);
        const aiMessage = await this.ChatModel.create({
          chatId: data.chatId,
          sender: SenderType.BOT,
          message: mlResponse.data?.response,
        });
        return aiMessage;
      } catch (error) {
        console.error('Error calling ML API:', error);
      }
    }
  }

  async findMessagesByChatId(chatId: string) {
    return this.ChatModel.findAll({
      where: { chatId },
      order: [['createdAt', 'asc']],
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
