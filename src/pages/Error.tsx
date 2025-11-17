import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { AlertCircle } from "lucide-react";

const Error = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <Card className="max-w-md w-full p-8 bg-card border-border text-center">
        <div className="mb-6">
          <div className="w-20 h-20 bg-destructive/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-10 h-10 text-destructive" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Validation Not Completed
          </h2>
          <p className="text-muted-foreground">
            We could not complete your verification. Please retry.
          </p>
        </div>

        <Button
          onClick={() => navigate("/verification-form")}
          className="w-full h-12 text-lg bg-primary hover:bg-primary/90 shadow-lg shadow-primary/30"
        >
          Retry Validation
        </Button>
      </Card>
    </div>
  );
};

export default Error;
