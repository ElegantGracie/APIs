const express = require('express')
const { 
    startGame, 
    getLeaderBoard, 
    getGamer 
} = require('../controllers/gamer-controller')
const { 
    getMultipleQuestions, 
    getPaginatedQuestion, 
    submitQuestion, 
    getMultipleRandomQuestions, 
    createQuestion,
    updateQuestion,
    getQuestionById
} = require('../controllers/question-controller')
const { authMiddleware } = require('../middlewares/authenticate')

const routeManager = express.Router();

// auth route
routeManager.post("/login", startGame);

// question routes
routeManager.post("/questions/create", authMiddleware, createQuestion);
routeManager.get("/questions/category", authMiddleware, getMultipleQuestions);
routeManager.get("/questions/random", authMiddleware, getMultipleRandomQuestions);
routeManager.get("/questions/question", authMiddleware, getPaginatedQuestion);
routeManager.post("/questions/submit/:questionId", authMiddleware, submitQuestion);
routeManager.put("/questions/update/:questionId", authMiddleware, updateQuestion);
routeManager.get("/questions/:questionId", authMiddleware, getQuestionById);

// gamer routes
routeManager.get("/leaderboard", authMiddleware, getLeaderBoard);
routeManager.get("/gamer", authMiddleware, getGamer);

module.exports = { routeManager };