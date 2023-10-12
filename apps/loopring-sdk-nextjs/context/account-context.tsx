import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { type AccountInfo } from '@loopexchange-labs/loopring-sdk';
import { useAccount, useNetwork } from 'wagmi';

type AccountData =
  | {
      accountInfo: AccountInfo;
      address: `0x${string}`;
      chainId: number;
    }
  | undefined;

export interface AccountConfig {
  data: AccountData;
  loading: boolean;
}

const AccountContext = createContext<AccountConfig | null>(null);

export function LoopringAccountProvider({ children }: React.PropsWithChildren) {
  const [data, setData] = useState<AccountData>(undefined);
  const [loading, setLoading] = useState(false);
  const { chain } = useNetwork();

  const reset = useCallback(async () => {
    setData(undefined);
  }, []);

  const { address } = useAccount({
    onDisconnect: () => {
      reset();
    },
  });

  const fetchAccountInfo = useCallback(async () => {
    const { isLoopringChain, LoopringAPI } = await import(
      '@loopexchange-labs/loopring-sdk'
    );

    if (!address || !chain || chain.unsupported || !isLoopringChain(chain.id)) {
      await reset();
      return;
    }

    if (data && data.address === address && data.chainId === chain.id) {
      return;
    }

    setLoading(true);

    try {
      const api = new LoopringAPI(chain.id);

      const accInfo = await api.accountApi.getAccount({
        owner: address,
      });

      const accountData: AccountData = {
        accountInfo: accInfo,
        address,
        chainId: chain.id,
      };

      setData(accountData);
    } catch (e) {
      console.error(e);
      await reset();
    } finally {
      setLoading(false);
    }
  }, [address, chain, data, reset]);

  useEffect(() => {
    fetchAccountInfo();
  }, [fetchAccountInfo]);

  return (
    <AccountContext.Provider
      value={useMemo(() => ({ data, loading }), [data, loading])}
    >
      {children}
    </AccountContext.Provider>
  );
}

export function useAccountContext() {
  const contextValue = useContext(AccountContext);

  if (!contextValue) {
    throw new Error('No account context found');
  }

  return contextValue;
}
