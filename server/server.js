const express = require("express");
const colors = require("colors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const PORT = process.env.PORT || 5000;

const app = express();
dotenv.config();
app.use(express.json());

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(
            `MongoDB Connected: ${conn.connection.host}`.cyan.underline
        );
    } catch (error) {
        console.error(`Error: ${error.message}`.bgRed.bold);
        process.exit();
    }
};

connectDB();

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/blogs", require("./routes/blogRoutes"));

app.listen(PORT, () =>
    console.info(`Server is running on port ${PORT}`.bgBlue.underline.bold)
);
