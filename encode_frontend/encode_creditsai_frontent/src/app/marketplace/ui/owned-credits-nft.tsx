import React from 'react';
import {Card, CardContent} from '@/components/ui/card';
import {BaseProduct} from '@/shared/api';
import {CreditCard, Info} from 'lucide-react';
import {formatEthAddress} from '@/shared/helpers';
import {parseEther} from 'viem';

interface ProductCardProps {
  product: BaseProduct;
  isOnSale?: boolean;
  listButton?: React.ReactNode;
  unlistButton?: React.ReactNode;
}

export const OwnedCreditsNFT: React.FC<ProductCardProps> = ({
  product,
  isOnSale,
  unlistButton,
  listButton,
}) => {
  const formatPrice = (price: number): string => {
    return `${price} ETH`;
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.RelativeTimeFormat('en')
      .format(
        Math.ceil((date.getTime() - Date.now()) / (1000 * 60 * 60 * 24)),
        'day',
      )
      .replace('in ', '');
  };

  return (
    <Card className="w-full hover:shadow-lg transition-shadow">
      <CardContent className="p-4">
        {/* Status Badge */}
        {/* <div className="mb-4 flex items-center justify-between">
          <span
            className={`text-sm px-3 py-1 rounded-full ${
              product.sold
                ? 'bg-gray-100 text-gray-600'
                : 'bg-green-50 text-green-600'
            }`}
          >
            {product.sold ? 'Sold' : 'Available'}
          </span>
        </div> */}

        {/* Main Content */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex gap-3">
            {/* Company Logo */}
            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden">
              {product.logo_link ? (
                <img
                  src={product.logo_link}
                  alt={`${product.company_name} logo`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-400 text-xl">
                  {product.company_name.charAt(0)}
                </span>
              )}
            </div>

            {/* Title and Description */}
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">
                {product.company_name} {product.token_id}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-2">
                {product.short_description}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2"></div>
        </div>

        {/* Stats and Price Section */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            {/* Credits */}
            <div className="flex items-center gap-1">
              <span className="text-gray-600">💎</span>
              <span className="font-medium">{product.credits} credits</span>
            </div>

            {/* Date Added */}
            <div className="text-gray-600">
              Added {formatDate(product.date_added)}
            </div>
          </div>

          {/* Price and Buy Button */}
          {/* <div className="flex items-center gap-3">
            <span className="font-semibold text-gray-900">
              {formatPrice(product.price)}
            </span>
          </div> */}
        </div>
        <div className="flex justify-between mt-6">
          {isOnSale ? unlistButton : listButton}
          {/* <button
            onClick={() => {
              if (isOnSale) {
                onUnlistForSaleClick(product);
              } else {
                onListForSaleClick(product, parseEther('0.000005'));
              }
            }}
            disabled={product.sold}
            className={`
                flex items-center gap-2 px-4 py-2 rounded-lg ml-auto
                ${
                  product.sold
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }
              `}
          >
            <CreditCard size={16} />
            {isOnSale ? 'Unlist' : 'List For 0.000005 ETH'}
          </button> */}
        </div>
      </CardContent>
    </Card>
  );
};
