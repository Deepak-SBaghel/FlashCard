import mongoose from "mongoose";
import { Schema } from "mongoose";

const tagsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 30,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
      lowercase: true,
    },
    description: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);
//tagsSchema.index({ name: 1 }, { unique: true }); // Ensure unique index on name field
tagsSchema.pre("save",function(next){
    this.slug = this.name.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'');
    next();
})
const Tag = mongoose.model("Tag", tagsSchema);
export default Tag;
