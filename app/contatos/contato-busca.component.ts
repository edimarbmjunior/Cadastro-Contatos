import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Contato } from './contato.model';
import { ContatoService } from './contato.service';

@Component({
    moduleId: module.id,
    selector: 'contato-busca',
    templateUrl: 'contato-busca.component.html'
})

export class ContatoBuscaComponent implements OnInit {

    contatos: Observable<Contato[]>;
    private termosDaBusca: Subject<string> = new Subject<string>();

    constructor(
        private contatoService: ContatoService
    ){ }

    ngOnInit(): void{
        this.contatos = this.termosDaBusca
            .debounceTime(400)
            .distinctUntilChanged()
            .switchMap(term => {
                console.log('Fez a busca', term);
                return term ? this.contatoService.search(term) :    Observable.of<Contato[]>([]);
            }).catch(err => {
                console.log('Erro = ', err);
                return Observable.of<Contato[]>([]);
            });

            this.contatos.subscribe((contatos: Contato[]) => {
                console.log('Retornou do servidor: ', contatos);
            })
     }

    search(termo: string): void{

        console.log('Busca ', termo);
        this.termosDaBusca.next(termo);

    }
}