import SectionReveal from '../components/SectionReveal'
import useMediaQuery from '../hooks/useMediaQuery'

const steps = [
  { title: 'Диагностика', description: 'Оцениваем состояние автомобиля и определяем необходимый объём работ.' },
  { title: 'Подготовка', description: 'Тщательно очищаем поверхности и подготавливаем автомобиль к обработке.' },
  { title: 'Детейлинг', description: 'Выполняем выбранные процедуры с вниманием к каждой детали.' },
  { title: 'Контроль качества', description: 'Проверяем результат при профессиональном освещении.' },
]

export default function Process() {
  const horizontal = useMediaQuery('(min-width: 901px)')

  return (
    <section className="content-section process" id="process" aria-labelledby="process-title" tabIndex={-1}>
      <div className="section-container">
        <SectionReveal className="process__heading">
          <div className="section-index" aria-hidden="true"><span>04</span><span className="section-index__line" /></div>
          <h2 className="section-title" id="process-title" lang="en">EVERY DETAIL MATTERS</h2>
          <p className="process__intro">Четыре этапа на пути к совершенству</p>
        </SectionReveal>
        <ol className="process__steps" role="list">
            {steps.map((step, index) => (
              <SectionReveal as="li" className="process__step" key={step.title} delay={horizontal ? index * 0.12 : 0}>
                <span className="process__number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </SectionReveal>
            ))}
        </ol>
      </div>
    </section>
  )
}
