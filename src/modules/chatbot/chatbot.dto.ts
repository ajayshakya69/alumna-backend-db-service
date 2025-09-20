import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';

export enum SenderType {
  USER = 'USER',
  BOT = 'BOT',
}
export class CreateChatRoomDto {
  @ApiPropertyOptional({
    description: 'Title of the chat room',
    example: 'General Discussion',
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({
    description: 'Description of the chat room',
    example: 'A room to discuss general topics.',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'User who created the chat room',
    example: 'john_doe',
  })
  @IsNotEmpty()
  @IsString()
  user: string;
}

export class UpdateChatRoomDto {
  @ApiPropertyOptional({
    description: 'Title of the chat room',
    example: 'Tech Talk',
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({
    description: 'Description of the chat room',
    example: 'Discuss the latest in tech and gadgets.',
  })
  @IsOptional()
  @IsString()
  description?: string;
}

export class CreateChatDto {
  @ApiProperty({
    description: 'ID of the chat room',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsUUID()
  @IsNotEmpty()
  chatId: string;

  @ApiProperty({
    description: 'Sender of the message',
    example: 'alice',
  })
  @IsString()
  @IsNotEmpty()
  sender: string;

  @ApiProperty({
    description: 'Message content',
    example: 'Hello everyone! 👋',
  })
  @IsString()
  @IsNotEmpty()
  message: string;

  @ApiPropertyOptional({
    description: 'Is the chat timed out?',
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  isTimeout?: boolean;
}

export class UpdateChatDto {
  @ApiPropertyOptional({
    description: 'Message content',
    example: 'Updated message content',
  })
  @IsOptional()
  @IsString()
  message?: string;

  @ApiPropertyOptional({
    description: 'Is the chat timed out?',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  isTimeout?: boolean;
}

export class MessageDto {
  @ApiProperty({
    description: 'The content of the message.',
    example: 'Hello, world!',
  })
  @IsString()
  message: string;

  @ApiProperty({
    description: 'The unique identifier for the message.',
    example: 'b2d9b7f7-cb0b-4a7c-b346-b77a99d7a413',
  })
  @IsString()
  id: string;

  @ApiProperty({
    description: 'The sender of the message.',
    example: 'user',
    enum: SenderType,
  })
  @IsEnum(SenderType)
  sender: SenderType;

  @ApiProperty({
    description: 'The timestamp when the message was created.',
    example: '2025-05-27T10:30:00.000Z',
  })
  @IsString()
  createdAt: string;
}

export class SendMessageDTO {
  @ApiProperty({
    description: 'Message content',
    example: 'Hello world',
  })
  @IsString()
  message: string;

  @ApiProperty({
    description: 'User ID of the one creating the message',
  })
  @IsString()
  userId: string;

  @ApiPropertyOptional({ description: 'Optional chat ID' })
  @IsOptional()
  @IsString()
  chatId?: string;
}

export class ChatIdDto {
  @ApiPropertyOptional({ description: 'Optional chat ID' })
  @IsString()
  chat_id: string;
}

export class UserIdDto {
  @IsString()
  user_id: string;
}
