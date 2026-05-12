import mongoose from 'mongoose';
import { Schema, model, InferSchemaType } from 'mongoose';

const updatesSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ["NOTICE", "EXAMINATION", "NEWS", "OTHER"],
        required: true,
    },
    files: {
        type: [String],
        default: [],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true,
});


// Extract the type from the schema
export type UpdatesType = InferSchemaType<typeof updatesSchema>;


let UpdatesModel: mongoose.Model<UpdatesType>;
if (mongoose.models.Updates) {
  UpdatesModel = mongoose.models.Updates as mongoose.Model<UpdatesType>;
} else {
  UpdatesModel = mongoose.model<UpdatesType>("Updates", updatesSchema);
}
export default UpdatesModel;

