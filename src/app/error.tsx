"use client";
import React from "react";
import { FC } from "react";

interface ErrorPageProps {
  error: Error;
  reset: () => void;
}

const ErrorPage: FC<ErrorPageProps> = ({ error, reset }) => {
  return (
    <div>
      <h1>Something went wrong</h1>
      <p>{error.message}</p>
      <button onClick={reset}>Try Again</button>
    </div>
  );
};

export default ErrorPage;
