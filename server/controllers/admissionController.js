// create admission
// fee update
// confirm admission update

const admissionModel = require("../models/admissionModel");
const applicantModel = require("../models/applicantModel");
const programModel = require("../models/programModel");


// const seatAllocation = async (req, res) => {
//     try {
//         const { applicant, program: programId, quota: quotaType } = req.body;

//         const wrongApplicant = await applicantModel.findById(applicant);
//         if (!wrongApplicant) {
//             return res.status(400).json({
//                 message: "Invalid Applicant ID",
//                 success: false
//             });
//         }

//         const programDoc = await programModel.findById(programId);
//         if (!programDoc) {
//             return res.status(400).json({
//                 message: "Invalid Program ID",
//                 success: false
//             });
//         }

//         const existingApplicant = await admissionModel.findOne({ applicant, programId });
//         if (existingApplicant) {
//             return res.status(400).json({
//                 message: "Applicant already has an admission",
//                 success: false
//             })
//         }

//         if (!programDoc.quotas) {
//             return res.status(400).json({
//                 message: `Quota "${quotaType}" not found for this program`,
//                 success: false
//             });
//         }

//         // increase filled count
//         programDoc.quotas[quotaType].filled += 1;
//         await programModel.findByIdAndUpdate(programId, { quotas: quotas });

//         const newAdmission = await admissionModel.create({ applicant, program: programId, quota: quotaType });
//         await newAdmission.populate("applicant program");

//         return res.status(201).json({
//             message: "Admission created successfully",
//             success: true,
//             newAdmission
//         });


//     } catch (err) {
//         console.error(err);
//         return res.status(500).json({
//             message: err.message,
//             error: err,
//             success: false
//         });
//     }
// }



const seatAllocation = async (req, res) => {
    try {
        const { applicant, program: programId, quota: quotaType, allotmentNumber } = req.body;

        // 1. Check if applicant exists
        const applicantDoc = await applicantModel.findById(applicant);
        if (!applicantDoc) {
            return res.status(400).json({
                message: "Invalid Applicant ID",
                success: false
            });
        }

        // 2. Check if program exists
        const programDoc = await programModel.findById(programId);
        if (!programDoc) {
            return res.status(400).json({
                message: "Invalid Program ID",
                success: false
            });
        }

        // 3. Check if applicant already has admission for this program
        const existingAdmission = await admissionModel.findOne({ applicant, program: programId });
        if (existingAdmission) {
            return res.status(400).json({
                message: "Applicant already has an admission",
                success: false
            });
        }

        // 4. Check if quota exists in program
        if (!programDoc.quotas || !programDoc.quotas[quotaType]) {
            return res.status(400).json({
                message: `Quota "${quotaType}" not found for this program`,
                success: false
            });
        }

        // 5. Increment quota filled count and save program
        programDoc.quotas[quotaType].filled += 1;
        await programDoc.save();

        // 6. Create new admission
        const newAdmission = await admissionModel.create({
            applicant,
            program: programId,
            quota: quotaType,
            allotmentNumber
        });

        await newAdmission.populate("applicant program");

        return res.status(201).json({
            message: "Admission created successfully",
            success: true,
            newAdmission
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: err.message,
            error: err,
            success: false
        });
    }
};


const feeUpdate = async (req, res) => {
    try {
        const updateFee = req.body;
        const AdmissionId = req.params.id;
        const feeUpdatedAdmission = await admissionModel.findByIdAndUpdate(AdmissionId, updateFee, { new: true });
        if (!feeUpdatedAdmission) {
            return res.status(404).json({
                message: "Admission not found",
                success: false
            });
        }
        return res.status(200).json({
            message: "Fee status updated successfully",
            success: true,
            feeUpdatedAdmission
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

const confirmAdmission = async (req, res) => {
    try {
        const confirmAdmission = req.body;
        const AdmissionId = req.params.id;
        const admissionConfirm = await admissionModel.findByIdAndUpdate(AdmissionId, confirmAdmission, { new: true });
        if (!admissionConfirm) {
            return res.status(404).json({
                message: "Admission not found",
                success: false
            });
        }
        return res.status(200).json({
            message: "Admission confirmed successfully",
            success: true,
            admissionConfirm
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

const getAllAdmissions = async (req, res) => {
    try {
        const admission = await admissionModel.find().populate("applicant program");
        if (!admission || admission.length === 0) {
            return res.status(404).json({
                message: "No admissions found",
                success: false
            });
        }
        return res.status(200).json({
            message: "Admissions fetched successfully",
            admission,
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

module.exports = { seatAllocation, feeUpdate, confirmAdmission, getAllAdmissions }