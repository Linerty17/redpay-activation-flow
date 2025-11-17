import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const VerificationForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    userId: "",
    rpcCode: "",
    phoneNumber: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.fullName || !formData.email || !formData.userId || 
        !formData.rpcCode || !formData.phoneNumber) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    if (formData.userId.length !== 10) {
      toast({
        title: "Invalid User ID",
        description: "User ID must be exactly 10 digits.",
        variant: "destructive",
      });
      return;
    }

    navigate("/verification-details");
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Card className="p-8 bg-card border-border">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-foreground mb-2">RedPay Validation</h1>
            <p className="text-muted-foreground">
              Activate your RedPay account to complete validation.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="Enter your full name"
                className="bg-background"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your.email@example.com"
                className="bg-background"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="userId">User ID (10 digits)</Label>
              <Input
                id="userId"
                type="text"
                maxLength={10}
                value={formData.userId}
                onChange={(e) => setFormData({ ...formData, userId: e.target.value.replace(/\D/g, '') })}
                placeholder="Enter 10-digit User ID"
                className="bg-background"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rpcCode">RPC Code</Label>
              <Input
                id="rpcCode"
                type="text"
                value={formData.rpcCode}
                onChange={(e) => setFormData({ ...formData, rpcCode: e.target.value })}
                placeholder="Enter your RPC code"
                className="bg-background"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                type="tel"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                placeholder="Enter your phone number"
                className="bg-background"
              />
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-lg bg-primary hover:bg-primary/90 shadow-lg shadow-primary/30"
            >
              Continue
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default VerificationForm;
