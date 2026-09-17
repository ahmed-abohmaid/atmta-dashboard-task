"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";
import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar";
import { cn } from "@/lib/utils";

function Avatar({
  className,
  ...props
}: AvatarPrimitive.Root.Props) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(
        "relative flex size-8 shrink-0 overflow-hidden rounded-full select-none bg-muted",
        className
      )}
      {...props}
    />
  );
}

interface AvatarImageProps extends Omit<ImageProps, "src"> {
  src?: string | null;
  alt: string;
}

function AvatarImage({
  src,
  alt,
  className,
  width = 64,
  height = 64,
  ...props
}: AvatarImageProps) {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return null;
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      onError={() => setHasError(true)}
      className={cn("aspect-square size-full object-cover", className)}
      {...props}
    />
  );
}

function AvatarFallback({
  className,
  ...props
}: AvatarPrimitive.Fallback.Props) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "flex size-full items-center justify-center rounded-full bg-primary/15 text-primary border border-primary/25 text-xs font-normal",
        className
      )}
      {...props}
    />
  );
}

export { Avatar, AvatarImage, AvatarFallback };
