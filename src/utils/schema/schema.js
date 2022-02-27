import * as yup from "yup";

export const validationSchema = yup.object().shape({
  title: yup.string().min(1).required("Required!"),
  text: yup.string().min(1).required("Required!"),
  color: yup.object().shape({
    darkColor: yup.string(),
    lightColor: yup.string(),
  }),
  labelChips: yup.array().of(
    yup.object().shape({
      id: yup.string().required(),
      name: yup.string().required(),
    })
  ),
});
