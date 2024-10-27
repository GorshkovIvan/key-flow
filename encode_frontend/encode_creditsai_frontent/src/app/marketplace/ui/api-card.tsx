import React from 'react';

interface APICardProps {
  // Category and main content
  category: string;
  title: string;
  description: string;
  imageSrc?: string;
  iconText?: string;
  iconBgColor?: string;

  // Metrics
  rating: number;
  creditsTotal: number; // in milliseconds
  tokensAvailable: number; // percentage

  // Meta information
  provider: string;
  lastUpdated: string;

  // Optional state
  isFavorite?: boolean;
  onFavoriteClick?: () => void;
}

export const APICard: React.FC<APICardProps> = ({
  category,
  title,
  description,
  imageSrc,
  iconText = 'AI',
  iconBgColor = 'bg-blue-500',
  rating,
  creditsTotal,
  tokensAvailable,
  provider,
  lastUpdated,
}) => {
  // Format response time to be more readable
  const formatCreditsTotal = (ms: number): string => {
    return `${ms} credits`;
  };

  // Format success rate as percentage
  const formatSuccessRate = (rate: number): string => {
    return `${rate} tokens`;
  };

  return (
    <div className="p-4 border rounded-lg hover:shadow-lg transition-shadow">
      {/* Category Badge */}
      <div className="mb-4">
        <span className="bg-pink-50 text-pink-500 text-sm px-3 py-1 rounded-full">
          {category}
        </span>
      </div>

      {/* Header Section */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-3">
          {/* API Icon */}
          <div
            className={`w-10 h-10 ${iconBgColor} rounded-lg flex items-center justify-center`}
          >
            {imageSrc ? (
              <img src={imageSrc} className="w-full h-full object-cover" />
            ) : (
              <span className="text-white text-xl">iconText</span>
            )}
          </div>

          {/* Title and Description */}
          <div>
            <h3 className="font-semibold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-4">
          {/* Rating */}
          <div className="flex items-center gap-1">
            <span className="text-gray-600">↗</span>
            <span className="font-medium">{rating.toFixed(1)}</span>
          </div>

          {/* Response Time */}
          <div className="flex items-center gap-1">
            <span className="text-gray-400">⏱</span>
            <span className="text-gray-600">
              {formatCreditsTotal(creditsTotal)}
            </span>
          </div>

          {/* Success Rate */}
          <div>
            <span className="text-gray-600">
              {formatSuccessRate(tokensAvailable)}
            </span>
          </div>
        </div>

        {/* Meta Information */}
        <div className="flex items-center gap-4 text-gray-600">
          <span>By {provider}</span>
          <span>{lastUpdated}</span>
        </div>
      </div>
    </div>
  );
};
