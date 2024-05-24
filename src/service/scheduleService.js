import sequelize from "../config/database.js";
import Schedule from "../models/schedule.js";

// Hàm đặt lịch
export const createSchedule = async (date, time) => {
  const newSchedule = await Schedule.create({ Day: date, Time: time });
  return newSchedule;
};
// Hàm lấy thông tin lịch theo ID
export const getScheduleById = async (id) => {
  const daySchedule = await Schedule.findByPk(id, {
    attributes: [
      "id",
      [sequelize.fn("DATE-FORMAT", sequelize.col("Day"), "%Y-%m-%d"), "Day"],
      "Time",
    ],
  });
  return daySchedule;
};
// Hàm lấy tất cả lịch trình
export const getAllSchedule = async () => {
  const schedules = await Schedule.findAll({
    attributes: [
      "id",
      [sequelize.fn("DATE_FORMAT", sequelize.col("Day"), "%Y-%m-%d"), "Day"],
      "Time",
    ],
  });
  return schedules;
};
