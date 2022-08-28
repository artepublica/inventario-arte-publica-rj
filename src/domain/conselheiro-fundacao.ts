import MandatoFundacao from './mandato_fundacao';
import Pessoa from './pessoa';

type ConselheiroFundacao = {
    ID?: number;
    Pessoa?: Pessoa;
    Mandatos?: MandatoFundacao[];
};

export default ConselheiroFundacao;
