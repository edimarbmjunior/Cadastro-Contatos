"use strict";
class InMemoryDataService {
    createDb() {
        let contatos = [
            { id: 1, nome: 'Fulano de tal', email: 'fulano@email', telefone: '(00) 0000-0000' },
            { id: 2, nome: 'Cristiano', email: 'cristiano@email', telefone: '(00) 0000-0001' },
            { id: 3, nome: 'Uva', email: 'uva@email', telefone: '(00) 0000-0002' },
            { id: 4, nome: 'Limão', email: 'limao@email', telefone: '(00) 0000-0003' },
            { id: 5, nome: 'Mariana', email: 'mariana@email', telefone: '(00) 0000-0004' }
        ];
        let carros = [
            { id: 1, descricao: 'Camaro' },
            { id: 2, descricao: 'Mustang' }
        ];
        return {
            'contatos': contatos
        };
    }
}
exports.InMemoryDataService = InMemoryDataService;
//# sourceMappingURL=in-memory-data.service.js.map