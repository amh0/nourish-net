import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/products.js";
import donationRoutes from "./routes/donations.js";
const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static("upload"));

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/donation", donationRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`SERVER RUNNING ON PORT ${PORT}`);
});
