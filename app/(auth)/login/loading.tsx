import styles from "@/styles/util.module.scss";

const loading = () => {
  return (
    <div
      className={`relative h-full py-12 bg-[url('/images/bg-reverse.jpg')] bg-no-repeat bg-center bg-cover overflow-auto ${styles.hideScrollbar}`}
    >
      <div className="flex justify-center">Loading...</div>
    </div>
  );
};

export default loading;
