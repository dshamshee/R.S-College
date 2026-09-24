import mongoose, { InferSchemaType } from 'mongoose'

const galarry = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    title: String,
    description: String,
    types: {type: String, enum: ["EVENT", "FESTIVAL", "ACADEMIC", "OTHER"]},
    image: {type: String, default: null},
    video: {type: String, default: null},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
})


export type GalleryType = InferSchemaType<typeof galarry> & { _id: string };

let GalleryModel: mongoose.Model<GalleryType>;
if (mongoose.models.Gallery) {
    GalleryModel = mongoose.models.Gallery as mongoose.Model<GalleryType>;
} else {
    GalleryModel = mongoose.model<GalleryType>("Gallery", galarry);
}

export default GalleryModel;