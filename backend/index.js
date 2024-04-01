import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/products.js";
import cookieParser from "cookie-parser";
const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());
app.use(cookieParser());

app.use(express.static("upload"));

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`SERVER RUNNING ON PORT ${PORT}`);
});
