import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import employeeRoutes from "./route/employeeRoute.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import pool, { initDb } from "./model/employeeModel.js";
const app = express();
const PORT = process.env.PORT || 5000;
// const MYSQL_HOST = process.env.MYSQL_HOST || 'localhost';
// const MYSQL_PORT = Number(process.env.MYSQL_PORT || 3306);
// const MYSQL_USER = process.env.MYSQL_USER || 'root';
// const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD || '';
// const MYSQL_DATABASE = process.env.MYSQL_DATABASE || 'employee_management';

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/api/employees", employeeRoutes);

app.get("/", (req, res) => {
  res.send("Employee Management System API is running...");
});

const start = async () => {
  try {
    await initDb();
    console.log('MySQL connected');
    app.listen(PORT, () => console.log(`Server port ${PORT}`));
  } catch (e) {
    console.error('Failed to start server', e);
    process.exit(1);
  }
};

start();
