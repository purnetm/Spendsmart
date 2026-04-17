"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextEffectProps {
  children: string;
  className?: string;
  delay?: number;
  per?: "word" | "char";
}

export function TextEffect({
  children,
  className,
  delay = 0,
  per = "word",
}: TextEffectProps) {
  const tokens = per === "char" ? children.split("") : children.split(" ");

  return (
    <span className={cn("inline", className)}>
      {tokens.map((token, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 0.4,
            ease: "easeOut",
            delay: delay + i * (per === "char" ? 0.03 : 0.07),
          }}
          className="inline-block"
        >
          {token}
          {per === "word" && i < tokens.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </span>
  );
}
