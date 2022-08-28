import Comissao from '../../domain/comissao';
import * as pessoas from './pessoa';

export const ComissaoDaPracaXV: Comissao = {
    Nome: 'Comissao da Praça XV',
    Descricao: undefined,
    Cidade: 'Rio de Janeiro',
    Estado: 'Rio de Janeiro',
    Pais: 'Brasil',
    DataInicio: undefined,
    DataFim: undefined,
    Coordenadores: [pessoas.HelenaMariaPortoSeverodaCosta],
    Participantes: undefined,
    IntituicsoesEnvolvidas: [
        'Centro Cultural Banco do Brasil',
        'Casa França-Brasil',
        'Paço Imperial',
        'Museu Histório Nacional',
        'Centro Cultural Candido Mendes',
        'Museu Naval',
        'Museu da Imagem e do Som',
        'Museu de Arte Moderna do Rio de Janeiro',
    ],
};
