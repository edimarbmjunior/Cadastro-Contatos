import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContatoDetalheComponent } from './contato-detalhe.component';
import { ContatosListaComponent } from './contatos-lista.component';
import { ContatoRoutingModule } from './contato-routing.module';
import { ContatoService } from './contato.service';

@NgModule({
    imports:[
        CommonModule,
        ContatoRoutingModule
    ],
    declarations:[
        ContatosListaComponent,
        ContatoDetalheComponent
    ],
    exports: [
        ContatosListaComponent
    ],
    providers:[
        ContatoService
    ]
})
export class ContatosModule {

}