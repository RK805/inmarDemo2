import { browser, element, by, ExpectedConditions } from 'protractor';
/**
 * Class representing generic page.
 * Methods/properties for global elements should go here.
 *
 * @export
 * @class dashBoardPage
 */
export class dashBoard {

    myThyme = '//div[text()="MyThyme"]'
    browseCoupons = '//a[normalize-space(.)="Browse Coupons"]'
    couponOffer = '//li[1]//button[@coupon="offer"]'
    couponOfferDisabled = '//li[1]//button[@coupon="offer" and @disabled="disabled"]'
    userNavBtn = '//button[@id="nav-user"]'
    logOut = '//button[@id="nav-logout"]'
    modal_dialog = '.modal-content'
    modaldialogClose ='#shopping-selector-parent-process-modal-close-click'
    
    get_myThyme() {
        return element(by.xpath(this.myThyme));
    }
    get_browseCoupons() {
        return element(by.xpath(this.browseCoupons));
    }
    get_couponOffer() {
        return element(by.xpath(this.couponOffer));
    }
    get_couponOfferDisabled() {
        return element(by.xpath(this.couponOfferDisabled));
    }
    get_userNavBtn() {
        return element(by.xpath(this.userNavBtn));
    }
    get_logOut() {
        return element(by.xpath(this.logOut));
    }
    get_modal_dialog() {
        return element(by.css(this.modal_dialog));
    }
    get_modaldialogClose() {
        return element(by.css(this.modaldialogClose));
    }
}
