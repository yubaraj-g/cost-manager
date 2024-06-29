import { Toaster } from "@/components/ui/toaster";

import { HomeView } from "@/sections/home/view";

// ----------------------------------------------------------

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6 xl:p-24">
      <HomeView />
      <Toaster />
    </main>
  );
}
