import PresidenteFundacao from '../../domain/presidente_fundacao';
import * as pessoas from './pessoa';

export const HelenaMariaPortoSeverodaCosta: PresidenteFundacao = {
    Pessoa: pessoas.HelenaMariaPortoSeverodaCosta,
    Mandatos: [
        {
            NomeFundacao: 'Fundação Biblioteca Nacional',
            AbreviacaoFundacao: undefined,
            Cidade: 'Rio de Janeiro',
            Estado: 'Rio de Janeiro',
            Pais: 'Brasil',
            DataInicio: '2016',
            DataFim: '2019',
        },
    ],
};
