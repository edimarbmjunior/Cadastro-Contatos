"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const core_1 = require("@angular/core");
const Observable_1 = require("rxjs/Observable");
const Subject_1 = require("rxjs/Subject");
const contato_service_1 = require("./contato.service");
let ContatoBuscaComponent = class ContatoBuscaComponent {
    constructor(contatoService) {
        this.contatoService = contatoService;
        this.termosDaBusca = new Subject_1.Subject();
    }
    ngOnInit() {
        this.contatos = this.termosDaBusca
            .debounceTime(400)
            .distinctUntilChanged()
            .switchMap(term => {
            console.log('Fez a busca', term);
            return term ? this.contatoService.search(term) : Observable_1.Observable.of([]);
        }).catch(err => {
            console.log('Erro = ', err);
            return Observable_1.Observable.of([]);
        });
        this.contatos.subscribe((contatos) => {
            console.log('Retornou do servidor: ', contatos);
        });
    }
    search(termo) {
        console.log('Busca ', termo);
        this.termosDaBusca.next(termo);
    }
};
ContatoBuscaComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'contato-busca',
        templateUrl: 'contato-busca.component.html'
    }),
    __metadata("design:paramtypes", [contato_service_1.ContatoService])
], ContatoBuscaComponent);
exports.ContatoBuscaComponent = ContatoBuscaComponent;
//# sourceMappingURL=contato-busca.component.js.map