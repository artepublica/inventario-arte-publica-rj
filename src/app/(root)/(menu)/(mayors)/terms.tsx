import React from 'react';

import Head from 'expo-router/head';
import { StyleSheet, View } from 'react-native';

import { MayorTerm } from '@pages';
import { thesisHeritages } from '@utils';

function Terms(): JSX.Element {
  return (
    <>
      <Head>
        <title>Arte Pública - Mandatos</title>
      </Head>
      <View style={styles.container}>
        <MayorTerm heritages={thesisHeritages} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
});

export default Terms;
