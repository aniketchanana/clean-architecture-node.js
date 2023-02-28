import express from "express";
import cookieParser from "cookie-parser";
import "./data/mongo/init";
const server = express();
server.use(cookieParser());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
import "reflect-metadata";

export default server;
