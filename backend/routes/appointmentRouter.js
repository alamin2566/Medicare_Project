import express from 'express';
import { clerkMiddleware } from '@clerk/express';

import { getAppointments, getAppointmentsByPatient, confirmPayment, getStats, createAppointment, getAppointmentsByDoctor, cancelAppoinment, getRegisteredUserCount, updateAppointment } from '../controllers/appointmentController.js';

const appointmentRouter = express.Router();

appointmentRouter.get("/", getAppointments);
appointmentRouter.get("/confirm", confirmPayment);
appointmentRouter.get("/stats/summary", getStats);

appointmentRouter.post("/", clerkMiddleware(), createAppointment);
appointmentRouter.get("/me", clerkMiddleware(), getAppointmentsByPatient);

appointmentRouter.get("/doctor/:doctorId", getAppointmentsByDoctor);

appointmentRouter.get("/:id/cancel", cancelAppoinment);
appointmentRouter.get("/patients/count", getRegisteredUserCount);
appointmentRouter.put("/:id", updateAppointment);

export default appointmentRouter;