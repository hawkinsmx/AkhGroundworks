import { useRef, useEffect, useState, useCallback } from "react";
import { Link } from "wouter";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { starterFormSchema, type StarterFormData } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PageTransition } from "@/components/animations/page-transition";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Plus, Trash2, Upload } from "lucide-react";
import { motion } from "framer-motion";

declare global {
  interface Window {
    hcaptcha?: any;
    onHCaptchaLoadStarter?: () => void;
  }
}

const roles = ["Groundworker", "Plant Operator", "Supervisor", "Other"] as const;
const HCAPTCHA_SITE_KEY = import.meta.env.VITE_HCAPTCHA_SITE_KEY || '10000000-ffff-ffff-ffff-000000000001';

export default function StarterForm() {
  const [step, setStep] = useState(1);
  const { toast } = useToast();
  const captchaContainerRef = useRef<HTMLDivElement>(null);
  const [widgetId, setWidgetId] = useState<string | null>(null);
  const [captchaToken, setCaptchaToken] = useState<string>("");

  const renderCaptcha = useCallback(() => {
    if (step === 3 && captchaContainerRef.current && window.hcaptcha && widgetId === null) {
      const id = window.hcaptcha.render(captchaContainerRef.current, {
        sitekey: HCAPTCHA_SITE_KEY,
        theme: 'light',
        callback: (token: string) => {
          setCaptchaToken(token);
        },
        'expired-callback': () => {
          setCaptchaToken("");
        }
      });
      setWidgetId(id);
    }
  }, [step, widgetId]);

  useEffect(() => {
    if (step !== 3) return;

    const existingScript = document.querySelector('script[src*="hcaptcha.com"]');
    if (existingScript) {
      if (window.hcaptcha) {
        renderCaptcha();
      }
      return;
    }

    window.onHCaptchaLoadStarter = () => {
      renderCaptcha();
    };

    const script = document.createElement('script');
    script.src = 'https://js.hcaptcha.com/1/api.js?onload=onHCaptchaLoadStarter&render=explicit';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      window.onHCaptchaLoadStarter = undefined;
    };
  }, [step, renderCaptcha]);

  const form = useForm<StarterFormData>({
    resolver: zodResolver(starterFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      role: "Groundworker",
      otherRole: "",
      qualifications: [{
        type: "",
        qualification: "",
        registrationNumber: "",
        expiryDate: "",
        photo: null,
      }],
      cisNumber: "",
      accountName: "",
      sortCode: "",
      accountNumber: "",
      niNumber: "",
      hcaptchaToken: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "qualifications",
  });

  const handleNext = async () => {
    try {
      let fieldsToValidate: Array<keyof StarterFormData> = [];

      switch (step) {
        case 1:
          fieldsToValidate = ['name', 'email', 'phone'];
          break;
        case 2:
          fieldsToValidate = ['role'];
          break;
        case 3:
          fieldsToValidate = ['cisNumber', 'accountName', 'sortCode', 'accountNumber', 'niNumber'];
          break;
      }

      const isValid = await form.trigger(fieldsToValidate);

      if (isValid) {
        setStep(step + 1);
      } else {
        toast({
          title: "Validation Error",
          description: "Please fill in all required fields correctly.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error during form validation:', error);
      toast({
        title: "Error",
        description: "An error occurred while validating the form.",
        variant: "destructive",
      });
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const onSubmit = async (data: StarterFormData) => {
    if (step < 3) {
      await handleNext();
      return;
    }

    try {
      if (!captchaToken) {
        toast({
          title: "Error",
          description: "Please complete the hCaptcha verification",
          variant: "destructive",
        });
        return;
      }

      const submitData = { ...data, hcaptchaToken: captchaToken };

      const response = await fetch('/api/starter-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit form');
      }

      toast({
        title: "Success",
        description: "Your form has been submitted successfully.",
      });

      form.reset();
      setCaptchaToken("");
      if (window.hcaptcha && widgetId !== null) {
        window.hcaptcha.reset(widgetId);
      }
      setStep(4);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : 'Failed to submit form. Please try again.',
        variant: "destructive",
      });
    }
  };

  const addQualification = () => {
    append({
      type: "",
      qualification: "",
      registrationNumber: "",
      expiryDate: "",
      photo: null,
    });
  };

  const removeQualification = (index: number) => {
    remove(index);
  };

  const updateQualification = (index: number, field: 'type' | 'qualification' | 'registrationNumber' | 'expiryDate' | 'photo', value: string | File | null) => {
    form.setValue(`qualifications.${index}.${field}` as any, value);
  };

  const handlePhotoChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    updateQualification(index, "photo", file);
  };

  return (
    <PageTransition>
      <div className="min-h-screen pt-20">
        <div className="container mx-auto px-4 py-12 max-w-2xl">
          {step < 4 ? (
            <Form {...form}>
              <div className="space-y-8">
                <div className="flex justify-between items-center mb-8">
                  {[1, 2, 3].map((s) => (
                    <div
                      key={s}
                      className={`h-3 w-3 rounded-full ${
                        s <= step ? "bg-primary" : "bg-muted"
                      }`}
                    />
                  ))}
                </div>

                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {step === 1 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-4"
                    >
                      <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Enter your full name" />
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
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input {...field} type="email" placeholder="your@email.com" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input {...field} type="tel" placeholder="Your phone number" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-4"
                    >
                      <h2 className="text-2xl font-bold mb-6">Role & Qualifications</h2>
                      <FormField
                        control={form.control}
                        name="role"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel htmlFor="role">Select Role</FormLabel>
                            <Select
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select a role" />
                              </SelectTrigger>
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

                      {form.watch("role") === "Other" && (
                        <FormField
                          control={form.control}
                          name="otherRole"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Specify Role</FormLabel>
                              <Input
                                {...field}
                                placeholder="Enter the role you're applying for"
                              />
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
                            onClick={addQualification}
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Add Qualification
                          </Button>
                        </div>

                        {fields.map((qual, index) => (
                          <div key={qual.id} className="space-y-4 p-4 border rounded-lg relative">
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute right-2 top-2"
                              onClick={() => removeQualification(index)}
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
                                    <Input
                                      {...field}
                                      placeholder="e.g. CSCS, NPORS"
                                    />
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
                                    <Input
                                      {...field}
                                      placeholder="e.g. Dumper, Roller, Excavator"
                                    />
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>

                            <FormField
                              control={form.control}
                              name={`qualifications.${index}.registrationNumber`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Registration Number</FormLabel>
                                  <Input {...field} placeholder="Enter registration number" />
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name={`qualifications.${index}.expiryDate`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Expiry Date</FormLabel>
                                  <Popover>
                                    <PopoverTrigger asChild>
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
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                      <Calendar
                                        mode="single"
                                        selected={field.value ? new Date(field.value) : undefined}
                                        onSelect={(date) => field.onChange(date ? date.toISOString() : "")}
                                        disabled={(date) => date < new Date()}
                                        initialFocus
                                      />
                                    </PopoverContent>
                                  </Popover>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name={`qualifications.${index}.photo`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Photo</FormLabel>
                                  <div className="flex items-center gap-2">
                                    <Input
                                      type="file"
                                      accept="image/*"
                                      {...field}
                                      className="hidden"
                                      id={`photo-${index}`}
                                    />
                                    <label
                                      htmlFor={`photo-${index}`}
                                      className="flex items-center gap-2 px-4 py-2 bg-muted hover:bg-muted/80 rounded-md cursor-pointer"
                                    >
                                      <Upload className="h-4 w-4" />
                                      {field.value ? 'Change Photo' : 'Upload Photo'}
                                    </label>
                                    {field.value && (
                                      <span className="text-sm text-muted-foreground">
                                        {(field.value as File).name}
                                      </span>
                                    )}
                                  </div>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-4"
                    >
                      <h2 className="text-2xl font-bold mb-6">Payment Details</h2>

                      <FormField
                        control={form.control}
                        name="niNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel htmlFor="niNumber" className="flex gap-1">
                              National Insurance Number
                              <span className="text-destructive">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="e.g. QQ123456C"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="cisNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel htmlFor="cisNumber" className="flex gap-1">
                              UTR Number
                              <span className="text-destructive">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Enter your UTR number"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="accountName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel htmlFor="accountName" className="flex gap-1">
                              Name on Account
                              <span className="text-destructive">*</span>
                            </FormLabel>
                            <Input
                              id="accountName"
                              {...field}
                              required
                            />
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="sortCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel htmlFor="sortCode" className="flex gap-1">
                              Sort Code
                              <span className="text-destructive">*</span>
                            </FormLabel>
                            <Input
                              id="sortCode"
                              {...field}
                              placeholder="XX-XX-XX"
                              required
                            />
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="accountNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel htmlFor="accountNumber" className="flex gap-1">
                              Account Number
                              <span className="text-destructive">*</span>
                            </FormLabel>
                            <Input
                              id="accountNumber"
                              {...field}
                              placeholder="8 digits"
                              required
                            />
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        ref={captchaContainerRef}
                      />
                    </motion.div>
                  )}

                  <div className="flex justify-between pt-6">
                    {step > 1 && (
                      <Button type="button" variant="outline" onClick={handleBack}>
                        Back
                      </Button>
                    )}
                    <Button 
                      type="button"
                      onClick={step === 3 ? form.handleSubmit(onSubmit) : handleNext}
                      className={step === 1 ? 'w-full' : ''}
                    >
                      {step === 3 ? "Submit" : "Continue"}
                    </Button>
                  </div>
                </form>
              </div>
            </Form>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center space-y-4"
            >
              <h2 className="text-2xl font-bold">Thank You!</h2>
              <p className="text-muted-foreground mb-8">
                We're processing your details and will be in touch shortly.
              </p>
              <Link href="/">
                <Button className="mx-auto">Return to Home</Button>
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
