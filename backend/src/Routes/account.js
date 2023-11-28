import { Router } from 'express';
import { CreateAccountController } from '../Controller/CreateAccountController.js';
import { GetBallanceController } from '../Controller/GetBallanceController.js';

const account = Router();

const createAccountController = new CreateAccountController();
const getBallanceController = new GetBallanceController();

account.post('/createAccount', (request, response) => {
    createAccountController.handle(request, response)
})

account.get('/getBallance/:walletHash', (request, response) => {
    getBallanceController.handle(request, response)
})

export default account