// const { Sequelize } = require("sequelize");
const { Question } = require("../models/question");
const { Gamer } = require("../models/gamer");
const { sequelize } = require("../config/connections");
const categories = ["general knowledge", "music", "geography", "science", "current affairs",];

const createQuestion = async (req, res) => {
    const { question, answer, category, options } = req.body;

    try {
        if(!question) 
            return res.status(400).json({ success: false, message: "Invalid format. No provided question." });
        else if(!answer) 
            return res.status(400).json({ success: false, message: "Invalid format. No provided answer." });
        else if(!options)
            return res.status(400).json({ success: false, message: "Invalid format. Options not provided." });
        else if(options.length !== 4) 
            return res.status(400).json({ success: false, message: "Invalid format. Options must be up to 4." });
        else if(!category)
            return res.status(400).json({ success: false, message: "Invalid format. Question category has to be provided." });
        else if(!categories.includes(category.toLowerCase()))
            return res.status(400).json({ success: false, message: "Invalid format. Category must be one of these: General Knowledge, Music, Geography, Current Affairs." });

        const newQuestion = await Question.create({
            question,
            answer,
            category: category.toLowerCase(),
            options
        });

        return res.status(201).send({ success: true, message: "Question created successfully", data: newQuestion });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ success: false, message: "Internal server error" });
    }
}

// TODO: Generate functions for questions
const getMultipleQuestions = async (req, res) => {
    let { category, amount } = req.query;

    try {
        amount = parseInt(amount);
        if(!amount || typeof amount !== "number")
            amount = 10;

        const questions = await Question.findAll({ where: { category }, limit: amount });

        return  res.status(200).send({ success: true, data: questions });
    } catch (error) {
        console.log(error);
        return  res.status(500).send({ success: false, message: "Internal server error" })
    }
}

const getMultipleRandomQuestions = async (req, res) => {
    let { amount } = req.params;

    try {
        amount = parseInt(amount);
        if(!amount || typeof amount !== "number")
            amount = 10;

        const questions = await Question.findAll({order: sequelize.random(), limit: amount });

        return  res.status(200).send({ success: true, data: questions });
    } catch (error) {
        console.log(error);
        return  res.status(500).send({ success: false, message: "Internal server error" })
    }
}

const getPaginatedQuestion = async (req, res) => {
    let { category, number } = req.query;
    
    try {
        if(category && typeof category !== "string") 
            return res.status(400).json({ success: false, message: "Category must be a string." });
        
        if(!number || number < 1)
            return res.status(400).json({ success: false, message: "Number must be provided and be a non-negative number"});

        number = parseInt(number) - 1;

        const query = { category: category.toLowerCase() };

        const question = await Question.findAll({ where: query, offset: number, limit: 1 });
        return res.status(200).send({ success: true, data: question });
    } catch (error) {
        console.log(error);
        return  res.status(500).send({ success: false, message: "Internal server error" });
    }
}

const submitQuestion = async (req, res) => {
    const { id: gamerId } = req.user;
    const { questionId } = req.params;
    const { answer } = req.body;

    try {
        const question = await Question.findOne({ where: { id: questionId } });
        if(!question)
            return res.status(404).json({ success: false, message: "Question not found." });

        const gamer = await Gamer.findOne({ where: { id: gamerId } });
        if(!gamer)
            return res.status(404).json({ success: false, message: "Gamer not found" });

        if(!answer) 
            return res.status(400).json({ success: false, message: "Answer must be provided" });

        if(question?.answer.toLowerCase() !== answer.toLowerCase())
            return res.status(400).json({ success: false, message: "Incorrect answer." });
    
        await gamer.update({ score: gamer?.score + 10 });

        return res.status(200).json({ success: true, message: "Correct answer." });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal server error"});
    }
}

const updateQuestion = async (req, res) => {
    const { questionId } = req.params;
    let { question, answer, category, options } = req.body;
    try {
        if (!question && !answer && !category && !options) {
            return res.status(400).json({ success: false, message: "Nothing to update" });
        }
        
        const questionToUpdate = await Question.findByPk(questionId);
        if(!questionToUpdate)
            return res.status(404).json({ success: false, message: "Question not found." });

        if(options && (!Array.isArray(options) || options.length !== 4))
            if(options.length !== 4) 
                return res.status(400).json({ success: false, message: "Options must be an array of 4 items" });
        
        if(category) {
            if(!categories.includes(category.toLowerCase()))
                return res.status(400).json({ success: false, message: "Invalid category" });
        }

        const payload = {
            question,
            answer,
            category: category.toLowerCase(),
            options
        }

        const updatedQuestion = await questionToUpdate.update(payload);

        return res.status(200).json({ success: true, message: "Question updated", data: updatedQuestion});
    } catch(error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal server error"});
    }   
}

const getQuestionById = async (req, res) => {
    const { questionId } = req.params;
    try {
        const question = await Question.findByPk(questionId);
        if(!question)
            return res.status(404).json({ success: false, message: "Question not found"
        });

        return res.status(200).send({ success: true, data: question });
    } catch(error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal server error"});
    }
}
 
module.exports = { 
    createQuestion, 
    getMultipleQuestions,
    getMultipleRandomQuestions,
    submitQuestion,
    getPaginatedQuestion,
    updateQuestion,
    getQuestionById,
}