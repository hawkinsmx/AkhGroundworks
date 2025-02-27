import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { insertContactMessageSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";
import { sendContactFormEmail } from "./email";

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
      if (error instanceof Error) {
        res.status(400).json({
          message: fromZodError(error).message,
        });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}