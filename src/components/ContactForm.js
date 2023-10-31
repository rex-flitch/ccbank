import React from 'react';
import { useFormik } from 'formik';
import { useMutation } from '@apollo/client';
import { CREATE_CONTACT_MUTATION } from '../graphql/mutations';

const ContactForm = () => {
  const [createContact] = useMutation(CREATE_CONTACT_MUTATION);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      message: '',
    },
    onSubmit: async (values) => {
      try {
        await createContact({
          variables: {
            input: {
              data: {
                name: values.name,
                email: values.email,
                message: values.message,
              },
            },
          },
        });

        // Optionally, send email using a backend service (e.g., Nodemailer)
        // and notify user that their message has been sent.
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <div>
        <h2 className='center'>Contact Us</h2>
        <form onSubmit={formik.handleSubmit}>
        <div className='form-input'>
            <label htmlFor="name">Name</label>
            <input
            id="name"
            name="name"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.name}
            />
        </div>
        <div className='form-input'>
            <label htmlFor="email">Email</label>
            <input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            />
        </div>
        <div className='form-input'>
            <label htmlFor="message">Message</label>
            <textarea
            id="message"
            name="message"
            onChange={formik.handleChange}
            value={formik.values.message}
            />
        </div>
        <button type="submit" className='btn-green'>Submit</button>
        </form>
    </div>
  );
};

export default ContactForm;