import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {title:"Digital Studio — продвижение в картах и сайты для бизнеса",description:"Продвижение бизнеса в 2ГИС и Яндекс Картах, геомаркетинг и разработка сайтов под ключ. Работаем с компаниями по всей России.",metadataBase:new URL("https://digital-studio-growth.korew22220.chatgpt.site"),icons:{icon:"/favicon.svg",shortcut:"/favicon.svg"}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="ru"><body>{children}</body></html>}
