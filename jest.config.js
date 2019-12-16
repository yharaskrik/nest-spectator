module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    collectCoverage: true,
    coverageReporters: ['json', 'html', 'lcov', 'text', 'clover'],
    collectCoverageFrom: [
        '**/*.ts'
    ],
    setupFiles: ['./jest-setup-file.ts']
};
