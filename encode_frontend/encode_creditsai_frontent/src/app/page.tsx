'use client';
import {useRouter} from 'next/navigation';
import Footer from 'src/components/Footer';
import TransactionWrapper from 'src/components/TransactionWrapper';
import WalletWrapper from 'src/components/WalletWrapper';

import {useAccount} from 'wagmi';

export default function Page() {
  const {address} = useAccount();
  const router = useRouter();

  return (
    <div className="flex h-full w-96 max-w-full md:w-[1008px] flex-col px-1 ">
      <section className="templateSection flex w-full flex-col items-center justify-center gap-4 rounded-xl bg-gray-100 px-2 py-4 md:grow">
        <div className="flex h-[450px] w-[450px] max-w-full items-center justify-center rounded-xl bg-[#030712]">
          <div className="rounded-xl bg-[#F3F4F6] px-4 py-[11px]">
            <p className="font-normal text-indigo-600 text-xl not-italic tracking-[-1.2px]">
              encode_hack_creditsai
            </p>
          </div>
        </div>

        <button
          className="bg-blue-600 w-52 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl"
          onClick={() => router.push('/marketplace')}
        >
          Okay, lets gooo {'->'}
        </button>
      </section>
      <Footer />
    </div>
  );
}
