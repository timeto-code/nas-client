"use client";

import { useThemeStore } from "@/lib/stores/useThemStore";
import { useTheme } from "next-themes";
import { Switch } from "./ui/switch";
import { useState } from "react";
import { PiSunDimFill } from "react-icons/pi";
import { MdDarkMode } from "react-icons/md";
const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme();
  const [isChecked, setIsChecked] = useState(false);

  const handleThemeChange = (checked: boolean) => {
    if (checked) {
      setIsChecked(true);
      setTheme("dark");
      useThemeStore.setState({ theme: "dark" });
    } else {
      setIsChecked(false);
      setTheme("light");
      useThemeStore.setState({ theme: "light" });
    }
  };

  return (
    <div className="relative flex items-center">
      {isChecked ? (
        <MdDarkMode className="dark:text-gray-500 absolute top-1 left-1 pointer-events-none" />
      ) : (
        <PiSunDimFill className="text-white w-5 h-5 absolute top-[2px] right-[2px] pointer-events-none" />
      )}
      <Switch
        id="airplane-mode"
        checked={theme === "dark" || isChecked}
        className=" dark:bg-gray-800"
        onCheckedChange={handleThemeChange}
      />
    </div>
  );
};

export default ThemeSwitch;
