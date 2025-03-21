export default {
    testEnvironment: 'node', // or 'jsdom' depending on your needs
    moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node'],
    transform: {
        '^.+\\.jsx?$': 'babel-jest',
    },
    verbose: true
};
