import test from 'node:test'
import assert from 'node:assert'
import solution from './{{questionNumber}}.js'


class ExpectError extends Error {
  constructor(input, result, expected) {
    super(`input: ${input} | result: ${result} | expect: ${expected}`)
    this.input = input
    this.result = result
    this.expected = expected
  }
}

const testCases = [
  [['line1', 'line2', 'line3'], '결과값'],
  [['line1', 'line2', 'line3'], true],
]

testCases.forEach(([input, expected], index) => {
  test(`case${index + 1}`, () => {
    console.log(`## CASE${index + 1}`)
    const result = solution(input)
    assert.equal(result, expected, new ExpectError(input, result, expected))
    console.log('\n')
  })
})