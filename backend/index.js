import express from "express"
import accountRoutes from './src/Routes/Account.js'
import chatRoutes from './src/Routes/Chat.js'

const app = express()
const defaultPort = 3000

app.use(express.json());
app.use(accountRoutes);
app.use(chatRoutes);

const port = process.env.PORT || defaultPort;

app.listen(port, () => {
    console.log(`Application running on port: ${port}`);
})

export default app