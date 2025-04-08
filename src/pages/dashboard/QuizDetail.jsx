import Alert from "@/components/Alert";
import Breadcrumb from "@/components/Breadcrumb";
import { getQuiz, saveQuiz, unSaveQuiz } from "@/services/quizService";
import { Card } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiOutlineBookmark, HiOutlineBookmarkSlash } from "react-icons/hi2";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";

export default function QuizDetail() {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const data = getQuiz(params.id);

  const [alert, setAlert] = useState(null);
  const [isSaved, setIsSaved] = useState(data.isSaved);


  useEffect(() => {
    if (location.state?.alert) {
      setAlert(location.state?.alert);
      navigate(location.pathname, { replace: true });
    }
  }, [location.state]);

  const handleToggleSaveQuiz = () => {
    if (isSaved) {
      unSaveQuiz(data.id);
    } else {
      saveQuiz(data.id);
    }
    setIsSaved(!isSaved); // trigger re-render
  };

  return (
    <Card className="shadow-none">
      <div className="flex justify-between">
        <div>
          <h5 className="text-2xl font-bold">Detail</h5>
          <Breadcrumb breadcrumbs={[
            { label: 'Dasbor', href: '/dashboard' },
            { label: 'Riwayat', href: '/dashboard/quiz' },
            { label: params.id, href: null },
          ]} />
        </div>
        <span>
          <span>
            <span>
              {isSaved ? (
                <HiOutlineBookmark
                  size={24}
                  className="text-gray-600 cursor-pointer"
                  onClick={handleToggleSaveQuiz}
                />
              ) : (
                <HiOutlineBookmarkSlash
                  size={24}
                  className="text-gray-500 cursor-pointer"
                  onClick={handleToggleSaveQuiz}
                />
              )}
            </span>
          </span>
        </span>
      </div>
      <Alert color={alert?.color} message={alert?.message} onDismiss={() => setAlert(null)} />
      <dl className="text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
        <div className="flex flex-col pb-3">
          <dt className="text-gray-500 dark:text-gray-400">Jenjang</dt>
          <dd className="font-semibold">{data.quiz.level}</dd>
        </div>
        <div className="flex flex-col py-3">
          <dt className="text-gray-500 dark:text-gray-400">Mata Pelajaran</dt>
          <dd className="font-semibold">{data.quiz.subject}</dd>
        </div>
        <div className="flex flex-col py-3">
          <dt className="text-gray-500 dark:text-gray-400">Materi</dt>
          <dd className="font-semibold">{data.quiz.topics.join(', ')}</dd>
        </div>
        <div className="flex flex-col py-3">
          <dt className="text-gray-500 dark:text-gray-400">Format</dt>
          <dd className="font-semibold">{data.quiz.format}</dd>
        </div>
        <div className="flex flex-col py-3">
          <dt className="text-gray-500 dark:text-gray-400">Jumlah Nomor Soal</dt>
          <dd className="font-semibold">{data.quiz.questions[0].length}</dd>
        </div>
        <div className="flex flex-col pt-3">
          <dt className="text-gray-500 dark:text-gray-400">Paket Soal</dt>
          <dd className="font-semibold flex flex-wrap space-x-3">
            {data.quiz.questions.map((_, idx) => (
              <NavLink key={idx} to={`questions/${idx}`} className="underline text-blue-500">Paket {idx + 1}</NavLink>
            ))}
          </dd>
        </div>
      </dl>
    </Card>
  );
};