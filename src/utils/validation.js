import * as Yup from 'yup';

export const generateQuizValidationSchema = Yup.object().shape({
  level: Yup.string().required('Pilih jenjang.'),
  subject: Yup.string().required('Pilih mata pelajaran.'),
  topics: Yup.array().min(1, 'Pilih setidaknya 1 materi.'),
  format: Yup.string().required('Pilih format.'),
  questionCount: Yup.number()
    .required('Jumlah pertanyaan harus diisi.')
    .integer('Jumlah pertanyaan harus berupa bilangan bulat.')
    .min(1, 'Jumlah pertanyaan minimal 1.')
    .max(100, 'Jumlah pertanyaan maksimal 100.'),
  studentCount: Yup.number()
    .required('Jumlah siswa harus diisi.')
    .integer('Jumlah siswa harus berupa bilangan bulat.')
    .min(1, 'Jumlah siswa minimal 1.')
    .max(100, 'Jumlah siswa maksimal 100.'),
});

export const updateSettingsValidationSchema = Yup.object().shape({
  apiKey: Yup.string().required('API Key harus diisi.'),
});

export const loginGuestValidationSchema = Yup.object().shape({
  name: Yup.string().required('Nama harus diisi.'),
});