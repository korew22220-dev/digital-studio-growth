import Link from "@/app/components/SiteLink";
import { ArrowUpRight, Check } from "lucide-react";
import {
  adsTariff, bundleSaving, bundleSeparatePrice, bundleTariff, careTariff, contactHref,
  formatPrice, mapSaving, mapSeparatePrice, mapTariffs, monthlyCombinedFrom,
  siteTariffs, tariffPrice, type Tariff,
} from "@/app/data/tariffs";

function TariffCard({ tariff, service, note }: { tariff: Tariff; service?: string; note?: string }) {
  return <article className={`tariff-card${tariff.featured ? " tariff-card-featured" : ""}`}>
    <div className="tariff-card-heading">
      <span className="eyebrow">{tariff.featured ? "ОСНОВНОЕ ПРЕДЛОЖЕНИЕ" : "ТАРИФ KOREMO"}</span>
      <h3>{tariff.title}</h3>
      <p>{tariff.description}</p>
    </div>
    <div className="tariff-card-price"><strong>{tariffPrice(tariff)}</strong>{tariff.duration && <span>Срок: {tariff.duration}</span>}</div>
    {note && <p className="tariff-card-note">{note}</p>}
    <ul>{tariff.includes.map(item => <li key={item}><Check size={16} aria-hidden="true"/>{item}</li>)}</ul>
    <Link className={`button ${tariff.featured ? "button-lime" : "tariff-button"}`} href={contactHref(service || tariff.id)}>{tariff.cta} <ArrowUpRight size={17}/></Link>
  </article>;
}

export function SitePricing() {
  return <section className="pricing-section pricing-section-light" id="site-tariffs">
    <div className="pricing-heading"><span className="eyebrow">РАЗРАБОТКА САЙТОВ / ТАРИФЫ</span><h2>Сайт под <em>вашу задачу.</em></h2><p>Итоговая стоимость зависит от согласованного технического задания и дополнительных функций.</p></div>
    <div className="tariff-grid tariff-grid-three">{siteTariffs.map(t => <TariffCard tariff={t} key={t.id}/>)}</div>
  </section>;
}

export function MapPricing({ platform }: { platform?: "2ГИС" | "Яндекс Карты" }) {
  const singleService = platform === "2ГИС" ? "Упаковка карточки в 2ГИС" : platform === "Яндекс Карты" ? "Упаковка карточки в Яндекс Картах" : mapTariffs[0].id;
  return <section className="pricing-section pricing-section-cream" id="map-tariffs">
    <div className="pricing-heading"><span className="eyebrow">2ГИС И ЯНДЕКС КАРТЫ / УПАКОВКА</span><h2>Карточки, в которых <em>всё на месте.</em></h2><p>Можно упаковать карточку на одной выбранной площадке или обе сразу. Материалы и фотографии предоставляет клиент.</p></div>
    <div className="tariff-grid tariff-grid-two">
      <TariffCard tariff={mapTariffs[0]} service={singleService}/>
      <TariffCard tariff={mapTariffs[1]} note={`Экономия ${formatPrice(mapSaving)}: по отдельности две карточки стоят ${formatPrice(mapSeparatePrice)}.`}/>
    </div>
  </section>;
}

export function MonthlyPricing({ advertisingOnly = false }: { advertisingOnly?: boolean }) {
  return <section className="pricing-section pricing-section-dark" id="monthly-tariffs">
    <div className="pricing-heading"><span className="eyebrow">ЕЖЕМЕСЯЧНЫЕ УСЛУГИ</span><h2>Поддержка и <em>реклама.</em></h2><p>Сопровождение карточек и управление платным продвижением — отдельные услуги.</p></div>
    <div className="tariff-grid tariff-grid-two">
      {!advertisingOnly && <TariffCard tariff={careTariff} note="Цена для одной организации с одним филиалом. Дополнительные филиалы рассчитываются индивидуально."/>}
      <TariffCard tariff={adsTariff} note="Рекламный бюджет не входит в тариф и оплачивается клиентом непосредственно площадке."/>
    </div>
    <p className="pricing-footnote">Обе услуги вместе — от <strong>{formatPrice(monthlyCombinedFrom)}/мес.</strong> без учёта рекламного бюджета. Реклама не входит в сопровождение карточек за {formatPrice(careTariff.price)}/мес.</p>
  </section>;
}

