import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import redpayLogo from "@/assets/redpay-logo.png";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md text-center space-y-8">
        {/* Logo */}
        <div className="relative w-48 h-48 mx-auto mb-8">
          <img src={redpayLogo} alt="RedPay Logo" className="w-full h-full object-contain" />
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
