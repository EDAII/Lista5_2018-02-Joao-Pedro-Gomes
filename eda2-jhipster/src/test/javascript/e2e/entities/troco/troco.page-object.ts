import { element, by, ElementFinder } from 'protractor';

export class TrocoComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-troco div table .btn-danger'));
    title = element.all(by.css('jhi-troco div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async clickOnLastDeleteButton() {
        await this.deleteButtons.last().click();
    }

    async countDeleteButtons() {
        return this.deleteButtons.count();
    }

    async getTitle() {
        return this.title.getText();
    }
}

export class TrocoUpdatePage {
    pageTitle = element(by.id('jhi-troco-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    valorInput = element(by.id('field_valor'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async setValorInput(valor) {
        await this.valorInput.sendKeys(valor);
    }

    async getValorInput() {
        return this.valorInput.getAttribute('value');
    }

    async save() {
        await this.saveButton.click();
    }

    async cancel() {
        await this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}

export class TrocoDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-troco-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-troco'));

    async getDialogTitle() {
        return this.dialogTitle.getText();
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
