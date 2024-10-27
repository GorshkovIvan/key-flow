'use client';

import {useBackendModel, useOwnedKeys} from 'src/shared/api';
import {useRouter} from 'next/navigation';
import {useAccount} from 'wagmi';
import {ConnectButton} from '@rainbow-me/rainbowkit';
import {UserZone} from './user-zone';

export default function Marketplace() {
  const model = useBackendModel();

  const {address} = useAccount();

  if (!address) {
    return (
      <div>
        <h3>Please connect</h3>
        <ConnectButton />
      </div>
    );
  }

  return (
    <UserZone
      address={address}
      contractAddresses={model.serviceProviders.map(
        (provider) => provider.contract_address,
      )}
    />
  );
}
