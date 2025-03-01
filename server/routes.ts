import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { insertContactMessageSchema, insertJobApplicationSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import { sendContactFormEmail, sendJobApplicationEmail } from "./email";

export async function registerRoutes(app: Express) {
  app.post("/api/contact", async (req, res) => {
    try {
      const data = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(data);

      // Send email
      const emailSent = await sendContactFormEmail(data);
      if (!emailSent) {
        console.error("Failed to send email notification");
      }

      res.json(message);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          message: fromZodError(error).message,
        });
      } else {
        console.error('Server error:', error);
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  app.post("/api/apply", async (req, res) => {
    try {
      const data = insertJobApplicationSchema.parse(req.body);
      const application = await storage.createJobApplication(data);

      // Send email notification
      const emailSent = await sendJobApplicationEmail(data);
      if (!emailSent) {
        console.error("Failed to send email notification");
      }

      res.json(application);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          message: fromZodError(error).message,
        });
      } else {
        console.error('Server error:', error);
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}