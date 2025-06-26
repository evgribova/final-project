"use client";

import { ReactNode, useEffect, useState } from "react";
// 2️⃣
import { RainbowKitProvider, darkTheme, lightTheme } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { ThemeProvider, useTheme } from "next-themes";
import { Toaster } from "react-hot-toast";
import { WagmiProvider } from "wagmi";
import { Footer } from "~~/components/Footer";
// ваш экземпляр createConfig
import { Header } from "~~/components/Header";
import { BlockieAvatar } from "~~/components/scaffold-eth";
import { useInitializeNativeCurrencyPrice } from "~~/hooks/scaffold-eth";
import { wagmiConfig } from "~~/services/web3/wagmiConfig";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false },
  },
});

const ScaffoldEthApp = ({ children }: { children: ReactNode }) => {
  useInitializeNativeCurrencyPrice();

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="relative flex flex-col flex-1">{children}</main>
        <Footer />
      </div>
      <Toaster />
    </>
  );
};

export function ScaffoldEthAppWithProviders({ children }: { children: ReactNode }) {
  const { resolvedTheme } = useTheme(); // 1️⃣
  const isDarkMode = resolvedTheme === "dark";
  const [mounted, setMounted] = useState(false);
  useEffect(() => void setMounted(true), []);

  return (
    <ThemeProvider attribute="class">
      <WagmiProvider config={wagmiConfig}>
        {" "}
        {/* 2️⃣ */}
        <QueryClientProvider client={queryClient}>
          <ProgressBar height="3px" color="#2299dd" />
          <RainbowKitProvider
            avatar={BlockieAvatar}
            theme={mounted ? (isDarkMode ? darkTheme() : lightTheme()) : lightTheme()}
          >
            <ScaffoldEthApp>{children}</ScaffoldEthApp>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </ThemeProvider>
  );
}
