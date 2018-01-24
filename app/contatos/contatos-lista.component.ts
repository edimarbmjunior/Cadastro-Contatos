import { Component, OnInit } from '@angular/core';

import { Contato } from './contato.model';
import { ContatoService } from './contato.service';
import { DialogService } from '../dialog.service';

@Component({
    moduleId: module.id,
    selector: 'contatos-lista',
    templateUrl: 'contatos-lista.component.html'
})
export class ContatosListaComponent implements OnInit{
    
    contatos: Contato[];
    constructor(
        private contatoService: ContatoService,
        private dialogService: DialogService
    ){}

    ngOnInit(): void{
        //this.contatos = this.contatoService.getContatos(); //-> chamado sem promises
        this.contatoService.getContatos().then((contatos: Contato[])=> {
            this.contatos = contatos;
        }).catch(err=> {
            console.log('Acoteceu um erro: ', err);
        });
    }

    onDelete(contato: Contato): void{
        console.log('Contato: ', contato);
        this.dialogService.confirm('Deseja deletar o ' + contato.nome + '?')
            .then((canDelete: boolean) => {
                if(canDelete){
                    this.contatoService
                        .delete(contato)
                        .then(() => {
                            this.contatos = this.contatos.filter((c: Contato) => c.id != contato.id);
                        }).catch(err => {
                            console.log('Erro(Delete): ' + err);
                        });
                }
            });
    }

}