import Breadcrumb from "@/components/Breadcrumb";
import { getQuiz } from "@/services/quizService";
import { Card } from "flowbite-react";
import { useParams } from "react-router-dom";

export default function Questions() {
  const params = useParams();

  const data = getQuiz(params.id);

  return (
    <div className="space-y-5">
      <Card className="shadow-none">
        <div className="flex justify-between">
          <div>
            <h5 className="text-2xl font-bold">Paket {+params.idx + 1}</h5>
            <Breadcrumb breadcrumbs={[
              { label: 'Dasbor', href: '/dashboard' },
              { label: 'Riwayat', href: '/dashboard/quiz' },
              { label: params.id, href: `/dashboard/quiz/${params.id}` },
              { label: `Paket ${+params.idx + 1}`, href: null },
            ]} />
          </div>
          <span>
            {/* actions */}
          </span>
        </div>
      </Card>
      {data.quiz.questions[params.idx].map((question, idx) => (
        <Card key={idx} className="shadow-none">
          <p>{idx + 1}. {question.text}</p>
          <ul>
            {Object.entries(question.options).map(([key, option]) => (
              <li key={key}>
                {key}. {option}
              </li>
            ))}
          </ul>
          <div>
            <p>Jawaban: {question.answer.key}</p>
            <p>Penjelasan: {question.answer.text}</p>
          </div>
        </Card>
      ))}
    </div>
  );
};