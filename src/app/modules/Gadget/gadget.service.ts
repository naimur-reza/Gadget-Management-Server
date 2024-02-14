import { GenericError } from "../../errors/GenericError";
import { History } from "../History/history.model";
import { IGadget } from "./gadget.interface";
import { Gadget } from "./gadget.model";

const addGadgetIntoDB = async (gadget: IGadget) => {
  if (Array.isArray(gadget.features)) {
    gadget.features = gadget.features.join(",");
  } else {
    gadget.features = gadget.features.split(",");
  }

  const result = await Gadget.create(gadget);
  return result;
};

const getAllGadgetsFromDB = async (query: Record<string, unknown>) => {
  const excludedFields = ["minPrice", "maxPrice", "features"];

  let filter: Record<string, unknown> = {};

  if (query) {
    filter = { ...query };
  }
  if (query.name) {
    filter = { ...filter, name: { $regex: query.name, $options: "i" } };
  }

  if (query.maxPrice) {
    filter = {
      ...filter,
      price: { $gte: 1, $lte: Number(query.maxPrice) },
    };
  }

  console.log(filter);

  excludedFields.forEach(field => delete filter[field]);

  const result = await Gadget.find(filter, null, { sort: { createdAt: -1 } });
  return result;
};

const getGadgetByIdFromDB = async (id: string) => {
  const result = await Gadget.findById(id);
  return result;
};

const updateGadgetByIdInDB = async (id: string, updateGadgetInfo: IGadget) => {
  const gadget = await Gadget.findById(id).lean();

  // if gadget is not found, throw error
  if (!gadget) {
    throw new Error("Gadget not found");
  }

  const updateGadget = await Gadget.findByIdAndUpdate(id, updateGadgetInfo, {
    new: true,
    runValidators: true,
  });

  return updateGadget;
};

const deleteGadgetByIdFromDB = async (id: string) => {
  const result = await Gadget.findByIdAndDelete(id);
  return result;
};

const sellGadgetFromDB = async (
  id: string,
  sellingData: { quantity: number; buyerName: string },
) => {
  const { buyerName, quantity } = sellingData;

  const gadget = await Gadget.findById(id).lean();

  if (!gadget) throw new GenericError(404, "Gadget not found");

  // if gadget quantity is less than update quantity, throw error
  if (gadget.quantity < quantity) throw new Error("Not enough quantity");

  // if gadget quantity is greater than update quantity, update gadget
  const updateGadget = await Gadget.findByIdAndUpdate(
    id,
    { $inc: { quantity: -quantity } },
    { new: true, runValidators: true },
  ).lean();

  // when selling gadget , store into history

  const sellingInfo = {
    buyerName,
    productName: gadget.name,
    productPrice: gadget.price,
    quantity,
    totalPrice: Number((gadget.price * quantity).toFixed(2)),
  };

  if (updateGadget) await History.create(sellingInfo);

  // if gadget quantity is 0, delete gadget
  if (updateGadget?.quantity === 0) await Gadget.findByIdAndDelete(id);

  return updateGadget;
};

const getSaleHistoriesFromDB = async () => {
  const result = await History.find().lean();
  return result;
};

const getTotalRevenueFromDB = async () => {
  const result = await History.aggregate([
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: "$totalPrice" },
        totalItems: { $sum: "$quantity" },
      },
    },
  ]);
  return result[0];
};

const deleteManyGadgetsFromDB = async ({ data }: { data: string[] }) => {
  const ids = data.map(id => id);

  const result = await Gadget.deleteMany({ _id: { $in: ids } });

  return result;
};

export const gadgetService = {
  addGadgetIntoDB,
  getAllGadgetsFromDB,
  getGadgetByIdFromDB,
  updateGadgetByIdInDB,
  deleteGadgetByIdFromDB,
  sellGadgetFromDB,
  getSaleHistoriesFromDB,
  getTotalRevenueFromDB,
  deleteManyGadgetsFromDB,
};
