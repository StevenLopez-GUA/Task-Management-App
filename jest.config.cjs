// jest.config.cjs
module.exports = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

    transform: {
        '^.+\\.[jt]sx?$': 'babel-jest'
    },

    moduleNameMapper: {
        // Mockea cualquier import de CSS, SCSS, etc.
        '\\.(css|less|sass|scss)$': 'identity-obj-proxy'
    },

    moduleFileExtensions: ['js', 'jsx', 'json', 'node'],

    testMatch: [
        '<rootDir>/src/__tests__/**/*.(spec|test).[jt]s?(x)'
    ]
}
