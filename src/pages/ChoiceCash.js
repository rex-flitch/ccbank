import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import parse from 'html-react-parser'
import AccountLogin from '../components/AccountLogin'
const GETCHOICECASH = gql`
    query choiceCashQuery {
        choiceCash {
            data {
              attributes {
                Hero {
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
                Title
                Description
                QA {
                  id
                  Question
                  Answer
                }
              }
            }
          }
          affiliatedCompaniesDisclaimers {
            data {
              attributes {
                Info
              }
            }
          }
    }
`
export default function ChoiceCash() {
  //const { loading, error, data } = useFetch('http://localhost:1337/api/image-ctas')
  const { loading, error, data } = useQuery(GETCHOICECASH)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  console.log(data)
  return (
    <main className='wrapper opp-loans' id='main' tabindex="-1">
      <div className='hero-banner'>
          <div className='hero' style={{backgroundImage: `url(${data.choiceCash.data.attributes.Hero.BackgroundImage.data[0].attributes.url})`}}>
              <div className='grad-overlay'></div>
              <div className='inner-container'>
                {/* <AccountLogin /> */}
                <div className='inner-hero'>
                    <h1>{data.choiceCash.data.attributes.Hero.Title}</h1>
                    <hr className='orange'></hr>
                    {data.choiceCash.data.attributes.Hero.Description !== null &&
                      <p>{parse(data.choiceCash.data.attributes.Hero.Description)}</p>
                    }
                    {data.choiceCash.data.attributes.Hero.ButtonTitle !== null &&
                      <div className='btn-green'><Link to=''>{data.choiceCash.data.attributes.Hero.ButtonTitle}</Link></div>
                    }
                </div>
              </div>
          </div>
      </div>
      <div className='container mg-top-80 mg-bottom-50'>
        <h2 className='center orange'>{data.choiceCash.data.attributes.Title}</h2>
        <hr className='green center'></hr>
        <div className='max-800 mg-auto'>{parse(data.choiceCash.data.attributes.Description)}</div>
      </div>
      <div className='qa-section container mg-top-100'>
        <h2 className='center mg-top-50'>Frequently Asked Questions</h2>
        <hr className='center green'></hr>
        
        <div className='qa-container'>
        {data.choiceCash.data.attributes.QA.map((item) => (
          <details className='qa-item'>
            <summary className='question' tabindex='0'>{item.Question}</summary>
            <div className='answer'>{parse(item.Answer)}</div>
          </details>
          ))}
        </div>
      </div>
      <h6 className='container'>This information is provided as a courtesy to CCBank customers who have obtained a ChoiceCash loan. Any other use of this information is prohibited.</h6>
      <h6 className='container mg-bottom-50'>{parse(data.affiliatedCompaniesDisclaimers.data[0].attributes.Info)}</h6>
    </main>
  )
}
