import { Router } from 'express';
import { CreateAccountController } from '../Controller/CreateAccountController.js';
import { GetBalanceController } from '../Controller/GetBalanceController.js';
import { UserController } from '../Controller/UserController.js';
import { TransactionController } from '../Controller/TransactionController.js';
import authenticated from '../Configuration/Auth.js';
import cors from 'cors';
import corsOptions from '../Configuration/CorsConfig.js';

const account = Router();

account.use(cors(corsOptions));

const createAccountController = new CreateAccountController();
const getBalanceController = new GetBalanceController();
const userController = new UserController();
const transactionController = new TransactionController();

account.post('/createAccount', (request, response) => {
    createAccountController.handle(request, response)
});

account.post('/login', (request, response) => {
    userController.login(request, response)
});

account.post('/user', (request, response) => {
    userController.handleUser(request, response)
});

account.post('/user/find', (request, response) => {
    userController.getUser(request, response)
});

account.post('/user/load', authenticated, (request, response) => {
    userController.loadUserData(request, response)
});

account.get('/balance/:key', authenticated, (request, response) => {
    getBalanceController.handle(request, response)
});

account.post('/sendTransaction', authenticated, (request, response) => {
    transactionController.handle(request, response)
});

export default account