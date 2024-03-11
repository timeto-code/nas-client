"use client";

import { signOut } from "next-auth/react";
import { RiLogoutBoxRLine } from "react-icons/ri";

const LogoutButton = () => {
  const handleLogout = async () => {
    await signOut();
  };
  return (
    // <Button className="h-7" onClick={handleLogout}>
    //   退出
    // </Button>
    <RiLogoutBoxRLine
      className="cursor-pointer hover:scale-110 transition-all duration-300 ease-in-out"
      title="退出"
      size={24}
      onClick={handleLogout}
    />
  );
};

export default LogoutButton;
