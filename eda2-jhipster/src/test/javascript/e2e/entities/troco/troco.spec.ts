/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { TrocoComponentsPage, TrocoDeleteDialog, TrocoUpdatePage } from './troco.page-object';

const expect = chai.expect;

describe('Troco e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let trocoUpdatePage: TrocoUpdatePage;
    let trocoComponentsPage: TrocoComponentsPage;
    let trocoDeleteDialog: TrocoDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Trocos', async () => {
        await navBarPage.goToEntity('troco');
        trocoComponentsPage = new TrocoComponentsPage();
        expect(await trocoComponentsPage.getTitle()).to.eq('Trocos');
    });

    it('should load create Troco page', async () => {
        await trocoComponentsPage.clickOnCreateButton();
        trocoUpdatePage = new TrocoUpdatePage();
        expect(await trocoUpdatePage.getPageTitle()).to.eq('Create or edit a Troco');
        await trocoUpdatePage.cancel();
    });

    it('should create and save Trocos', async () => {
        const nbButtonsBeforeCreate = await trocoComponentsPage.countDeleteButtons();

        await trocoComponentsPage.clickOnCreateButton();
        await promise.all([trocoUpdatePage.setValorInput('5')]);
        expect(await trocoUpdatePage.getValorInput()).to.eq('5');
        await trocoUpdatePage.save();
        expect(await trocoUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await trocoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Troco', async () => {
        const nbButtonsBeforeDelete = await trocoComponentsPage.countDeleteButtons();
        await trocoComponentsPage.clickOnLastDeleteButton();

        trocoDeleteDialog = new TrocoDeleteDialog();
        expect(await trocoDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Troco?');
        await trocoDeleteDialog.clickOnConfirmButton();

        expect(await trocoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
