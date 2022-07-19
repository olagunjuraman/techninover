import { Joi } from "celebrate";

export const createReminderSchema = Joi.object().keys({
  description: Joi.string().required(),
  date: Joi.date().required(),
  user: Joi.number().required(),
});
