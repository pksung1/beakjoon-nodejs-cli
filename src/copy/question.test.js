import test from 'node:test'
import assert from 'node:assert'
import solution from './{{questionNumber}}.js'

const testCases = [
  [['line1', 'line2', 'line3'], '결과값'],
  [['line1', 'line2', 'line3'], true],
]

testCases.forEach(([input, expected], index) => {
  test(`case${index + 1}`, () => {
    assert.equal(solution(input), expected)
  })
})