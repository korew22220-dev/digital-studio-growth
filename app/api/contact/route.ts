import { NextResponse } from "next/server";

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Проверьте заполнение формы." }, { status: 400 }); }
  const name = typeof body.name === "string" ? body.name.trim().slice(0, 100) : "";
  const phone = typeof body.phone === "string" ? body.phone.trim().slice(0, 40) : "";
  const service = typeof body.service === "string" ? body.service.trim().slice(0, 80) : "";
  const task = typeof body.task === "string" ? body.task.trim().slice(0, 1000) : "";
  if (name.length < 2 || phone.length < 5 || !service) return NextResponse.json({ error: "Заполните имя, контакт и услугу." }, { status: 400 });
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return NextResponse.json({ error: "Интеграция не настроена." }, { status: 503 });
  const text = [`Новая заявка с сайта`, `Имя: ${name}`, `Контакт: ${phone}`, `Услуга: ${service}`, task ? `Задача: ${task}` : ""].filter(Boolean).join("\n");
  try {
    const result = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ chat_id: chatId, text }), signal: AbortSignal.timeout(8000) });
    if (!result.ok) return NextResponse.json({ error: "Не удалось отправить заявку. Попробуйте позже." }, { status: 502 });
    return NextResponse.json({ ok: true });
  } catch { return NextResponse.json({ error: "Не удалось отправить заявку. Попробуйте позже." }, { status: 502 }); }
}
