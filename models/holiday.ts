import mongoose from 'mongoose';
import { Schema, InferSchemaType } from 'mongoose';

const holidaySchema = new Schema({
    date: {
        type: Date,
        required: true,
    },
    occasion: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ["Gazetted", "Local"],
        required: true,
    }
}, {
    timestamps: true,
});

export type HolidayType = InferSchemaType<typeof holidaySchema> & { _id: string };

let HolidayModel: mongoose.Model<HolidayType>;
if (mongoose.models.Holiday) {
    HolidayModel = mongoose.models.Holiday as mongoose.Model<HolidayType>;
} else {
    HolidayModel = mongoose.model<HolidayType>("Holiday", holidaySchema);
}

export default HolidayModel;
