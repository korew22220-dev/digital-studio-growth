import Link from "@/app/components/SiteLink";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

const image = (name: string) => `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/cases/mercedes-amg/${name}.svg`;
const delivered = [
  "Разработали структуру сайта с информацией о компании, услугах и контактах.",
  "Подготовили визуальное оформление для специализированного автомобильного сервиса.",
  "Реализовали адаптивную версию для компьютеров и мобильных устройств.",
  "Разместили направления ремонта и прайс-лист.",
  "Добавили контактную информацию и способы связи с автосервисом.",
  "Выполнили первоначальную техническую SEO-подготовку сайта.",
];

export function MercedesCaseStudy() {
  return <>
    <section className="mercedes-case-hero">
      <Link href="/kejsy/" className="mercedes-case-back"><ArrowLeft size={16}/> Все кейсы</Link>
      <span className="eyebrow">РЕАЛИЗОВАННЫЙ ПРОЕКТ / РАЗРАБОТКА САЙТОВ</span>
      <div className="mercedes-case-title"><h1>Mercedes<br/><em>AMG.</em></h1><p>Сайт для специализированного автосервиса в Сочи.</p></div>
      <div className="mercedes-case-tags"><span>Веб-разработка</span><span>Автосервис</span><span>Сочи</span></div>
      <figure className="mercedes-case-image mercedes-case-cover">
        <img src={image("hero")} alt="Реальный скриншот главного экрана сайта Mercedes AMG" width="1100" height="756" fetchPriority="high"/>
        <figcaption>01 / ГЛАВНЫЙ ЭКРАН ГОТОВОГО САЙТА</figcaption>
      </figure>
    </section>

    <section className="mercedes-story mercedes-story-light">
      <div className="mercedes-story-label"><span className="eyebrow">01 / О ПРОЕКТЕ</span><h2>Сайт для<br/><em>автосервиса.</em></h2></div>
      <p>Разработали сайт для автомобильного сервиса, специализирующегося на ремонте и обслуживании Mercedes-Benz.</p>
    </section>

    <section className="mercedes-story mercedes-story-dark">
      <div className="mercedes-story-label"><span className="eyebrow">02 / ЗАДАЧА</span><h2>Автомобильная эстетика.<br/><em>Понятный путь клиента.</em></h2></div>
      <div className="mercedes-story-copy"><p>Создать современный сайт, на котором потенциальные клиенты смогут познакомиться с компанией, изучить направления ремонта, посмотреть цены и выбрать удобный способ обращения.</p><p>При разработке необходимо было объединить автомобильную эстетику с понятной структурой коммерческого сайта.</p></div>
    </section>

    <section className="mercedes-gallery">
      <span className="eyebrow">03 / САЙТ В ДЕТАЛЯХ</span><h2>От услуги<br/>до <em>обращения.</em></h2>
      <div className="mercedes-gallery-grid">
        <figure className="mercedes-case-image"><img src={image("services")} alt="Реальный скриншот раздела услуг на сайте Mercedes AMG" width="1100" height="755" loading="lazy"/><figcaption>02 / НАПРАВЛЕНИЯ РЕМОНТА</figcaption></figure>
        <figure className="mercedes-case-image"><img src={image("prices")} alt="Реальный скриншот прайс-листа на сайте Mercedes AMG" width="1100" height="755" loading="lazy"/><figcaption>03 / ПРАЙС-ЛИСТ</figcaption></figure>
      </div>
    </section>

    <section className="mercedes-delivered"><div className="mercedes-delivered-head"><span className="eyebrow">04 / РЕАЛИЗАЦИЯ</span><h2>Что <em>сделали.</em></h2></div><ol>{delivered.map((item,index)=><li key={item}><span>0{index+1}</span><p>{item}</p></li>)}</ol></section>

    <section className="mercedes-mobile-section"><figure className="mercedes-phone-preview"><img src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/cases/mercedes-amg/mobile.webp`} alt="Мобильная версия главного экрана сайта Mercedes AMG" width="828" height="1421" loading="lazy"/></figure><div className="mercedes-mobile-copy"><span className="eyebrow">05 / АДАПТАЦИЯ</span><h2>Удобно<br/><em>на телефоне.</em></h2><p>На мобильном экране представлены сведения об автосервисе и удобные способы связи. Это реальный скриншот опубликованного сайта.</p></div></section>

    <section className="mercedes-result"><span className="eyebrow">06 / РЕЗУЛЬТАТ</span><h2>Проект<br/><em>опубликован.</em></h2><p>Разработан и опубликован сайт для действующего автосервиса Mercedes AMG в Сочи. Компания получила собственную площадку в интернете, где представлены основные направления обслуживания автомобилей, цены и контактная информация.</p><a href="https://mersedes-amg-sochi.ru/" target="_blank" rel="noopener noreferrer" className="button button-lime">Посмотреть готовый сайт <ArrowUpRight size={18}/></a></section>
  </>;
}
