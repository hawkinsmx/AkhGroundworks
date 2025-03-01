import { useState } from "react";
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
    qualifications: "",
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
                    <div className="space-y-2">
                      <Label htmlFor="qualifications">
                        Qualifications & Experience
                      </Label>
                      <Input
                        id="qualifications"
                        name="qualifications"
                        value={formData.qualifications}
                        onChange={handleInputChange}
                        required
                      />
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