import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { insertContactMessageSchema, insertJobApplicationSchema, starterFormSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import { sendContactFormEmail, sendJobApplicationEmail, sendStarterFormEmail } from "./email";

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

  app.post("/api/starter-form", async (req, res) => {
    try {
      console.log('Received starter form data:', { ...req.body, accountNumber: '****' });

      const data = starterFormSchema.parse(req.body);
      console.log('Data parsed successfully with schema');

      // Attempt to send email notification (non-blocking)
      const emailSent = await sendStarterFormEmail(data);
      console.log('Email sending attempt completed, result:', emailSent);

      if (!emailSent) {
        console.warn("Email notification failed - submission still accepted. Please set up SendGrid domain authentication.");
      }

      // Always return success to the user - their submission is valid
      res.json({ 
        message: "Starter form submitted successfully",
        emailSent: emailSent
      });
    } catch (error) {
      console.error('Error processing starter form:', error);

      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        console.error('Validation error:', validationError);
        res.status(400).json({
          message: validationError.message,
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