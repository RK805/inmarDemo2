import { browser, element, by, ExpectedConditions } from 'protractor';

/**
 * Class representing generic page.
 * Methods/properties for global elements should go here.
 *
 * @export
 * @class loginPage
 */
export class loginPage {
    logInBtn  = '#nav-register';
    username = '#login-email';
    password = '#login-password'
    submit = '#login-submit'
    
    userLoginBtn = function () {
        return element(by.css(this.logInBtn));
    }

    userNameTextBox = function () {
        return element(by.css(this.username));
    }
    userPasswordTextBox() {
        return element(by.css(this.password));
    }
    userSignIn = function () {
        return element(by.css(this.submit));
    }
    
    
    
}
