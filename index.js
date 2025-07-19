import express from 'express';
import "dotenv/config"
import connection from './db.js';
import router from './router.js';
const app=express();
app.use(express.json());
connection()
app.use(router)
app.listen(3000,()=>{
    console.log("server started at port 3000");
})