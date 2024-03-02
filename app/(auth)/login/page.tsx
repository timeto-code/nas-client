import LoginForm from "@/components/auth/LoginForm";
import styles from "@/styles/util.module.scss";

const page = () => {
  return (
    <div
      className={`relative h-full py-12 bg-[url('/images/bg-reverse.jpg')] bg-no-repeat bg-center bg-cover overflow-auto ${styles.hideScrollbar}`}
    >
      <div className="flex justify-center">
        <LoginForm />
      </div>
    </div>
  );
};

export default page;
