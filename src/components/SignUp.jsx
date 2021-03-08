import React from 'react'
import { object, string } from 'yup'
import { Formik, Form, Field, ErrorMessage } from 'formik'

const SignUpSchema = object().shape({
  email: string().email('Invalid email').required('Required')
})

function SignUpForm () {
  return (
    <Formik
      initialValues={{ email: '' }}
      validationSchema={SignUpSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        if (window?.campaign) {
          window.campaign.addHook('widgetsLoad', function () {
            window.campaign.widgets.getByType('embedForm').forEach(function (widget) {
              widget.execute(function (firstname, lastname, email) {
                const emailInput = document.getElementById('email')
                emailInput.value = email
                emailInput.dispatchEvent(new Event('input'))
              }, [values.email])
            })
          })
        }
      }}
    >
      {({ isSubmitting, dirty }) => (
        <Form className='sign_up '>
          <div className='title'>Sign up to the waiting list</div>
          <Field
            type='email'
            className='input'
            placeholder='Email'
            name='email'
          />
          <button type='submit' className='button vrlps-trigger'>Join our campaign!</button>
          {/* <button
            disabled={!dirty || isSubmitting}
            type='submit'
            className='button'
          >
            Send
          </button> */}
          <ErrorMessage name='email' />
        </Form>
      )}
    </Formik>
  )
}

export default SignUpForm
