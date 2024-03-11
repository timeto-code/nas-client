"use client";

import { useRouter } from "next/navigation";
import { PiGearThin } from "react-icons/pi";
import { IoMdSettings } from "react-icons/io";

const SetupGear = () => {
  const router = useRouter();

  return (
    <IoMdSettings
      size={25}
      title="设置"
      className="cursor-pointer"
      onClick={() => router.push("/setup")}
    />
  );
};

export default SetupGear;
