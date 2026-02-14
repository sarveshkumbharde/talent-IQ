import express from 'express'
import { ENV } from './lib/env.js';
import path from 'path';

const app = express();

const PORT = process.env.PORT || 3000;

const __dirname = path.resolve();

app.get('/', (req, res)=>{
    res.status(200).json({message:"success"})
})

app.get('/health', (req, res)=>{
    res.status(200).json({message: "api is running fine"})
})

app.get('/books', (req, res)=>{
    res.status(200).json({message: "books end point"})
})

if(ENV.NODE_ENV=='production'){
    app.use(express.static(path.join(__dirname,"../frontend/dist")))

    app.get("/{*any}", (req,res)=>{
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    })
}

app.listen(ENV.PORT, ()=>console.log("Server is running on port 3000"))