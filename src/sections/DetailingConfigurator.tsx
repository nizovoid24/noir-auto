import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import SectionReveal from '../components/SectionReveal'
import { calculateEstimate, carClasses, detailingServices, formatRubles, toggleService } from '../lib/detailing'
import type { CarClass, ServiceId } from '../lib/detailing'
import '../styles/configurator.css'

export default function DetailingConfigurator() {
  const [carClass, setCarClass] = useState<CarClass>('sedan')
  const [selected, setSelected] = useState<ServiceId[]>([])
  const reduceMotion = useReducedMotion()
  const estimate = calculateEstimate(carClass, selected)
  const hasSelection = estimate.items.length > 0
  const resetDisabled = !hasSelection && carClass === 'sedan'

  return (
    <section className="content-section configurator" id="configurator" aria-labelledby="configurator-title" tabIndex={-1}>
      <div className="section-container">
        <SectionReveal className="configurator__heading">
          <div className="section-index" aria-hidden="true"><span>05</span><span className="section-index__line" /></div>
          <h2 className="section-title" id="configurator-title" lang="en">TAILORED TO PERFECTION</h2>
          <p className="configurator__intro">Рассчитайте ориентировочную стоимость ухода за вашим автомобилем</p>
        </SectionReveal>
        <div className="configurator__layout">
          <SectionReveal className="configurator__choices" delay={0.08}>
            <fieldset className="configurator__fieldset">
              <legend>Класс автомобиля</legend>
              <div className="vehicle-options">
                {carClasses.map((vehicle) => (
                  <label className={`vehicle-option ${carClass === vehicle.id ? 'is-selected' : ''}`} key={vehicle.id}>
                    <input type="radio" name="car-class" value={vehicle.id} checked={carClass === vehicle.id} onChange={() => setCarClass(vehicle.id)} />
                    <span>{vehicle.name}<small>Коэффициент ×{vehicle.factor}</small></span>
                  </label>
                ))}
              </div>
            </fieldset>
            <fieldset className="configurator__fieldset" aria-describedby="service-selection-rule">
              <legend>Выберите услуги</legend>
              <p className="configurator__rule" id="service-selection-rule">Комплексный детейлинг выбирается отдельно: он заменяет все отдельные услуги. Выбор отдельной услуги отключает комплекс.</p>
              <div className="service-options">
                {detailingServices.map((service) => (
                  <label className={`service-option ${selected.includes(service.id) ? 'is-selected' : ''}`} key={service.id}>
                    <input type="checkbox" checked={selected.includes(service.id)} onChange={() => setSelected((current) => toggleService(current, service.id))} />
                    <span>{service.name}<small>{formatRubles(service.price)}</small></span>
                  </label>
                ))}
              </div>
              <p className="configurator__base-note">Условные стартовые цены для седана. Это демонстрационные значения, а не коммерческое предложение.</p>
            </fieldset>
            <button type="button" className="configurator__reset" disabled={resetDisabled} onClick={() => { setSelected([]); setCarClass('sedan') }}>Сбросить выбор</button>
          </SectionReveal>
          <SectionReveal as="aside" className="estimate" labelledBy="estimate-title" delay={0.16}>
            <h3 id="estimate-title">Ваш расчёт</h3>
            <p className="estimate__demo">Демонстрационная стоимость</p>
            <output className="estimate__total" aria-label="Ориентировочная стоимость" aria-live="polite" aria-atomic="true">
              <span className="configurator__sr-only">{hasSelection ? `${estimate.vehicle.name}. ${estimate.items.map((item) => item.name).join(', ')}. Итого ${formatRubles(estimate.total)}.` : 'Услуги не выбраны. Выберите услуги для расчёта.'}</span>
              <motion.span
                key={hasSelection ? estimate.total : 'empty'}
                aria-hidden="true"
                initial={reduceMotion ? false : { opacity: 0.4, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.25, ease: [0.16, 1, 0.3, 1] }}
              >{hasSelection ? formatRubles(estimate.total) : '— ₽'}</motion.span>
            </output>
            {hasSelection ? (
              <div className="estimate__details">
                <ul className="estimate__items" aria-label="Выбранные услуги и базовые цены">
                  {estimate.items.map((item) => <li key={item.id}><span>{item.name}</span><span>{formatRubles(item.price)}</span></li>)}
                </ul>
                <dl className="estimate__formula">
                  <div><dt>Базовая сумма</dt><dd>{formatRubles(estimate.subtotal)}</dd></div>
                  <div><dt>{estimate.vehicle.name}</dt><dd>×{estimate.vehicle.factor}</dd></div>
                </dl>
              </div>
            ) : <p className="estimate__empty">Выберите одну или несколько услуг — здесь появятся итог и расшифровка.</p>}
            <p className="estimate__disclaimer">Расчёт носит ознакомительный характер. Итоговая стоимость зависит от состояния автомобиля и объёма работ.</p>
          </SectionReveal>
        </div>
      </div>
    </section>
  )
}
