import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITarefa } from 'app/shared/model/tarefa.model';
import { Principal } from 'app/core';
import { TarefaService } from './tarefa.service';
import { start } from 'repl';
import { max } from 'rxjs/operators';

@Component({
    selector: 'jhi-tarefa',
    templateUrl: './tarefa.component.html',
    styleUrls: ['tarefa.css']

})
export class TarefaComponent implements OnInit, OnDestroy {
    tarefas: ITarefa[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private tarefaService: TarefaService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.tarefaService.query().subscribe(
            (res: HttpResponse<ITarefa[]>) => {
                this.tarefas = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInTarefas();

    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ITarefa) {
        return item.id;
    }


    pegaHorariosInicio() {
        let startTime = [];

        for (var i = 0; i < this.tarefas.length; i++){

            // startTime.push(this.tarefas[i].horarioInicio);
            startTime[i] = (this.tarefas[i].horarioInicio);

        }

        return startTime;
        console.log('pegou?: ', startTime)
    }

    pegaHorarioFinal(){
        let finishTime = [];

        for(var i = 0; i < this.tarefas.length; i++){
            finishTime[i] = (this.tarefas[i].horarioFinal);
        }

        return finishTime;
    }

    interval_scheduling(){
        // this.loadAll()
        let startTime = [] = this.pegaHorariosInicio();
        let finishTime = [] = this.pegaHorarioFinal();

        console.log('Array 1: ',startTime)
        console.log('Array 2: ',finishTime)
        let index_tasks = [];

        for(var i = 0; i < startTime.length; i++){
            index_tasks[i] = i;
            console.log(index_tasks[i]);
            console.log(i)
        }
        

        for(var i = 0; i<finishTime.length; i++){
            if (finishTime[i] > finishTime[i+1]){
                let temp = index_tasks[i]; // temp = 0
                index_tasks[i] = index_tasks[i+1] //index[0] = 1
                index_tasks[i+1] = temp; //index[1] = 0
                
            }
        }
        console.log('index tasks: ', index_tasks)

        // index_tasks = index_tasks.sort(i => finishTime[i]);

        let maximal_tasks = [];
        let first_finish_time = 0;

        for (let i in index_tasks){
            if (startTime[i] >= first_finish_time) {
                maximal_tasks.push(i);
                // console.log(maximal_tasks);
                first_finish_time = finishTime[i];
            }
        }


        // console.log('maximal tasks: ', maximal_tasks)
        // console.log('index tasks: ', index_tasks)
        // console.log('startTimes: ', startTime) 
        console.log("CONJUNTO DE ATIVIDADES COMPATIVEIS: ", maximal_tasks)
        alert("NÚMERO MÁXIMO DE TAREFAS: " + maximal_tasks.length + "\n"
         + "Conjunto de Atividades compativeis: " + maximal_tasks);

        return maximal_tasks.length;

        
    }

    // calculaTroco()

    registerChangeInTarefas() {
        this.eventSubscriber = this.eventManager.subscribe('tarefaListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
