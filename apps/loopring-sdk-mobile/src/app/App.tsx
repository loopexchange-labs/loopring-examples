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

const hash =
  '0x25520a5d8eeba3449c86a3a4ccc9c99e38b72c334192d6dbe022ae31adcbba2c';

// It's just the private key from the unit tests of loopring_sdk
const privateKey =
  '0x2abaf07fe8669180cee9bd3e7058a4aa0d3addb4ef9509e78d5808bdff4b6ea';

export const App = () => {
  const [sigWithPadding, setSigWithPadding] = React.useState<string>('');
  const [time, setTime] = React.useState<number>(0);

  const onPress = useCallback(async () => {
    const t0 = performance.now();
    let signature: string;
    for (let i = 0; i < 1000; i++) {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      signature = await LoopringModule.genSigWithPadding(privateKey, hash);
    }
    const t1 = performance.now();
    setTime(t1 - t0);
    setSigWithPadding(signature);
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView style={styles.scrollView}>
          <View style={styles.section}>
            <Text style={{ marginBottom: 10 }}>Hello, Loopring</Text>
            <Text style={{ marginBottom: 10 }}>Hash: {hash}</Text>
            <Text style={{ marginBottom: 10 }}>Private Key: {privateKey}</Text>
            <Button onPress={onPress} title="Calculate" color="#4169e1" />
            <Text style={{ marginBottom: 10, marginTop: 10 }}>
              sigWithPadding: {sigWithPadding}
            </Text>
            <Text style={{ marginBottom: 10 }}>
              Call to 1000 genSigWithPadding took {time} milliseconds.
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
