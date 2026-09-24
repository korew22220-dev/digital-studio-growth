# Digital Studio

Многостраничный сайт студии продвижения в геосервисах и разработки сайтов. Собран на Next.js App Router (Vinext) с адаптивной версткой, CSS motion, серверным обработчиком заявок и отдельными демонстрационными концепциями кейсов.

## Запуск

```bash
pnpm install
pnpm dev
```

## Проверки

```bash
pnpm run lint
node --test tests/calc.test.mjs
node /root/.codex/plugins/cache/openai-curated-remote/sites/0.1.71/scripts/build-site.mjs
```

## Отправка заявок в Telegram

Скопируйте `.env.example` в `.env.local` для локального запуска либо задайте `TELEGRAM_BOT_TOKEN` и `TELEGRAM_CHAT_ID` в настройках опубликованного сайта. Токен хранится только на сервере. Без этих значений сайт покажет честный статус и предложит открыть вручную заполненное сообщение в Telegram или WhatsApp.

## Страницы

- `/` — главная, услуги, демонстрационные кейсы, калькулятор и форма;
- `/uslugi/prodvizhenie-2gis`;
- `/uslugi/yandex-karty`;
- `/uslugi/sozdanie-saitov`;
- `/uslugi/reklama`;
- `/kejsy` и страницы демонстрационных концепций;
- `/o-kompanii`, `/kontakty`, `/privacy`.

Все изображения и интерфейсные композиции на текущей версии сделаны средствами проекта. Демонстрационные кейсы явно помечены и не содержат вымышленных коммерческих результатов.
