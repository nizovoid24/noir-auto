import SectionReveal from '../components/SectionReveal'

export default function Philosophy() {
  return (
    <section className="content-section philosophy" id="philosophy" aria-labelledby="philosophy-title" tabIndex={-1}>
      <div className="philosophy__layout section-container">
        <SectionReveal as="figure" className="philosophy__image">
          <img
            src="/images/noir-studio-interior.png"
            alt="Пространство детейлинг-студии: геометрия потолочного света, красные акценты и отражения на тёмном полу"
            width={1672}
            height={941}
            loading="lazy"
            decoding="async"
          />
        </SectionReveal>
        <SectionReveal className="philosophy__copy" delay={0.12}>
          <div className="section-index" aria-hidden="true"><span>01</span><span className="section-index__line" /></div>
          <h2 className="section-title" id="philosophy-title" lang="en">PERFECTION<br />HAS NO LIMITS</h2>
          <p className="philosophy__text">Совершенство рождается в деталях. Мы относимся к каждому автомобилю как к произведению инженерного искусства. Точность движений, безупречные материалы и внимание к каждому отражению.</p>
        </SectionReveal>
      </div>
    </section>
  )
}
