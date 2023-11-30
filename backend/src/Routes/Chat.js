import { Router } from 'express';
import { ChatController } from '../Controller/ChatController.js';
import cors from 'cors';
import corsOptions from '../Configuration/CorsConfig.js';

const chat = Router();

chat.use(cors(corsOptions))

const chatController = new ChatController();

chat.post('/chat/question', (request, response) => {
    chatController.handle(request, response)
})

export default chat;