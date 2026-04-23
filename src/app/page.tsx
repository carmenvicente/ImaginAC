import { Navbar } from '@/components/layout/Navbar';
import { HeroSection } from '@/components/home/HeroSection';
import { Footer } from '@/components/layout/Footer';
import { CookiesBanner } from '@/components/home/CookiesBanner';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
      </main>
      <Footer />
      <CookiesBanner />
    </div>
  );
}
