import {
  getAllSchedule,
  getScheduleById,
  createSchedule,
} from "../service/scheduleService.js";

const showSchedule = async (req, res) => {
  try {
    const schedules = await getAllSchedule();
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
    const schedule = await createSchedule(date, time);
    const bookingId = await schedule.id; // Lấy ID của lịch vừa đặt
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
    const schedule = await getScheduleById(bookingId);

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
