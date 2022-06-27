import Helper from '.';
import UserService from '../services/User/UserService';
import * as yup from 'yup';

const phoneRegExp =
  '/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/';

export default class Validation {
  static async validateEmail(email) {
    try {
      if (Helper.isEmail(email)) {
        const existingEmail = await UserService.getUserByEmail(email);

        if (!existingEmail) {
          return false;
        }

        return true;
      }
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  static async createUserValidation(
    fullName,
    nick,
    phone,
    mobile,
    birthDate,
    email,
    password
  ) {
    try {
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
    const schema = yup.object().shape({
      fullName: yup
        .string()
        .required()
        .max(255)
        .min(3)
        .matches(/^[aA-zZ\s]+$/, 'Please enter valid name'),
      nick: yup.string().notRequired().nullable(),
      phone: yup.string().required(),
      mobile: yup.string().required(),
      birthDate: yup.date().max(new Date()).required(),
      email: yup.string().email().required(),
      password: yup
        .string()
        .min(8)
        .oneOf(
          [yup.ref('password'), null],
          'Passwords do not match with yup validation'
        )
        .required(),
    });

    return schema.validate({
      fullName,
      nick,
      phone,
      mobile,
      birthDate,
      email,
      password,
    });
  }
}
