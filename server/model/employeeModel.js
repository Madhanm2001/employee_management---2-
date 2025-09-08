import mysql from 'mysql2/promise';
import dotenv from "dotenv";
dotenv.config();

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  port: Number(process.env.MYSQL_PORT || 3306),
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || 'employee_management',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export const initDb = async () => {
  await pool.query(`CREATE TABLE IF NOT EXISTS employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employeeName VARCHAR(255) NOT NULL,
    employeeId VARCHAR(100) NOT NULL UNIQUE,
    department VARCHAR(255) NOT NULL,
    designation VARCHAR(255) NOT NULL,
    project VARCHAR(255) NOT NULL,
    type ENUM('Full-Time','Part-Time','Contract') NOT NULL,
    status ENUM('Active','Inactive') NOT NULL,
    profileImage VARCHAR(500) NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_employeeName (employeeName)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`);
};

export default pool;
