import { LinkingOptions } from '@react-navigation/native';
import { createURL } from 'expo-linking';

import { RootNavigatorParamList } from './RootNavigator';

const linking: LinkingOptions<RootNavigatorParamList> = {
    prefixes: [createURL('/')],
    config: {
        initialRouteName: 'BottomTab',
        screens: {
            BottomTab: {
                path: '',
                screens: {
                    Home: {
                        path: '',
                    },
                    Obras: {
                        path: 'obras',
                        screens: {
                            Home: {
                                path: '',
                            },
                            Tipologias: {
                                path: 'tipologias',
                                screens: {
                                    Home: {
                                        path: '',
                                    },
                                    TabelaTipologiaObra: {
                                        path: 'tabela-tipologia-obra',
                                    },
                                    GraficoRedeTipologiaObra: {
                                        path: 'grafico-rede-tipologia-obra',
                                    },
                                },
                            },
                            Autores: {
                                path: 'autores',
                                screens: {
                                    Home: {
                                        path: '',
                                    },
                                    TabelaTipologiaObra: {
                                        path: 'tabela-tipologia-obra',
                                    },
                                    GraficoRedeTipologiaObra: {
                                        path: 'grafico-rede-tipologia-obra',
                                    },
                                },
                            },
                            Naturezas: {
                                path: 'naturezas',
                                screens: {
                                    Home: {
                                        path: '',
                                    },
                                    TabelaTipologiaObra: {
                                        path: 'tabela-tipologia-obra',
                                    },
                                    GraficoRedeTipologiaObra: {
                                        path: 'grafico-rede-tipologia-obra',
                                    },
                                },
                            },
                            Zonas: {
                                path: 'zonas',
                                screens: {
                                    Home: {
                                        path: '',
                                    },
                                    TabelaTipologiaObra: {
                                        path: 'tabela-tipologia-obra',
                                    },
                                    GraficoRedeTipologiaObra: {
                                        path: 'grafico-rede-tipologia-obra',
                                    },
                                },
                            },
                            Enderecos: {
                                path: 'enderecos',
                                screens: {
                                    Home: {
                                        path: '',
                                    },
                                    TabelaTipologiaObra: {
                                        path: 'tabela-tipologia-obra',
                                    },
                                    GraficoRedeTipologiaObra: {
                                        path: 'grafico-rede-tipologia-obra',
                                    },
                                },
                            },
                            Status: {
                                path: 'status',
                                screens: {
                                    Home: {
                                        path: '',
                                    },
                                    TabelaTipologiaObra: {
                                        path: 'tabela-tipologia-obra',
                                    },
                                    GraficoRedeTipologiaObra: {
                                        path: 'grafico-rede-tipologia-obra',
                                    },
                                },
                            },
                            Mapa: {
                                path: 'mapa',
                                screens: {
                                    Home: {
                                        path: '',
                                    },
                                    TabelaTipologiaObra: {
                                        path: 'tabela-tipologia-obra',
                                    },
                                    GraficoRedeTipologiaObra: {
                                        path: 'grafico-rede-tipologia-obra',
                                    },
                                },
                            },
                        },
                    },
                    Recorte: {
                        path: 'recorte',
                        screens: {
                            Home: {
                                path: '',
                            },
                            Tipologias: {
                                path: 'tipologias',
                                screens: {
                                    Home: {
                                        path: '',
                                    },
                                    TabelaTipologiaObra: {
                                        path: 'tabela-tipologia-obra',
                                    },
                                    GraficoRedeTipologiaObra: {
                                        path: 'grafico-rede-tipologia-obra',
                                    },
                                },
                            },
                            Autores: {
                                path: 'autores',
                                screens: {
                                    Home: {
                                        path: '',
                                    },
                                    TabelaTipologiaObra: {
                                        path: 'tabela-tipologia-obra',
                                    },
                                    GraficoRedeTipologiaObra: {
                                        path: 'grafico-rede-tipologia-obra',
                                    },
                                },
                            },
                            Naturezas: {
                                path: 'naturezas',
                                screens: {
                                    Home: {
                                        path: '',
                                    },
                                    TabelaTipologiaObra: {
                                        path: 'tabela-tipologia-obra',
                                    },
                                    GraficoRedeTipologiaObra: {
                                        path: 'grafico-rede-tipologia-obra',
                                    },
                                },
                            },
                            Zonas: {
                                path: 'zonas',
                                screens: {
                                    Home: {
                                        path: '',
                                    },
                                    TabelaTipologiaObra: {
                                        path: 'tabela-tipologia-obra',
                                    },
                                    GraficoRedeTipologiaObra: {
                                        path: 'grafico-rede-tipologia-obra',
                                    },
                                },
                            },
                            Enderecos: {
                                path: 'enderecos',
                                screens: {
                                    Home: {
                                        path: '',
                                    },
                                    TabelaTipologiaObra: {
                                        path: 'tabela-tipologia-obra',
                                    },
                                    GraficoRedeTipologiaObra: {
                                        path: 'grafico-rede-tipologia-obra',
                                    },
                                },
                            },
                            Status: {
                                path: 'status',
                                screens: {
                                    Home: {
                                        path: '',
                                    },
                                    TabelaTipologiaObra: {
                                        path: 'tabela-tipologia-obra',
                                    },
                                    GraficoRedeTipologiaObra: {
                                        path: 'grafico-rede-tipologia-obra',
                                    },
                                },
                            },
                            Mapa: {
                                path: 'mapa',
                                screens: {
                                    Home: {
                                        path: '',
                                    },
                                    TabelaTipologiaObra: {
                                        path: 'tabela-tipologia-obra',
                                    },
                                    GraficoRedeTipologiaObra: {
                                        path: 'grafico-rede-tipologia-obra',
                                    },
                                },
                            },
                        },
                    },
                    Maps: {
                        path: 'maps',
                        screens: {
                            Home: {
                                path: '',
                            },
                            AllVsPublicArt: {
                                path: 'all-vs-public-art',
                            },
                            PublicArtVsCategory: {
                                path: 'public-art-vs-category',
                            },
                        },
                    },
                    Charts: {
                        path: 'charts',
                        screens: {
                            Home: {
                                path: '',
                            },
                            PublicArtDecadeCategory: {
                                path: 'public-art-category-x-decade',
                            },
                            PublicArtDecadeTypology: {
                                path: 'public-art-typology-x-decade',
                            },
                            PublicArtC19892000: {
                                path: 'public-art-19989-2000',
                            },
                            PublicArtCesarMaia: {
                                path: 'public-art-cesar-maia',
                            },
                        },
                    },
                    Category: {
                        path: 'category',
                    },
                    Decade: {
                        path: 'decade',
                    },
                },
            },
            NotFound: '404',
            NoMatch: '*',
        },
    },
};

export default linking;
