import mongoose from 'mongoose';
import { Schema, InferSchemaType } from 'mongoose';

const adminSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
});

export type AdminType = InferSchemaType<typeof adminSchema> & { _id: string };

let AdminModel: mongoose.Model<AdminType>;
if (mongoose.models.Admin) {
    AdminModel = mongoose.models.Admin as mongoose.Model<AdminType>;
} else {
    AdminModel = mongoose.model<AdminType>("Admin", adminSchema);
}

export default AdminModel;
