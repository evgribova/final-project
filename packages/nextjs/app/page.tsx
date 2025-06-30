"use client";

import Link from "next/link";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Address } from "~~/components/scaffold-eth";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
      {/* Header */}
      <header className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 p-8 rounded-b-3xl shadow-lg">
        <h1 className="text-center text-5xl font-extrabold text-white">
          <span className="block">Приветствуем в</span>
          <span className="block text-6xl">DigitalAssetMarketplace</span>
        </h1>
      </header>

      {/* Main */}
      <div className="flex flex-col md:flex-row flex-grow p-8 gap-8">
        {/* Connected Address */}
        <aside className="md:w-1/3 bg-white p-6 rounded-2xl shadow-xl">
          <p className="mb-4 text-lg font-medium">Подключенный адрес:</p>
          <Address address={connectedAddress} className="break-all font-mono bg-gray-100 p-3 rounded-lg shadow-inner" />
        </aside>

        {/* Action Cards */}
        <section className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Debug Contract Card */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow flex flex-col">
            <div className="flex justify-center mb-4">
              <BugAntIcon className="h-12 w-12 text-indigo-500" />
            </div>
            <p className="mb-6 text-center text-lg flex-grow">
              Тестируйте и отлаживайте контракт во вкладке{" "}
              <Link href="/debug" className="text-indigo-600 font-semibold hover:underline">
                Debug Contracts
              </Link>
              .
            </p>
            <Link
              href="/debug"
              className="inline-block text-center w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
            >
              Перейти к отладке
            </Link>
          </div>

          {/* Block Explorer Card */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow flex flex-col">
            <div className="flex justify-center mb-4">
              <MagnifyingGlassIcon className="h-12 w-12 text-purple-500" />
            </div>
            <p className="mb-6 text-center text-lg flex-grow">
              Проверяйте историю транзакций в{" "}
              <Link href="/blockexplorer" className="text-purple-600 font-semibold hover:underline">
                Block Explorer
              </Link>
              .
            </p>
            <Link
              href="/blockexplorer"
              className="inline-block text-center w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
            >
              Открыть Explorer
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
