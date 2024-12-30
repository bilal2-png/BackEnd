import express from "express";
import cors from 'cors'
import CookieParser from "cookieparser";

const app = express();
// Basic CONFIG Work Here
// cors ki configaration , origin means kay kis frontend saay talking karni hay. iss a url do  process.env.CORS_ORIGIN maay.
app.use(cors({
    origin: process.env.CORS_ORIGIN, 
    Credential: true,
    optionsSuccessStatus: 200
}))

// cookie parser configuration. no need of additional key-value configuration data
app.use(CookieParser())

//Json ki limit lagani ha itni hi aaiy
app.use(express.json({ limit:'16kb' }))

//Url ki limit and syntax config
app.use(express.urlencoded({ extended: true, limit:'16kb' }))

// files store karvanay ka liay public folder or uploads folder (kay indar) use kar saktaay haay
// app.use(express.static('uploads'))
app.use(express.static('public'))

export { app }