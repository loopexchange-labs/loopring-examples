import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useEffect, useMemo, useState } from 'react';
import { useAccount, useNetwork } from 'wagmi';
import { useUnlockContext } from '../context/unlock-context';
import { useAccountContext } from '../context/account-context';

export function Index() {
  const { isConnected, address, connector } = useAccount();
  const { chain } = useNetwork();
  const connected = useMemo(
    () => isConnected && chain && !chain.unsupported,
    [chain, isConnected]
  );
  const { data: accountData } = useAccountContext();
  const { data: unlockData, isUnlocked, unlock } = useUnlockContext();

  // Server rendering doesn't have access to wallet connection
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className="mt-4">
      <ConnectButton />
      <p className="mb-2 mt-5">Connected: {connected ? 'Yes' : 'No'}</p>
      <p className="mb-2 mt-5">Connector: {connector?.name}</p>
      <p className="mb-2">Chain: {chain?.id}</p>
      <p className="mb-2">Address: {address}</p>
      <pre className="mb-5">
        Account: {JSON.stringify(accountData?.accountInfo, null, 2)}
      </pre>

      <button
        type="button"
        onClick={unlock}
        className="bg-pink-500 p-3 text-sm font-bold rounded-lg text-white"
        disabled={!connected}
      >
        Unlock Account{!connected && ' (disabled)'}
      </button>

      <p className="mb-2 mt-5">Unlocked: {isUnlocked ? 'Yes' : 'No'}</p>
      <p className="mb-2 mt-5">
        API Key:{' '}
        {unlockData ? `${unlockData.apiKey.substring(0, 5)}...` : undefined}
      </p>
      <p className="mb-2 mt-5">
        Secret Key:{' '}
        {unlockData ? `${unlockData.sk.substring(0, 5)}...` : undefined}
      </p>
      <p className="mb-2 mt-5">
        Public X: {unlockData ? `${unlockData.publicX}...` : undefined}
      </p>
      <p className="mb-2 mt-5">
        Public Y: {unlockData ? `${unlockData.publicY}...` : undefined}
      </p>
    </div>
  );
}

export default Index;
