import {
  checkServerAddress,
  setJwtAudience,
  setJwtIssuer,
  setJwtSubject,
} from "@/actions/setup/fileExplorerSetup";
import styles from "@/styles/Setup.module.scss";
import React, { useState, useTransition } from "react";
import { IoAlertCircleOutline } from "react-icons/io5";
import { Label } from "../ui/label";
import InputStatus from "./InputStatus";

interface Props {
  label: string;
  title?: string;
  placeholder?: string;
  actionName?: string;
}

const SetupInput = ({ label, title, placeholder, actionName }: Props) => {
  const [isPending, startTransition] = useTransition();
  const [isSuccessed, setIsSuccess] = useState(true);
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === "NumpadEnter") {
      handleSave();
    }
  };

  const handleSave = () => {
    startTransition(async () => {
      try {
        if (!value) return;
        let res;

        switch (actionName) {
          case "checkServerAddress":
            res = await checkServerAddress(value);
            break;
          case "setJwtSubject":
            res = await setJwtSubject(value);
            break;
          case "setJwtIssuer":
            res = await setJwtIssuer(value);
            break;
          case "setJwtAudience":
            res = await setJwtAudience(value);
            break;
        }

        if (res && res.status === 200) {
          setIsSuccess(true);
        } else {
          setIsSuccess(false);
        }
      } catch (error) {
        setIsSuccess(false);
      }
    });
  };

  return (
    <div className="flex h-[52px] flex-col pt-[5px] relative">
      <Label htmlFor="audience" className="flex items-center">
        <span>{label}</span>
        <div title={title} className="ml-1 cursor-pointer">
          <IoAlertCircleOutline />
        </div>
      </Label>
      <input
        id="audience"
        className={`border-b h-7 border-t-0 border-l-0 border-r-0 rounded-none p-0 focus:outline-none focus:ring-0 outline-none ring-0 bg-transparent text-base ${styles.input}`}
        onChange={handleChange}
        onBlur={handleSave}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={isPending}
      />

      <span className="absolute top-[25px] right-1">
        <InputStatus isPending={isPending} isSuccessed={isSuccessed} />
      </span>
    </div>
  );
};

export default SetupInput;
