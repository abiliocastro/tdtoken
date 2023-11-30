import { Router } from 'express';
import { CreateAccountController } from '../Controller/CreateAccountController.js';
import { GetBalanceController } from '../Controller/GetBalanceController.js';
import { UserController } from '../Controller/UserController.js';
import cors from 'cors';
import corsOptions from '../Configuration/CorsConfig.js';

const account = Router();

account.use(cors(corsOptions))

const createAccountController = new CreateAccountController();
const getBalanceController = new GetBalanceController();
const userController = new UserController();

account.post('/createAccount', (request, response) => {
    createAccountController.handle(request, response)
})

account.post('/user', (request, response) => {
    userController.handleUser(request, response)
})

account.post('/user/find', (request, response) => {
    userController.getUser(request, response)
})

account.get('/balance/:key', (request, response) => {
    getBalanceController.handle(request, response)
})

export default account