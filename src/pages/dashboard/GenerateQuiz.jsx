import QuizCreator from "@/features/quiz/QuizCreator";
import { Card } from "flowbite-react";

export default function GenerateQuiz() {
  return (
    <Card className="shadow-none">
      <h5 className="text-2xl font-bold">Buat Soal</h5>
      <QuizCreator />
    </Card>
  );
};
