import { pgTable, text, serial, timestamp, date } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertContactMessageSchema = createInsertSchema(contactMessages).pick({
  name: true,
  email: true,
  phone: true,
  message: true,
}).extend({
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
export type ContactMessage = typeof contactMessages.$inferSelect;

export const jobApplications = pgTable("job_applications", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  role: text("role").notNull(),
  otherRole: text("other_role"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertJobApplicationSchema = createInsertSchema(jobApplications).extend({
  qualifications: z.array(
    z.object({
      type: z.string().min(1, "Qualification type is required"),
      qualification: z.string().min(1, "Qualification details are required"),
      expiryDate: z.string().min(1, "Expiry date is required"),
    })
  ),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  role: z.enum(["Groundworker", "Plant Operator", "Supervisor", "Other"]),
  otherRole: z.string().optional(),
});

export type InsertJobApplication = z.infer<typeof insertJobApplicationSchema>;
export type JobApplication = typeof jobApplications.$inferSelect;
export type Qualification = typeof qualifications.$inferSelect;

export const qualifications = pgTable("qualifications", {
  id: serial("id").primaryKey(),
  applicationId: serial("application_id").references(() => jobApplications.id),
  type: text("type").notNull(),
  qualification: text("qualification").notNull(),
  expiryDate: date("expiry_date").notNull(),
});

export const starterFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  role: z.enum(["Groundworker", "Plant Operator", "Supervisor", "Other"]),
  otherRole: z.string().optional(),
  qualifications: z.array(z.object({
    type: z.string().min(1, "Qualification type is required"),
    qualification: z.string().min(1, "Qualification is required"),
    registrationNumber: z.string().min(1, "Registration number is required"),
    expiryDate: z.string().min(1, "Expiry date is required"),
    photo: z.any().optional() 
  })),
  cisNumber: z.string().min(1, "CIS number is required"),
  bankDetails: z.string().min(1, "Bank details are required")
});

export type StarterFormData = z.infer<typeof starterFormSchema>;