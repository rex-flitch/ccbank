import { gql } from '@apollo/client';

export const CREATE_CONTACT_MUTATION = gql`
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
`;