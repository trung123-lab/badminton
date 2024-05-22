import Schedule from "../models/schedule.js";
import sequelize from "../config/database.js"; // Thêm dòng này để import biến sequelize

const showSchedule = async (req, res) => {
  try {
    const schedules = await Schedule.findAll({
      attributes: [
        "id",
        [sequelize.fn("DATE_FORMAT", sequelize.col("Day"), "%Y-%m-%d"), "Day"],
        "Time",
      ],
    });
    console.log(schedules);
    res.render("datlich", { bookedSlots: schedules });
  } catch (err) {
    console.error("Error querying database:", err.stack);
    res.status(500).send("Database query error");
  }
};

const bookSchedule = async (req, res) => {
  const { date, time } = req.body;

  try {
    const schedule = await Schedule.create({ Day: date, Time: time });
    const bookingId = schedule.id; // Lấy ID của lịch vừa đặt

    // Chuyển hướng đến trang hóa đơn và truyền thông tin đặt lịch
    res.json({ bookingId });
  } catch (err) {
    console.error("Error inserting into the database:", err.stack);
    res.status(500).send("Database insert error");
  }
};

const showBill = async (req, res) => {
  const bookingId = req.query.bookingId;

  try {
    const schedule = await Schedule.findByPk(bookingId, {
      attributes: [
        "id",
        [sequelize.fn("DATE_FORMAT", sequelize.col("Day"), "%Y-%m-%d"), "Day"],
        "Time",
      ],
    });

    if (!schedule) {
      return res.status(404).send("Booking not found");
    }

    // Render trang 'bill' với thông tin đặt lịch
    res.render("bill", { booking: schedule });
  } catch (err) {
    console.error("Error querying database:", err.stack);
    res.status(500).send("Database query error");
  }
};

export { showSchedule, bookSchedule, showBill };
