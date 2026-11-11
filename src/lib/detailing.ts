export const carClasses = [
  { id: 'sedan', name: 'Седан', multiplier: 10, factor: '1,0' },
  { id: 'sports', name: 'Спорткар', multiplier: 12, factor: '1,2' },
  { id: 'suv', name: 'Внедорожник', multiplier: 14, factor: '1,4' },
] as const

export const detailingServices = [
  { id: 'polishing', name: 'Полировка', price: 18_000 },
  { id: 'ceramic', name: 'Керамика', price: 25_000 },
  { id: 'ppf', name: 'Защитная плёнка PPF', price: 90_000 },
  { id: 'interior', name: 'Детейлинг интерьера', price: 15_000 },
  { id: 'wash', name: 'Профессиональная мойка', price: 3_500 },
  { id: 'complete', name: 'Комплексный детейлинг', price: 45_000 },
] as const

export type CarClass = typeof carClasses[number]['id']
export type ServiceId = typeof detailingServices[number]['id']

// The demonstration bundle is an alternative, never an additive line item.
export function normalizeSelection(selected: readonly ServiceId[]): ServiceId[] {
  return selected.includes('complete') ? ['complete'] : [...new Set(selected)]
}

export function toggleService(selected: readonly ServiceId[], service: ServiceId): ServiceId[] {
  if (selected.includes(service)) return normalizeSelection(selected.filter((id) => id !== service))
  if (service === 'complete') return ['complete']
  return [...new Set([...selected.filter((id) => id !== 'complete'), service])]
}

export function calculateEstimate(carClass: CarClass, selected: readonly ServiceId[]) {
  const normalized = normalizeSelection(selected)
  const items = detailingServices.filter((service) => normalized.includes(service.id))
  const vehicle = carClasses.find((item) => item.id === carClass)!
  const subtotal = items.reduce((sum, service) => sum + service.price, 0)
  return { items, vehicle, subtotal, total: Math.round(subtotal * vehicle.multiplier / 10) }
}

export const formatRubles = (value: number) => new Intl.NumberFormat('ru-RU', {
  style: 'currency', currency: 'RUB', maximumFractionDigits: 0,
}).format(value)
