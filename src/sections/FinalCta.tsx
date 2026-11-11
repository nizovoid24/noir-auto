import SectionReveal from '../components/SectionReveal'

export default function FinalCta() {
  return (
    <section className="content-section final-cta" id="final-cta" aria-labelledby="final-cta-title" tabIndex={-1}>
      <div className="section-container final-cta__layout">
        <SectionReveal className="final-cta__image">
          <img src={`${import.meta.env.BASE_URL}images/noir-porsche-master.png`} alt="Чёрный Porsche 911 GT3 RS в сдержанном красном свете студии" width={1672} height={941} loading="lazy" decoding="async" />
        </SectionReveal>
        <SectionReveal className="final-cta__copy" delay={0.12}>
          <h2 className="section-title" id="final-cta-title" lang="en">PERFECTION<br />IS A CHOICE</h2>
          <p>Каждый автомобиль заслуживает безупречного внимания к деталям.</p>
          <a className="button button--primary" href="#services">Изучить услуги <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" /></svg></a>
        </SectionReveal>
      </div>
    </section>
  )
}
