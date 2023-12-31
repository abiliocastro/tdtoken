import express from "express"
import accountRoutes from './src/Routes/Account.js'
import chatRoutes from './src/Routes/Chat.js'
import session from "express-session";
import MongoStore from "connect-mongo";
import dotenv from 'dotenv';
dotenv.config();

const app = express()
const defaultPort = 3000

const mongoUri = `mongodb+srv://tdtoken:${process.env.MONGO_PASS}@tdtokencluster.irszsrs.mongodb.net/?retryWrites=true&w=majority`;

var sess = {
    secret: 'super secret my bro',
    store: MongoStore.create({
        mongoUrl: mongoUri,
        dbName: 'tdtoken',
        collectionName: 'Sessions'    
    }),
    resave: false,
    saveUninitialized: false,
    path: '/',
    cookie: {
        httpOnly: true,
        maxAge: 1000 * 3600 * 24
    }
}
  
if (app.get('env') === 'production') {
    app.set('trust proxy', 1) // trust first proxy
    sess.cookie.sameSite = 'none';
    sess.cookie.secure = true; // serve secure cookies
}

app.use(session(sess));
app.use(express.json());
app.use(accountRoutes);
app.use(chatRoutes);

const port = process.env.PORT || defaultPort;

app.listen(port, () => {
    console.log(`Application running on port: ${port}`);
})

export default app