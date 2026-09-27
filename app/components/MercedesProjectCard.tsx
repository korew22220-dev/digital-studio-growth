import Link from "@/app/components/SiteLink";
import { ArrowUpRight } from "lucide-react";

const preview = `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/cases/mercedes-amg/hero.svg`;

export function MercedesProjectCard({ featured = false }: { featured?: boolean }) {
  return <article className="mercedes-project-card">
    <Link href="/kejsy/mercedes-amg" className="mercedes-project-visual" aria-label="Открыть кейс Mercedes AMG">
      <img src={preview} alt="Главный экран разработанного сайта автосервиса Mercedes AMG" width="1100" height="756" loading="lazy"/>
    </Link>
    <div className="mercedes-project-content">
      <span className="eyebrow">РЕАЛИЗОВАННЫЙ ПРОЕКТ / {featured ? "РАЗРАБОТКА ПРОДАЮЩЕГО САЙТА" : "РАЗРАБОТКА САЙТОВ"}</span>
      <h3>Mercedes <em>AMG.</em></h3>
      <p>{featured ? "Разработали сайт для специализированного автосервиса Mercedes-Benz в Сочи: индивидуальный дизайн, адаптивная версия, направления ремонта, прайс-лист и удобные способы связи." : "Сайт для специализированного автосервиса Mercedes-Benz в Сочи."}</p>
      <ul className="mercedes-tags"><li>Веб-разработка</li><li>Автосервис</li><li>Сочи</li></ul>
      <Link href="/kejsy/mercedes-amg" className="mercedes-project-link">{featured ? "Посмотреть кейс" : "Подробнее о проекте"} <ArrowUpRight size={18}/></Link>
      {featured && <a className="mercedes-client-link" href="https://mersedes-amg-sochi.ru/" target="_blank" rel="noopener noreferrer">Готовый сайт клиента ↗</a>}
    </div>
  </article>;
}
