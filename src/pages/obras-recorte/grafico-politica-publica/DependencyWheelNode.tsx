import { useEffect, useState } from 'react';

import { Button, Chart, Table, Text } from '@base-components';
import { PoliticaPublica, Exposicao, TrocaCapital, ArtigoJornal, Livro } from '@domain';
import converterTrocaParaDependencyWheel from '@utils/analises/capitais/converter-troca-para-dependency-wheel';
import getNodes from '@utils/analises/dependency-wheel/get-nodes';
import juntarDependencyWheel from '@utils/analises/dependency-wheel/juntar-dependency-wheel';
import agenteDaPolitica from '@utils/analises/politica-publica/agente-da-politica';
import autorObraDaPolitica from '@utils/analises/politica-publica/autor-obra-da-politica';
import politicaPublicaX from '@utils/analises/politica-publica/politica-publica-x';
import politicaPublicaXartigoJornal from '@utils/analises/politica-publica/politica-publica-x-artigo-jornal';
import politicaPublicaXexposicao from '@utils/analises/politica-publica/politica-publica-x-exposicao';
import politicaPublicaXlivro from '@utils/analises/politica-publica/politica-publica-x-livro';
import * as artigosjornal from '@utils/data/artigosjornal';
import * as exposicoes from '@utils/data/exposicoes';
import * as livros from '@utils/data/livros';
import reduceListOfList from '@utils/list/reduce-list-of-list';
import shuffleArray from '@utils/list/shuffleArray';

function getTrocasArtigosJornais(politicaPublica: PoliticaPublica): TrocaCapital[] {
    const typed_artigosjornal: Record<string, ArtigoJornal> = artigosjornal;

    return Object.keys(typed_artigosjornal)
        .map((key) => {
            const artigoJornal = typed_artigosjornal[key];

            return politicaPublicaXartigoJornal(politicaPublica, artigoJornal);
        })
        .reduce(reduceListOfList);
}

function getTrocasLivros(politicaPublica: PoliticaPublica): TrocaCapital[] {
    const typed_livros: Record<string, Livro> = livros;

    return Object.keys(typed_livros)
        .map((key) => {
            const livro = typed_livros[key];

            return politicaPublicaXlivro(politicaPublica, livro);
        })
        .reduce(reduceListOfList);
}

function getTrocasExposicoes(politicaPublica: PoliticaPublica): TrocaCapital[] {
    const typed_exposicoes: Record<string, Exposicao> = exposicoes;

    return Object.keys(typed_exposicoes)
        .map((key) => {
            const exposicao = typed_exposicoes[key];

            return politicaPublicaXexposicao(politicaPublica, exposicao);
        })
        .reduce(reduceListOfList);
}

function DependencyWheelRefactor({
    politicaPublica,
    peso,
    height,
    showLabel,
    labelEmCima,
}: {
    politicaPublica: PoliticaPublica;
    peso: number;
    height?: number;
    showLabel?: number;
    labelEmCima?: boolean;
}): JSX.Element {
    const trocasPoliticaPublica = politicaPublicaX();
    const trocasArtigosJornais = getTrocasArtigosJornais(politicaPublica);
    const trocasLivros = getTrocasLivros(politicaPublica);
    const trocasExposicoes = getTrocasExposicoes(politicaPublica);

    const dependencyWheelsPoliticaPublica = trocasPoliticaPublica.map((troca) => converterTrocaParaDependencyWheel(troca));
    const dependencyWheelsArtigosJornais = trocasArtigosJornais.map((troca) => converterTrocaParaDependencyWheel(troca));
    const dependencyWheelsLivros = trocasLivros.map((troca) => converterTrocaParaDependencyWheel(troca));
    const dependencyWheelsExposicoes = trocasExposicoes.map((troca) => converterTrocaParaDependencyWheel(troca));

    const dep1 = juntarDependencyWheel(dependencyWheelsPoliticaPublica, dependencyWheelsArtigosJornais);
    const dep2 = juntarDependencyWheel(dep1, dependencyWheelsLivros);
    const dependencyWheels = juntarDependencyWheel(dep2, dependencyWheelsExposicoes);

    const todosNodes = getNodes(dependencyWheels);
    const nosFiltrados = todosNodes.filter((no) => no.weight >= peso);

    const nosImportantes = nosFiltrados.map((no) => ({
        id: no.node,
        dataLabels: {
            enabled:
                showLabel === 0 ? false : showLabel === 1 ? true : agenteDaPolitica(politicaPublica, no.node) || autorObraDaPolitica(politicaPublica, no.node),
        },
    }));

    const dataFiltrada = dependencyWheels.filter(
        (wheel) => nosFiltrados.find((no) => no.node === wheel.from) && nosFiltrados.find((no) => no.node === wheel.to),
    );
    nosFiltrados.sort((a, b) => b.node.localeCompare(a.node)).sort((a, b) => (a.weight < b.weight ? 1 : -1));

    const [
        shuffleDados,
        setarShuffleDados,
    ] = useState(dataFiltrada);

    useEffect(() => {
        setarShuffleDados(dataFiltrada);
    }, [
        politicaPublica,
        peso,
        height,
        labelEmCima,
    ]);

    function onPress(): void {
        setarShuffleDados(shuffleArray(shuffleDados));
    }

    const lineOptions = {
        chart: {
            height: height ?? 800,
        },
        title: {
            text: '',
        },
        series: [
            {
                type: 'dependencywheel',
                accessibility: {
                    enabled: false,
                },
                dataLabels: {
                    enabled: false,
                    color: '#FFFF',
                    textPath: !labelEmCima
                        ? undefined
                        : {
                              enabled: true,
                              attributes: {
                                  dy: 5,
                              },
                          },
                    distance: !labelEmCima ? undefined : 10,
                },
                size: '95%',
                plotOptions: {
                    dependencywheel: {
                        showInLegend: true,
                        colorByPoint: true,
                    },
                },
                data: shuffleDados,
                nodes: nosImportantes,
            },
        ],
    };

    return (
        <>
            <Button onPress={onPress}>Randon</Button>
            <Chart options={lineOptions as Highcharts.Options} />
            <Table
                headers={[
                    <Text>{`pessoa (${nosFiltrados.length}, ${nosFiltrados.filter((node) => !agenteDaPolitica(politicaPublica, node.node)).length})`}</Text>,
                    <Text>peso</Text>,
                ]}
                rows={nosFiltrados.map((no) => [
                    <Text>{no.node}</Text>,
                    <Text>{no.weight}</Text>,
                ])}
                widthArr={[
                    undefined,
                    50,
                ]}
            />
        </>
    );
}

export default DependencyWheelRefactor;
