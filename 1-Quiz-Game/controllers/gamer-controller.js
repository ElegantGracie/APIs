const { Gamer } = require("../models/gamer");
const jwt = require("jsonwebtoken");

const startGame = async (req, res) => {
    const { name, email } = req.body;

    try {
        if(!name || !email) return res.status(400).send({ message: "Missing fields" });

        let gamer = await Gamer.findOrCreate({ where: { email }, defaults: { email, gamerName: name } });

        if(!gamer) 
            return res.status(404).json({ success: false, message: "Game cannot start." });

        const token = jwt.sign( {id: gamer[0].dataValues?.id}, process.env.SECRET_KEY, {expiresIn: "2d"} );

        return res.status(200).json({ success: true, message: "Welcome gamer.", token });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ success: false, message: "Internal server error" });
    }
}

const getGamer = async (req, res) => {
    const { id: userId } = req.user;

    try {
        const gamer = await Gamer.findOne({ where: {id: userId} });
    
        if(!gamer) 
            return res.status(404).json({ success: false, message: "Gamer not found." });

        return res.status(200).send({ success: true, data: gamer });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ success: false, message: "Internal server error" });
    }
}

const getLeaderBoard = async (req, res) => {
    try {
        const leaderboard = await Gamer.findAll({ order: [['score', 'DESC']] });

        return res.status(200).send({ success: true, data: leaderboard });

    } catch (error) {
        console.log(error);
        return res.status(500).send({ success: false, message: "Internal server error" });
    }
}

module.exports = { 
    startGame,
    getGamer,
    getLeaderBoard
}