import { gql } from '@apollo/client';

export const CREATE_CONTACT_MUTATION = gql`
  mutation CreateContact($input: createContactInput) {
    contactForms(input: $input) {
      data {
        id {
            attributes {
                Name
                Email
                Message
            }
        }
      }
    }
  }
`;