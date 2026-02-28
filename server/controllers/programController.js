// create program controller
// get all program controller
// get program controller by id
// update program controller
// delete program controller

const departmentModel = require("../models/departmentModel");
const programModel = require("../models/programModel");


const createProgram = async (req, res) => {
    try {
        const { name, code, department, academicYear, courseType, entryType, admissionMode, intake, quotas } = req.body;


        if (!name || !department || !academicYear || !courseType || !entryType || !admissionMode) {
            return res.status(400).json({
                message: "All required fields must be provided",
                success: false
            });
        }

        const existDepartment = await departmentModel.findById(department);
        if (!existDepartment) {
            return res.status(404).json({
                message: "Department does not exist",
                success: false
            });
        }

        // prgrm code unique or not
        if (code) {
            const existCode = await programModel.findOne({ code });
            if (existCode) {
                return res.status(409).json({
                    message: "Program with this code already exists",
                    success: false
                });
            }
        }

        // const totalQuota = Number(quotas?.KCET) + Number(quotas?.COMEDK) + Number(quotas?.Management);
        const totalQuota = Number(quotas?.KCET?.total) + Number(quotas?.COMEDK?.total) + Number(quotas?.Management?.total);

        if (totalQuota !== Number(intake)) {
            return res.status(400).json({
                message: "Quota total must equal intake",
                success: false
            });
        }

        // const formattedQuotas = {
        //     KCET: { total: Number(quotas?.KCET) },
        //     COMEDK: { total: Number(quotas?.COMEDK) },
        //     Management: { total: Number(quotas?.Management) }
        // };

        const formattedQuotas = {
            KCET: { total: Number(quotas?.KCET?.total) },
            COMEDK: { total: Number(quotas?.COMEDK?.total) },
            Management: { total: Number(quotas?.Management?.total) }
        };

        const newProgram = await programModel.create({
            name: name.trim(),
            code,
            department,
            academicYear: academicYear.trim(),
            courseType,
            entryType,
            admissionMode,
            intake,
            quotas: formattedQuotas,
            // supernumerarySeats
        });

        await newProgram.populate("department", "name");

        return res.status(201).json({
            message: "Program created successfully",
            newProgram,
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
};

const getAllPrograms = async (req, res) => {
    try {
        const program = await programModel.find().populate('department', 'name');

        if (!program || program.length === 0) {
            return res.status(404).json({
                message: "No programs found",
                success: false
            });
        }

        return res.status(200).json({
            message: "Program retrieved successfully",
            program,
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


module.exports = { createProgram, getAllPrograms }