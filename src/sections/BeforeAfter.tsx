import BeforeAfterSlider from '../components/BeforeAfterSlider'
import SectionReveal from '../components/SectionReveal'

export default function BeforeAfter() {
  return (
    <section className="content-section before-after" id="before-after" aria-labelledby="before-after-title" tabIndex={-1}>
      <div className="section-container">
        <SectionReveal className="before-after__heading">
          <div>
            <div className="section-index" aria-hidden="true"><span>03</span><span className="section-index__line" /></div>
            <h2 className="section-title" id="before-after-title" lang="en">THE DIFFERENCE<br />IS IN THE DETAILS</h2>
          </div>
          <div className="before-after__copy">
            <p className="before-after__subtitle">Совершенство видно в каждом отражении.</p>
            <p className="before-after__description">Профессиональная коррекция лакокрасочного покрытия помогает убрать мелкие царапины и вернуть глубину цвета. На гладкой поверхности линии света становятся чище, а отражения — выразительнее.</p>
          </div>
        </SectionReveal>
        <SectionReveal>
          <BeforeAfterSlider beforeSrc={`${import.meta.env.BASE_URL}images/noir-before.png`} afterSrc={`${import.meta.env.BASE_URL}images/noir-after.png`} />
        </SectionReveal>
      </div>
    </section>
  )
}
