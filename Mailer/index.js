const express = require('express');
const cors = require('cors');
const router = require('./routes');
const { PORT } = require('./utils/env');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.get("/", (_, res) => {
    res.status(200).send({ message: "Hello World!" });
});

app.use('/api', router);

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ message: 'Internal Server Error' });
});

// 404 Not Found Middleware
app.use((req, res) => {
    res.status(404).send({ message: 'Route not found' });
});

app.listen(PORT, () => {
    console.log(`The server is listening at port ${PORT}
Visit http://localhost:${PORT}`);
});
