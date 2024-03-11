import React from "react";
import Spinner from "../Spinner";
import { IoCheckmark } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";

interface Props {
  isPending: boolean;
  isSuccessed: boolean;
}

const InputStatus = ({ isPending, isSuccessed }: Props) => {
  return (
    <span>
      {isPending ? (
        <Spinner className="h-4 w-4 animate-spin text-[#339900]" />
      ) : isSuccessed ? (
        <IoCheckmark className="h-4 w-4 text-[#339900]" />
      ) : (
        <IoMdClose className="h-4 w-4 text-[#ff0000]" />
      )}
    </span>
  );
};

export default InputStatus;
