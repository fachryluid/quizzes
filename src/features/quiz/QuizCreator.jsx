import Alert from '@/components/Alert';
import FormInput from '@/components/forms/FormInput';
import FormSelect from '@/components/forms/FormSelect';
import LoadingScreen from '@/components/LoadingScreen';
import { generateQuiz, getLevels, getSubjects, getTopics } from '@/services/quizService';
import { generateQuizValidationSchema } from '@/utils/validation';
import { Button } from "flowbite-react";
import { Form, Formik } from "formik";
import { useState } from "react";
import { RiAiGenerate } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';

export default function QuizCreator() {
  const navigate = useNavigate();

  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [alert, setAlert] = useState(null);

  return (
    <Formik
      initialValues={{ level: '', subject: '', topics: [], format: '', questionCount: '', studentCount: '' }}
      validationSchema={generateQuizValidationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const quiz = await generateQuiz(values);

          navigate(`/dashboard/quiz/${quiz.id}`, {
            state: {
              alert: {
                color: 'success',
                message: 'Quiz created successfully!'
              }
            }
          });
        } catch (error) {
          setAlert({
            color: 'failure',
            message: error.message
          })
        } finally {
          setSubmitting(false)
        }
      }}
    >
      {({
        setFieldValue,
        isSubmitting,
      }) => (
        <>
          {isSubmitting && <LoadingScreen />}
          <Alert color={alert?.color} message={alert?.message} onDismiss={() => setAlert(null)} />
          <Form className="space-y-3">
            <FormSelect
              name="level"
              label="Pilih Jenjang"
              placeholder="Pilih Jenjang"
              options={getLevels().map(level => ({
                label: level,
                value: level
              }))}
              afterChange={option => {
                setSelectedLevel(option.value);
                setFieldValue('subject', '');
                setFieldValue('topics', '');
              }}
            />
            <FormSelect
              name="subject"
              label="Pilih Mata Pelajaran"
              placeholder="Pilih Mata Pelajaran"
              options={getSubjects(selectedLevel).map(subject => ({
                label: subject,
                value: subject
              }))}
              afterChange={option => {
                setSelectedSubject(option.value);
                setFieldValue('topics', '');
              }}
              isDisabled={getSubjects(selectedLevel).length === 0}
            />
            <FormSelect
              name="topics"
              label="Pilih Materi"
              placeholder="Pilih Materi"
              options={getTopics(selectedLevel, selectedSubject).map(topic => ({
                label: topic,
                value: topic
              }))}
              isDisabled={getTopics(selectedLevel, selectedSubject).length === 0}
              isMulti
            />
            <FormSelect
              name="format"
              label="Pilih Format"
              placeholder="Format Soal"
              options={[
                { label: 'Pilihan Ganda', value: 'Pilihan Ganda' }
              ]}
            />
            <FormInput
              name="questionCount"
              label="Jumlah Soal"
              placeholder="25"
              type="number"
            />
            <FormInput
              name="studentCount"
              label="Jumlah Siswa"
              placeholder="25"
              type="number"
            />
            <div className='flex justify-end'>
              <Button type="submit" color="dark" disabled={isSubmitting}>
                <RiAiGenerate className="mr-2 h-5 w-5" />
                Generate
              </Button>
            </div>
          </Form>
        </>
      )}
    </Formik>
  );
}