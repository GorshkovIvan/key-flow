'use client';

import {useBackendModel} from 'src/shared/api';
import {APICard} from './ui/api-card';
import {useRouter} from 'next/navigation';
import {SmartApiCard} from './smarts/smart-api-card';

export default function Marketplace() {
  const model = useBackendModel();
  const router = useRouter();

  return (
    <div className="flex h-full w-96 max-w-full flex-col px-1 md:w-[1008px]">
      <div className="flex flex-col gap-5">
        {model.serviceProviders.map((provider) => {
          return (
            <button
              onClick={() => {
                router.push(`/marketplace/${provider.company_name}`);
              }}
            >
              <SmartApiCard provider={provider} />
            </button>
          );
        })}
      </div>
    </div>
  );
}
