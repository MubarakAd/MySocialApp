"use client";
import React from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { Button } from "./ui/button";

const Mode = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      onClick={() => (theme === "dark" ? setTheme("light") : setTheme("dark"))}
      variant="ghost"
      size="icon"
    >
      <div className="relative h-[1.2rem] w-[1.2rem]">
        <Sun className="h-full w-full rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute top-0 left-0 h-full w-full rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      </div>
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

export default Mode;
