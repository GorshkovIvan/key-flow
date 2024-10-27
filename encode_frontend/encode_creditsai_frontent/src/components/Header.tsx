'use client';

import {ONCHAINKIT_LINK} from 'src/links';
import OnchainkitSvg from 'src/svg/OnchainkitSvg';
import LoginButton from '../components/LoginButton';
import SignupButton from '../components/SignupButton';
import {useRouter} from 'next/navigation';
import {useAccount} from 'wagmi';

export function Header() {
  const {address} = useAccount();

  const router = useRouter();
  return (
    <section className="mt-6 mb-6 flex w-full flex-col md:flex-row max-w-full md:w-[1008px]">
      <div className="flex w-full flex-row items-center justify-between gap-2 md:gap-0">
        <a
          href={ONCHAINKIT_LINK}
          title="onchainkit"
          target="_blank"
          rel="noreferrer"
          className="font-black text-3xl"
        >
          <span>KeyFlow</span>
        </a>

        <div className="flex w-full mx-8 gap-4 items-center justify-center">
          <a
            onClick={() => router.push('/chat')}
            className="hover:underline hover:font-bold cursor-pointer"
          >
            Chat
          </a>
          <a
            onClick={() => router.push('/marketplace')}
            className="hover:underline hover:font-bold cursor-pointer"
          >
            All Providers
          </a>
          <a
            onClick={() => router.push('/marketplace/me')}
            className="hover:underline hover:font-bold cursor-pointer"
          >
            My Account
          </a>
        </div>
        <div className="flex items-center gap-3">
          <SignupButton />
          {!address && <LoginButton />}
        </div>
      </div>
    </section>
  );
}
