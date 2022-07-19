import Sequelize from "sequelize";
import db from "../models/index.js";

const Op = Sequelize.Op;
const { Reminder } = db;

export const createReminder = async (input) => {
  let { description, date, user } = input;

  date = new Date(date).getTime(); // some mock date

  const reminder = await Reminder.create({
    description,
    date,
    userId: user,
  });
  return {
    reminder,
  };
};

export const getReminders = async (requestQuery) => {
  const { user, after } = requestQuery;
  let query = {};
  if (user) {
    query = {
      userId: user,
    };
  }
  if (after) {
    //     var date = new Date("2020-08-24T07:28:24.000Z"); // some mock date
    // var milliseconds = date.getTime();
    query = {
      ...query,
      date: {
        [Op.gt]: parseInt(after),
      },
    };
  }
  const reminders = await Reminder.findAll({
    where: query,
    order: [["date", "ASC"]],
  });

  return reminders;
};

export const getReminder = async (requestParams) => {
  const { id } = requestParams;
  const reminder = await Reminder.findOne({
    where: {
      id,
    },
  });

  return reminder;
};

export default {
  createReminder,
  getReminders,
  getReminder,
};
