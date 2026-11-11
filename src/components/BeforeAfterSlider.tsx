import { useId, useRef, useState } from 'react'
import type { CSSProperties, PointerEvent } from 'react'
import '../styles/before-after.css'

type BeforeAfterSliderProps = {
  beforeSrc: string
  afterSrc: string
}

export default function BeforeAfterSlider({ beforeSrc, afterSrc }: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50)
  const [imageError, setImageError] = useState(false)
  const activePointer = useRef<number | null>(null)
  const range = useRef<HTMLInputElement>(null)
  const hintId = useId()
  const updatePosition = (event: PointerEvent<HTMLDivElement>) => {
    const { left, width } = event.currentTarget.getBoundingClientRect()
    if (width > 0) setPosition(Math.round(Math.max(0, Math.min(100, (event.clientX - left) / width * 100))))
  }
  const startDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (!event.isPrimary || (event.pointerType === 'mouse' && event.button !== 0) || imageError) return
    event.preventDefault()
    activePointer.current = event.pointerId
    event.currentTarget.setPointerCapture(event.pointerId)
    range.current?.focus({ preventScroll: true })
    updatePosition(event)
  }
  const finishDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (activePointer.current !== event.pointerId) return
    activePointer.current = null
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId)
  }

  return (
    <figure className="comparison">
      <div
        className="comparison__stage"
        style={{ '--comparison-position': `${position}%` } as CSSProperties}
        onPointerDown={startDrag}
        onPointerMove={(event) => { if (activePointer.current === event.pointerId) updatePosition(event) }}
        onPointerUp={finishDrag}
        onPointerCancel={finishDrag}
        onLostPointerCapture={() => { activePointer.current = null }}
      >
        <img className="comparison__image" src={beforeSrc} alt="До коррекции: мелкие царапины на чёрном лакокрасочном покрытии" width={1448} height={1086} loading="lazy" decoding="async" draggable={false} onError={() => setImageError(true)} />
        <img className="comparison__image comparison__image--after" src={afterSrc} alt="После коррекции: гладкое покрытие с чистыми световыми отражениями" width={1448} height={1086} loading="lazy" decoding="async" draggable={false} onError={() => setImageError(true)} />
        <span className="comparison__label comparison__label--before" aria-hidden="true" style={{ opacity: position < 10 ? 0 : 1 }}>ДО</span>
        <span className="comparison__label comparison__label--after" aria-hidden="true" style={{ opacity: position > 90 ? 0 : 1 }}>ПОСЛЕ</span>
        <div className="comparison__divider" aria-hidden="true" />
        <div className="comparison__handle" aria-hidden="true"><svg viewBox="0 0 32 24"><path d="m12 6-6 6 6 6m8-12 6 6-6 6" /></svg></div>
        <input
          ref={range}
          className="comparison__range"
          type="range"
          min={0}
          max={100}
          step={1}
          value={position}
          disabled={imageError}
          onChange={(event) => setPosition(event.currentTarget.valueAsNumber)}
          aria-label="Граница сравнения до и после коррекции"
          aria-describedby={hintId}
          aria-valuetext={`До: ${position}%. После: ${100 - position}%.`}
        />
        {imageError && <p className="comparison__error" role="status">Не удалось загрузить изображения сравнения. Попробуйте обновить страницу.</p>}
      </div>
      <figcaption className="comparison__caption">
        <p id={hintId}>Перемещайте разделитель или используйте стрелки на клавиатуре.</p>
        <p>Иллюстративное сравнение. Ракурс и свет на исходных кадрах немного различаются.</p>
      </figcaption>
    </figure>
  )
}
