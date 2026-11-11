import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import SiteHeader from '../components/SiteHeader'
import '../styles/hero.css'

const ease = [0.16, 1, 0.3, 1] as const
const messages = {
  about: 'NOIR AUTO — демонстрационный проект KALLISTO IT-AGENCY. Студия представлена как концепция для портфолио.',
}

export default function Hero() {
  const reduceMotion = useReducedMotion()
  const [imageSettled, setImageSettled] = useState(false)
  const [imageFailed, setImageFailed] = useState(false)
  const [notice, setNotice] = useState('')
  const show = imageSettled || reduceMotion
  const enter = (delay: number) => ({ duration: reduceMotion ? 0 : 0.8, delay: reduceMotion ? 0 : delay, ease })

  return (
    <section className="hero" id="home" aria-labelledby="hero-title">
      <a className="skip-link" href="#hero-title">Перейти к содержимому</a>
      <SiteHeader onAbout={() => setNotice(messages.about)} />
      <div className="hero__layout">
        <div className="hero__visual" data-image-state={imageFailed ? 'error' : imageSettled ? 'loaded' : 'loading'}>
          <motion.img
            className="hero__car"
            src={`${import.meta.env.BASE_URL}images/noir-porsche-master.png`}
            alt="Чёрный Porsche 911 GT3 RS в студии с красным светом и отражениями на полу"
            width={1672}
            height={941}
            fetchPriority="high"
            loading="eager"
            decoding="async"
            onLoad={() => setImageSettled(true)}
            onError={() => { setImageSettled(true); setImageFailed(true) }}
            initial={reduceMotion ? false : { opacity: 0, scale: 1 }}
            animate={{ opacity: imageSettled && !imageFailed ? 1 : 0, scale: imageSettled && !reduceMotion ? 1.035 : 1 }}
            transition={{ opacity: { duration: reduceMotion ? 0 : 1.2 }, scale: { duration: reduceMotion ? 0 : 4.5, ease } }}
          />
          <motion.div className="hero__red-light" aria-hidden="true" initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: show ? 1 : 0 }} transition={enter(0.35)} />
          <motion.div className="hero__haze" aria-hidden="true" initial={reduceMotion ? false : { opacity: 0, x: -12 }} animate={{ opacity: show ? 1 : 0, x: 0 }} transition={enter(0.5)} />
          {imageFailed && <p className="hero__image-error">Изображение автомобиля не загрузилось.</p>}
        </div>
        <div className="hero__copy">
          <motion.div className="hero__heading" initial={reduceMotion ? false : { opacity: 0, y: 20 }} animate={{ opacity: show ? 1 : 0, y: show ? 0 : 20 }} transition={enter(0.7)}>
            <h1 id="hero-title" tabIndex={-1} lang="en">PRECISION<span>IS AN ART<span className="hero__period">.</span></span></h1>
            <p className="hero__description">Внимание к каждой детали.<br />Искусство сохранять совершенство.</p>
          </motion.div>
          <motion.div className="hero__actions" initial={reduceMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: show ? 1 : 0, y: show ? 0 : 12 }} transition={enter(1.2)}>
            <a className="button button--primary" href="#services">Наши услуги <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" /></svg></a>
            <a className="button button--secondary" href="#configurator">Рассчитать стоимость</a>
          </motion.div>
        </div>
      </div>
      <footer className="hero__footer">
        <p>Демонстрационный проект <span lang="en">KALLISTO IT-AGENCY</span></p>
        <p className="hero__model" lang="en">PORSCHE <span>911 GT3 RS</span></p>
      </footer>
      <div className="hero-notice" role="status" aria-live="polite" aria-atomic="true">
        {notice && <div className="hero-notice__content"><p>{notice}</p><button aria-label="Закрыть уведомление" onClick={() => setNotice('')}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M6 18 18 6" /></svg></button></div>}
      </div>
    </section>
  )
}
