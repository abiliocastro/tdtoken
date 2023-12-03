import express from "express"
import accountRoutes from './src/Routes/Account.js'
import chatRoutes from './src/Routes/Chat.js'
import session from "express-session";

const app = express()
const defaultPort = 3000

var sess = {
    secret: 'super secret my bro',
    resave: false,
    saveUninitialized: false,
    path: '/',
    cookie: {
        sameSite: "none",
        maxAge: 1000 * 3600 * 24
    }
}
  
if (app.get('env') === 'production') {
    app.set('trust proxy', 1) // trust first proxy
    sess.cookie.secure = true // serve secure cookies
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