"use strict";
// import { PrismaClient } from "@prisma/client";
// import bcrypt from "bcrypt";
// import express from "express";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const client = new client_1.PrismaClient();
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield client.user.findMany();
    res.json({
        users
    });
}));
app.get('/id:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const user = yield client.user.findFirst({
        where: {
            id: parseInt(id)
        },
        select: {
            todos: true,
            username: true,
            password: true
        }
    });
    res.json({
        user
    });
}));
app.listen(3000);
