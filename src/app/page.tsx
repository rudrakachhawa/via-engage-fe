"use client"

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <button className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
          onClick={() => {
            const popup = window.open("", "popup", "width=600,height=800");
            popup.location.href = "https://www.instagram.com/oauth/authorize?force_reauth=true&client_id=2187891761969078&redirect_uri=https://jaws-wildcard-donor.ngrok-free.dev/oauth&response_type=code&scope=instagram_business_basic%2Cinstagram_business_manage_messages%2Cinstagram_business_manage_comments%2Cinstagram_business_content_publish%2Cinstagram_business_manage_insights";
          }}>
          Connect with Instagram
        </button>
      </main>
    </div>
  );
}
