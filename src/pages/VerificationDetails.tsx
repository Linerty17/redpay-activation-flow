import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Upload, Copy, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const VerificationDetails = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [receipt, setReceipt] = useState<File | null>(null);
  const [timeLeft, setTimeLeft] = useState(480); // 8 minutes in seconds

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const accountDetails = {
    accountNumber: "6957666738",
    accountName: "CHINEMEREM LIBERTY SUNDAY",
    bank: "Moniepoint MFB",
    amount: "14,900",
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard`,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setReceipt(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!receipt) {
      toast({
        title: "Missing Proof",
        description: "Please upload your verification proof.",
        variant: "destructive",
      });
      return;
    }

    navigate("/verifying");
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Card className="p-8 bg-card border-border">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-foreground mb-2">Verification Details</h1>
            <p className="text-muted-foreground">
              Review the account details below
            </p>
            
            <div className="mt-4 inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-lg">
              <Clock className="w-5 h-5 text-primary" />
              <span className="text-lg font-semibold text-primary">
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>

          <div className="space-y-6 mb-8">
            <div className="bg-background/50 rounded-lg p-6 space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Account Number</p>
                  <p className="text-lg font-semibold text-foreground">{accountDetails.accountNumber}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => copyToClipboard(accountDetails.accountNumber, "Account Number")}
                  className="hover:bg-primary/10"
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-1">Account Name</p>
                <p className="text-lg font-semibold text-foreground">{accountDetails.accountName}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-1">Bank</p>
                <p className="text-lg font-semibold text-foreground">{accountDetails.bank}</p>
              </div>

              <div className="pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground mb-1">Required Amount</p>
                <p className="text-2xl font-bold text-primary">₦{accountDetails.amount}</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="receipt">Upload Verification Proof (PNG or JPG)</Label>
                <div className="relative">
                  <Input
                    id="receipt"
                    type="file"
                    accept="image/png,image/jpeg,image/jpg"
                    onChange={handleFileChange}
                    className="bg-background cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                  />
                  {receipt && (
                    <p className="mt-2 text-sm text-muted-foreground flex items-center gap-2">
                      <Upload className="w-4 h-4" />
                      {receipt.name}
                    </p>
                  )}
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 text-lg bg-primary hover:bg-primary/90 shadow-lg shadow-primary/30"
              >
                Submit Proof
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default VerificationDetails;
