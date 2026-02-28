const express = require('express');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser')
const cors = require('cors');
const userRouter = require('./routes/userRoutes');
const instituteRouter = require('./routes/instituteRoutes');
const campusRouter = require('./routes/campusRoutes');
const departmentRouter = require('./routes/departmentRoutes');
const programRouter = require('./routes/programRoutes');
const applicantRouter = require('./routes/applicantRoutes');
const admissionRouter = require('./routes/admissionRoutes');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT;
const corsOption = {
    origin: process.env.FRONTEND_URL,
    credentials: true
}


// Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
console.log("FRONTEND_URL:", process.env.FRONTEND_URL);
app.use(cors(corsOption));


// Routes
app.get('/', (req, res) => {
    return res.send('Server is running...........');
});

app.use("/user", userRouter);
app.use("/institute", instituteRouter);
app.use("/campus", campusRouter);
app.use("/department", departmentRouter);
app.use("/program", programRouter);
app.use("/applicant", applicantRouter);
app.use("/admission", admissionRouter);



// Server
app.listen(PORT, () => {
    connectDB();    
    console.log(`Server is running at: http://localhost:${PORT}/`);
    // console.log("FRONTEND_URL:", process.env.FRONTEND_URL);
});