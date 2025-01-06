const express = require('express');
const cors = require('cors');
require("dotenv").config();
const { routeManager } = require('./routes/routes');

// Instance of express
const app = express()

// Port
const port = 4000

app.use(cors({
  origin: "*"
}))

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/", (_, res) => {
  res.send("Welcome to the quiz game API!");
});

app.use('/', routeManager)

app.all("*", (_, res) =>
  res.status(404).send({ success: false, message: "route not found" })
);

app.listen(port, () => {
console.log(`App is listening on ${port} \nvisit http://localhost:${port}`)
})