import { Injectable } from '@angular/core';

import { Contato } from './contato.model';
import { CONTATOS } from './contatos-mock';
import { resolve } from 'dns';

@Injectable()
export class ContatoService{

    /*getContatos(): Contato[] { // -> chamar quando não tiver promises
        return CONTATOS;
    }*/

    getContatos(): Promise<Contato[]> { // -> chamar via promises
        return Promise.resolve(CONTATOS);
    }

    /*getContato(id: number): Promise<Contato>{
        return this.getContatos()
        .then((contatos: Contato[]) => {
            return contatos.find((contato) => {
                return contato.id === id;
            });
        });

    }*/

    getContato(id: number): Promise<Contato>{
        return this.getContatos()
        .then((contatos: Contato[]) => contatos.find(contato => contato.id === id));

    }

    getContatosSlowly(): Promise<Contato[]> {
        return new Promise((resolve, reject) =>{
            setTimeout(resolve, 2000);
        })
        .then(() => {
            console.log('primeiro then');
            return 'Curso angular 2 Plinio Naves';
        })
        .then((param: string) => {
            console.log('segundo then');
            console.log(param);

            return new Promise((resolve2, reject2) => {
                setTimeout(() => {
                    console.log('continuando depois de 4 segundos ...');
                    resolve2();
                }, 4000);
            });
        })
        .then(() => {
            console.log('terceiro then');
            return this.getContatos();
        });
    }
}