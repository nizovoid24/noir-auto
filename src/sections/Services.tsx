import SectionReveal from '../components/SectionReveal'
import useMediaQuery from '../hooks/useMediaQuery'

const services = [
  { title: 'Коррекция и полировка ЛКП', image: 'noir-service-polishing.png', alt: 'Машинная полировка чёрного кузова Porsche', description: 'Работа с мелкими дефектами лакокрасочного покрытия для глубины цвета и чистых отражений.' },
  { title: 'Керамическое покрытие', image: 'noir-service-ceramic.png', alt: 'Нанесение покрытия аппликатором на кузов автомобиля', description: 'Защитный слой, выразительный блеск и более простой повседневный уход за кузовом.' },
  { title: 'Защитная полиуретановая плёнка (PPF)', image: 'noir-service-ppf.png', alt: 'Укладка прозрачной защитной плёнки на кузов Porsche', description: 'Прозрачная защита лакокрасочного покрытия от сколов и повседневных механических воздействий.' },
  { title: 'Детейлинг интерьера', image: 'noir-service-interior.png', alt: 'Деликатная очистка кожаного сиденья в салоне Porsche', description: 'Деликатная очистка кожи, текстиля и деталей салона с вниманием к фактуре каждого материала.' },
  { title: 'Профессиональная мойка', image: 'noir-service-wash.png', alt: 'Porsche в студии во время пенной мойки', description: 'Бережная многоэтапная очистка кузова, дисков и труднодоступных зон.' },
  { title: 'Комплексный детейлинг', image: 'noir-service-complete.png', alt: 'Чёрный Porsche в студии с зеркальными отражениями на кузове', description: 'Цельный подход к внешнему виду автомобиля: очищение, восстановление и защита.' },
]

export default function Services() {
  const desktop = useMediaQuery('(min-width: 1101px)')
  const multipleColumns = useMediaQuery('(min-width: 601px)')
  const columns = desktop ? 3 : multipleColumns ? 2 : 1

  return (
    <section className="content-section services" id="services" aria-labelledby="services-title" tabIndex={-1}>
      <div className="section-container">
        <SectionReveal className="services__heading">
          <div className="section-index" aria-hidden="true"><span>02</span><span className="section-index__line" /></div>
          <h2 className="section-title" id="services-title" lang="en">THE ART OF DETAILING</h2>
        </SectionReveal>
        <div className="services__grid">
          {services.map((service, index) => (
            <SectionReveal key={service.image} delay={(index % columns) * 0.11}>
              <article className="service-card" aria-labelledby={`service-${index + 1}`}>
                <div className="service-card__image">
                  <img src={`/images/${service.image}`} alt={service.alt} width={1448} height={1086} loading="lazy" decoding="async" />
                </div>
                <div className="service-card__body">
                  <span className="service-card__number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                  <h3 id={`service-${index + 1}`}>{service.title}</h3>
                  <p>{service.description}</p>
                </div>
              </article>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
