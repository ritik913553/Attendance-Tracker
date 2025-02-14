import express from 'express';
import cors from 'cors'
import cookieParser from 'cookie-parser'
import passport from './middlewares/passport.middleware.js';
import session from 'express-session'
const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true,limit:"16kb"})); 
app.use(express.static("public"))
app.use(cookieParser());
app.use(
    session({
      secret: "isdfhnoifjnoi3294832",
      resave: false,
      saveUninitialized: false,
    })
  );
app.use(passport.initialize());
app.use(passport.session());

// routes import
import userRouter from './routes/user.routes.js'
import authRouter from './routes/auth.routes.js'

// routes declaration
app.use('/api/v1/users',userRouter)
app.use('/api/v1/auth',authRouter)

//error handler



export {app}