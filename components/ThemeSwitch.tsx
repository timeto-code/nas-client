"use client";

import { useTheme } from "next-themes";
import { Switch } from "./ui/switch";
import LogoutButton from "./auth/LogoutButton";

const ThemeSwitch = () => {
  const { setTheme } = useTheme();

  const handleThemeChange = (checked: boolean) => {
    if (checked) {
      setTheme("dark");
    } else {
      setTheme("light");
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
