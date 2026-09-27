"use client";
import { useEffect, useState } from "react";
import Link from "@/app/components/SiteLink";
import { ArrowUpRight } from "lucide-react";
import { contactServiceOptions, mapTariffs } from "@/app/data/tariffs";

const staticHosting = process.env.NEXT_PUBLIC_GITHUB_PAGES === "true";

export function ContactForm() {
  const [status, setStatus] = useState("");
  const [links, setLinks] = useState("");
  const [busy, setBusy] = useState(false);
  const [service, setService] = useState(contactServiceOptions[0]);

  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("service");
    if (!requested || !contactServiceOptions.includes(requested)) return;
    const frame = window.requestAnimationFrame(() => setService(requested));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <form className="contact-form" onSubmit={async (event) => {
      event.preventDefault();
      if (busy) return;
      setBusy(true);
      setLinks("");

      const form = event.currentTarget;
      const values = new FormData(form);
      const body = {
        name: String(values.get("name") || ""),
        phone: String(values.get("phone") || ""),
        service: String(values.get("service") || "") === mapTariffs[0].id
          ? `${mapTariffs[0].id}: ${String(values.get("platform") || "2ГИС")}`
          : String(values.get("service") || ""),
        task: String(values.get("task") || ""),
        url: String(values.get("url") || ""),
      };
      const message = `${body.name}\nТелефон: ${body.phone}\nУслуга: ${body.service}${body.url ? `\nСсылка: ${body.url}` : ""}\nЗадача: ${body.task}`;

      if (staticHosting) {
        setStatus("Сообщение подготовлено. Выберите мессенджер, адресата и отправьте его самостоятельно. Форма не доставила заявку KOREMO.");
        setLinks(message);
        setBusy(false);
        return;
      }

      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        const data: { error?: string } = await response.json();

        if (response.ok) {
          setStatus("Заявка отправлена. Мы получили ваше обращение.");
          form.reset();
        } else if (response.status === 503) {
          setStatus("Автоматическая отправка пока не подключена. Выберите мессенджер, чтобы отправить обращение вручную:");
          setLinks(message);
        } else {
          setStatus(data.error || "Не удалось отправить заявку. Попробуйте позже.");
        }
      } catch {
        setStatus("Не удалось связаться с формой. Попробуйте позже.");
      } finally {
        setBusy(false);
      }
    }}>
      <div className="form-row">
        <label>Ваше имя<input name="name" required maxLength={100} placeholder="Как к вам обращаться"/></label>
        <label>Телефон или мессенджер<input name="phone" type="tel" required maxLength={40} placeholder="+7 (___) ___-__-__"/></label>
      </div>
      <label>Какая услуга интересует<select name="service" value={service} onChange={event => setService(event.target.value)}>{contactServiceOptions.map(option => <option key={option} value={option}>{option}</option>)}</select></label>
      {service === mapTariffs[0].id && <label>Площадка для оформления<select name="platform" defaultValue="2ГИС"><option>2ГИС</option><option>Яндекс Карты</option></select></label>}
      {service === "Предварительный аудит" && <label>Ссылка на сайт или карточку организации<input name="url" type="url" required maxLength={500} placeholder="https://example.ru"/></label>}
      <label>Коротко о задаче<textarea name="task" rows={3} maxLength={1000} placeholder="Что хотите улучшить или создать?"/></label>
      <label className="consent"><input required type="checkbox"/>Я ознакомился(лась) с <Link href="/privacy">информацией об обработке данных</Link> и понимаю, что данные будут включены в подготовленное сообщение.</label>
      <button className="button button-lime" type="submit" disabled={busy}>{busy ? "Подождите…" : staticHosting ? "Подготовить обращение" : "Отправить заявку"} <ArrowUpRight size={18}/></button>
      <p aria-live="polite">{status || (staticHosting
        ? "После подготовки сообщения выберите адресата и отправьте его сами. Автоматическая отправка заявки на этом сайте не подключена."
        : "Заявка отправится в Telegram, если интеграция настроена. Иначе можно будет отправить её вручную.")}</p>
      {links && <div className="send-links">
        <p>Эти ссылки открывают окно общего доступа. Выберите контакт KOREMO и подтвердите отправку в мессенджере.</p>
        <a target="_blank" rel="noreferrer" href={`https://t.me/share/url?url=&text=${encodeURIComponent(links)}`}>Открыть Telegram для ручной отправки ↗</a>
        <a target="_blank" rel="noreferrer" href={`https://wa.me/?text=${encodeURIComponent(links)}`}>Открыть WhatsApp для ручной отправки ↗</a>
      </div>}
    </form>
  );
}
