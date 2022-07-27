import * as Yup from 'yup';

export const schemaLogin = Yup.object().shape({
    email: Yup.string().email("El campo debe de ser un correo electrónico").required("El email es requerido"),
    password: Yup.string().required("La contraseña es requerida").min(6, "La contraseña debe tener al menos 6 caracteres").max(50,  "La contraseña no debe tener mas de 50 caracteres"),
})

export const schemaRegister = Yup.object().shape({
    name: Yup.string().required("El nombre es requerido").min(3, "El nombre debe tener al menos 3 caracteres").max(50,  "El nombre no debe tener mas de 50 caracteres"),
    email: Yup.string().email("El campo debe de ser un correo electrónico").required("El email es requerido"),
    password: Yup.string().required("La contraseña es requerida").min(6, "La contraseña debe tener al menos 6 caracteres").max(50,  "La contraseña no debe tener mas de 50 caracteres"),
    confirmPassword: Yup.string().required("Este campo es requerido").min(6, "La contraseña debe tener al menos 6 caracteres").max(50,  "La contraseña no debe tener mas de 50 caracteres").oneOf([Yup.ref('password')], "Las contraseñas no coinciden "),
})

export const schemaCourse = Yup.object().shape({
    name: Yup.string().required("El nombre es requerido").min(3, "El nombre debe tener al menos 3 caracteres").max(50,  "El nombre no debe tener mas de 50 caracteres"),
    classname: Yup.string().required("El clase es requerido"),
})

export const schemaMaterial = Yup.object().shape({
    title: Yup.string().required("El titulo es requerido").min(3, "El título debe tener al menos 3 caracteres").max(50,  "El título no debe tener mas de 50 caracteres"),
    type: Yup.number().required("El tipo es requerido").min(0).max(4),
    file: Yup.mixed().optional(),
})

export const schemaCode = Yup.object().shape({
    code: Yup.string().required("El codigo es requerido").min(3, "El código debe tener al menos 3 caracteres").max(50,  "El código no debe tener mas de 50 caracteres"),
})

export const schemaEvaluation = Yup.object().shape({
    title: Yup.string().required("El titulo es requerido").min(3, "El título debe tener al menos 3 caracteres").max(50,  "El título no debe tener mas de 50 caracteres"),
    answers: Yup.array().required("Las respuestas son requeridas").min(1, "Debe de haber al menos una respuesta").max(10, "No debe de haber más de 10 respuestas"),
    correctAnswer: Yup.number().required("La respuesta correcta es requerida").min(0).max(10),
    question: Yup.string().required("La pregunta es requerida").min(3, "La pregunta debe tener al menos 3 caracteres").max(100,  "La pregunta no debe tener mas de 100 caracteres"),
    startDate: Yup.date().required("La fecha de inicio es requerida"),
    endDate: Yup.date().required("La fecha de fin es requerida"),
})