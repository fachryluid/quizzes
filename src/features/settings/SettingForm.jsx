import Alert from "@/components/Alert";
import FormInput from "@/components/forms/FormInput";
import LoadingScreen from "@/components/LoadingScreen";
import { getSettings, updateSettings } from "@/services/settingService";
import { updateSettingsValidationSchema } from "@/utils/validation";
import { Button } from "flowbite-react";
import { Form, Formik } from "formik";
import { useState } from "react";
import { HiOutlineSave } from "react-icons/hi";

export default function SettingForm() {
  const [setting, setSetting] = useState(getSettings());
  const [alert, setAlert] = useState(null);

  const handleUpdateSettings = async (values, setSubmitting) => {
    try {
      await updateSettings({
        values,
        onSuccess: () => setSetting(getSettings())
      });

      setAlert({
        color: 'success',
        message: 'Pengaturan berhasil disimpan!',
      });
    } catch (error) {
      setAlert({
        color: 'failure',
        message: error.message || 'Terjadi kesalahan. Coba lagi!',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      enableReinitialize
      initialValues={{
        apiKey: setting?.apiKey || '',
        modelVersion: setting?.modelVersion || '',
      }}
      validationSchema={updateSettingsValidationSchema}
      onSubmit={(values, { setSubmitting }) => handleUpdateSettings(values, setSubmitting)}
    >
      {({ isSubmitting }) => (
        <>
          {isSubmitting && <LoadingScreen />}
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
            {setting?.modelVersion &&
              <FormInput
                name="modelVersion"
                label="Model Version"
                disabled
              />
            }
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
