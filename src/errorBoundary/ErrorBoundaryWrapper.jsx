import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallbackUI from "./ErrorFallbackUI";
const ErrorBoundaryWrapper = ({ children }) => {
  return (
    <ErrorBoundary fallback={<ErrorFallbackUI />}>{children}</ErrorBoundary>
  );
};

export default ErrorBoundaryWrapper;
