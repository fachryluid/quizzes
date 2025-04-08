import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="px-5 sm:px-20 py-20">
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-5">Tentang</h2>
      <div className="space-y-10 text-gray-700 leading-relaxed">
        <section>
          <p>
            <strong>Quizzes</strong> adalah aplikasi pembuat soal otomatis yang dirancang untuk membantu guru menghasilkan soal yang unik bagi setiap siswa.
            Soal dibuat dengan bantuan teknologi <i>LLM (Large Language Model)</i>, yaitu{" "}
            <a
              href="https://gemini.google/overview"
              className="text-blue-600 hover:underline font-medium"
              target="_blank"
            >
              Gemini AI
            </a>.
            Ke depannya, kami berharap dapat menggunakan model AI yang lebih spesifik dan canggih untuk menghasilkan soal yang semakin berkualitas.
            Melalui proyek ini, kami ingin mendukung proses pembelajaran yang lebih efisien, personal, dan relevan dengan kebutuhan siswa.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Fitur</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>Membuat soal otomatis berdasarkan topik dan tingkat kesulitan</li>
            <li>Soal unik untuk setiap siswa untuk menghindari mencontek</li>
            <li>Export soal ke PDF</li>
            <li>Dukungan untuk berbagai jenis soal (pilihan ganda, isian, dsb.)</li>
            <li>Antarmuka pengguna yang simpel dan mudah digunakan</li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Kontributor</h3>
          <p>
            Proyek ini dikembangkan oleh komunitas terbuka. Lihat daftar lengkap kontributor kami di halaman{" "}
            <Link
              to="/contributors"
              className="text-blue-600 hover:underline font-medium"
            >
              Kontributor
            </Link>.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Kontak</h3>
          <p>
            Kami senang mendengar masukan atau ide dari kamu! Hubungi kami melalui email di{" "}
            <a
              href="mailto:fachryluid@gmail.com"
              className="text-blue-600 hover:underline font-medium"
            >
              fachryluid@gmail.com
            </a>{" "}
            atau kirim pesan melalui{" "}
            <a
              href="https://github.com/fachryluid/quizzes/issues"
              className="text-blue-600 hover:underline font-medium"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub Issue
            </a>.
          </p>
        </section>
      </div>
    </div>
  );
}