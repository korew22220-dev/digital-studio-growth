"use client";

import Link from "@/app/components/SiteLink";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";

const nav = [
  ["Услуги", "/uslugi"],
  ["Кейсы", "/kejsy"],
  ["О компании", "/o-kompanii"],
  ["Этапы работы", "/etapy-raboty"],
  ["Калькулятор лидов", "/kalkulyator"],
  ["FAQ", "/voprosy"],
  ["Контакты", "/kontakty"],
];
const desktopNav = nav.filter(([label]) => ["Услуги", "Кейсы", "Калькулятор лидов", "О компании", "Контакты"].includes(label));

export function InnerHeader() {
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenu(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  return <>
    <header className="inner-header">
      <Link href="/" className="brand">
        <span className="brand-mark">D<span>·</span></span>
        <span>DIGITAL<br/>STUDIO</span>
      </Link>
      <nav>{desktopNav.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}</nav>
      <Link href="/kontakty" className="header-cta">Обсудить проект <ArrowUpRight size={16}/></Link>
      <button className="menu-button" onClick={() => setMenu(!menu)} aria-label={menu ? "Закрыть меню" : "Открыть меню"} aria-expanded={menu}>
        {menu ? <X/> : <Menu/>}
      </button>
    </header>
    {menu && <div className="mobile-menu">
      <button className="menu-close" onClick={() => setMenu(false)} aria-label="Закрыть"><X/></button>
      {nav.map(([label, href]) => <Link href={href} key={href} onClick={() => setMenu(false)}>{label}<ArrowUpRight/></Link>)}
    </div>}
  </>;
}
