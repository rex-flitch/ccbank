import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import parse from 'html-react-parser'
import AccountLogin from '../components/AccountLogin'
const BUSINESSCHECKING = gql`
    query getBusinessChecking {
        businessChecking {
            data {
              id
              attributes {
                Title
                MainContent
                FeaturedAccounts
                FeaturedAccountsContent {
                  id
                  Title
                  Description
                  ButtonURL
                  ButtonTitle
                  Image {
                    data {
                      attributes {
                        url
                        alternativeText
                      }
                    }
                  }
                }
                BCHero {
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
          commercialBankingProductComparisons {
            data {
              attributes {
                AccountFeatures
                BusinessManagerChecking
                GiveBackCheckingNP
                BusinessSavingsAccount
                BusinessMoneyMarketAccount
                BusinessCertificateOfDeposits
              }
            }
          }
    }
`
export default function BusinessChecking() {
  //const { loading, error, data } = useFetch('http://localhost:1337/api/image-ctas')
  const { loading, error, data } = useQuery(BUSINESSCHECKING)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  console.log(data)
  return (
    <div className='wrapper biller-solutions'>
      <div className='hero-banner'>
          <div className='hero' style={{backgroundImage: `url(${data.businessChecking.data.attributes.BCHero.BackgroundImage.data[0].attributes.url})`}}>
              <div className='grad-overlay'></div>
              <div className='inner-container'>
                <AccountLogin />
                <div className='inner-hero'>
                    <h1>{data.businessChecking.data.attributes.BCHero.Title}</h1>
                    <hr className='orange'></hr>
                    {data.businessChecking.data.attributes.BCHero.Description !== null &&
                      <p>{data.businessChecking.data.attributes.BCHero.Description}</p>
                    }
                    {data.businessChecking.data.attributes.BCHero.ButtonTitle !== null &&
                      <div className='btn-green'><Link to=''>{data.businessChecking.data.attributes.BCHero.ButtonTitle}</Link></div>
                    }
                </div>
              </div>
          </div>
      </div>
      <div className='container mg-top-80 mg-bottom-50'>
        <h2 className='center orange'>{data.businessChecking.data.attributes.Title}</h2>
        <hr className='green center'></hr>
        <div>{parse(data.businessChecking.data.attributes.MainContent)}</div>
      </div>
      <div className='cta-wrapper'>
        <h2 className='center orange'>{data.businessChecking.data.attributes.FeaturedAccounts}</h2>
        <hr className='green center'></hr>
            <div className='cta-box container mg-top-50'>
                {data.businessChecking.data.attributes.FeaturedAccountsContent.map((cta) => (
                    <div key={cta.id} className='cta'>
                        <div className='cta-image' style={{backgroundImage: `url(${cta.Image.data.attributes.url})`}}></div>
                        <div className='cta-info'>
                            <div className='title'><h2>{cta.Title}</h2></div>
                            <hr className='green'></hr>
                            <div className='desciption'><p>{parse(cta.Description)}</p></div>
                            <div className='btn-ghost-green'><Link to={cta.ButtonURL}>Read more</Link></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        <div className='cc-bank-table bg-dark-grey'>
            <div className='container bg-white cbpc'>
                <table>
                    <caption>COMMERCIAL BANKING PRODUCT COMPARISON</caption>
                    <thead>
                        <tr>
                            <th>Accounts & Features</th>
                            <th>Business Manager Checking</th>
                            <th>Give Back Checking (Non-Profit Only)</th>
                            <th>Business Savings Account</th>
                            <th>Business Money Market Account</th>
                            <th>Business Certificate of Deposits</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.commercialBankingProductComparisons.data.map((cbpc) => (
                        <tr>
                            <td className='bold'>{cbpc.attributes.AccountFeatures}</td>
                            <td className='center'>{cbpc.attributes.BusinessManagerChecking}</td>
                            <td className='center'>{cbpc.attributes.GiveBackCheckingNP}</td>
                            <td className='center'>{cbpc.attributes.BusinessSavingsAccount}</td>
                            <td className='center'>{cbpc.attributes.BusinessMoneyMarketAccount}</td>
                            <td className='center'>{cbpc.attributes.BusinessCertificateOfDeposits}</td>
                        </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr className='bg-orange'>
                            <td colspan="6">
                                <div className='table-flex-col'>
                                    <div>Business Digital Banking & Cash Management Services</div>
                                    <div>Mobile Banking<br />
                                        Multi-User Setup<br />
                                        External Transfers
                                    </div>
                                    <div>Mobile Check Deposit<br />
                                        Bill Pay<br />
                                        Wire Origination
                                    </div>
                                    <div>ACH Originationt<br />
                                        ACH / Check Positive Payt<br />
                                        Remote Deposit Capture
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    </div>
  )
}
