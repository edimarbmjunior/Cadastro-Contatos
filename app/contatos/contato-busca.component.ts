import { Component, EventEmitter, Input, OnInit, OnChanges, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Contato } from './contato.model';
import { ContatoService } from './contato.service';

@Component({
    moduleId: module.id,
    selector: 'contato-busca',
    templateUrl: 'contato-busca.component.html',
    styles:[`
        .curso-pointer:hover {
            cursor: pointer;
        }
    `]
    /*inputs:[
        'busca:mySearch' //propertyName:alias
    ]*/
})

export class ContatoBuscaComponent implements OnInit, OnChanges {

    @Input() busca: string;
    @Output() buscaChange: EventEmitter<string> = new EventEmitter<string>();
    contatos: Observable<Contato[]>;
    private termosDaBusca: Subject<string> = new Subject<string>();

    constructor(
        private contatoService: ContatoService,
        private router: Router
    ){ }

    ngOnInit(): void{
        this.contatos = this.termosDaBusca
            .debounceTime(500) // aguarde 500ms para acionar novos evento
            .distinctUntilChanged() // ignore o termo de busca se o termo for igual ao anterior
            .switchMap(term => term ? this.contatoService.search(term) : Observable.of<Contato[]>([]))
            .catch(err => {
                console.log('Erro = ', err);
                return Observable.of<Contato[]>([]);
            });

            /*this.contatos.subscribe((contatos: Contato[]) => {
                console.log('Retornou do servidor: ', contatos);
            })*/ // retirado por ter a função "async", que subscreve o observable retornado
    }

    ngOnChanges(changes: SimpleChanges): void{
        let busca: SimpleChange = changes['busca'];
        this.search(busca.currentValue);
    }

    search(termo: string): void{
        //console.log('Busca ', termo);
        this.termosDaBusca.next(termo);
        this.buscaChange.emit(termo);
    }

    verDetalhe(contato: Contato): void{
        let link = ['contato/save', contato.id];
        this.router.navigate(link);
    }
}