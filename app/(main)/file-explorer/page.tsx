import { auth } from "@/auth";
import ConfirmDialog from "@/components/ConfirmDialog";
import FolderPage from "@/components/file-explorer/content/FolderPage";
import Navbar from "@/components/file-explorer/navbar/Navbar";
import { Suspense } from "react";

const page = async () => {
  const session = await auth();

  if (!session) return null;

  return (
    <div className="h-full w-full flex flex-col relative pt-14">
      <div className="absolute top-0 inset-x-0 h-14 w-full">
        <Navbar />
      </div>
      <div className="h-full">
        <Suspense fallback={<div>Loading...</div>}>
          <FolderPage user={session.user} />
        </Suspense>
      </div>
      <ConfirmDialog />
    </div>
  );
};

export default page;
