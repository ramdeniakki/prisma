// import { PrismaClient } from "@prisma/client";
// import bcrypt from "bcrypt";
// import express from "express";

// const client = new PrismaClient();
// const app = express();

// // Middleware to parse JSON body
// app.use(express.json());

// async function CreateClient() {
//     try {
//         // Hash the password before saving
//         const hashedPassword = await bcrypt.hash("123456", 10);

//         // Create a new user
//         // const newUser = await client.user.create({
//         //     data: {
//         //         username: "Akki",
//         //         password: hashedPassword,
//         //         age: 21,
//         //         city: "Mancherial",
//         //     },
//         // });
//         // console.log("User Created:", newUser);

//         // Find the first user with id 2 (replace with dynamic input as needed)
//         const user = await client.user.findFirst({
//             where: {
//                 id: 2,
//             },
//             select: {
//                 username: true, // Select specific fields
//                 city: true,
//             },
//         });

//         console.log("User Found:", user);
//     } catch (error) {
//         console.error("Error in CreateClient:", error);
//     }
// }

// (async () => {
//     await CreateClient();
//     app.listen(3000, () => {
//         console.log("Server is running on http://localhost:3000");
//     });
// })();



import { PrismaClient } from '@prisma/client';
import express from 'express';
const app = express();
const client = new PrismaClient();
app.get("/",async(req,res)=>{
    const users = await client.user.findMany();
    res.json({
        users
    })
})

app.get('/id:id',async(req,res)=>{
    const id = req.params.id;
    const user = await client.user.findFirst({
        where: {
            id:parseInt(id)
        },
        select:{
            todos:true,
            username:true,
            password:true
        }
    })
    res.json({
        user
    })
})
app.listen(3000)