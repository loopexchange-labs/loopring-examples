import { NativeModules } from 'react-native';
const { LoopringModule } = NativeModules;
interface LoopringInterface {
  fudgeyBenchmark(): Promise<string>;
  signRequest(
    privateKey: string,
    method: string,
    baseUrl: string,
    path: string,
    data: string
  ): Promise<string>;
}
export default LoopringModule as LoopringInterface;
