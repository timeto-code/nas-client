import React from "react";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";

const LogoutButton = () => {
  const handleLogout = async () => {
    await signOut({
      redirect: true,
      callbackUrl: "/logout",
    });
  };
  return (
    <Button className="h-8" onClick={handleLogout}>
      退出
    </Button>
  );
};

export default LogoutButton;
