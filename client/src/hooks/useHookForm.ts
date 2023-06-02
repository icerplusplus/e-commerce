import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import YupPassword from 'yup-password';

export enum FormTypes {
  Login = 'login',
  Register = 'register',
}

interface UseHookFormProps {
  type: FormTypes.Login | FormTypes.Register;
}
interface ValidationSchemaProps {
  type: string;
  resolver: any;
}

// custom password validation
YupPassword(yup);
const passwordRequiredField = () =>
  yup.string().required('Password is not valid!');

const customValidates = {
  password: () =>
    passwordRequiredField()
      .min(
        8,
        'Password must contain 8 or more characters with at least one of each: uppercase, lowercase, number and special',
      )
      .minLowercase(1, 'Password must contain at least 1 lower case letter')
      .minUppercase(1, 'Password must contain at least 1 upper case letter')
      .minNumbers(1, 'Password must contain at least 1 number')
      .minSymbols(1, 'Password must contain at least 1 special character'),
};

const validationSchemas: ValidationSchemaProps[] = [
  {
    type: 'login',
    resolver: yup
      .object({
        email: yup
          .string()
          .email('Email is not valid!')
          .required('Email is not valid!')
          .min(8, 'Email is too short - should be 8 chars minimum.'),
        password: customValidates.password(),
      })
      .required(),
  },
  {
    type: 'register',
    resolver: yup
      .object({
        email: yup
          .string()
          .email('Email is not valid!')
          .required('Email is not valid!')
          .min(8, 'Email is too short - should be 8 chars minimum.'),
        password: customValidates.password(),
      })
      .required(),
  },
];

export const useHookForm = ({type}: UseHookFormProps) => {
  const validationSchema =
    validationSchemas.find((item) => item.type === type)?.resolver ??
    validationSchemas[0].resolver;
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  return {register, handleSubmit, errors} as const;
};
