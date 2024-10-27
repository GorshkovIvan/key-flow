// Base product type containing common fields

export interface ICreditsToken {
  contract_address: `0x${string}`;
  token_id: number;
}

export interface BaseProduct {
  id: string;
  date_added: string;
  date_purchased: string | null;
  company_name: string;
  short_description: string;
  long_description: string;
  credits: number;
  price: number;
  logo_link: string;
  sold: boolean;

  owner_address: `0x${string}`;
  contract_address: `0x${string}`;
  token_id: number;
}

export interface CompanyMetadata {
  company_name: string;
  company_logo: string;
  contract_address: `0x${string}`;
  total_credits: number;
  product_count: number;
  total_value: number;
  products: BaseProduct[];
}

// Success response for adding a key
export interface AddKeyResponse {
  message: string;
  product_id: string;
}

// Response type for listing keys and fetching unsold keys
export type ListKeysResponse = BaseProduct[];
export type FetchUnsoldKeysResponse = BaseProduct[];

// Buy request parameters
export interface BuyRequestParams {
  key_id: string;
}

// Buy response
export interface BuyResponse {
  message: string;
}

export interface MarkListedResponse {
  message: string;
}

// API response types grouped by endpoint
export interface ApiResponses {
  '/add_key': AddKeyResponse;
  '/list_keys': ListKeysResponse;
  '/fetch_unsold_keys': FetchUnsoldKeysResponse;
  '/buy': BuyResponse;
  '/set_listed': MarkListedResponse;
  '/delist': MarkListedResponse;
}
