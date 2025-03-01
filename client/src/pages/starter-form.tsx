import { useState } from "react";
import { useForm } from "react-hook-form";
import { PageTransition } from "@/components/animations/page-transition";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { CalendarIcon, Plus, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

const roles = [
  "Groundworker",
  "Machine Operator",
  "Site Supervisor",
  "Project Manager",
  "Civil Engineer",
  "Other",
];

export default function StarterForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    otherRole: "",
    qualifications: [{ type: "", qualification: "", expiryDate: "" }],
    cisNumber: "",
    bankDetails: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, role: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 4) {
      setStep(step + 1);
    }
  };

  const addQualification = () => {
    setFormData((prev) => ({
      ...prev,
      qualifications: [...prev.qualifications, { type: "", qualification: "", expiryDate: "" }],
    }));
  };

  const removeQualification = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      qualifications: prev.qualifications.filter((_, i) => i !== index),
    }));
  };

  const updateQualification = (index: number, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      qualifications: prev.qualifications.map((q, i) =>
        i === index ? { ...q, [field]: value } : q
      ),
    }));
  };

  return (
    <PageTransition>
      <div className="min-h-screen pt-20">
        <div className="container mx-auto px-4 py-12 max-w-2xl">
          {step < 4 ? (
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

              <form onSubmit={handleSubmit} className="space-y-6">
                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                  >
                    <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                  >
                    <h2 className="text-2xl font-bold mb-6">Role & Qualifications</h2>
                    <div className="space-y-2">
                      <Label htmlFor="role">Select Role</Label>
                      <Select
                        value={formData.role}
                        onValueChange={handleSelectChange}
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
                    </div>

                    {formData.role === "Other" && (
                      <div className="space-y-2">
                        <Label>Specify Role</Label>
                        <Input
                          name="otherRole"
                          value={formData.otherRole}
                          onChange={handleInputChange}
                          placeholder="Enter the role you're applying for"
                        />
                      </div>
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

                      {formData.qualifications.map((qual, index) => (
                        <div key={index} className="space-y-4 p-4 border rounded-lg relative">
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
                            <div className="space-y-2">
                              <Label>Type</Label>
                              <Input
                                value={qual.type}
                                onChange={(e) => updateQualification(index, "type", e.target.value)}
                                placeholder="e.g. CSCS, NPORS"
                              />
                            </div>

                            <div className="space-y-2">
                              <Label>Qualification</Label>
                              <Input
                                value={qual.qualification}
                                onChange={(e) => updateQualification(index, "qualification", e.target.value)}
                                placeholder="e.g. Dumper, Roller, Excavator"
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label>Expiry Date</Label>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  className={`w-full pl-3 text-left font-normal ${
                                    !qual.expiryDate && "text-muted-foreground"
                                  }`}
                                >
                                  {qual.expiryDate ? (
                                    format(new Date(qual.expiryDate), "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={qual.expiryDate ? new Date(qual.expiryDate) : undefined}
                                  onSelect={(date) =>
                                    updateQualification(index, "expiryDate", date ? date.toISOString() : "")
                                  }
                                  disabled={(date) => date < new Date()}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                          </div>
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
                    <div className="space-y-2">
                      <Label htmlFor="cisNumber">CIS Number</Label>
                      <Input
                        id="cisNumber"
                        name="cisNumber"
                        value={formData.cisNumber}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bankDetails">Bank Details</Label>
                      <Input
                        id="bankDetails"
                        name="bankDetails"
                        value={formData.bankDetails}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </motion.div>
                )}

                <div className="flex justify-end pt-6">
                  <Button type="submit">
                    {step === 3 ? "Finish" : "Continue"}
                  </Button>
                </div>
              </form>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center space-y-4"
            >
              <h2 className="text-2xl font-bold">Thank You!</h2>
              <p className="text-muted-foreground">
                We're processing your details and will be in touch shortly.
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}