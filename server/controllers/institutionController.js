const institutionModel = require("../models/institutionModel");

const createInstitute = async (req, res) => {
    try {
        const { name } = req.body;
        console.log(name);

        if (!name) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }

       

        const existingInstitution = await institutionModel.findOne({ name });
        if (existingInstitution) {
            return res.status(409).json({
                message: "Institution with this name already exists",
                success: false
            });
        }

        

        const newInstitute = await institutionModel.create({ name });
        return res.status(201).json({
            message: "Institution created successfully",
            newInstitute,
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


const getAllInstitute = async (req, res) => {
    try {
        const institute = await institutionModel.find();

        if (!institute || institute.length === 0) {
            return res.status(404).json({
                message: "No institutions found",
                success: false
            });
        }
        return res.status(200).json({
            message: "Institutions fetched successfully",
            institute,
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


const getInstituteById = async (req, res) => {
    try {
        const instituteId = req.params.id;
        const institute = await institutionModel.findById({instituteId});

        if (!institute || institute.length === 0) {
            return res.status(404).json({
                message: "Institution not found",
                success: false
            });
        }

        return res.status(200).json({
            message: "Institution fetched successfully",
            institute,
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


const updateInstitute = async (req, res) => {
    try {
        const instituteId = req.params.id;
        const { name, campuses } = req.body;

        let updateQuery = {};

        if (name) {
            updateQuery.name = name;
        }

        // Append campuses if provided
        if (Array.isArray(campuses) && campuses.length > 0) {
            updateQuery.$addToSet = {
                campuses: { $each: campuses }
            };
        }

        const updatedInstitute = await institutionModel.findByIdAndUpdate(
            instituteId,
            updateQuery,
            { new: true }
        );

        if (!updatedInstitute || updatedInstitute.length === 0) {
            return res.status(404).json({
                message: "Institution not found",
                success: false
            });
        }

        return res.status(200).json({
            message: "Institution updated successfully",
            updatedInstitute,
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


const deleteInstitute = async (req, res) => {
    try {
        const instituteId = req.params.id;
        const deletedInstitute = await institutionModel.findByIdAndDelete(instituteId);

        if (!deletedInstitute || deletedInstitute.length === 0) {
            return res.status(404).json({
                message: "Institution not found",
                success: false
            });
        }

        return res.status(200).json({
            message: "Institution deleted successfully",
            deletedInstitute,
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

module.exports = { createInstitute, getAllInstitute, getInstituteById, updateInstitute, deleteInstitute };