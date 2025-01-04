import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import bookRoute from './routes/bookRoute.js'
import cors from 'cors'

const app = express();

app.use(express.json());

// Middleware for parsing request body

// option 1 : Allow all origin with default cors(*)
app.use(cors());

// Option 2 : Allow custom origins

// app.use(
//   cors({
//     origin: 'http//localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
//   })
// )

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("book store");
});

app.use('/books', bookRoute)

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("app is connected to database ");

    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })

  .catch((error) => {
    console.log(error);
  });
