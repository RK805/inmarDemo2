// require('./PageObjects/all-page-objects.po.js');
const fs = require('fs');
const path = require('path');

var HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');
var HTMLReport = require('protractor-html-reporter-2');
var d = new Date();
var time = d.getHours() + '-' + d.getMinutes() + '-' + d.getSeconds();
var screenshotReporter = new HtmlScreenshotReporter({
  dest: path.join(__dirname, 'screenshotReporter'),
  captureOnlyFailedSpecs: false
});

var AllureReporter = require('jasmine-allure-reporter');
var allureReporter = new AllureReporter({
    resultsDir: path.join(__dirname, '/allure-results/'),
  })

exports.config = {
  framework: 'jasmine2',
  allScriptsTimeout: 480000,
  directConnect: true,
  //useAllAngular2AppRoots: true,
  //rootElement: '.top-nav',
  //rootElement: 'div',
  // chromeDriver: './bin/ChromeDrivers/chromedriver.2.40.exe',
  //edgeDriver: './../bin/EdgeDriver/MicrosoftWebDriver.2.40.exe',
  //ie: './../bin/IE/IEDriverServer.exe',
  //seleniumAddress: 'http://localhost:4444/wd/hub',
  ignoreUncaughtExceptions: true,

  capabilities: {
    //'browserName': 'MicrosoftEdge',
    // 'browserName': 'internet explorer',
    //'ignoreProtectedModeSettings': true
    'browserName': 'chrome',
    //'browserVersion': 67,
     //'shardTestFiles': true,
    //  'maxInstances': 1,
    //'ie.ensureCleanSession': true,
    //'enablePersistentHover': true,
    //javascriptEnabled: true
  },
  params: {
    login:{
    user: "advisor",
    },
    
  },
  // *** When we want run multiple browser use multiCapabilities *** //
  /*
   multiCapabilities: [{
     'browserName': 'firefox'
   }, {
     'browserName': 'chrome'
   }],
  */
  // Spec patterns are relative to the current working directory when
  // Protractor is called.
  specs: [
    './Specs/testDemo.spec.ts'
   
  ],
  suites: {
    //ADD_A_CLIENT: './Specs/Web_App_Desktop/Portfolios/add_portfolio_side_panel.spec.js',
  
  },
  baseUrl: 'https://discover.freshthyme.com/',


  onPrepare: function () {

    require('ts-node').register({
      project: require('path').join(__dirname, './tsconfig.json') // Relative path of tsconfig.json file 
    });
    //beforeEach(function() { browser.ignoreSynchronization = true; });
    
    // Requiring jasmine reporters module
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

	var addScreenShots = new function () {
    jasmine.getEnv().afterEach(function(done){
      browser.takeScreenshot().then(function (png) {
        allure.createAttachment('Screenshot', function () {
          return new Buffer(png, 'base64')
        }, 'image/png')();
        done();
      })
    });
  }
  jasmine.getEnv().addReporter(allureReporter);
  jasmine.getEnv().addReporter(addScreenShots);

    browser.manage().window().maximize();

  },
  
  //Setup the report before any tests start
  beforeLaunch: function () {
    const directory = path.join(__dirname, '/allure-results/');
    fs.readdir(directory, (err, files) => {
      if (err) throw err;
    
      for (const file of files) {
        fs.unlink(path.join(directory, file), err => {
          if (err) throw err;
        });
      }
    });
    return new Promise(function (resolve, reject) {
      screenshotReporter.beforeLaunch(resolve);
    });
    
  },

  // Close the report after all tests finish
  afterLaunch: function (exitCode) {
    //Dashboard_Page.cleanup_clients_data();
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