import  express  from "express";
import bodyParser from "body-parser";
import {auth} from "./Routes/index.js";
import { bookdata } from "./Routes/Books.js";

const app = express()


app.use(bodyParser.json())
app.use('/auth', auth);
app.use('/bookdata', bookdata)

app.listen(4500 , ()=>{
    console.log("server started")
})