const { Relationship, Partner } = require("../models");
const { relationshipTypes } = require("../utils/constants");
const { createRelationshipSchema } = require("../utils/validation")

const createRelationship = async (req, res) => {
    const {id: userId} = req.user;
    try {
        const validatedData = await createRelationshipSchema.validate(req.body, { abortEarly: false });

        let type = validatedData.type.toLowerCase();
        if (!Object.values(relationshipTypes).includes(type)) {
            type = relationshipTypes.other;
        }

        let start = validatedData.start;
        if (!start) {
            start = new Date();
        }

        const newRelationship = await Relationship.create({
            user: userId,
            type,
            start
        });

        const partner = await Partner.create({
            firstName: validatedData.firstName,
            lastName: validatedData.lastName,
            otherName: validatedData.otherName,
            email: validatedData.email,
            user: userId,
            relationship: newRelationship.id
        });

        const relationshipData = {
            ...newRelationship,
            partner,
        }

        return res.status(201).json({success: true, message: "Relationship created successfully", data: relationshipData});
    } catch (error) {
        console.log("Error creating a new relationship", error);
        if (error.name === "ValidationError") {
            return res.status(400).json({success: false, message: "Invalid request data", error: error.errors});
        };

        return res.status(500).json({success: false, message: "Internal server error", error: error.message});
    }
};

module.exports = {
    createRelationship
}