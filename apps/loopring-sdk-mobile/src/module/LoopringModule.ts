import { NativeModules } from 'react-native';
const { LoopringModule } = NativeModules;
interface LoopringInterface {
  generateKeyPair(
    signature: string
  ): Promise<{ sk: string; x: string; y: string }>;
}
export default LoopringModule as LoopringInterface;
