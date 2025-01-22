import { useState } from 'react';

import { View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { ScrollView } from 'react-native-gesture-handler';

import { Table, Text } from '@base-components';
import { Author, Obra } from '@domain';
import { useTheme } from '@utils';
import * as heritagePerDecade from '@utils/data/heritagePerDecade';

function Decades(): JSX.Element {
  const allYears: { label: string; value: string }[] = [
    { label: 'Desconhecida', value: 'Null' },
  ];
  for (let year = 2020; year > 1500; year = year - 10) {
    allYears.push({ label: year.toString(), value: year.toString() });
  }

  const [open, setOpen] = useState(false);
  const [year, setValue] = useState('1990');
  const [items, setItems] = useState(allYears);
  const { theme } = useTheme();

  const typed_analysis_list_utils: Record<string, Obra[]> = heritagePerDecade;

  const obras_decada: Obra[] = typed_analysis_list_utils[`all${year}`];

  if (obras_decada.length > 0) {
    const tipologias_obras_decada: string[] = obras_decada.map(
      (obra) => obra.Tipologia ?? 'Desconhecida',
    );
    const naturezas_obras_decada: string[] = obras_decada.map(
      (obra) => obra.Natureza ?? 'Desconhecida',
    );
    const zonas_obras_decada: string[] = obras_decada.map(
      (obra) => obra.Zona ?? 'Desconhecida',
    );
    const status_obras_decada: string[] = obras_decada.map(
      (obra) => obra.Status ?? 'Desconhecida',
    );
    const autores_obras_decada: string[] = obras_decada
      .map(
        (obra) =>
          obra.Authors ?? [{ Person: { Name: 'Desconhecida' } } as Author],
      )
      .reduce<string[]>((r, l) => {
        Array.prototype.push.apply(
          r,
          l.map<string>((author) => author.Person?.Name ?? 'Desconhecida'),
        );
        return r;
      }, []);

    const tipologias_obras_decada_total: { nome: string; obras: Obra[] }[] =
      tipologias_obras_decada
        .reduce<{ nome: string; obras: Obra[] }[]>(function (r, a) {
          const r_top = r.find((top) => top.nome === a);
          if (!r_top) {
            r.push({
              nome: a,
              obras: obras_decada.filter(
                (obra) =>
                  obra.Tipologia === a ||
                  (obra.Tipologia == null && a === 'Desconhecida'),
              ),
            });
          }
          return r;
        }, [])
        .sort((a, b) => a.nome.localeCompare(b.nome));

    const naturezas_obras_decada_total: { nome: string; total: number }[] =
      naturezas_obras_decada
        .reduce<{ nome: string; total: number }[]>(function (r, a) {
          const r_top = r.find((top) => top.nome === a);
          if (!r_top) {
            r.push({
              nome: a,
              total: naturezas_obras_decada.filter((top) => top === a).length,
            });
          }
          return r;
        }, [])
        .sort((a, b) => a.nome.localeCompare(b.nome));

    const zonas_obras_decada_total: { nome: string; total: number }[] =
      zonas_obras_decada
        .reduce<{ nome: string; total: number }[]>(function (r, a) {
          const r_top = r.find((top) => top.nome === a);
          if (!r_top) {
            r.push({
              nome: a,
              total: zonas_obras_decada.filter((top) => top === a).length,
            });
          }
          return r;
        }, [])
        .sort((a, b) => a.nome.localeCompare(b.nome));

    const status_obras_decada_total: {
      nome: string;
      total: number;
      tipologias: { nome: string; total: number }[];
    }[] = status_obras_decada
      .reduce<
        {
          nome: string;
          total: number;
          tipologias: { nome: string; total: number }[];
        }[]
      >(function (r, a) {
        const r_top = r.find((top) => top.nome === a);
        if (!r_top) {
          const tipologias = obras_decada
            .filter(
              (obra) =>
                obra.Status === a ||
                (a === 'Desconhecida' && obra.Status == null),
            )
            .map((obra) => obra.Tipologia ?? 'Desconhecida');

          const tipologias_total: { nome: string; total: number }[] = tipologias
            .reduce<{ nome: string; total: number }[]>(function (r, a) {
              const r_top = r.find((top) => top.nome === a);
              if (!r_top) {
                r.push({
                  nome: a,
                  total: tipologias.filter((top) => top === a).length,
                });
              }
              return r;
            }, [])
            .sort((a, b) => a.nome.localeCompare(b.nome));

          r.push({
            nome: a,
            total: status_obras_decada.filter((top) => top === a).length,
            tipologias: tipologias_total,
          });
        }
        return r;
      }, [])
      .sort((a, b) => a.nome.localeCompare(b.nome));

    const authorsHeritageTotal: {
      nome: string;
      total: number;
      obras: string[];
    }[] = autores_obras_decada
      .reduce<{ nome: string; total: number; obras: string[] }[]>(function (
        r,
        a,
      ) {
        const r_top = r.find((top) => top.nome === a);
        if (!r_top) {
          const obras: string[] = obras_decada
            .filter(
              (obra) =>
                (obra.Authors != null &&
                  obra.Authors?.find((author) => author.Person?.Name === a) !=
                    null) ||
                (a === 'Desconhecida' && obra.Authors == null),
            )
            .map((obra) => obra.Titulo ?? 'Desconhecida');

          r.push({
            nome: a,
            total: obras.length,
            obras,
          });
        }
        return r;
      }, [])
      .sort((a, b) => a.nome.localeCompare(b.nome));

    return (
      <ScrollView
        style={{ width: '100%', paddingTop: 12, paddingHorizontal: 12 }}
      >
        <DropDownPicker
          theme={theme.dark ? 'DARK' : 'LIGHT'}
          open={open}
          value={year}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          listMode='SCROLLVIEW'
          scrollViewProps={{
            nestedScrollEnabled: true,
          }}
          textStyle={{ color: theme.text.textColor }}
          //arrowIconStyle={{ backgroundColor: theme.text.textColor }}
          dropDownContainerStyle={{ borderColor: theme.text.textColor }}
          selectedItemContainerStyle={{ backgroundColor: '#F2D7E3' }}
          style={{ borderColor: theme.text.textColor }}
          arrowIconContainerStyle={{ borderColor: theme.text.textColor }}
          //iconContainerStyle={{ borderColor: theme.text.textColor }}
          showTickIcon={false}
        />
        <View style={{ height: 12 }} />

        <Text>
          {year}: {obras_decada.length}
        </Text>
        <View style={{ height: 12 }} />

        <Table
          headers={[
            'Tipologia',
            `Total: ${tipologias_obras_decada_total.length}`,
            'Obras',
          ]}
          rows={tipologias_obras_decada_total.map((top) => [
            top.nome,
            top.obras.length.toString(),
            top.obras.map((obra) => obra.Titulo ?? 'Desconhecida').join(', '),
          ])}
        />
        <View style={{ height: 12 }} />

        <Table
          headers={[
            'Natureza',
            `Total: ${naturezas_obras_decada_total.length}`,
          ]}
          rows={naturezas_obras_decada_total.map((top) => [
            top.nome,
            top.total.toString(),
          ])}
        />
        <View style={{ height: 12 }} />

        <Table
          headers={['Zona', `Total: ${zonas_obras_decada_total.length}`]}
          rows={zonas_obras_decada_total.map((top) => [
            top.nome,
            top.total.toString(),
          ])}
        />
        <View style={{ height: 12 }} />

        <Table
          headers={[
            'Status',
            `Total: ${status_obras_decada_total.length}`,
            'Tipologias',
          ]}
          rows={status_obras_decada_total.map((top) => [
            top.nome,
            top.total.toString(),
            top.tipologias
              .map((top) => `${top.nome} (${top.total})`)
              .join(', '),
          ])}
        />
        <View style={{ height: 12 }} />

        <Table
          headers={[
            'Artista',
            `Total: ${authorsHeritageTotal.length}`,
            'Obras',
          ]}
          rows={authorsHeritageTotal.map((top) => [
            top.nome,
            top.total.toString(),
            top.obras.join(', '),
          ])}
        />
      </ScrollView>
    );
  }

  return (
    <ScrollView
      style={{ width: '100%', paddingTop: 12, paddingHorizontal: 12 }}
    >
      <DropDownPicker
        theme={theme.dark ? 'DARK' : 'LIGHT'}
        open={open}
        value={year}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        listMode='SCROLLVIEW'
        scrollViewProps={{
          nestedScrollEnabled: true,
        }}
        textStyle={{ color: theme.text.textColor }}
        //arrowIconStyle={{ backgroundColor: '#CC1964 !important' }}
        dropDownContainerStyle={{ borderColor: theme.text.textColor }}
        selectedItemContainerStyle={{ backgroundColor: '#F2D7E3' }}
        style={{ borderColor: theme.text.textColor }}
        arrowIconContainerStyle={{ borderColor: theme.text.textColor }}
        //iconContainerStyle={{ borderColor: '#CC1964 !important' }}
        showTickIcon={false}
      />
      <View style={{ height: 12 }} />
      <Text>Sem dados sobre o período</Text>
    </ScrollView>
  );
}

export default Decades;