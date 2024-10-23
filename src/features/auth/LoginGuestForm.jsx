import Alert from "@/components/Alert";
import FormInput from "@/components/forms/FormInput";
import { loginGuest } from "@/services/authService";
import { loginGuestValidationSchema } from "@/utils/validation";
import { Button } from "flowbite-react";
import { Form, Formik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginGuestForm() {
  const navigate = useNavigate();
  const [alert, setAlert] = useState(null);

  return (
    <Formik
      initialValues={{
        name: ''
      }}
      validationSchema={loginGuestValidationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          loginGuest(values);

          navigate('/dashboard');
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
      {({ isSubmitting }) => (
        <>
          <Alert color={alert?.color} message={alert?.message} onDismiss={() => setAlert(null)} />
          <Form className="space-y-3">
            <FormInput
              name="name"
              label="Nama"
              placeholder="Budiono Siregar"
            />
            <div className='flex justify-end pt-3'>
              <Button type="submit" color="dark" disabled={isSubmitting}>
                Masuk
                {/* <HiOutlineSave className="mr-2 h-5 w-5" /> */}
              </Button>
            </div>
          </Form>
        </>
      )}
    </Formik>
  );
};
