const campusModel = require("../models/campusModel");
const institutionModel = require("../models/institutionModel");


const createCampus = async (req, res) => {
    try {
        const { name, institute } = req.body
        console.log(name, institute);
        if (!name || !institute) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }

        const existCampus = await campusModel.findOne({ name });
        if (existCampus) {
            return res.status(409).json({
                message: "Campus with this name already exists",
                success: false
            });
        }

        const existInstitute = await institutionModel.findById(institute);
        if (!existInstitute) {
            return res.status(409).json({
                message: "This institute does not exist",
                success: false
            });
        }

        const newCampus = await campusModel.create({ name, institute });

        await newCampus.populate("institute");

        return res.status(201).json({
            message: "Campus created successfully",
            newCampus,
            success: true
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Server Error",
            error: err.message,
            success: false
        });
    }
}


const getAllCampus = async (req, res) => {
    try {
        const campus = await campusModel.find().populate("institute");
        if (!campus || campus.length === 0) {
            return res.status(404).json({
                message: "No campus found",
                success: false
            });
        }
        return res.status(200).json({
            message: "Campus fetched successfully",
            campus,
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


const getCampusById = async (req, res) => {
    try {
        const campusId = req.params.id;
        const campus = await campusModel.findById(campusId).populate("institute");
        if (!campus || campus.length === 0) {
            return res.status(404).json({
                message: "Campus not found",
                success: false
            });
        }
        return res.status(200).json({
            message: "Campus fetched successfully",
            campus,
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


const updateCampus = async (req, res) => {
    try {
        const updatedDetails = req.body;
        const campusId = req.params.id;
        const campus = await campusModel.findByIdAndUpdate(campusId, updatedDetails, { new: true });

        if (!campus || campus.length === 0) {
            return res.status(404).json({
                message: "Campus not found",
                success: false
            });
        }
        return res.status(200).json({
            message: "Campus fetched successfully",
            campus,
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


const deleteCampus = async (req, res) => {
    try {
        const campusId = req.params.id;
        const deleteCampus = await campusModel.findByIdAndDelete(campusId);

        if (!deleteCampus || deleteCampus.length === 0) {
            return res.status(404).json({
                message: "Campus not found",
                success: false
            });
        }

        return res.status(200).json({
            message: "Campus deleted successfully",
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


module.exports = { createCampus, getAllCampus, getCampusById, updateCampus, deleteCampus };