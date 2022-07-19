import ReminderService from "../services/reminder.js";

export const createReminder = async (req, res) => {
  console.log(req.body);
  const reminder = await ReminderService.createReminder(req.body);
  return res.status(201).json(reminder);
};

export const getReminders = async (req, res) => {
  const reminders = await ReminderService.getReminders(req.query);
  return res.status(200).json(reminders);
};

export const getReminder = async (req, res) => {
  const reminder = await ReminderService.getReminder(req.params);
  if (!reminder) {
    return res.status(404).json("ID not found");
  }
  return res.status(200).json(reminder);
};

export const invalidRequest = (req, res) => {
  return res.status(405).json({
    code: 405,
    status: "error",
    error: true,
    message: "Invalid request",
  });
};
