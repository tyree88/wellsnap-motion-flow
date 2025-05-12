
import { MotionBox } from "@/components/Motion";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4">
      <MotionBox>
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-indigo-900">WellSnap Health</h1>
          <p className="text-xl text-indigo-700 mb-6">Your wellness journey starts here</p>
          <Button className="bg-indigo-600 hover:bg-indigo-700">
            Get Started
          </Button>
        </div>
      </MotionBox>
    </div>
  );
};

export default Index;
