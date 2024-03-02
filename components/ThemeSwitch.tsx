"use client";

import { useThemeStore } from "@/lib/stores/store";
import { useTheme } from "next-themes";
import LogoutButton from "./auth/LogoutButton";
import { Switch } from "./ui/switch";

const ThemeSwitch = () => {
  const { setTheme } = useTheme();

  const handleThemeChange = (checked: boolean) => {
    if (checked) {
      setTheme("dark");
      useThemeStore.setState({ theme: "dark" });
    } else {
      setTheme("light");
      useThemeStore.setState({ theme: "light" });
    }
  };

  return (
    <div className="fixed bottom-12 right-12 flex items-center space-x-2">
      <Switch
        id="airplane-mode"
        className="dark:bg-gray-800"
        onCheckedChange={handleThemeChange}
      />
      <LogoutButton />
    </div>
  );
};

export default ThemeSwitch;
