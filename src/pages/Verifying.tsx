import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const Verifying = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/error");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="text-center space-y-8">
        <Loader2 className="w-16 h-16 text-primary animate-spin mx-auto" />
        <h2 className="text-2xl font-semibold text-foreground">
          Processing your validation…
        </h2>
      </div>
    </div>
  );
};

export default Verifying;
