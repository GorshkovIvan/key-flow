import {useNftMutations, useTokenModel} from '@/features/marketplace/contract';
import {BaseProduct} from '@/shared/api';
import {useConnectModal} from '@rainbow-me/rainbowkit';
import {useAccount} from 'wagmi';
import {CreditsNFTCard} from '../ui/credits-nft';
import {BuyButton} from '@/features/marketplace/transact';

interface SmartCreditsNFT {
  product: BaseProduct;
}

export function SmartCreditsNFT({product}: SmartCreditsNFT) {
  const tokenBuy = useTokenModel({
    tokenId: product.token_id,
    contractAddress: product.contract_address,
  });
  const nftMutations = useNftMutations(product);

  return (
    <CreditsNFTCard
      product={product}
      buyButton={
        tokenBuy.tokenPrice.data ? (
          <BuyButton
            contractAddress={product.contract_address}
            tokenId={product.token_id}
            price={tokenBuy.tokenPrice.data}
            onError={console.debug}
            onSuccess={() => {
              return nftMutations.markNewOwner();
            }}
          />
        ) : null
      }
    />
  );
}
