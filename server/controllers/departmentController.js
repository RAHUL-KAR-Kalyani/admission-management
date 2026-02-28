const campusModel = require("../models/campusModel");
const departmentModel = require("../models/departmentModel");

const createDepartment = async (req, res) => {
    try {
        const { name, campus } = req.body;
        console.log(name, campus);

        if (!name || !campus) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }

        const existDepartment = await departmentModel.findOne({ name });
        if (existDepartment) {
            return res.status(409).json({
                message: "Department with this name already exists",
                success: false
            });
        }

        const existCampus = await campusModel.findById(campus);
        if (!existCampus) {
            return res.status(409).json({
                message: "Campus with this id does not exist",
                success: false
            });
        }

        const newDepartment = await departmentModel.create({ name, campus });
        await newDepartment.populate("campus");


        return res.status(201).json({
            message: "Department created successfully",
            newDepartment,
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

const getAllDepartment = async (req, res) => {
    try {
        const department = await departmentModel.find().populate("campus");
        if (!department || department.length === 0) {
            return res.status(404).json({
                message: "No department found",
                success: false
            });
        }
        return res.status(200).json({
            message: "Department fetched successfully",
            department,
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

const getDepartmentById = async (req, res) => {
    try {
        const departmentId = req.params.id;
        const department = await departmentModel.findById(departmentId).populate("campus");
        if (!department || department.length === 0) {
            return res.status(404).json({
                message: "No department found",
                success: false
            });
        }
        return res.status(200).json({
            message: "Department fetched successfully",
            department,
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

const updateDepartment = async (req, res) => {
    try {
        const updatedDetails = req.body;
        const departmentId = req.params.id;
        const department = await departmentModel.findByIdAndUpdate(departmentId, updatedDetails, { new: true }).populate("campus");
        if (!department || department.length === 0) {
            return res.status(404).json({
                message: "No department found",
                success: false
            });
        }
        return res.status(200).json({
            message: "Department updated successfully",
            department,
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

const deleteDepartment = async (req, res) => {
    try {
        const departmentId = req.params.id;
        const department = await departmentModel.findByIdAndDelete(departmentId);
        if (!department || department.length === 0) {
            return res.status(404).json({
                message: "No department found",
                success: false
            });
        }
        return res.status(200).json({
            message: "Department deleted successfully",
            department,
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

module.exports = { createDepartment, getAllDepartment, getDepartmentById, updateDepartment, deleteDepartment };