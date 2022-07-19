import express from "express";
import { celebrate } from "celebrate";

import {
  createReminder,
  getReminders,
  invalidRequest,
  getReminder,
} from "../controllers/reminder.js";

import { createReminderSchema } from "../validation/validation";

const router = express.Router();

router
  .route("/")
  .get(getReminders)
  .post(celebrate({ body: createReminderSchema }), createReminder);

router
  .route("/:id")
  .get(getReminder)
  .put(invalidRequest)
  .patch(invalidRequest)
  .delete(invalidRequest);

export default router;
