import * as React from "react";
import { cn } from "../../libs/utils";


const Button = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-all",
        className
      )}
      {...props}
    />
  );
});

Button.displayName = "Button";

export { Button };
