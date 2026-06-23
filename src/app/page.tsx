import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Products } from "@/components/landing/Products";
import { ContentLoop } from "@/components/landing/ContentLoop";
import { AppsPromo } from "@/components/landing/AppsPromo/AppsPromo";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <div className="lp">
      <Navbar />
      <main>
        <Hero />
        <Products />
        <AppsPromo />
        <ContentLoop />
      </main>
      <Footer />
    </div>
  );
}
