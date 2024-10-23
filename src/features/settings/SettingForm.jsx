import Alert from "@/components/Alert";
import FormInput from "@/components/forms/FormInput";
import Loader from "@/components/Loader";
import { getSettings, updateSettings } from "@/services/settingService";
import { updateSettingsValidationSchema } from "@/utils/validation";
import { Button, Card } from "flowbite-react";
import { Form, Formik } from "formik";
import { useState } from "react";
import { HiOutlineSave } from "react-icons/hi";

export default function SettingForm() {
  const settings = getSettings();
  const [alert, setAlert] = useState(null);

  return (
    <Formik
      initialValues={{
        apiKey: settings?.apiKey || ''
      }}
      validationSchema={updateSettingsValidationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          await updateSettings(values);

          setAlert({
            color: 'success',
            message: 'Pengaturan berhasil disimpan!'
          })
        } catch (error) {
          setAlert({
            color: 'failure',
            message: error.message || 'Terjadi kesalahan. Coba lagi!'
          })
        } finally {
          setSubmitting(false)
        }
      }}
    >
      {({ isSubmitting }) => (
        <>
          {isSubmitting &&
            <div className="fixed z-20 w-full h-screen top-0 left-0 bg-black bg-opacity-50 flex justify-center items-center">
              <Card className="w-80 flex flex-col items-center justify-start py-5">
                <div className="flex justify-center">
                  <Loader />
                </div>
              </Card>
            </div>
          }
          <Alert color={alert?.color} message={alert?.message} onDismiss={() => setAlert(null)} />
          <Form className="space-y-3">
            <div>
              <FormInput
                name="apiKey"
                label="API Key"
                placeholder="AIzaSyBoI2aq8EZxZbc1gUq7AiUlWQb4kBGtC40"
              />
              <p className="text-xs text-gray-600 mt-1">
                Lihat cara mendapatkan <a className="underline text-blue-500" href="https://ai.google.dev/gemini-api/docs/api-key" target="_blank">Gemini API Key</a>.
              </p>
            </div>
            <div className='flex justify-end'>
              <Button type="submit" color="dark" disabled={isSubmitting}>
                <HiOutlineSave className="mr-2 h-5 w-5" />
                Simpan
              </Button>
            </div>
          </Form>
        </>
      )}
    </Formik>
  );
};
