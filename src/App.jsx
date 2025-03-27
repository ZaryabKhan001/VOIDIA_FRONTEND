import React, { Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { FallbackUI, Header } from "./components/index.js";
import ErrorBoundaryWrapper from "./errorBoundary/ErrorBoundaryWrapper.jsx";
import { Toaster } from "@/components/ui/sonner";

function App() {
  const location = useLocation();
  const showHeader = ["/signup", "/login", "/*"].includes(location.pathname);

  return (
    <ErrorBoundaryWrapper>
      <Suspense fallback={<FallbackUI />}>
        <div className="max-w-[1440px] px-4 md:px-10 mx-auto">
          {!showHeader && <Header />}
          <Outlet />
        </div>
        <Toaster />
      </Suspense>
    </ErrorBoundaryWrapper>
  );
}

export default App;
