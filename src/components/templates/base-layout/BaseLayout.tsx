import Navbar from "@/components/organisms/navbar/Navbar";
import { BaseLayoutProps } from "@/types/props";
import KemenkesLogo from "@/assets/images/kemenkes-logo.webp";
import Footer from "@/components/organisms/footer/Footer";

function BaseLayout({ children }: BaseLayoutProps) {
  return (
    <section className="2xl:w-[80vw] xl:mx-auto bg-white">
      <main className="md:px-10">
        <Navbar logo={KemenkesLogo} />
        {children}
      </main>
      <Footer text={<p>2023 &copy; Kementerian Kesehatan Indonesia</p>} />
    </section>
  );
}

export default BaseLayout;
