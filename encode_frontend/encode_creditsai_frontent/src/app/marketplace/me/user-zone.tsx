'use client';

import {useBackendModel, useOwnedKeys} from 'src/shared/api';
import {useRouter} from 'next/navigation';
import {useAccount} from 'wagmi';
import {SmartOwnedCreditsNFT} from '../smarts/smart-owned-credits-nft';
import {Button} from '@/components/Button';

export function UserZone({
  address,
  contractAddresses,
}: {
  address: string;
  contractAddresses: string[];
}) {
  const model = useBackendModel();
  const router = useRouter();

  const myNfts = useOwnedKeys({
    address,
  });

  const tokenIds = myNfts.ownedKeysQuery.data?.ownedNfts.map(
    (nft) => nft.tokenId,
  );

  const products = (model.allKeysQuery.data?.data || []).filter((product) => {
    return tokenIds?.includes(String(product.token_id));
  });

  return (
    <div className="flex h-full w-96 max-w-full flex-col px-1 md:w-[1008px]">
      <h1 className="text-xl mb-6 font-bold">Your API Credits</h1>
      {products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {products.map((product) => {
            return <SmartOwnedCreditsNFT product={product} key={product.id} />;
          })}
        </div>
      ) : (
        <div className="text-xl mb-6 font-bold text-center flex flex-col items-center my-20">
          You have no API Credits yet
          <Button
            className="mt-4"
            onClick={() => {
              router.push('/marketplace');
            }}
          >
            Buy Credits
          </Button>
        </div>
      )}
    </div>
  );
}
