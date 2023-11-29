import { Router } from 'express';
import { CreateAccountController } from '../Controller/CreateAccountController.js';
import { GetBalanceController } from '../Controller/GetBalanceController.js';
import { UserController } from '../Controller/UserController.js';
import cors from 'cors';

const account = Router();

const corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

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