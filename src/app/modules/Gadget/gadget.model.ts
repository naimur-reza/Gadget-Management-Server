import { Schema, model } from "mongoose";
import { IGadget } from "./gadget.interface";

const gadgetSchema = new Schema<IGadget>(
  {
    name: { type: String },
    price: { type: Number },
    quantity: { type: Number },
    brand: { type: String },
    model: { type: String },
    category: { type: String },
    operatingSystem: { type: String },
    connectivity: { type: String },
    powerSource: { type: String },
    features: { type: [] },
    imageUrl: { type: String },
  },
  {
    timestamps: true,
  },
);

export const Gadget = model<IGadget>("Gadget", gadgetSchema);
