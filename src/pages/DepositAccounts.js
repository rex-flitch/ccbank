import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import parse from 'html-react-parser'
import AccountLogin from '../components/AccountLogin'

const GETDEPOSITACCOUNT = gql`
    query depositAccountquery {
        depositAccount {
            data {
              id
              attributes {
                MoneyMarketTitle
                MoneyMarketInfo
                CertificatesDepositTitle
                CertificatesDepositInfo
                DepositHero {
                  id
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
                TextCTA {
                  Title
                  Description
                  ButtonTitle
                  ButtonURL
                }
              }
            }
          }
          typeOfRates (sort: "id") {
            data {
              id
              attributes {
                RateType
                MinimumOpening
                rates {
                  data {
                    id
                    attributes {
                      Balances
                      InterestRate
                      APY
                    }
                  }
                }  
              }
            }
          }
          ratepage {
            data {
              attributes {
                RatesEffective
              }
            }
          }
    }
`

export default function DepositAccounts() {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const date = new Date();
    const formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    setCurrentDate(formattedDate);

    const hash = window.location.hash;

    const scrollToElement = () => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        } else {
            // Wait for a bit and try again
            setTimeout(scrollToElement, 100);
        }
    };

    if (hash) {
        scrollToElement();
    }
  }, []);
  
  const { loading, error, data } = useQuery(GETDEPOSITACCOUNT)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  const filteredItems = data.typeOfRates.data.filter(
    rates => !["9", "10", "11"].includes(rates.id)
  )
  const CDfilteredItems = data.typeOfRates.data.filter(
    rates => ["9", "10", "11"].includes(rates.id)
  )

  return (
    <main className='wrapper deposit-account' id='main' tabIndex="-1">
      <div className='hero-banner'>
          <div className='hero' id={`deposit-acounts-hero-id-${data.depositAccount.data.attributes.DepositHero.id}`} style={{backgroundImage: `url(${data.depositAccount.data.attributes.DepositHero.BackgroundImage.data[0].attributes.url})`}}>
              <div className='grad-overlay'></div>
              <div className='inner-container'>
                <AccountLogin />
                <div className='inner-hero'>
                    <h1>{data.depositAccount.data.attributes.DepositHero.Title}</h1>
                    <hr className='orange'></hr>
                    {data.depositAccount.data.attributes.DepositHero.Description !== null &&
                      <p>{data.depositAccount.data.attributes.DepositHero.Description}</p>
                    }
                    {data.depositAccount.data.attributes.DepositHero.ButtonTitle !== null &&
                      <div className='btn-green'><Link to={data.depositAccount.data.attributes.DepositHero.ButtonURL}>{data.depositAccount.data.attributes.DepositHero.ButtonTitle}</Link></div>
                    }
                </div>
              </div>
          </div>
      </div>
      <div id='checking' className='cta-wrapper col-2'>
            <div className='cta-box container mg-top-50'>
                {data.depositAccount.data.attributes.TextCTA.map((cta) => (
                    <div key={cta.id} className='cta'>
                        <div className='cta-info'>
                            <div className='title'><h2>{cta.Title}</h2></div>
                            <hr className='green'></hr>
                            <div className='desciption'><p>{parse(cta.Description)}</p></div>
                            {cta.ButtonTitle !== null &&
                              <div className='btn-green mg-top-50'><Link to={cta.ButtonURL}>{cta.ButtonTitle}</Link></div>
                            }
                        </div>
                    </div>
                ))}
            </div>
        </div>
      <div className='container mg-top-80 mg-bottom-50'>
        <h2 className='center orange'>{data.depositAccount.data.attributes.MoneyMarketTitle}</h2>
        <hr className='green center'></hr>
        <div className='p-center'>{parse(data.depositAccount.data.attributes.MoneyMarketInfo)}</div>
      </div>
      <div className='cc-bank-table bg-dark-grey'>
            <div className='container bg-white cbpc'>
                <table role='presentation'>
                    <caption>Checking, Money Market, and Savings Accounts<br />
                        <span>Rates Effective {currentDate}</span>
                    </caption>
                    <tr>
                        <th className='center'>Account</th>
                        <th className='center'>Minimum Balance to Obtain Annual Percentage Yield</th>
                        <th className='center'>Interest Rates</th>
                        <th className='center'>Annual Percentage Yield</th>
                        <th className='center'>Minimum Opening Deposit</th>
                    </tr>
                    {filteredItems.map((rates) => (
                      rates.attributes.rates?.data && rates.attributes.rates.data.length > 0 && (
                        <tr key={rates.id} id={rates.id}>
                            <td>{rates.attributes.RateType}</td>
                            <td>
                                {rates.attributes.rates.data.map((rate) => (
                                    <div key={rate.id}>{rate.attributes.Balances}</div>
                                ))}
                            </td>
                            <td className='center'>
                                {rates.attributes.rates.data.map((rate) => (
                                    <div key={rate.id}>{rate.attributes.InterestRate}</div>
                                ))}
                            </td>
                            <td className='center'>
                                {rates.attributes.rates.data.map((rate) => (
                                    <div key={rate.id}>{rate.attributes.APY}</div>
                                ))}
                            </td>
                            <td className='center'>{rates.attributes.MinimumOpening}</td>
                        </tr>
                      )
                    ))}
                </table>
            </div>
      </div>
      <div className='container mg-top-80 mg-bottom-50' name="cds" id="cds">
        <h2 className='center orange'>{data.depositAccount.data.attributes.CertificatesDepositTitle}</h2>
        <hr className='green center'></hr>
        <div className='p-center'>{parse(data.depositAccount.data.attributes.CertificatesDepositInfo)}</div>
      </div>
      <div className='cc-bank-table bg-dark-grey'>
            <div className='container bg-white cbpc'>
                <table role='presentation'>
                    <caption>CD Accounts<br />
                        <span>Rates Effective {currentDate}</span>
                    </caption>
                    <tr>
                        <th className='center'>Account</th>
                        <th className='center'>Minimum Balance to Obtain Annual Percentage Yield</th>
                        <th className='center'>Interest Rates</th>
                        <th className='center'>Annual Percentage Yield</th>
                    </tr>
                    {CDfilteredItems.map((rates) => (
                      rates.attributes.rates?.data && rates.attributes.rates.data.length > 0 && (
                        <tr key={rates.id} id={rates.id}>
                            <td>{rates.attributes.RateType}</td>
                            <td>
                                {rates.attributes.rates.data.map((rate) => (
                                    <div key={rate.id}>{rate.attributes.Balances}</div>
                                ))}
                            </td>
                            <td className='center'>
                                {rates.attributes.rates.data.map((rate) => (
                                    <div key={rate.id}>{rate.attributes.InterestRate}</div>
                                ))}
                            </td>
                            <td className='center'>
                                {rates.attributes.rates.data.map((rate) => (
                                    <div key={rate.id}>{rate.attributes.APY}</div>
                                ))}
                            </td>
                        </tr>
                      )
                    ))}
                </table>
            </div>
            <div className='container max-800 mg-auto mg-top-50'>
                <p>Fees could reduce the earnings on the account. Customers may call to obtain the most current rate information. No minimum balance required to obtain Annual Percentage Yield.<br />
                (1) The interest rate and APY may change after account opening.<br />(2) A penalty may be imposed for early withdrawal.</p>

            </div>
      </div>
      
    </main>
  )
}
