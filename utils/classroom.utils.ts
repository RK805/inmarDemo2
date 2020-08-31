import { browser, element, by, ExpectedConditions, protractor, ElementFinder } from 'protractor';

export class CR {

  fill_emailId = function () {
    var defer = protractor.promise.defer();
    var promise = defer.promise;
    var currentdate = new Date();
    var emailID = "suitabilityproauto+" + currentdate.getDate() +
      +(currentdate.getMonth() + 1) +
      +currentdate.getFullYear() +
      +currentdate.getHours() +
      +currentdate.getMinutes() +
      +currentdate.getSeconds() + "c1" + "@gmail.com";
    defer.fulfill(emailID);
    return promise;
  };

  

}





