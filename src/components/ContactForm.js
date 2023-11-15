import React, { useState } from 'react';
// import { useFormik } from 'formik';
import { useMutation, gql } from '@apollo/client';

// import { CREATE_CONTACT_MUTATION } from '../graphql/mutations';
const CREATE_CONTACT_MUTATION = gql`
  mutation CreateContact($email: String!, $fullname: String!, $message: String!) {
    createContactForm(data: { Email: $email, Name: $fullname, Message: $message }) {
      data {
        id 
        attributes {
            Name
            Email
            Message
        }
      }
    }
  }
`
export default function ContactForm() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [createEmailEntry] = useMutation(CREATE_CONTACT_MUTATION);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, fullname, message } = event.target.elements;

    try {
      await createEmailEntry({ variables: { email: email.value, fullname: fullname.value, message: message.value } });
      // Handle success - maybe clear the form or show a success message
      setFormSubmitted(true);
    } catch (error) {
      // Handle error
    }
  };

  if (formSubmitted) {
    return <div><h3>Thank you for your submission!</h3></div>;
  }

  return (
    <div>
        <h2 className='center'>Contact Us</h2>
        <form onSubmit={handleSubmit}>
        <div className='form-input'>
            <label htmlFor="name">Name</label>
            <input
            id="fullname"
            name="fullname"
            type="text"
            />
        </div>
        <div className='form-input'>
            <label htmlFor="email">Email</label>
            <input
            id="email"
            name="email"
            type="email"
            />
        </div>
        <div className='form-input'>
            <label htmlFor="message">Message</label>
            <textarea
            id="message"
            name="message"
            />
        </div>
        <button type="submit" className='btn-green'>Submit</button>
        </form>
    </div>
  )
}