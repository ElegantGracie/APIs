const express = require('express');
const cors = require('cors');
const { sequelize } = require('./utils/connectDB');
require("dotenv").config();

const app = express()

const port = process.env.PORT || 4040;

app.use(cors({
  origin: "*"
}))

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/", (_, res) => {
  res.send("Welcome to the relationship tracker API!");
});

app.use('/api/v1/auth', require("./routes/auth"));

app.all("*", (_, res) =>
  res.status(404).send({ success: false, message: "route not found" })
);

sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`App is listening on ${port} \nvisit http://localhost:${port}`)
    })
}).catch(err => {
    console.error("Error syncing database", err);
})