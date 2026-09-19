"use client";

import { useRef, useState, type ComponentPropsWithoutRef } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface TruncatedTextProps extends ComponentPropsWithoutRef<"span"> {
  text: string;
  side?: "top" | "bottom" | "left" | "right";
}

export function TruncatedText({ text, className, side = "top", ...props }: TruncatedTextProps) {
  const [isTruncated, setIsTruncated] = useState(false);
  const textRef = useRef<HTMLSpanElement>(null);

  const checkTruncation = () => {
    if (textRef.current) {
      const { scrollWidth, clientWidth, scrollHeight, clientHeight } = textRef.current;
      setIsTruncated(scrollWidth > clientWidth || scrollHeight > clientHeight);
    }
  };

  const isLineClamped = className?.includes("line-clamp");

  const spanElement = (
    <span
      ref={textRef}
      onMouseEnter={checkTruncation}
      className={cn("block", !isLineClamped && "truncate", className)}
      {...props}
    >
      {text}
    </span>
  );

  if (!isTruncated) {
    return spanElement;
  }

  return (
    <Tooltip>
      <TooltipTrigger render={spanElement} />
      <TooltipContent side={side}>{text}</TooltipContent>
    </Tooltip>
  );
}
