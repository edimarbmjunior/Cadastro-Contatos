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
    
    contatos: Contato[] = [];
    mensagem: {};
    classesCss: {};
    alertaTipo: string;
    private currentTimeout: any;

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
            this.mostrarMensagem({
                tipo:'danger',
                texto: 'Ocorreu um erro ao buscar a lista de contatos! Verifique com a equipe técnica o erro - ' + err.toString
            });
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

                            this.mostrarMensagem({
                                tipo:'success',
                                texto: 'Contato Deletado!'
                            });

                        }).catch(err => {
                            console.log('Erro(Delete): ' + err);
                            this.mostrarMensagem({
                                tipo:'danger',
                                texto: 'Ocorreu um erro ao deletar ' + contato.nome + '! Verifique com a equipe técnica - ' + err.toString
                            });
                        });
                }
            });
    }

    private mostrarMensagem(mensagem: {tipo: string, texto: string}): void{
        this.mensagem = mensagem;
        this.montarClassesCss(mensagem.tipo);
        
        if(mensagem.tipo != 'danger'){
            if(this.currentTimeout){
                clearTimeout(this.currentTimeout);
            }
            this.currentTimeout = setTimeout(() => {
                this.mensagem = undefined;
            }, 2500);
        }
    }

    private montarClassesCss(tipo: string): void{
        this.alertaTipo = 'alert-' + tipo.toString;

        if(tipo == 'success'){
            this.classesCss = {
                'alert': true,
                'alert-success': true
            };
        }else{
            if(tipo == 'info'){
                this.classesCss = {
                    'alert': true,
                    'alert-info': true
                };
            }else{
                if(tipo == 'danger'){
                    this.classesCss = {
                        'alert': true,
                        'alert-danger': true
                    };
                }else{
                    if(tipo == 'warning'){
                        this.classesCss = {
                            'alert': true,
                            'alert-warning': true
                        };
                    }
                }
            }
        }
    }
}