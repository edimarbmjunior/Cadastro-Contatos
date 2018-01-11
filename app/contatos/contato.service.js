"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const core_1 = require("@angular/core");
const contatos_mock_1 = require("./contatos-mock");
let ContatoService = class ContatoService {
    /*getContatos(): Contato[] { // -> chamar quando não tiver promises
        return CONTATOS;
    }*/
    getContatos() {
        return Promise.resolve(contatos_mock_1.CONTATOS);
    }
    /*getContato(id: number): Promise<Contato>{
        return this.getContatos()
        .then((contatos: Contato[]) => {
            return contatos.find((contato) => {
                return contato.id === id;
            });
        });

    }*/
    getContato(id) {
        return this.getContatos()
            .then((contatos) => contatos.find(contato => contato.id === id));
    }
    getContatosSlowly() {
        return new Promise((resolve, reject) => {
            setTimeout(resolve, 2000);
        })
            .then(() => {
            console.log('primeiro then');
            return 'Curso angular 2 Plinio Naves';
        })
            .then((param) => {
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
};
ContatoService = __decorate([
    core_1.Injectable()
], ContatoService);
exports.ContatoService = ContatoService;
//# sourceMappingURL=contato.service.js.map