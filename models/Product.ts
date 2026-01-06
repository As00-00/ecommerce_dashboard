import mongoose, { Schema, model, models } from "mongoose";

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    stock: {
      type: Number,
      required: [true, "Stock quantity is required"],
      default: 0,
    },
    description: {
      type: String,
      default:"No description provided yet"
    },
    category: {
      type: String,
      required:[true,"Category is required"]
    },
    brand:{
      type:String,required:[true,"brand is required"]
    },
    imageUrl: {
      type: String, 
    },
    isFeatured:{
      type:Boolean,
      default:false,
    },
  },
  {
    timestamps: true,
  }
);
if (mongoose.models.Product) {
  delete mongoose.models.Product;
}
const Product = models.Product || model("Product", ProductSchema);

export default Product;