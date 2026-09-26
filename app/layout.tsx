import type { Metadata } from "next";
import "./globals.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://digital-studio-growth.korew22220.chatgpt.site";

export const metadata: Metadata = {
  title: "KOREMO — Сайты и продвижение для локального бизнеса",
  description: "Сайты и продвижение для локального бизнеса: разработка сайтов, продвижение в 2ГИС и Яндекс Картах, интернет-реклама. KOREMO — работаем по всей России.",
  metadataBase: new URL(siteUrl),
  icons: {
    icon: `${basePath}/koremo-icon.svg`,
    shortcut: `${basePath}/koremo-icon.svg`,
  },
};

export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="ru"><body>{children}</body></html>}
