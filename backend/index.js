import express from "express"
import accountRoutes from './src/Routes/Account.js'
import cors from 'cors';

const app = express()
const port = 3000

var corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

app.use(express.json());
app.use(accountRoutes);
app.use(cors(corsOptions));

app.listen(port, () => {
    console.log("Application running")
})

export default app