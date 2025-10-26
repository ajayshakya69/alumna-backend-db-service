import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ChatbotService } from './chatbot.service';
import { ChatIdDto, SendMessageDTO } from './chatbot.dto';

@Controller('chat')
export class ChatbotController {
  constructor(private readonly chatService: ChatbotService) {}

  @Post('conversation')
  async sendMessage(@Body() body: SendMessageDTO) {
    let chatId = body.chatId;

    if (!chatId) {
      let chatRoom = await this.chatService.createChatRoom({
        user: body.userId,
      });

      chatId = chatRoom.id;
    } else {
      await this.chatService.findChatRoomById(chatId);
    }

    return this.chatService.sendMessage({
      chatId,
      sender: body.userId,
      message: body.message,
    });
  }

  @Get('rooms')
  async getAllChatRoomsOfUser(@Query('userId') userId: string) {
    return this.chatService.getAllChatRoomsOfUser(userId);
  }

  @Delete('rooms')
  async deleteChatRoom(@Query('room_id') roomId: string) {
    return this.chatService.deleteChatRoom(roomId);
  }

  @Get('messages')
  async getChatMessages(@Query('chatId') chatId?: string) {
    if (!chatId) throw new BadRequestException('Chat Id is required');
    return await this.chatService.findMessagesByChatId(chatId);
  }
}
