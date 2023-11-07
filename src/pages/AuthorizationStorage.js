import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import parse from 'html-react-parser'
import AccountLogin from '../components/AccountLogin'
const BILLERSOLUTIONSAUTH = gql`
    query billerSolutions {
      authorizationStorageOfBankInformation {
            data {
              id
              attributes {
                Title
                MainContent
                BankStorage {
                    Title
                  Description
                  ButtonURL
                  ButtonTitle
                  BackgroundImage {
                    data {
                      attributes {
                        url
                        alternativeText
                      }
                    }
                  }
                }
              }
            }
          }
    }
`
export default function AuthorizationStorage() {
  //const { loading, error, data } = useFetch('http://localhost:1337/api/image-ctas')
  const { loading, error, data } = useQuery(BILLERSOLUTIONSAUTH)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  console.log(data)
  return (
    <div className='wrapper biller-solutions'>
      <div className='hero-banner'>
          <div className='hero' style={{backgroundImage: `url(${data.authorizationStorageOfBankInformation.data.attributes.BankStorage.BackgroundImage.data[0].attributes.url})`}}>
              <div className='grad-overlay'></div>
              <div className='inner-container'>
                <AccountLogin />
                <div className='inner-hero'>
                    <h1>{data.authorizationStorageOfBankInformation.data.attributes.BankStorage.Title}</h1>
                    <hr className='orange'></hr>
                    {data.authorizationStorageOfBankInformation.data.attributes.BankStorage.Description !== null &&
                      <p>{data.authorizationStorageOfBankInformation.data.attributes.BankStorage.Description}</p>
                    }
                    {data.authorizationStorageOfBankInformation.data.attributes.BankStorage.ButtonTitle !== null &&
                      <div className='btn-green'><Link to=''>{data.authorizationStorageOfBankInformation.data.attributes.BankStorage.ButtonTitle}</Link></div>
                    }
                </div>
              </div>
          </div>
      </div>
      <div className='container mg-top-80 mg-bottom-50'>
        <h2 className='center orange'>{data.authorizationStorageOfBankInformation.data.attributes.Title}</h2>
        <div>{parse(data.authorizationStorageOfBankInformation.data.attributes.MainContent)}</div>
      </div>
    </div>
  )
}
