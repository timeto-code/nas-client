import { FaRegCheckCircle } from "react-icons/fa";

interface FormSuccessProps {
  message?: string | null;
}

const FormSuccess = ({ message }: FormSuccessProps) => {
  if (!message) return null;
  return (
    <div className="border border-green-300 p-3 rounded-md flex items-center gap-x-2 text-sm font-bold text-green-300">
      <FaRegCheckCircle className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
};

export default FormSuccess;
