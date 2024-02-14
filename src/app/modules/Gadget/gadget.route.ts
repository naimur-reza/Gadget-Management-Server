import { Router } from "express";
import { gadgetController } from "./gadget.controller";
import { auth } from "../../middlewares/auth";

const router = Router();

router.post("/", auth(), gadgetController.addGadget);
router.get("/", auth(), gadgetController.getAllGadgets);
router.get("/:id", auth(), gadgetController.getGadgetById);
router.patch("/:id", auth(), gadgetController.updateGadgetById);
router.delete("/:id", auth(), gadgetController.deleteGadgetById);
router.patch("/sell/:id", auth(), gadgetController.sellGadget);
router.get("/sales/histories", auth(), gadgetController.getSaleHistories);
router.get("/sales/revenue", auth(), gadgetController.getTotalRevenue);
router.delete("/delete/many", auth(), gadgetController.deleteManyGadgets);

export const gadgetRoute = router;
