import ThemeSwitch from "@/components/ThemeSwitch";
import CreateFolderButton from "./CreateFolderButton";
import InputSearch from "./InputSearch";
import LeftButton from "./LeftButton";
import LogoutButton from "./LogoutButton";
import RightButton from "./RightButton";
import RootFolderButton from "./RootFolderButton";
import TableSwitchButton from "./TableSwitchButton";
import UpButton from "./UpButton";
import UploadFileButton from "./UploadFileButton";
import HomeButton from "@/components/HomeButton";

const Navbar = () => {
  return (
    <div
      className={`flex items-center justify-between h-14 min-w-[940px] px-5 border-b`}
    >
      <div className={`flex items-center gap-4`}>
        <RootFolderButton />
        <LeftButton />
        <RightButton />
        <UpButton />
        <TableSwitchButton />
        <CreateFolderButton />
        <UploadFileButton />
        <InputSearch />
      </div>
      <div className="flex items-center gap-4">
        <ThemeSwitch />
        <LogoutButton />
        <HomeButton />
      </div>
    </div>
  );
};

export default Navbar;
