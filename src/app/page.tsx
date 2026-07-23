import Hero from "@/components/Hero";
import About from "@/components/About";
import WhyChooseUs from "@/components/WhyChooseUs";
import Services from "@/components/Services";
import Gallery from "@/components/Gallery";
import FloatingGallery from "@/components/FloatingGallery";
import Testimonials from "@/components/Testimonials";
import CtaBand from "@/components/CtaBand";
import ScrollBgVideo from "@/components/ScrollBgVideo";

export default function Home() {
  return (
    <>
      <ScrollBgVideo />
      <Hero />
      <About />
      <Services />
      <Gallery />
      <FloatingGallery />
      <WhyChooseUs />
      <Testimonials />
      <CtaBand />
    </>
  );
}
