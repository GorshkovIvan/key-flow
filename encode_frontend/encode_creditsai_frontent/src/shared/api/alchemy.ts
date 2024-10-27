// Github: https://github.com/alchemyplatform/alchemy-sdk-js
import {Network, Alchemy} from 'alchemy-sdk';

const settings = {
  apiKey: 'uGemnct92UQFRhuUfKPYCyUEHPRa-MTy',
  network: Network.BASE_SEPOLIA,
};

export const alchemy = new Alchemy(settings);
