import Navbar from "@/components/organisms/navbar/Navbar";
import { BaseLayoutProps } from "@/types/props";
import KemensosLogo from "@/assets/images/kemensos-logo.webp";
import Footer from "@/components/organisms/footer/Footer";

function BaseLayout({ children }: BaseLayoutProps) {
  return (
    <section className="2xl:w-[80vw] xl:mx-auto bg-white">
      <main className="md:px-10">
        <Navbar logo={KemensosLogo} />
        {children}
      </main>
      <Footer text={<p>2023 &copy; Kementerian Sosial</p>} />
    </section>
  );
}

export default BaseLayout;
