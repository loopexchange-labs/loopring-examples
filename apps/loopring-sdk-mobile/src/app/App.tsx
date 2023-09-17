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

const unlockSignature =
  '0xa6bd206701d1aaa1d45d6ab870e5e17801a6d98fb4440a02bab58e7ab762a55a5495da27508c529b7bab192baf819c600ed6fc474bac0fb87a7733b6257af92f1b';

export const App = () => {
  const [sk, setSk] = React.useState<string>('');
  const [time, setTime] = React.useState<number>(0);

  const onPressUnlock = useCallback(async () => {
    const t0 = performance.now();
    let signature;
    for (let i = 0; i < 1000; i++) {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      signature = await LoopringModule.generateKeyPair(unlockSignature);
    }
    const t1 = performance.now();
    setTime(t1 - t0);
    setSk(signature.sk);
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView style={styles.scrollView}>
          <View style={styles.section}>
            <Text style={{ marginBottom: 10 }}>Hello, Loopring</Text>
            <Text style={{ marginBottom: 10 }}>
              Unlock Signature: {unlockSignature}
            </Text>
            <Button onPress={onPressUnlock} title="Unlock" color="#4169e1" />
            <Text style={{ marginBottom: 10, marginTop: 10 }}>
              Private Key: {sk}
            </Text>
            <Text style={{ marginBottom: 10 }}>
              Call to 1000 onPressUnlock took {time} milliseconds.
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
