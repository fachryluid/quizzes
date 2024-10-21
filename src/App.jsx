import { Button } from "flowbite-react";
import heroImage from "./assets/images/hero.png";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <>
      <Navbar />
      <div className="flex px-5 sm:px-20 pt-20">
        <div className="lg:basis-1/2 space-y-7">
          <div className="space-y-5">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">Buat Soal Unik untuk Setiap Siswa</h2>
            <p className="text-normal sm:text-lg text-gray-900">Quizzes membantu guru membuat soal yang dapat disesuaikan untuk berbagai mata pelajaran dan tingkat kesulitan. Hasilkan soal berbeda untuk setiap siswa dalam hitungan detik.</p>
          </div>
          <Button color="dark" size="lg" className="font-medium">Buat Soal Sekarang</Button>
        </div>
        <div className="basis-1/2 hidden lg:flex justify-center">
          <img src={heroImage} alt="Hero Image" />
        </div>
      </div>
    </>
  );
}