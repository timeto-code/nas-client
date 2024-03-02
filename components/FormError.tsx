import { FiAlertTriangle } from "react-icons/fi";

interface FormErrorProps {
  message?: string | null;
}

const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null;
  return (
    <div className="border border-red-700 p-3 rounded-md flex items-center gap-x-2 text-sm font-bold text-red-700">
      <FiAlertTriangle className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
};

export default FormError;
