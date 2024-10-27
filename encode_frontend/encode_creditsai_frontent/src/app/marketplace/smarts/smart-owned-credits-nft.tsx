import {useNftMutations, useTokenModel} from '@/features/marketplace/contract';
import {BaseProduct} from '@/shared/api';
import {useConnectModal} from '@rainbow-me/rainbowkit';
import {useAccount} from 'wagmi';
import {CreditsNFTCard} from '../ui/credits-nft';
import {OwnedCreditsNFT} from '../ui/owned-credits-nft';
import {ListNftButton, UnlistNftButton} from '@/features/marketplace/transact';
import {parseEther} from 'viem';

interface SmartCreditsNFT {
  product: BaseProduct;
}

export function SmartOwnedCreditsNFT({product}: SmartCreditsNFT) {
  const tokenModel = useTokenModel({
    tokenId: product.token_id,
    contractAddress: product.contract_address,
  });

  const nftMutations = useNftMutations(product);

  return (
    <OwnedCreditsNFT
      product={product}
      isOnSale={tokenModel.isListedForSale}
      listButton={
        <ListNftButton
          contractAddress={product.contract_address}
          tokenId={product.token_id}
          price={parseEther('0.000005')}
          onError={console.error}
          onSuccess={() => {
            console.debug('LIST: ON_SUCESS_CALLED');
            return nftMutations.markListed();
          }}
        />
      }
      unlistButton={
        <UnlistNftButton
          contractAddress={product.contract_address}
          tokenId={product.token_id}
          onError={console.error}
          onSuccess={() => {
            console.debug('DELIST: ON_SUCESS_CALLED');
            return nftMutations.markDelisted();
          }}
        />
      }
    />
  );
}
