import contributors from "@/data/contributors.json"

export default function Contributor() {
  return (
    <div className="px-5 sm:px-20 py-20">
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-5">Kontributor</h2>
      <p className="text-gray-600 mb-10">
        Berikut adalah daftar kontributor yang telah berperan dalam pengembangan proyek ini. Kami sangat menghargai setiap kontribusi yang diberikan.
        Ingin ikut berkontribusi? Kunjungi repositori kami di{" "}
        <a
          href="https://github.com/fachryluid/quizzes"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline font-medium"
        >
          GitHub
        </a>{" "}
        dan lihat panduan kontribusi. Kamu juga bisa menghubungi kami untuk berdiskusi atau memberikan ide baru.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {contributors.map(({ name, link, avatar }, index) => (
          <div key={index} className="bg-white rounded-xl shadow p-5 flex items-center gap-4">
            <img
              src={avatar}
              alt={name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
              <a href={link} className="text-sm text-gray-500">{link}</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}