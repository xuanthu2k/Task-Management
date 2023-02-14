require("dotenv").config();
const express = require("express");
const router = require("./src/routes/main-routes");
const app = express();
const { connectDB } = require("./src/config/db");
const cors = require("cors");
const port = process.env.PORT || 8888;

app.use(
    cors({
        origin: "*",
    })
);

connectDB(process.env.DB_URI);
require("./src/config/taskReminder");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);
app.use((req, res, next) => {
    return res.status(404).json({
        status: 404,
        message: "Unsupported URL",
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
