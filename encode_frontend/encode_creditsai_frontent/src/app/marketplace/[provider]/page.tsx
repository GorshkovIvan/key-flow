'use client';

import {BaseProduct, useBackendModel} from 'src/shared/api';
import {APICard} from '@/app/marketplace/ui/api-card';
import {CreditsNFTCard} from '@/app/marketplace/ui/credits-nft';
import {useRouter} from 'next/navigation';
import {ConnectButton, useConnectModal} from '@rainbow-me/rainbowkit';
import {useAccount} from 'wagmi';
import {SmartCreditsNFT} from '../smarts/smart-credits-nft';
import {useMarketplaceContract} from '@/features/marketplace/contract';
import {MarketplaceProviderContent} from './marketplace-provider-content';

/**
 * Renders the Marketplace component which displays a list of API service providers.
 * The component fetches data using the useBackendModel hook and maps over the
 * serviceProviders to render an APICard for each provider, displaying details like
 * company name, total value, total credits, and other provider-specific information.
 */
export default function ProviderData({params}: {params: {provider: string}}) {
  const router = useRouter();
  const model = useBackendModel();
  console.debug(params.provider);
  const provider = model.serviceProviders.find((provider) => {
    return provider.company_name === decodeURIComponent(params.provider);
  });

  const items = provider?.products || [];

  if (items.length === 0 || !provider) {
    return <div>Not Found</div>;
  }

  return <MarketplaceProviderContent provider={provider} items={items} />;
}
