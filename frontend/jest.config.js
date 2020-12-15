const tsPreset = require('ts-jest/jest-preset')
// const puppeteerPreset = require('jest-puppeteer/jest-preset')

const preset = { ...tsPreset }
// process.env.npm_lifecycle_event === 'test:unit'
//   ? { ...tsPreset }
//   : { ...tsPreset, ...puppeteerPreset }

module.exports = {
  ...preset,
  rootDir: 'src',
  moduleNameMapper: {
    // tells Jest how to handle imports
    // main concern here is mocking static file imports, which Jest can’t handle
    '.+\\.(css|styl|less|sass|scss)$': `identity-obj-proxy`,
    '.+\\.(jpg|jpeg|gif|eot|otf|webp|svg|png|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': `<rootDir>/__mocks__/file-mock.js`
  },
  testPathIgnorePatterns: [`node_modules`, `\\.cache`, `<rootDir>.*/public`],
  // include the gatsby module (gatsby includes un-transpiled ES6 code)
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  transformIgnorePatterns: [`node_modules/(?!(gatsby)/)`],
  globals: {
    // some components need this path prefix (it is usually set by gatsby)
    __PATH_PREFIX__: ``,
    'ts-jest': {
      isolatedModules: true, // kulshekhar.github.io/ts-jest/user/config/isolatedModules
      babelConfig: true
    },
    __BASE_PATH__: '/'
  },
  testURL: `http://localhost`,
  // need to be a valid url, because DOM APIs like localstorage don't like the about:blank default
  setupFiles: [`<rootDir>/../test-utils/jest-loadershim.js`],
  setupFilesAfterEnv: [`<rootDir>/../test-utils/jest-env-setup.ts`]
  // coverageReporters: ['lcov', 'text', 'html']
}
