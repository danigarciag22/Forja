import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Products } from "@/components/landing/Products";
import { ContentLoop } from "@/components/landing/ContentLoop";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <div className="lp">
      <Navbar />
      <main>
        <Hero />
        <Products />
        <ContentLoop />
      </main>
      <Footer />
    </div>
  );
}
