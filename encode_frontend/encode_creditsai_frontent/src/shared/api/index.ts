import {useMutation, useQuery} from '@tanstack/react-query';
import axios from 'axios';
import type {ApiResponses, BuyRequestParams} from './interfaces';
import {groupProductsByCompany} from './lib/group-api-provider';
import {alchemy} from './alchemy';
import {PROVIDER_CONTRACT_ADDRESSES} from './constants';

const BASE_URL = 'https://3c5f-82-163-218-33.ngrok-free.app';

const client = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true',
  },
});

export function markListed(product_id: string) {
  return client.post<ApiResponses['/set_listed']>(`/set_listed/${product_id}`);
}

export function markDelisted(product_id: string) {
  return client.post<ApiResponses['/delist']>(`/delist/${product_id}`);
}

export function updateOwner(product_id: string, new_owner_address: string) {
  return client.post<ApiResponses['/buy']>(
    `/buy/${product_id}/${new_owner_address}`,
  );
}

function getAllKeys() {
  return client.get<ApiResponses['/list_keys']>(`/list_keys`);
}

function FetchUnsoldKeysResponse() {
  return client.get<ApiResponses['/fetch_unsold_keys']>('/products/listed');
}

function buyKey(params: BuyRequestParams) {
  return client.post<ApiResponses['/buy']>(`/buy?key_id=${params.key_id}`);
}

export function postChat(params: {
  text: string;
  address: string;
  signed: string;
}) {
  return client.post(
    '/chat',
    {
      message: params.text,
      nkeypass_signed_request: params.signed,
      nkeypass_address: params.address,
    },
    {},
  );
}

export function useOwnedKeys({address}: {address: string}) {
  const ownedKeysQuery = useQuery({
    queryKey: ['ownedKeys'],
    queryFn: () =>
      alchemy.nft.getNftsForOwner(address, {
        contractAddresses: PROVIDER_CONTRACT_ADDRESSES,
      }),
  });

  return {ownedKeysQuery};
}

export const ALL_KEY_QUERY_KEY = ['allKeys'];
export const AVAILABLE_KEY_QUERY_KEY = ['availableKeys'];

export function useBackendModel() {
  const allKeysQuery = useQuery({
    queryKey: ['allKeys'],
    queryFn: getAllKeys,
  });

  const availableKeysQuery = useQuery({
    queryKey: ['availableKeys'],
    queryFn: FetchUnsoldKeysResponse,
  });

  const buyKeyMutation = useMutation({
    mutationKey: ['buyKey'],
    mutationFn: buyKey,
  });

  const serviceProviders = groupProductsByCompany(
    availableKeysQuery.data?.data || [],
  );

  return {allKeysQuery, availableKeysQuery, buyKeyMutation, serviceProviders};
}

export * from './interfaces';
