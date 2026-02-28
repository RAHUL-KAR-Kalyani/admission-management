// create applicant controller
// get all applicant controller
// get applicant controller by id
// update applicant controller
// delete applicant controller

const applicantModel = require("../models/applicantModel");


const createApplicant = async (req, res) => {
    try {
        const { firstName, lastName, email, category, entryType, quotaType, marks, } = req.body;

        // Check if applicant with the same email already exists
        const existingApplicant = await applicantModel.findOne({ email });
        if (existingApplicant) {
            return res.status(400).json({
                message: "Applicant with this email already exists",
                success: false
            });
        }

        // create new applicant
        const newApplicant = await applicantModel.create({ firstName, lastName, email, category, entryType, quotaType, marks });

        return res.status(201).json({
            message: "Applicant created successfully",
            newApplicant,
            success: true
        });


    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Server Error",
            error: err,
            success: false
        });
    }
}

const verifyDocuments = async (req, res) => {
    try {
        const updatedDetails = req.body;
        const applicantId = req.params.id;
        // const updatedApplicant = await applicantModel.findByIdAndUpdate(applicantId, { documents: updatedDetails }, { new: true });
        const updatedApplicant = await applicantModel.findByIdAndUpdate(applicantId, { documents: updatedDetails }, { returnDocument: 'after' });
        if (!updatedApplicant) {
            return res.status(404).json({
                message: "Applicant not found",
                success: false
            });
        }
        return res.status(200).json({
            message: "Applicant documents updated successfully",
            updatedApplicant,
            success: true
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Server Error",
            error: err,
            success: false
        });
    }
}

const getAllApplicants = async (req, res) => {
    try {
        const applicant = await applicantModel.find();
        if (!applicant || applicant.length === 0) {
            return res.status(404).json({
                message: "No applicants found",
                success: false
            });
        }

        return res.status(200).json({
            message: "Applicants retrieved successfully",
            applicant,
            success: true
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Server Error",
            error: err,
            success: false
        });
    }
}



module.exports = { createApplicant, verifyDocuments, getAllApplicants }