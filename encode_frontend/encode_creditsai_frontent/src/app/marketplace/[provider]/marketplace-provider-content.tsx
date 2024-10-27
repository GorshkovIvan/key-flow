import {BaseProduct, CompanyMetadata} from '@/shared/api';
import {APICard} from '../ui/api-card';
import {SmartCreditsNFT} from '../smarts/smart-credits-nft';
import {useMarketplaceContract} from '@/features/marketplace/contract';
import {SmartApiCard} from '../smarts/smart-api-card';

export function MarketplaceProviderContent({
  provider,
  items,
}: {
  provider: CompanyMetadata;
  items: BaseProduct[];
}) {
  return (
    <div className="flex h-full w-96 max-w-full flex-col px-1 md:w-[1008px]">
      <div className="mb-10">
        <SmartApiCard provider={provider} />
      </div>

      <div className="grid gap-5 grid-cols-1 md:grid-cols-2">
        {items.map((item) => {
          return <SmartCreditsNFT key={item.id} product={item} />;
        })}
      </div>
    </div>
  );
}
