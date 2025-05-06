import '@testing-library/jest-dom'

// === POLYFILL para TextEncoder/TextDecoder ===
if (typeof global.TextEncoder === 'undefined') {
  const { TextEncoder, TextDecoder } = require('util')
  global.TextEncoder = TextEncoder
  global.TextDecoder = TextDecoder
}
