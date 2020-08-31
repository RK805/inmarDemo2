import { browser, element, by, By, $, $$, ExpectedConditions, WebElement, protractor } from 'protractor';
import { loginPage } from './../PO/loginPage.po';
import { dataProvider } from "./../data/dataProvider";
import { BrowserUtil } from "./../utils/browser.util";
import { dashBoard } from './../PO/dashBoard.po';
import { Console } from 'console';

describe('Test : Validate clipped Coupon', () => {
    let userObj = dataProvider.getJsonData("./data/login.json", "login")
    const LOGINPAGE = new loginPage();
    const DASHBOARD = new dashBoard();
    console.log(userObj);

    it('Launch the application', () => {
        browser.get('');
    });
    it('Check the modal-dialog, If it there close it', () => {
        var until = browser.ExpectedConditions;
        browser.wait(until.presenceOf(DASHBOARD.get_modal_dialog()), 40000, 'Element taking too long to appear in the DOM');
        DASHBOARD.get_modal_dialog().isDisplayed().then(function (bool) {
            if (bool == true) {
                DASHBOARD.get_modaldialogClose().click();
            }
        })
    });
    it('Launch the application and click on the Sign account link', () => {
        LOGINPAGE.userLoginBtn().click();
    })

    it('should able to login with valid rigistered credentials', () => {
        LOGINPAGE.userNameTextBox().sendKeys(userObj.username);
        LOGINPAGE.userPasswordTextBox().sendKeys(userObj.password);
        LOGINPAGE.userSignIn().click();
    });

    it('Select the MyThyme Coupons and Browse Coupons', () => {
        browser.sleep(10000);
        // var until = browser.ExpectedConditions;
        // browser.wait(until.presenceOf(DASHBOARD.get_myThyme()), 90000, 'Element taking too long to appear in the DOM');
        browser.actions().mouseDown(DASHBOARD.get_myThyme()).perform();
        browser.sleep(5000);
        DASHBOARD.get_browseCoupons().click();
        // browser.actions().mouseUp(DASHBOARD.get_browseCoupons()).perform();

    });
    it('clip the first Coupon', () => {
        var until = browser.ExpectedConditions;
        browser.wait(until.presenceOf(DASHBOARD.get_couponOffer()), 90000, 'Element taking too long to appear in the DOM');
        DASHBOARD.get_couponOffer().click();
    });
    it('Verify the clipped Coupon', () => {
        DASHBOARD.get_couponOfferDisabled().isPresent().then(function (bool) {
            expect(bool).toBe(true, "clipped Coupon not displayed")
        })
    });
    it('Logout', () => {
        DASHBOARD.get_userNavBtn().click();
        DASHBOARD.get_logOut().click();
    });
});
