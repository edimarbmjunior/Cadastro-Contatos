import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Contato } from './contato.model';
import { CONTATOS } from './contatos-mock';

@Injectable()
export class ContatoService{

    private contatosUrl: string = 'app/contatos';
    private headers: Headers = new Headers({'Content-Type': 'application/json'});

    /*getContatos(): Contato[] { // -> chamar quando não tiver promises
        return CONTATOS;
    }*/

    constructor(
        private http: Http
    ){}

    getContatos(): Promise<Contato[]> { // -> chamar via promises
        //return Promise.resolve(CONTATOS);
        return this.http.get(this.contatosUrl)
            .toPromise()
            .then(response => response.json().data as Contato[])
            .catch(this.handlError);
    }

    /*getContato(id: number): Promise<Contato>{
        return this.getContatos()
        .then((contatos: Contato[]) => {
            return contatos.find((contato) => {
                return contato.id === id;
            });
        });

    }*/

    create(contato: Contato): Promise<Contato>{
        return this.http.post(this.contatosUrl, JSON.stringify(contato), {headers: this.headers})
            .toPromise()
            .then((response: Response) => response.json().data as Contato)
            .catch(this.handlError);
    }

    private handlError(err: any): Promise<any>{
        console.log('Error: ', err);
        return Promise.reject(err.message || err);
    }

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