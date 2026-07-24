"use client";

import { useId, useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input, type InputProps } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type InputPasswordProps = Omit<InputProps, "type"> & {
  hidePasswordLabel: string;
  showPasswordLabel: string;
};

function InputPassword({
  className,
  containerClassName,
  disabled,
  errorOverlayClassName,
  hidePasswordLabel,
  id: providedId,
  isInvalid,
  showPasswordLabel,
  showErrorLabel,
  ...props
}: InputPasswordProps) {
  const generatedId = useId();
  const [isVisible, setIsVisible] = useState(false);
  const id = providedId ?? generatedId;

  return (
    <div className={cn("relative", containerClassName)}>
      <Input
        {...props}
        className={cn("pr-10", className)}
        disabled={disabled}
        errorOverlayClassName={cn("right-10", errorOverlayClassName)}
        id={id}
        isInvalid={isInvalid}
        showErrorLabel={showErrorLabel}
        type={isVisible ? "text" : "password"}
      />
      <Button
        aria-controls={id}
        aria-label={isVisible ? hidePasswordLabel : showPasswordLabel}
        aria-pressed={isVisible}
        className="absolute top-0.5 right-0.5 hover:bg-transparent"
        disabled={disabled}
        onClick={() => setIsVisible((currentValue) => !currentValue)}
        size="icon-sm"
        type="button"
        variant="ghost"
      >
        {isVisible ? <EyeOffIcon aria-hidden="true" /> : <EyeIcon aria-hidden="true" />}
      </Button>
    </div>
  );
}

export { InputPassword };
