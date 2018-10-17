/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { TarefaComponentsPage, TarefaDeleteDialog, TarefaUpdatePage } from './tarefa.page-object';

const expect = chai.expect;

describe('Tarefa e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let tarefaUpdatePage: TarefaUpdatePage;
    let tarefaComponentsPage: TarefaComponentsPage;
    let tarefaDeleteDialog: TarefaDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Tarefas', async () => {
        await navBarPage.goToEntity('tarefa');
        tarefaComponentsPage = new TarefaComponentsPage();
        expect(await tarefaComponentsPage.getTitle()).to.eq('Tarefas');
    });

    it('should load create Tarefa page', async () => {
        await tarefaComponentsPage.clickOnCreateButton();
        tarefaUpdatePage = new TarefaUpdatePage();
        expect(await tarefaUpdatePage.getPageTitle()).to.eq('Create or edit a Tarefa');
        await tarefaUpdatePage.cancel();
    });

    it('should create and save Tarefas', async () => {
        const nbButtonsBeforeCreate = await tarefaComponentsPage.countDeleteButtons();

        await tarefaComponentsPage.clickOnCreateButton();
        await promise.all([
            tarefaUpdatePage.setHorarioInicioInput('5'),
            tarefaUpdatePage.setHorarioFinalInput('5'),
            tarefaUpdatePage.setNomeInput('nome'),
            tarefaUpdatePage.temSelectLastOption()
        ]);
        expect(await tarefaUpdatePage.getHorarioInicioInput()).to.eq('5');
        expect(await tarefaUpdatePage.getHorarioFinalInput()).to.eq('5');
        expect(await tarefaUpdatePage.getNomeInput()).to.eq('nome');
        await tarefaUpdatePage.save();
        expect(await tarefaUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await tarefaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Tarefa', async () => {
        const nbButtonsBeforeDelete = await tarefaComponentsPage.countDeleteButtons();
        await tarefaComponentsPage.clickOnLastDeleteButton();

        tarefaDeleteDialog = new TarefaDeleteDialog();
        expect(await tarefaDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Tarefa?');
        await tarefaDeleteDialog.clickOnConfirmButton();

        expect(await tarefaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
