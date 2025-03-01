import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertJobApplicationSchema, type InsertJobApplication } from "@shared/schema";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Plus, Trash2 } from "lucide-react";
import { PageTransition } from "@/components/animations/page-transition";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { motion } from "framer-motion";

const roles = ["Groundworker", "Plant Operator", "Supervisor", "Other"] as const;

export default function Apply() {
  const { toast } = useToast();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const form = useForm<InsertJobApplication>({
    resolver: zodResolver(insertJobApplicationSchema),
    defaultValues: {
      name: "",
      email:"",
      role: "Groundworker",
      otherRole: "",
      qualifications: [{ type: "", qualification: "", expiryDate: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "qualifications",
  });

  const mutation = useMutation({
    mutationFn: async (data: InsertJobApplication) => {
      await apiRequest("POST", "/api/apply", data);
    },
    onSuccess: () => {
      toast({
        title: "Application Submitted",
        description: "We'll review your application and get back to you soon.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive",
      });
    },
  });

  return (
    <PageTransition>
      <div className="min-h-screen pt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto">
            <ScrollReveal>
              <h1 className="text-4xl font-bold mb-8">Apply Now</h1>
              <p className="text-lg text-muted-foreground mb-8">
                Join our team at AKH Groundworks. Fill out the application form below
                and we'll get back to you as soon as possible.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit((data) => mutation.mutate(data))}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex gap-1">
                          Full Name
                          <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter your full name" 
                            {...field} 
                            required
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex gap-1">
                          Email
                          <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input 
                            type="email" 
                            placeholder="Enter your email address" 
                            {...field}
                            required
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex gap-1">
                          Role
                          <span className="text-destructive">*</span>
                        </FormLabel>
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value);
                            setSelectedRole(value);
                          }}
                          defaultValue={field.value}
                          required
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a role" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {roles.map((role) => (
                              <SelectItem key={role} value={role}>
                                {role}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {selectedRole === "Other" && (
                    <FormField
                      control={form.control}
                      name="otherRole"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Specify Role</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter the role you're applying for" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Qualifications</h3>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => append({ type: "", qualification: "", expiryDate: "" })}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Qualification
                      </Button>
                    </div>

                    {fields.map((field, index) => (
                      <div key={field.id} className="space-y-4 p-4 border rounded-lg relative">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-2"
                          onClick={() => remove(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>

                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name={`qualifications.${index}.type`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Type</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g. CSCS, NPORS" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name={`qualifications.${index}.qualification`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Qualification</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g. Dumper, Roller, Excavator" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name={`qualifications.${index}.expiryDate`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Expiry Date</FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant="outline"
                                      className={`w-full pl-3 text-left font-normal ${
                                        !field.value && "text-muted-foreground"
                                      }`}
                                    >
                                      {field.value ? (
                                        format(new Date(field.value), "PPP")
                                      ) : (
                                        <span>Pick a date</span>
                                      )}
                                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                  <Calendar
                                    mode="single"
                                    selected={field.value ? new Date(field.value) : undefined}
                                    onSelect={(date) =>
                                      field.onChange(date ? date.toISOString() : "")
                                    }
                                    disabled={(date) => date < new Date()}
                                    initialFocus
                                  />
                                </PopoverContent>
                              </Popover>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    ))}
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={mutation.isPending}
                  >
                    {mutation.isPending ? "Submitting..." : "Submit Application"}
                  </Button>
                </form>
              </Form>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}