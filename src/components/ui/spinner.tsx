import React from "react";
import { cn } from "@/lib/utils";

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  color?: "primary" | "secondary" | "muted";
  className?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({
  size = "md",
  color = "primary",
  className,
}) => {
  const sizes = {
    sm: "w-4 h-4 border-2",
    md: "w-6 h-6 border-4",
    lg: "w-8 h-8 border-4",
  };

  const colors = {
    primary: "border-t-blue-500",
    secondary: "border-t-gray-500",
    muted: "border-t-gray-300",
  };

  return (
    <div
      className={cn(
        "inline-block animate-spin rounded-full border-t-transparent border-solid",
        sizes[size],
        colors[color],
        className
      )}
      role="status"
      aria-label="Loading"
    />
  );
};
