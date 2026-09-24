import mongoose, { InferSchemaType } from 'mongoose'


export const facultySchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true}, 
    designation: {type: String, required: true},
    department: {type: String, required: true},
    email: {type: String},
    phone: {type: String},
    type: {type: String, required: true},
    image: {type: String, default: null},
    achivements: {type: [String], default:[]},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
})

export type FacultyType = InferSchemaType<typeof facultySchema> & { _id: string };

let FacultyModel: mongoose.Model<FacultyType>;
if (mongoose.models.Faculty) {
    FacultyModel = mongoose.models.Faculty as mongoose.Model<FacultyType>;
} else {
    FacultyModel = mongoose.model<FacultyType>("Faculty", facultySchema);
}

export default FacultyModel;