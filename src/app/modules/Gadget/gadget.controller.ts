import catchAsync from "../../utils/catchAsync";
import { gadgetService } from "./gadget.service";

const addGadget = catchAsync(async (req, res) => {
  const gadget = await gadgetService.addGadgetIntoDB(req.body);
  res.status(201).json({
    status: "success",
    data: {
      gadget,
    },
  });
});

const getAllGadgets = catchAsync(async (req, res) => {
  const gadgets = await gadgetService.getAllGadgetsFromDB(req.query);
  res.status(200).json({
    status: "success",
    results: gadgets.length,
    data: {
      gadgets,
    },
  });
});

const getGadgetById = catchAsync(async (req, res) => {
  const gadget = await gadgetService.getGadgetByIdFromDB(req.params.id);
  res.status(200).json({
    status: "success",
    data: {
      gadget,
    },
  });
});

const updateGadgetById = catchAsync(async (req, res) => {
  const gadget = await gadgetService.updateGadgetByIdInDB(
    req.params.id,
    req.body,
  );
  res.status(200).json({
    status: "success",
    data: {
      gadget,
    },
  });
});

const deleteGadgetById = catchAsync(async (req, res) => {
  await gadgetService.deleteGadgetByIdFromDB(req.params.id);
  res.status(204).json({
    status: "success",
    data: null,
  });
});

const sellGadget = catchAsync(async (req, res) => {
  const gadget = await gadgetService.sellGadgetFromDB(req.params.id, req.body);
  res.status(200).json({
    status: "success",
    data: {
      gadget,
    },
  });
});

const getSaleHistories = catchAsync(async (req, res) => {
  const sales = await gadgetService.getSaleHistoriesFromDB();
  res.status(200).json({
    status: "success",
    data: {
      sales,
    },
  });
});

const getTotalRevenue = catchAsync(async (req, res) => {
  const results = await gadgetService.getTotalRevenueFromDB();
  res.status(200).json({
    status: "success",
    results,
  });
});

const deleteManyGadgets = catchAsync(async (req, res) => {
  await gadgetService.deleteManyGadgetsFromDB(req.body);
  res.status(204).json({
    status: "success",
    data: null,
  });
});

export const gadgetController = {
  addGadget,
  getAllGadgets,
  getGadgetById,
  updateGadgetById,
  deleteGadgetById,
  sellGadget,
  getSaleHistories,
  getTotalRevenue,
  deleteManyGadgets,
};
