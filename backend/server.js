import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import matchRoute from './routes/matchRoutes.js';

const app = express();

app.use(
  cors({
    origin: "https://stone-paper-scissors-olive-ten.vercel.app",
    credentials: true
  })
);
app.use(express.json());

app.use('/api/matches', matchRoute);

// DATABASE
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("MongoDB Connected");
})
.catch((err) => {
  console.log(err);
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});