export function MapFollowup() {
  return <section className="pricing-followup"><div><span className="eyebrow">ПОСЛЕ УПАКОВКИ</span><h2>Нужна регулярная <em>работа?</em></h2><p>Сопровождение карточек — {tariffPrice(careTariff)}. Управление платным продвижением — {tariffPrice(adsTariff)}, бюджет площадки отдельно. Услуги вместе — от {formatPrice(monthlyCombinedFrom)}/мес.</p></div><div className="pricing-followup-links"><Link href="/uslugi#monthly-tariffs">Все условия сопровождения <ArrowUpRight size={17}/></Link><Link href="/uslugi/biznes-v-onlayne">Сайт и две карточки — {tariffPrice(bundleTariff)} <ArrowUpRight size={17}/></Link></div></section>;
}

export function BundlePricing({ compact = false }: { compact?: boolean }) {
  return <section className={`pricing-section bundle-section${compact ? " bundle-section-compact" : ""}`} id="business-online">
    <div className="bundle-copy">
      <span className="eyebrow">КОМПЛЕКСНОЕ РЕШЕНИЕ</span>
      <h2>{bundleTariff.title}<em>.</em></h2>
      <p>{bundleTariff.description}</p>
      <div className="bundle-price"><strong>{tariffPrice(bundleTariff)}</strong><span>По отдельности — от {formatPrice(bundleSeparatePrice)}<br/>Экономия {formatPrice(bundleSaving)} при базовом составе пакета.</span></div>
      <Link className="button button-lime" href={contactHref(bundleTariff.id)}>{bundleTariff.cta} <ArrowUpRight size={17}/></Link>
      {compact && <Link className="bundle-details-link" href="/uslugi/biznes-v-onlayne">Подробно о пакете <ArrowUpRight size={16}/></Link>}
    </div>
    {!compact && <div className="bundle-includes"><span className="eyebrow">ЧТО ВЫ ПОЛУЧАЕТЕ</span><p className="bundle-composition">Продающий сайт от {formatPrice(siteTariffs[1].price)} + упаковка карточек на двух площадках за {formatPrice(mapTariffs[1].price)}.</p><ul>{bundleTariff.includes.map(item => <li key={item}><Check size={16} aria-hidden="true"/>{item}</li>)}</ul><div className="bundle-care">Дальнейшее сопровождение карточек — {formatPrice(careTariff.price)}/мес. Оформляется отдельно и не входит в первоначальную стоимость пакета.</div></div>}
  </section>;
}

export function CooperationTerms() {
  const terms = [
    "Предоплата за разработку сайта — 50%; оставшиеся 50% — перед окончательной передачей готового сайта.",
    "Сопровождение карточек — 100% предоплата за месяц.",
    "До двух раундов правок сайта в рамках согласованного технического задания.",
    "Дополнительные страницы, функции и филиалы рассчитываются отдельно.",
    "Домен, хостинг и рекламные бюджеты оплачиваются клиентом отдельно.",
    "Доступы к сервисам и рекламным кабинетам остаются под контролем клиента.",
    "После сдачи сайта — 14 дней на исправление ошибок в согласованном объёме разработки.",
  ];
  return <section className="pricing-terms"><div className="pricing-heading"><span className="eyebrow">УСЛОВИЯ СОТРУДНИЧЕСТВА</span><h2>Договоримся <em>на берегу.</em></h2><p>Срок работы над сайтом отсчитывается после согласования технического задания, получения предоплаты и материалов от клиента.</p></div><ol>{terms.map((item, i) => <li key={item}><span>{String(i + 1).padStart(2, "0")}</span>{item}</li>)}</ol></section>;
}
