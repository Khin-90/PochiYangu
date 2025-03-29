import * as React from "react";
import { cn } from "../../libs/utils";

const Card = ({ className, children }) => {
  return <div className={cn("bg-white shadow-md rounded-lg p-4", className)}>{children}</div>;
};

const CardContent = ({ className, children }) => {
  return <div className={className}>{children}</div>;
};

export { Card, CardContent };
