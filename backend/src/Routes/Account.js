import { Router } from 'express';
import { CreateAccountController } from '../Controller/CreateAccountController.js';
import { GetBalanceController } from '../Controller/GetBalanceController.js';
import { UserController } from '../Controller/UserController.js';

const account = Router();

const createAccountController = new CreateAccountController();
const getBalanceController = new GetBalanceController();
const userController = new UserController();

account.post('/createAccount', (request, response) => {
    createAccountController.handle(request, response)
})

account.post('/user', (request, response) => {
    userController.handleUser(request, response)
})

account.get('/balance/:key', (request, response) => {
    getBalanceController.handle(request, response)
})

export default account