import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const VerificationForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    accountNumber: "",
    accountName: "",
    bank: "",
    email: "",
    userId: "",
    rpcCode: "",
    receipt: null as File | null,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.accountNumber || !formData.accountName || !formData.bank || 
        !formData.email || !formData.userId || !formData.rpcCode || !formData.receipt) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields and upload a receipt.",
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

    navigate("/verifying");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, receipt: e.target.files[0] });
    }
  };

  const banks = [
    "Access Bank", "First Bank", "GTBank", "UBA", "Zenith Bank",
    "Moniepoint MFB", "Kuda Bank", "Sterling Bank", "Wema Bank"
  ];

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
              <Label htmlFor="accountNumber">Account Number</Label>
              <Input
                id="accountNumber"
                type="text"
                value={formData.accountNumber}
                onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                placeholder="Enter your account number"
                className="bg-background"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="accountName">Account Name</Label>
              <Input
                id="accountName"
                type="text"
                value={formData.accountName}
                onChange={(e) => setFormData({ ...formData, accountName: e.target.value })}
                placeholder="Enter your account name"
                className="bg-background"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bank">Select Bank</Label>
              <Select value={formData.bank} onValueChange={(value) => setFormData({ ...formData, bank: value })}>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Choose your bank" />
                </SelectTrigger>
                <SelectContent>
                  {banks.map((bank) => (
                    <SelectItem key={bank} value={bank}>
                      {bank}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
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
              <Label htmlFor="receipt">Upload Proof (PNG or JPG)</Label>
              <div className="relative">
                <Input
                  id="receipt"
                  type="file"
                  accept="image/png,image/jpeg,image/jpg"
                  onChange={handleFileChange}
                  className="bg-background cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                />
                {formData.receipt && (
                  <p className="mt-2 text-sm text-muted-foreground flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    {formData.receipt.name}
                  </p>
                )}
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-lg bg-primary hover:bg-primary/90 shadow-lg shadow-primary/30"
            >
              Submit Verification
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default VerificationForm;
