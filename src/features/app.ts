import express, { urlencoded } from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
dotenv.config();
import userRoutes from './users/routes/user.route';

const app = express();

app.use(bodyParser.json());
app.use(express.json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/api/users",userRoutes);
app.use("*", (req, res) => {
  res
    .status(404)
    .send({ message: "Resource URL not found", success: false, data: null });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || "", {
  }).then(() => {
    console.log('Connected to MongoDB');
  }).catch((error) => {
    console.error('Error connecting to MongoDB', error);
  });

export default app;