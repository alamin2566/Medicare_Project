import express from 'express';
import { clerkMiddleware, requireAuth } from '@clerk/express';

import { confirmServicePayment, getServiceAppointments, getServiceAppointmentsStats, createServiceAppointment, getServiceAppointmentsBypatient, getServiceAppointmentById, updateServiceAppointment, cancelServiceAppointment } from '../controllers/serviceAppointmentController.js';

const serviceAppointmentRouter = express.Router();

serviceAppointmentRouter.get("/", getServiceAppointments);
serviceAppointmentRouter.get("/confirm", confirmServicePayment);
serviceAppointmentRouter.get("/stats/summary", getServiceAppointmentsStats);

serviceAppointmentRouter.post("/", clerkMiddleware(), requireAuth(), createServiceAppointment);
serviceAppointmentRouter.get("/me", clerkMiddleware(), requireAuth(), getServiceAppointmentsBypatient);

serviceAppointmentRouter.get("/:id", getServiceAppointmentById);
serviceAppointmentRouter.put("/:id", updateServiceAppointment);
serviceAppointmentRouter.post("/:id/cancel", cancelServiceAppointment);

export default serviceAppointmentRouter;