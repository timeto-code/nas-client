"use client";

import { signOut } from "next-auth/react";
import { Button } from "../../ui/button";

const LogoutButton = () => {
  const handleLogout = async () => {
    await signOut();
  };
  return (
    <Button className="h-7" onClick={handleLogout}>
      退出
    </Button>
  );
};

export default LogoutButton;
