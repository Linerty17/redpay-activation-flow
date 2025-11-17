import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md text-center space-y-8">
        {/* Logo */}
        <div className="relative w-24 h-24 mx-auto mb-8">
          <div className="absolute inset-0 bg-primary rounded-full blur-2xl opacity-50 animate-pulse"></div>
          <div className="relative bg-gradient-to-br from-primary to-primary/80 rounded-full w-24 h-24 flex items-center justify-center shadow-lg shadow-primary/50">
            <span className="text-4xl font-bold text-primary-foreground">RP</span>
          </div>
        </div>

        {/* Title */}
        <div className="space-y-3">
          <h1 className="text-4xl font-bold text-foreground">RedPay Validation</h1>
          <p className="text-muted-foreground text-lg">
            Start your verification process.
          </p>
        </div>

        {/* Button */}
        <Button
          onClick={() => navigate("/processing")}
          size="lg"
          className="w-full text-lg h-14 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/30 transition-all duration-300"
        >
          Begin
        </Button>
      </div>
    </div>
  );
};

export default Welcome;
