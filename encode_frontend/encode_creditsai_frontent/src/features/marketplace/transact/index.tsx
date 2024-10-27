'use client';
import {BASE_SEPOLIA_CHAIN_ID} from '@/constants';
import {creditsNftAbi} from '@/features/marketplace/abi';
import {
  Transaction,
  TransactionButton,
  TransactionStatus,
  TransactionStatusAction,
  TransactionStatusLabel,
} from '@coinbase/onchainkit/transaction';
import type {
  TransactionError,
  TransactionResponse,
} from '@coinbase/onchainkit/transaction';
import {formatEther, type ContractFunctionParameters} from 'viem';

export function ListNftButton({
  contractAddress,
  tokenId,
  price,
  onError,
  onSuccess,
}: {
  contractAddress: `0x${string}`;
  tokenId: string | number;
  price: bigint;
  onError: (err: TransactionError) => void;
  onSuccess: (response: TransactionResponse) => void;
}) {
  const contracts = [
    {
      address: contractAddress,
      abi: creditsNftAbi,
      functionName: 'listToMarket',
      args: [BigInt(tokenId), price],
    },
  ] as unknown as ContractFunctionParameters[];

  return (
    <div className="flex w-[450px]">
      <Transaction
        contracts={contracts}
        className="w-[450px]"
        chainId={BASE_SEPOLIA_CHAIN_ID}
        onError={onError}
        onSuccess={onSuccess}
        capabilities={{
          paymasterService: {
            url: process.env.NEXT_PUBLIC_PAYMASTER_AND_BUNDLER_ENDPOINT!,
          },
        }}
      >
        <TransactionButton
          className="mt-0 mr-auto ml-auto w-[450px] max-w-full text-[white]"
          text="List for sale"
        />
        <TransactionStatus>
          <TransactionStatusLabel />
          <TransactionStatusAction />
        </TransactionStatus>
      </Transaction>
    </div>
  );
}

export function UnlistNftButton({
  contractAddress,
  tokenId,
  onError,
  onSuccess,
}: {
  contractAddress: `0x${string}`;
  tokenId: string | number;
  onError: (err: TransactionError) => void;
  onSuccess: (response: TransactionResponse) => void;
}) {
  const contracts = [
    {
      address: contractAddress,
      abi: creditsNftAbi,
      functionName: 'unlistFromMarket',
      args: [BigInt(tokenId)],
    },
  ] as unknown as ContractFunctionParameters[];

  return (
    <div className="flex w-[450px]">
      <Transaction
        contracts={contracts}
        chainId={BASE_SEPOLIA_CHAIN_ID}
        onError={onError}
        onSuccess={onSuccess}
        capabilities={{
          paymasterService: {
            url: process.env.NEXT_PUBLIC_PAYMASTER_AND_BUNDLER_ENDPOINT!,
          },
        }}
      >
        <TransactionButton
          className="mt-0 mr-auto ml-auto w-[450px] max-w-full text-[white]"
          text="Unlist from sale"
        />
        <TransactionStatus>
          <TransactionStatusLabel />
          <TransactionStatusAction />
        </TransactionStatus>
      </Transaction>
    </div>
  );
}

export function BuyButton({
  contractAddress,
  tokenId,
  price,
  onError,
  onSuccess,
}: {
  contractAddress: `0x${string}`;
  tokenId: string | number;
  price: bigint;
  onError: (err: TransactionError) => void;
  onSuccess: (response: TransactionResponse) => void;
}) {
  const contracts = [
    {
      address: contractAddress,
      abi: creditsNftAbi,
      functionName: 'buyAvailable',
      args: [BigInt(tokenId)],
      value: price,
    },
  ] as unknown as ContractFunctionParameters[];

  return (
    <div className="flex w-[450px]">
      <Transaction
        contracts={contracts}
        chainId={BASE_SEPOLIA_CHAIN_ID}
        onError={onError}
        onSuccess={onSuccess}
        capabilities={{
          paymasterService: {
            url: process.env.NEXT_PUBLIC_PAYMASTER_AND_BUNDLER_ENDPOINT!,
          },
        }}
      >
        <TransactionButton
          className="mt-0 mr-auto ml-auto w-[450px] max-w-full text-[white]"
          text={`Buy for ${formatEther(price)} ETH`}
        />
        <TransactionStatus>
          <TransactionStatusLabel />
          <TransactionStatusAction />
        </TransactionStatus>
      </Transaction>
    </div>
  );
}
