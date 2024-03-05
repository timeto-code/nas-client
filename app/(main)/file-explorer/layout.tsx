import Toast from "@/components/Toast";
import SidbarForUser from "@/components/file-explorer/sidbar/SidbarForUser";
import React, { Suspense } from "react";

interface Props {
  children: React.ReactNode;
}

const layout = async ({ children }: Props) => {
  return (
    // <div className={`h-full relative ${styles.layoutBG}`}>
    <div className="h-full relative">
      <div className="h-full flex relative pl-64">
        <div className="absolute inset-y-0 left-0 z-40 h-full w-64">
          <Suspense fallback={<div>Loading...</div>}>
            <SidbarForUser />
          </Suspense>
        </div>
        <div className="h-full w-full relative">{children}</div>
      </div>
      <Toast />
    </div>
  );
};

export default layout;
