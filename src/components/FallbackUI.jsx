import React from "react";

import { Loader2 } from "lucide-react";
const FallbackUI = () => {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <Loader2 className="animate-spin text-black text-3xl" />
    </div>
  );
};

export default FallbackUI;
