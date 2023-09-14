import KemensosLogo from "@/assets/images/kemensos-logo.webp";
import { Link } from "react-router-dom";

function index() {
  return (
    <main className="flex flex-col gap-2 items-center justify-center h-screen w-full">
      <img className="w-[10rem]" src={KemensosLogo} alt="" />
      <h1 className="text-xl">Halaman yang anda cari tidak ditemukan!</h1>
      <Link to={"/"} className="bg-[#9FC510] px-4 py-2 rounded-md">
        Pergi ke Home
      </Link>
    </main>
  );
}

export default index;
