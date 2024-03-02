import AppCard from "@/components/AppCard";
// import authUser from "@/lib/authUser";

export default async function Home() {
  // const user = await authUser();
  // if (!user) return null;

  return (
    // <div className="bg-[#444444] h-full overflow-auto">
    <div className="h-full overflow-auto">
      <h1 className="py-20 flex items-center justify-center">上午好 ~</h1>
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
            name="私人影院"
            src="/images/d_glasses_cinema_icon_190883.svg"
          />
          <AppCard src="/images/cave_man_emoticon_emoji_sticker_inventor_icon.svg" />
        </div>
      </div>
    </div>
  );
}
