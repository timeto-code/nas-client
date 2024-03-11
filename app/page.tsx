import { auth } from "@/auth";
import AppCard from "@/components/AppCard";
import GenerateNewKey from "@/components/file-explorer/GenerateNewKey";
import ThemeSwitch from "@/components/ThemeSwitch";
import Toast from "@/components/Toast";
import Welcome from "@/components/Welcome";
import LogoutButton from "@/components/file-explorer/navbar/LogoutButton";
import { Toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";
import SetupGear from "@/components/setup/SetupGear";
// import authUser from "@/lib/authUser";

export default async function Home() {
  const session = await auth();
  if (!session) return null;

  return (
    <div className="h-full relative">
      <h1 className="py-20 flex items-center justify-center">
        <Welcome user={session.user} />
      </h1>
      <div>
        <div className="flex items-center justify-center gap-6 h-full">
          <AppCard name="资源管理器" src="/images/documents_folder_18875.png" />
          <AppCard
            name="AI 知识库"
            src="/images/ai_file_format_extension_icon_124693.svg"
            isDeveloping
          />
          <AppCard name="AIGC 展览馆" src="/images/aigc-logoImg.svg" />
          <AppCard
            name="影音中心"
            src="/images/d_glasses_cinema_icon_190883.svg"
          />
          <AppCard src="/images/cave_man_emoticon_emoji_sticker_inventor_icon.svg" />
        </div>
      </div>
      <div className="fixed top-5 right-5 flex items-center gap-5">
        <ThemeSwitch />
        <SetupGear />
        <LogoutButton />
      </div>
      <Toast />
    </div>
  );
}
