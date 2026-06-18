import mongoose from "mongoose";
import UpdatesModel from "../models/updates";

// Bun automatically loads the .env file, so process.env.MONGODB_URI is accessible
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/rs-college";

const sampleUpdates = [
    // Notices
    {
        title: "Admission Dates Extended for UG Courses 2026",
        description: "The college administration has extended the registration deadline for all Under Graduate (BA, BSc, BCom) courses. Interested candidates can apply online until July 15, 2026. Please ensure all documents are scanned and uploaded correctly.",
        type: "NOTICE",
        files: []
    },
    {
        title: "National Seminar on Sustainable Development Goals",
        description: "The Department of Science is organizing a two-day national seminar on Climate Change and Sustainable Development Goals. Date: November 12-13, 2026. Keynote speakers include eminent environmental scientists. All students are encouraged to attend.",
        type: "NOTICE",
        files: []
    },
    {
        title: "Distribution of Degree Certificates (Batch 2022-2025)",
        description: "Degree certificates for students who graduated in 2025 are ready for distribution. Please collect them from Counter 4 in the Administrative Block starting next Monday. Carry your original registration card and library clearance receipt.",
        type: "NOTICE",
        files: []
    },
    // Examinations
    {
        title: "UG Semester III Practical Exam Schedule",
        description: "Practical examinations for UG Semester III (Physics, Chemistry, Botany, Zoology) are scheduled to start from June 25, 2026. The detailed lab-wise student batch allocation timetable is available on the departmental notice boards.",
        type: "EXAMINATION",
        files: []
    },
    {
        title: "PG Semester I Term End Examination Dates",
        description: "Purnea University has released the official schedule for PG Semester I examinations starting July 10, 2026. Admit cards will be distributed from the college office desk starting July 3, 2026 during working hours.",
        type: "EXAMINATION",
        files: []
    },
    {
        title: "Revised Examination Centres List - Annual Exam 2026",
        description: "Please check the revised examination center allocation list released by the university for the upcoming annual exams starting July 12, 2026. Some batches have been assigned to new halls due to seat capacity limits.",
        type: "EXAMINATION",
        files: []
    },
    // Tenders
    {
        title: "Tender for Library Automation and Book RFID Tagging",
        description: "Sealed tenders are invited from reputed tech agencies for executing library automation, cataloging software installation, and RFID book tagging. Bid submission deadline is July 30, 2026. Documents can be collected from the principal's office.",
        type: "TENDER",
        files: []
    },
    {
        title: "Tender for Construction of New Smart Seminar Hall",
        description: "Tenders are invited for civil works, acoustic panelling, and installation of audio-visual systems for the new smart seminar hall in Block C. Detailed engineering drawings and bills of quantities are attached in the tender document.",
        type: "TENDER",
        files: []
    },
    {
        title: "Tender for Supply of Chemistry Lab Equipment",
        description: "Sealed bids are invited for supplying analytical balances, spectrophotometers, and glassware for the Department of Chemistry laboratory. Bids must be sent in a sealed envelope marked 'Lab Equipment Tender' before August 5, 2026.",
        type: "TENDER",
        files: []
    }
];

async function seed() {
    try {
        console.log("Connecting to MongoDB:", MONGODB_URI);
        await mongoose.connect(MONGODB_URI);
        console.log("Database connected successfully.");

        // Clear existing updates
        console.log("Clearing all existing updates...");
        await UpdatesModel.deleteMany({});
        console.log("Cleared updates collection.");

        // Seed sample updates
        console.log("Seeding sample updates...");
        const inserted = await UpdatesModel.insertMany(sampleUpdates);
        console.log(`Successfully seeded ${inserted.length} updates!`);

        process.exit(0);
    } catch (error) {
        console.error("Database seeding failed:", error);
        process.exit(1);
    }
}

seed();
