import test from 'node:test'
import assert from 'node:assert/strict'
import { calculateEstimate, toggleService, normalizeSelection } from '../src/lib/detailing.ts'

test('supplied starting prices and all class coefficients', () => {
  const prices = { polishing: 18000, ceramic: 25000, ppf: 90000, interior: 15000, wash: 3500, complete: 45000 }
  for (const [vehicle, factor] of [['sedan', 1], ['sports', 1.2], ['suv', 1.4]]) {
    assert.equal(calculateEstimate(vehicle, []).total, 0)
    for (const [service, base] of Object.entries(prices)) assert.equal(calculateEstimate(vehicle, [service]).total, Math.round(base * factor))
  }
})

test('multiple independent services and deduplication', () => {
  assert.equal(calculateEstimate('sports', ['polishing', 'ceramic']).total, 51600)
  assert.equal(calculateEstimate('suv', ['polishing', 'ceramic', 'ppf', 'interior', 'wash']).total, 212100)
  assert.equal(calculateEstimate('sedan', ['wash', 'wash']).total, 3500)
})

test('bundle replaces services and individual choice replaces bundle', () => {
  assert.deepEqual(toggleService(['polishing', 'ceramic'], 'complete'), ['complete'])
  assert.deepEqual(toggleService(['complete'], 'wash'), ['wash'])
  assert.deepEqual(toggleService(['complete'], 'complete'), [])
  assert.deepEqual(toggleService(['wash'], 'wash'), [])
  assert.equal(calculateEstimate('suv', ['complete', 'polishing', 'ppf']).total, 63000)
})

test('every service subset remains exclusive and input state is immutable', () => {
  const ids = ['polishing', 'ceramic', 'ppf', 'interior', 'wash', 'complete']
  for (let mask = 0; mask < 64; mask++) {
    const selected = ids.filter((_, index) => mask & (1 << index))
    const original = [...selected]
    const normalized = normalizeSelection(selected)
    assert.ok(!normalized.includes('complete') || normalized.length === 1)
    for (const id of ids) {
      const next = toggleService(selected, id)
      assert.ok(!next.includes('complete') || next.length === 1)
      assert.equal(new Set(next).size, next.length)
    }
    assert.deepEqual(selected, original)
  }
})
