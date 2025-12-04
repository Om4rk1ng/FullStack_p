import * as yup from "yup";

const regValidation = yup.object().shape({
    FirstName: yup.string().required("Name can't be empty!"),
    email: yup.string().required("Email can't be empty!").email("Enter a valid email!"),
    password: yup.string().required("Password can't be empty!").min(8, "Minimum 8 characters!"),
});

export default regValidation;