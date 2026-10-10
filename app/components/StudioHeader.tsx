"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import Link from "./SiteLink";
import { Brand } from "./Brand";

const primary = [["Услуги", "/uslugi/"], ["Кейсы", "/kejsy/"], ["О KOREMO", "/o-kompanii/"], ["Контакты", "/kontakty/"]];
const secondary = [["Калькулятор лидов", "/kalkulyator/"], ["Этапы работы", "/etapy-raboty/"], ["Вопросы и ответы", "/voprosy/"]];

export function StudioHeader() {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const panel = dialog.current;
    const restore = () => { document.body.style.overflow = ""; trigger.current?.setAttribute("aria-expanded", "false"); trigger.current?.focus(); };
    panel?.addEventListener("close", restore);
    return () => { panel?.removeEventListener("close", restore); document.body.style.overflow = ""; };
  }, []);
  const close = () => dialog.current?.close();
  return <>
    <a className="skip-link" href="#main-content">Перейти к содержимому</a>
    <header className="studio-header">
      <Link href="/" className="brand" aria-label="KOREMO — на главную"><Brand/></Link>
      <nav className="studio-nav" aria-label="Основная навигация">{primary.map(([name, href]) => <Link href={href} key={href}>{name}</Link>)}</nav>
      <Link className="header-cta" href="/kontakty/">Обсудить проект <ArrowUpRight size={17}/></Link>
      <button ref={trigger} className="studio-menu-toggle" aria-label="Открыть меню" aria-haspopup="dialog" aria-expanded="false" aria-controls="studio-menu" onClick={() => { dialog.current?.showModal(); document.body.style.overflow = "hidden"; trigger.current?.setAttribute("aria-expanded", "true"); }}><Menu/></button>
    </header>
    <dialog ref={dialog} id="studio-menu" className="studio-menu" aria-label="Меню сайта" onClick={event => { if (event.target === event.currentTarget) close(); }}>
      <div className="studio-menu-top"><Brand/><button autoFocus onClick={close} aria-label="Закрыть меню"><X/></button></div>
      <nav aria-label="Все разделы">{[...primary, ...secondary].map(([name, href], index) => <Link href={href} key={href} onClick={close}><small>{String(index + 1).padStart(2, "0")}</small>{name}<ArrowUpRight/></Link>)}</nav>
      <p>Сайты и продвижение для локального бизнеса</p>
    </dialog>
    <noscript><nav className="noscript-nav">{[...primary, ...secondary].map(([name, href]) => <Link href={href} key={href}>{name}</Link>)}</nav></noscript>
  </>;
}
