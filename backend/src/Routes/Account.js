import { Router } from 'express';
import { CreateAccountController } from '../Controller/CreateAccountController.js';
import { GetBalanceController } from '../Controller/GetBalanceController.js';

const account = Router();

const createAccountController = new CreateAccountController();
const getBalanceController = new GetBalanceController();

account.post('/createAccount', (request, response) => {
    createAccountController.handle(request, response)
})

account.get('/balance/:key', (request, response) => {
    getBalanceController.handle(request, response)
})

export default account