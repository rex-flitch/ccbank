import React, { useState } from 'react';
// import { useFormik } from 'formik';
import { useMutation, gql } from '@apollo/client';

// import { CREATE_CONTACT_MUTATION } from '../graphql/mutations';
const CREATE_CONTACT_MUTATION = gql`
  mutation CreateContact($email: String!, $fullname: String!, $phone: String!, $company: String!, $message: String!) {
    createContactForm(data: { Email: $email, Name: $fullname, Phone: $phone, Company: $company, Message: $message }) {
      data {
        id 
        attributes {
            Name
            Email
            Phone
            Company
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
    const { email, fullname, phone, company, message } = event.target.elements;

    try {
      await createEmailEntry({ variables: { email: email.value, fullname: fullname.value, phone: phone.value, company: company.value, message: message.value } });
      // Handle success - maybe clear the form or show a success message
      setFormSubmitted(true);
    } catch (error) {
      // Handle error
    }
  };

  if (formSubmitted) {
    return <div><h3 className='green'>Thank you for your submission!</h3></div>;
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
            <label htmlFor="phone">Phone</label>
            <input
            id="phone"
            name="phone"
            type="tel"
            />
        </div>
        <div className='form-input'>
            <label htmlFor="company">Company</label>
            <input
            id="company"
            name="company"
            type="text"
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