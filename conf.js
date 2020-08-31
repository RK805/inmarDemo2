var HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');
var HTMLReport = require('protractor-html-reporter-2');
path = require('path');
var d = new Date();
var time = d.getHours() + '-' + d.getMinutes() + '-' + d.getSeconds();
//Adding Screenshot dir path
var screenshotReporter = new HtmlScreenshotReporter({
  dest: path.join(__dirname, 'report/screenshots'),
  captureOnlyFailedSpecs: false
});

exports.config = {
  framework: 'jasmine2',
  allScriptsTimeout: 480000,
  directConnect: true,
  // seleniumAddress: 'http://localhost:4444/wd/hub',
  ignoreUncaughtExceptions: true,

  capabilities: {
    // 'browserName': 'MicrosoftEdge',
    // 'browserName': 'firefox',
    'browserName': 'chrome',
  //   chromeOptions: {
  //     args: ['--window-size=1366,657'] // THIS!
  // },
    'shardTestFiles': true,
    'maxInstances': 1,
  },

  // Spec patterns are relative to the current working directory when
  // Protractor is called.
  specs: [

    // './Specs/test2.ts'
    './Specs/testDemo.spec.ts'

  ],

  suites: {

  },
// Base URL
  baseUrl: 'https://discover.freshthyme.com/',


  //adding report
  onPrepare: function () {
    // beforeEach(function() { browser.ignoreSynchronization = true; });
    // Requiring jasmine reporters module
    require('ts-node').register({
      project: require('path').join(__dirname, './tsconfig.json') // Relative path of tsconfig.json file 
    });
    var jasmineReporters = require('jasmine-reporters');
    var junitReporter = new jasmineReporters.JUnitXmlReporter({
      savePath: __dirname + '\\Logs',
      consolidateAll: true,
      filePrefix: 'junitresults',
      //+ '-' + time
    });
    jasmine.getEnv().addReporter(junitReporter);
    jasmine.getEnv().addReporter(screenshotReporter);
    // Add module to give more verbose output
    var SpecReporter = require('jasmine-spec-reporter').SpecReporter;
    jasmine.getEnv().addReporter(new SpecReporter({
      displayStacktrace: true
    }));
    
    browser.manage().window().maximize();
  },
  //HTMLReport called once tests are finished
  onComplete: function () {
    var browserName, browserVersion;
    var capsPromise = browser.getCapabilities();
    capsPromise.then(function (caps) {
      browserName = caps.get('browserName');
      browserVersion = caps.get('version');
      platform = caps.get('platform');
      testConfig = {
        reportTitle: 'ClassRoom Test Execution Report',
        outputPath: 'report',
        outputFilename: 'TestReport',
        screenshotPath: '/report/screenshots/',
        testBrowser: browserName,
        browserVersion: browserVersion,
        modifiedSuiteName: false,
        screenshotsOnlyOnFailure: false,
        testPlatform: platform
      };
      new HTMLReport().from('./Logs/junitresults.xml', testConfig);
    });
  },
  //Setup the report before any tests start
  beforeLaunch: function () {
    return new Promise(function (resolve, reject) {
      screenshotReporter.beforeLaunch(resolve);
    });
  },
  // Close the report after all tests finish
  afterLaunch: function (exitCode) {
    return new Promise(function (resolve) {
      screenshotReporter.afterLaunch(resolve.bind(this, exitCode));
    });
  },

  jasmineNodeOpts: {
    isVerbose: true,
    showColors: true,
    includeStackTrace: true,
    defaultTimeoutInterval: 480000,
    useAllAngular2AppRoots: true
  },
};