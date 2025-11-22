const express =require("express");
const cors = require("cors");
const sequelize = require("./config/database");
const conceptosRoutes = require("./routes/conceptoRoutes");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.set("view engine", "ejs");
app.use("/api/conceptos", conceptosRoutes);

sequelize.sync().then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(
        PORT, () =>
    console.log(`Servidor corriendo en: http://localhost:${PORT}`)
    );
});