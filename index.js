import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import orderRouter from "./routes/orderRouter.js";
import productRouter from "./routes/productRouter.js";
import userRouter from "./routes/userRouter.js";
dotenv.config();
// This is the main entry point of the application


const app = express();

// Middleware to parse incoming JSON requests
// This middleware allows the server to understand JSON data sent in requests
app.use(cors())
app.use(bodyParser.json());

app.use((req, res, next) => {
  const tokenString = req.headers["authorization"];  //

  if (tokenString != null) {
    const token = tokenString.replace("Bearer ", ""); 
    
    jwt.verify(token, process.env.JWT_KEY , (err, decoded) => {
      if (decoded != null) {
        req.user = decoded;
        next();
      } else {
        console.log("invalid token");
        res.status(403).json({
          message: "Invalid token",
        });
      }
    });

  } else {
    next();
  }
});




mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB");
    console.error(err);
    
  });

app.use("/api/product", productRouter);
app.use("/api/user", userRouter);
app.use("/api/order", orderRouter);


app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
