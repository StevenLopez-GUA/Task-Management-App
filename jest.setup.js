import '@testing-library/jest-dom'

// === POLYFILL para TextEncoder/TextDecoder ===
if (typeof global.TextEncoder === 'undefined') {
  const { TextEncoder, TextDecoder } = require('util')
  global.TextEncoder = TextEncoder
  global.TextDecoder = TextDecoder
}

// 1) Stub de window.matchMedia para JSDOM
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),       // usado por algunos paquetes
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// 2) Mock global de SweetAlert2 ANTES de que se importe
jest.mock('sweetalert2', () => ({
  // si usas Swal.fire(...) en tu código, aquí queda stubbed
  fire: jest.fn().mockResolvedValue({ isConfirmed: true }),
  // agrega más métodos si los usas (Swal.fireToast, Swal.update, etc.)
}));
