"use client";

import React, { useEffect, useRef } from "react";
import { useToast } from "./ui/use-toast";
import { Button } from "./ui/button";
import { useToastStore } from "@/lib/stores/useToastStore";

const Toast = () => {
  const ref = useRef<HTMLButtonElement | null>(null);
  const { toast } = useToast();
  const title = useToastStore((state) => state.title);
  const description = useToastStore((state) => state.description);
  const varient = useToastStore((state) => state.varient);
  const refresh = useToastStore((state) => state.refresh);

  useEffect(() => {
    if (description) {
      ref.current?.click();
    }
  }, [title, description, refresh]);

  return (
    <Button
      className="hidden"
      ref={ref}
      variant="outline"
      onClick={() => {
        toast({
          description,
          className: "rounded-lg my-1 p-4",
          duration: 4000,
          variant: varient,
        });
      }}
    >
      Show Toast
    </Button>
  );
};

export default Toast;
