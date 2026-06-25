import mongoose from 'mongoose';
import { Schema, InferSchemaType } from 'mongoose';

const vacationSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    }
}, {
    timestamps: true,
});

export type VacationType = InferSchemaType<typeof vacationSchema> & { _id: string };

let VacationModel: mongoose.Model<VacationType>;
if (mongoose.models.Vacation) {
    VacationModel = mongoose.models.Vacation as mongoose.Model<VacationType>;
} else {
    VacationModel = mongoose.model<VacationType>("Vacation", vacationSchema);
}

export default VacationModel;
