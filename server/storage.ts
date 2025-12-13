import {
  type ContactMessage,
  type JobApplication,
  type InsertJobApplication,
} from "@shared/schema";

export interface IStorage {
  createContactMessage(message: { name: string; email: string; phone: string; message: string }): Promise<ContactMessage>;
  getContactMessages(): Promise<ContactMessage[]>;
  createJobApplication(application: InsertJobApplication): Promise<JobApplication>;
}

export class MemStorage implements IStorage {
  private messages: Map<number, Omit<ContactMessage, 'id'> & { id: number }>;
  private applications: Map<number, JobApplication>;
  private currentMessageId: number;
  private currentApplicationId: number;

  constructor() {
    this.messages = new Map();
    this.applications = new Map();
    this.currentMessageId = 1;
    this.currentApplicationId = 1;
  }

  async createContactMessage(message: { name: string; email: string; phone: string; message: string }): Promise<ContactMessage> {
    const id = this.currentMessageId++;
    const contactMessage: ContactMessage = {
      ...message,
      id,
      createdAt: new Date(),
    };
    this.messages.set(id, contactMessage);
    return contactMessage;
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.messages.values());
  }

  async createJobApplication(application: InsertJobApplication): Promise<JobApplication> {
    const id = this.currentApplicationId++;
    const jobApplication: JobApplication = {
      ...application,
      id,
      createdAt: new Date(),
    };
    this.applications.set(id, jobApplication);
    return jobApplication;
  }
}

export const storage = new MemStorage();