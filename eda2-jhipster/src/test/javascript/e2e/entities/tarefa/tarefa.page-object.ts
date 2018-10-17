import { element, by, ElementFinder } from 'protractor';

export class TarefaComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-tarefa div table .btn-danger'));
    title = element.all(by.css('jhi-tarefa div h2#page-heading span')).first();

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

export class TarefaUpdatePage {
    pageTitle = element(by.id('jhi-tarefa-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    horarioInicioInput = element(by.id('field_horarioInicio'));
    horarioFinalInput = element(by.id('field_horarioFinal'));
    nomeInput = element(by.id('field_nome'));
    temSelect = element(by.id('field_tem'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async setHorarioInicioInput(horarioInicio) {
        await this.horarioInicioInput.sendKeys(horarioInicio);
    }

    async getHorarioInicioInput() {
        return this.horarioInicioInput.getAttribute('value');
    }

    async setHorarioFinalInput(horarioFinal) {
        await this.horarioFinalInput.sendKeys(horarioFinal);
    }

    async getHorarioFinalInput() {
        return this.horarioFinalInput.getAttribute('value');
    }

    async setNomeInput(nome) {
        await this.nomeInput.sendKeys(nome);
    }

    async getNomeInput() {
        return this.nomeInput.getAttribute('value');
    }

    async temSelectLastOption() {
        await this.temSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async temSelectOption(option) {
        await this.temSelect.sendKeys(option);
    }

    getTemSelect(): ElementFinder {
        return this.temSelect;
    }

    async getTemSelectedOption() {
        return this.temSelect.element(by.css('option:checked')).getText();
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

export class TarefaDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-tarefa-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-tarefa'));

    async getDialogTitle() {
        return this.dialogTitle.getText();
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
