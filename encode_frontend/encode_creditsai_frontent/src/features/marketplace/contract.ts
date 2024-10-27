import {creditsNftAbi} from './abi';
import {useAccount, useReadContract, useWriteContract} from 'wagmi';
import {
  ALL_KEY_QUERY_KEY,
  AVAILABLE_KEY_QUERY_KEY,
  BaseProduct,
  markDelisted,
  markListed,
  updateOwner,
} from '@/shared/api';
import {useQueryClient} from '@tanstack/react-query';

export function useMarketplaceContract({
  contractAddress,
}: {
  contractAddress: `0x${string}`;
}) {
  const listedTokens = useReadContract({
    address: contractAddress,
    abi: creditsNftAbi,
    functionName: 'listAvailable',
    args: [],
  });

  console.debug({listedTokens: listedTokens.data, error: listedTokens.error});
  return {listedTokens};
}

export function useNftMutations(product: BaseProduct) {
  const account = useAccount();
  const queryClient = useQueryClient();

  function refetch() {
    queryClient.refetchQueries({
      queryKey: ALL_KEY_QUERY_KEY,
    });
    queryClient.refetchQueries({
      queryKey: AVAILABLE_KEY_QUERY_KEY,
    });
  }
  return {
    markNewOwner: async () => {
      const response = await updateOwner(product.id, account.address || '');
      refetch();
      return response;
    },
    markListed: async () => {
      const response = await markListed(product.id);
      refetch();
      return response;
    },
    markDelisted: async () => {
      const response = await markDelisted(product.id);
      refetch();
      return response;
    },
  };
}

export function useTokenModel({
  contractAddress,
  tokenId,
}: {
  contractAddress: `0x${string}`;
  tokenId: string | number;
}) {
  const tokenPrice = useReadContract({
    address: contractAddress,
    abi: creditsNftAbi,
    functionName: 'getTokenPrice',
    args: [BigInt(tokenId)],
  });

  const tokenText = useReadContract({
    address: contractAddress,
    abi: creditsNftAbi,
    functionName: 'getText',
    args: [BigInt(tokenId)],
  });

  console.debug('DATA:', {
    tokenId,
    tokenPrice: tokenPrice.data,
  });

  return {
    tokenPrice,
    tokenText,
    isListedForSale: tokenPrice.isSuccess,
  };
}
