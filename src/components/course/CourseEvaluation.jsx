import React from 'react'

import { Formik } from 'formik'
import HomeInput from '../home/HomeInput'
import { schemaEvaluation } from '../../utils/schemas'
import {
    BsFillTrashFill,
} from "react-icons/bs";
import { fetchWithToken } from '../../utils/fetchWithToken';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function CourseEvaluation() {

    const { course_id } = useParams()

    const handleAddQuestion = (questions, setFieldValue) => {
        setFieldValue('questions', [...questions, {
            question: '',
            firstAnswer: '',
            secondAnswer: '',
            thirdAnswer: '',
            correctAnswer: ''
        }])
    }

    const handleOnDeleteQuestion = (index, questions, setFieldValue) => {
        setFieldValue('questions', questions.filter((_, i) => i !== index))
    }


   

    const handleOnQuestionChange = (index, value, questions, setFieldValue) => {
        const newAnswers = [...questions]
        newAnswers[index].question = value
        setFieldValue('questions', newAnswers)
    }

    const handleOnAnswerChange = (index, value, questions, setFieldValue, name) => {
        
        const newAnswers = questions.map((question, i) => (
            i === index? { ...question, [name]: value } : question
        ))
        setFieldValue('questions', newAnswers)

    }

    const handleOnCorrectAnswerChange = (index, value, questions, setFieldValue) => {
        const newQuestions = questions.map((question, idx) => (
            idx === index? { ...question, correctAnswer: value } : question
        ))
        setFieldValue('questions', newQuestions)
    }

    const handleOnSubmit = async (values, { setSubmitting, resetForm }) => {
        setSubmitting(true)
        try {
            let dataEvaluation = {
                course: course_id,
                start: new Date(values.startDate).toString(),
                end: new Date(values.endDate).toString(),
            }
            const resEvaluation =await fetchWithToken('api/course/evaluation', dataEvaluation, "POST")

            const bodyEvaluation = await resEvaluation.json();

            values.questions.map(async(question) => {
                let dataQuestion = {
                    answer: question[question.correctAnswer],
                    evaluation: bodyEvaluation.id,
                    firstanswer: question.firstAnswer,
                    secondanswer: question.secondAnswer,
                    thirdanswer: question.thirdAnswer,
                    question: question.question,
                }
                console.log(dataQuestion)
                const ress = await fetchWithToken('api/course/evaluation/question', dataQuestion, "POST")
                const bodys = await ress.json();
            })

            resetForm()
            Swal.fire({
                title: "Evaluación creada",
                icon: "success",
                confirmButtonText: "Cerrar",
                confirmButtonColor: "#4fd3d8",
                cancelButtonColor: "#d33",
            })

        } catch (err) {
            console.log(err)
        }
        setSubmitting(false)
    }

  return (
    <div>
        <button type="button" className="mt-3 mt-sm-2 d-sm-inline-block btn btn-sm btn-success shadow-sm" data-bs-toggle="modal" data-bs-target="#evaluationStudentCourseModal">
            Crear evaluación
        </button>
        <div className="modal fade" id="evaluationStudentCourseModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="evaluationStudentCourseModal" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                        Crear evaluación
                    </h5>
                    <button id="buttonclosemodalREMOVEstudent" style={{ display: 'none' }} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <Formik
                    initialValues={{
                        title: '',
                        question: '',
                        startDate: '',
                        endDate: '',
                        questions: [
                            {
                                question: '',
                                firstAnswer: '',
                                secondAnswer: '',
                                thirdAnswer: '',
                                correctAnswer: ""
                            }
                        ],
                    }}
                    // validationSchema={ schemaEvaluation }
                    onSubmit={handleOnSubmit}
                >
                    {
                        ({
                            isSubmitting,
                            handleSubmit,
                            values,
                            handleChange,
                            setFieldValue,
                            setFieldTouched,
                            errors,
                            touched
                        }) => (
                            <form
                                onSubmit={handleSubmit}
                            >
                                
                                <div className="modal-body">
                                    {/* <HomeInput
                                        name={'title'}
                                        label={'Nombre de la evaluación'}
                                        placeholder={'Primer parcial'}
                                        type={'text'}
                                        disabled={isSubmitting}
                                    /> */}
                                    <div
                                        className='col-12 d-flex px-0 flex-row align-items-center justify-content-between'
                                    >
                                        <HomeInput
                                            name={'startDate'}
                                            label={'Fecha de inicio'}
                                            placeholder={ values.startDate }
                                            type={'date'}
                                            disabled={isSubmitting}
                                        />
                                        <div
                                            className='mx-1'
                                        ></div>
                                        <HomeInput
                                            name={'endDate'}
                                            label={'Fecha de fin'}
                                            type={'date'}
                                            disabled={isSubmitting}
                                            placeholder={ values.endDate }
                                        />
                                    </div>
                                    <hr className='my-3'/>
                                    
                                    {
                                        values.questions.map((question, index) => (
                                            <div>
                                                <div className="mb-3 w-100">
                                                    <label className="fw-bold form-label d-flex flex-rwo align-items-center justify-content-between">
                                                        {`PREGUNTA: ${index + 1}`}
                                                        
                                                        <div
                                                            className="bg-transparent fs-5  text-uppercase img-profile rounded-circle text-white d-flex align-items-center justify-content-center"
                                                            style={{
                                                                width: '2.5rem',
                                                                height: '2.5rem',
                                                                cursor: 'pointer',
                                                            }}
                                                        >
                                                            <BsFillTrashFill
                                                                onClick={ () => handleOnDeleteQuestion(index, values.questions, setFieldValue) }
                                                                className='text-danger'
                                                            />
                                                        </div>
                                                    </label>
                                                    <input 
                                                        name={`question${index}`}
                                                        value={question.question}
                                                        placeholder={`Ingrese la pregunta`}
                                                        type={'text'} 
                                                        className="form-control" 
                                                        // onBlur={() => setFieldTouched('answers', true)}
                                                        onChange={(e) => handleOnQuestionChange(index, e.target.value, values.questions, setFieldValue)}
                                                        disabled={isSubmitting}
                                                    />
                                                    
                                                </div>
                                                <div className="mb-3 w-100">
                                                    <label className="form-label">
                                                        Primera respuesta
                                                    </label>
                                                    <div
                                                        className='d-flex flex-row flex-nowrap'
                                                    >
                                                        <input 
                                                            name={`firstAnswer ${index}`}
                                                            value={question.firstAnswer}
                                                            placeholder={`Ingrese la primera respuesta`}
                                                            type={'text'} 
                                                            className="form-control" 
                                                            // onBlur={() => setFieldTouched('answers', true)}
                                                            onChange={(e) => handleOnAnswerChange(index, e.target.value, values.questions, setFieldValue, "firstAnswer")}
                                                            disabled={isSubmitting}
                                                        />
                                                        
                                                    </div>
                                                    
                                                    
                                                </div>
                                                <div className="mb-3 w-100">
                                                    <label className="form-label">
                                                        Segunda respuesta
                                                    </label>
                                                    <div
                                                        className='d-flex flex-row flex-nowrap'
                                                    >
                                                        <input 
                                                            name={`secondAnswer ${index}`}
                                                            value={question.secondAnswer}
                                                            placeholder={`Ingrese la segunda respuesta`}
                                                            type={'text'} 
                                                            className="form-control" 
                                                            // onBlur={() => setFieldTouched('answers', true)}
                                                            onChange={(e) => handleOnAnswerChange(index, e.target.value, values.questions, setFieldValue, 'secondAnswer')}
                                                            disabled={isSubmitting}
                                                        />
                                                       
                                                    </div>
                                                    
                                                </div>
                                                <div className="mb-3 w-100">
                                                    <label className="form-label">
                                                        Tercera respuesta
                                                    </label>
                                                    <div
                                                        className='d-flex flex-row flex-nowrap'
                                                    >
                                                        <input 
                                                            name={`thirdAnswer ${index}`}
                                                            value={question.thirdAnswer}
                                                            placeholder={`Ingrese la tercera respuesta`}
                                                            type={'text'} 
                                                            className="form-control" 
                                                            // onBlur={() => setFieldTouched('answers', true)}
                                                            onChange={(e) => handleOnAnswerChange(index, e.target.value, values.questions, setFieldValue, 'thirdAnswer')}
                                                            disabled={isSubmitting}
                                                        />
                                                    </div>
                                                    
                                                </div>
                                                <div className="mb-3 w-100">
                                                    <label className="form-label">
                                                        Respuesta correcta
                                                    </label>
                                                    <div
                                                        className='d-flex flex-row flex-nowrap'
                                                    >
                                                        <select 
                                                            class="form-select" 
                                                            aria-label="Default select example"
                                                            onChange={(e) => handleOnCorrectAnswerChange(index, e.target.value, values.questions, setFieldValue)}
                                                        >
                                                            <option selected>
                                                                Seleccione una opción
                                                            </option>
                                                            <option value="firstAnswer">
                                                                Primera respuesta
                                                            </option>
                                                            <option value="secondAnswer">
                                                                Segunda respuesta
                                                            </option>
                                                            <option value="thirdAnswer">
                                                                Tercera respuesta
                                                            </option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <hr className='my-2'/>
                                            </div>
                                        ))
                                    }

                                    <button 
                                        type="button"
                                        role='button'
                                        onClick={() => handleAddQuestion(values.questions, setFieldValue)}
                                        className="btn btn-sm btn-warning shadow-sm mt-3"
                                    >
                                        Agregar pregunta
                                    </button>
                                    {/* { 
                                        errors.correctAnswer
                                            && touched.correctAnswer
                                                && (
                                                    <div className="alert alert-danger mt-2" role="alert">
                                                        {errors.correctAnswer}
                                                    </div>
                                                )
                                    }
                                    {
                                        errors.answers
                                            && touched.answers
                                                && (
                                                    <div className="alert alert-danger" role="alert">
                                                        {
                                                            errors.answers
                                                        }
                                                    </div>
                                                )
                                    } */}

                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-sm bg-danger text-white shadow-sm" data-bs-dismiss="modal">
                                        Cancelar
                                    </button>
                                    <button 
                                        type="submit" 
                                        role='submit' 
                                        className="btn btn-sm btn-primary bg-color border-0 shadow-sm"
                                    >
                                        Crear evaluación
                                    </button>
                                </div>
                            </form>
                        )
                    }
                </Formik>
                </div>
            </div>
        </div>
    </div>
  )
}
