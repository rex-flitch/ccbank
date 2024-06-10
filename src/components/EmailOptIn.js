import React, { useState } from 'react';
// import { useFormik } from 'formik';
import { useMutation, gql } from '@apollo/client';

// import { CREATE_CONTACT_MUTATION } from '../graphql/mutations';
const CREATE_EMAIL_MUTATION = gql`
  mutation CreateEmail($email: String!) {
    createEmailOptIn(data: { Email: $email }) {
      data {
        id 
        attributes {
            Email
        }
      }
    }
  }
`
export default function EmailForm() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [createEmailEntry] = useMutation(CREATE_EMAIL_MUTATION);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email } = event.target.elements;

    try {
      await createEmailEntry({ variables: { email: email.value } });
      // Handle success - maybe clear the form or show a success message
      setFormSubmitted(true);
    } catch (error) {
      // Handle error
    }
  };

  if (formSubmitted) {
    return <div><p className='white'>Thank you for your submission!</p></div>;
  }

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <input
            id="email"
            name="email"
            type="email"
            placeholder="Email Address"
            />
            <button type="submit">Sign Up</button>
        </form>
    </div>
  )
}