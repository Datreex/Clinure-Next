"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const LandingPage = () => {
  const pathname = usePathname();
  return (
    <>
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Welcome to Datreex Clinure Choose the right platform for you
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <div className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0">
            By{" "}
            <Image
              src="/datreex-logo.svg"
              alt="Datreex Logo"
              className="dark:invert"
              width={100}
              height={24}
              priority
            />
          </div>
        </div>
      </div>

      <div
        className="relative flex place-items-center
      before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full 
      before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] 
      after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 
      after:bg-gradient-conic after:from-teal-200 after:via-blue-200 after:blur-2xl after:content-['']
      before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-emerald-700 before:dark:opacity-30
      after:dark:from-teal-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]"
      >
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/Clinure.svg"
          alt="clinure Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-2 lg:text-left">
        <Link
          href={`${pathname}/patients`}
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          // target="_blank"
          // rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            For patients{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Find in-depth information about Next.js features and API.
          </p>
        </Link>

        <Link
          href={`${pathname}/researchers`}
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            For Researchers{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Learn about Next.js in an interactive course with&nbsp;quizzes!
          </p>
        </Link>
      </div>
    </>
  );
};
