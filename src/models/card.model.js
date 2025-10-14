import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const cardSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },
    status: {
      type: String,
      enum: ["private", "public"],
      default: "private",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tags: {
      type: [Schema.Types.ObjectId],
      ref: "Tag",
      default: [],
    },
  },
  { timestamps: true }
);
cardSchema.plugin(mongooseAggregatePaginate);
const Card = mongoose.model("Card", cardSchema);
export default Card;
