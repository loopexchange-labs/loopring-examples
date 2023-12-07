/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useCallback } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  StatusBar,
  Text,
  Button,
} from 'react-native';

import LoopringModule from '../module/LoopringModule';

// It's just the private key from the unit tests of loopring_sdk
const privateKey =
  '0x2abaf07fe8669180cee9bd3e7058a4aa0d3addb4ef9509e78d5808bdff4b6ea';

export const App = () => {
  const [fudgeySignature, setFudgeySignature] = React.useState<string>('');
  const [fudgeyTime, setFudgeyTime] = React.useState<number>(0);

  const [requestSignature, setRequestSignature] = React.useState<string>('');
  const [requestTime, setRequestTime] = React.useState<number>(0);

  const onFudgeyBenchmark = useCallback(async () => {
    const t0 = performance.now();

    // The underlying function is called 1000 times in the native module
    setFudgeySignature(await LoopringModule.fudgeyBenchmark());

    const t1 = performance.now();
    setFudgeyTime(t1 - t0);
  }, []);

  const onPressSignRequest = useCallback(async () => {
    const t0 = performance.now();
    let signature: string;
    for (let i = 0; i < 1000; i++) {
      signature = await LoopringModule.signRequest(
        privateKey,
        'GET',
        'https://uat2.loopring.io',
        '/api/v3/resource',
        'accountId%3D10149'
      );
    }
    const t1 = performance.now();
    setRequestTime(t1 - t0);
    setRequestSignature(signature);
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView style={styles.scrollView}>
          <View style={styles.section}>
            <Text style={{ marginBottom: 10 }}>Hello, Loopring</Text>
            <Button
              onPress={onFudgeyBenchmark}
              title="Run Fudgey Benchmark"
              color="#4169e1"
            />
            <Text style={{ marginBottom: 10, marginTop: 10 }}>
              Signature: {fudgeySignature}
            </Text>
            <Text style={{ marginBottom: 60, fontWeight: 'bold' }}>
              Call to 1000 SignPoseidon took {fudgeyTime} milliseconds.
            </Text>

            <Text style={{ marginBottom: 5 }}>Private Key: {privateKey}</Text>
            <Text style={{ marginBottom: 5 }}>Method: GET</Text>
            <Text style={{ marginBottom: 5 }}>
              BaseURL: https://uat2.loopring.io
            </Text>
            <Text style={{ marginBottom: 5 }}>Path: /api/v3/resource</Text>
            <Text style={{ marginBottom: 10 }}>Params: accountId%3D10149</Text>
            <Button
              onPress={onPressSignRequest}
              title="Run SignRequest Benchmark"
              color="#4169e1"
            />
            <Text style={{ marginBottom: 10, marginTop: 10 }}>
              requestSignature: {requestSignature}
            </Text>
            <Text style={{ marginBottom: 10, fontWeight: 'bold' }}>
              Call to 1000 signRequest took {requestTime} milliseconds.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#ffffff',
  },
  section: {
    marginVertical: 24,
    marginHorizontal: 12,
  },
});

export default App;
