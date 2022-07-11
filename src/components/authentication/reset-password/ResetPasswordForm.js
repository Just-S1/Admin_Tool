import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { TextField, Alert, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';

// ----------------------------------------------------------------------

ResetPasswordForm.propTypes = {
  onSent: PropTypes.func,
  onGetUsername: PropTypes.func
};

export default function ResetPasswordForm({ onSent, onGetUsername }) {
  const { resetPassword } = useAuth();
  const isMountedRef = useIsMountedRef();

  const ResetPasswordSchema = Yup.object().shape({
    username: Yup.string().required('Username is required')
  });

  const formik = useFormik({
    initialValues: {
      username: ''
    },
    validationSchema: ResetPasswordSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        await resetPassword(values.username);
        if (isMountedRef.current) {
          onSent();
          onGetUsername(formik.values.username);
          setSubmitting(false);
        }
      } catch (error) {
        console.error(error);
        if (isMountedRef.current) {
          setErrors({ afterSubmit: error.message });
          setSubmitting(false);
        }
      }
    }
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}

          <TextField
            fullWidth
            {...getFieldProps('username')}
            type="text"
            label="Username"
            error={Boolean(touched.username && errors.username)}
            helperText={touched.username && errors.username}
          />

          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
            Reset Password
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
