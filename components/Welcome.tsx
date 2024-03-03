import { User } from "next-auth";

interface Props {
  user: User;
}

const Welcome = ({ user }: Props) => {
  // 检查现在的时间，然后返回不同的问候语
  const now = new Date();
  const hours = now.getHours();
  if (hours < 12) {
    return <div>{user.name} 上午好 🌞</div>;
  } else if (hours < 18) {
    return <div>{user.name} 下午好 🌥️</div>;
  } else {
    return <div>{user.name} 晚上好 🌙</div>;
  }
};

export default Welcome;
