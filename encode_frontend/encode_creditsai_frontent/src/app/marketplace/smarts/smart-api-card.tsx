import {CompanyMetadata} from '@/shared/api';
import {APICard} from '../ui/api-card';
import {useMarketplaceContract} from '@/features/marketplace/contract';

export function SmartApiCard({provider}: {provider: CompanyMetadata}) {
  const marketplace = useMarketplaceContract({
    contractAddress: provider?.contract_address || '',
  });

  return (
    <APICard
      category="Artificial Intelligence/Machine Learning"
      title={provider.company_name}
      description={'AI service provider'}
      rating={provider.total_value}
      imageSrc={provider.company_logo}
      tokensAvailable={provider.products.length}
      creditsTotal={provider.total_credits}
      provider={provider.company_name}
      lastUpdated="Updated 2 months ago"
      isFavorite={false}
      onFavoriteClick={() => console.log('Favorite clicked')}
    />
  );
}
