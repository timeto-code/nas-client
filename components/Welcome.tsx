import { User } from "next-auth";

interface Props {
  user: User;
}

const Welcome = ({ user }: Props) => {
  // 检查现在的时间，然后返回不同的问候语
  const now = new Date();
  const hours = now.getHours();
  if (hours < 5) {
    return (
      // <div>深夜了，{user.name}，应该好好休息了，美好的梦想在等着你 🌌</div>
      <div>{user.name}，晚上好 🌌</div>
    );
  } else if (hours < 8) {
    return (
      // <div>
      //   美好的清晨，{user.name}，新的一天充满希望和挑战，让我们一起迎接它 🌅
      // </div>
      <div>{user.name}，早上好 🌅</div>
    );
  } else if (hours < 12) {
    return (
      // <div>上午好，{user.name}，愿你今天的每一刻都充满活力和阳光 🌞</div>;
      <div>{user.name}，上午好 🌞</div>
    );
  } else if (hours < 14) {
    return (
      // <div>
      //   中午好，{user.name}，是时候享受午餐，为下午的工作和学习充电了 🍴
      // </div>
      <div>{user.name}，中午好 🌞</div>
    );
  } else if (hours < 18) {
    return (
      // <div>下午好，{user.name}，继续保持高效，你正在接近今天的目标 🏆</div>
      <div>{user.name}，下午好 🌞</div>
    );
  } else if (hours < 22) {
    return (
      // <div>
      //   晚上好，{user.name}，工作一天后，是时候放松一下，享受属于你的时光 🌜
      // </div>
      <div>{user.name}，晚上好 🌜</div>
    );
  } else {
    return (
      // <div>夜已深，{user.name}，放下所有的忙碌，给自己一个温柔的夜晚 🌌</div>
      <div>{user.name}，晚上好 🌌</div>
    );
  }
};

export default Welcome;
