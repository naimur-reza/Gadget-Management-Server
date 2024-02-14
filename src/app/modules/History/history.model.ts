import { Schema, model } from "mongoose";
import { ISellHistory } from "./history.interface";

const historySchema = new Schema<ISellHistory>({
  buyerName: { type: String },
  productName: { type: String },
  productPrice: { type: Number },
  quantity: { type: Number },
  totalPrice: { type: Number },
  createdAt: { type: Date, default: Date.now },
});

export const History = model<ISellHistory>("History", historySchema);
