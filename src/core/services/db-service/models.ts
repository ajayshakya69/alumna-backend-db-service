import {
  Chat,
  ChatRoom,
  Recommendation,
} from 'src/modules/chatbot/chatbot.schema';

export const MONGOOSE_MODELS = {};

export const SQL_MODELS = {
  ChatRoomModel: ChatRoom.setup,
  ChatModel: Chat.setup,
  RecommendationModel: Recommendation.setup,
};
