import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import parse from 'html-react-parser'
import AccountLogin from '../components/AccountLogin'

const RATESPAGE = gql`
    query getRates {
        ratepage {
            data {
              attributes {
                FeaturedRatesTitle,
                QATitle,
                RatesEffective,
                QA {
                  Question,
                  Answer
                }
                RatesCTA {
                    SuperTitle,
                    Title,
                    Description,
                    ButtonURL,
                    ButtonTitle,
                    GreenAreaText,
                    BelowRateText,
                    BottomAreaText,
                    BackgroundImage {
                        data {
                            attributes {
                                url,
                                alternativeText
                            }
                        }
                    }
                    type_of_rate {
                      data {
                        attributes {
                          rates {
                            data {
                              attributes {
                                APY,
                                Balances
                              }
                            }
                          }
                        }
                      }
                    }
                }
                RatesHero {
                  Title,
                  Description,
                  ButtonURL,
                  ButtonTitle,
                  BackgroundImage {
                    data {
                      attributes {
                        url,
                        alternativeText
                      }
                    }
                  }
                }
              }
            }
          }
          typeOfRates {
            data {
              id
              attributes {
                RateType,
                MinimumOpening,
                rates {
                  data {
                    id,
                    attributes {
                      Balances,
                      InterestRate,
                      APY
                    }
                  }
                }
              }
            }
        }
    }
`
const Rates = ({ shouldReload }) => {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://embed.signalintent.com/js/embedded.js?org-guid=4159706a-6c26-49d4-bfac-58d685253c89';
    script.onload = () => setIsScriptLoaded(true);
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    if (isScriptLoaded) {
      setTimeout(() => {
        if (window.Chimney?.calculators?.createCalc) {
          window.Chimney.calculators.createCalc('calculators', 'b147b219-a6a5-4b4d-9f60-00e285df54de');
        }
      }, 1000); // Adjust the delay as necessary
    }
  }, [isScriptLoaded]);
  //const { loading, error, data } = useFetch('http://localhost:1337/api/image-ctas')
  
  // window.Chimney.calculators.createCalc('sgi', 'b147b219-a6a5-4b4d-9f60-00e285df54de');
  const [hasReloaded, setHasReloaded] = useState(true);

  useEffect(() => {
    // Ensure that reload happens only once
    if (shouldReload && !hasReloaded) {
      window.location.reload(true);
      setHasReloaded(true); // Set the state to avoid a reload loop
    }
  }, [shouldReload, hasReloaded]);

  const { data } = useQuery(RATESPAGE)
  
  // const [selectedIdx, setSelectedIdx] = useState(null);

  // const toggleAccordion = (idx) => {
  //   setSelectedIdx(selectedIdx === idx ? null : idx);
  // };
  let counter = 0
  const resetcounter = () => {
    counter = 0
  }
  const addcounter = () => {
    counter = counter + 1
  }
  // if (loading) return <p>Loading...</p>
  // if (error) return <p>Error :(</p>

  console.log(data)
  return (
    <main className='wrapper rates' id='main' tabIndex="-1">
      {data && (
        <>
        <div className='hero-banner'>
          <div className='hero' style={{backgroundImage: `url(${data.ratepage.data.attributes.RatesHero.BackgroundImage.data[0].attributes.url})`}}>
              <div className='grad-overlay'></div>
              <div className='inner-container'>
                <AccountLogin />
                <div className='inner-hero'>
                    <h1>{data.ratepage.data.attributes.RatesHero.Title}</h1>
                    <hr className='orange'></hr>
                    {data.ratepage.data.attributes.RatesHero.Description !== null &&
                      <p>{data.ratepage.data.attributes.RatesHero.Description}</p>
                    }
                    {data.ratepage.data.attributes.RatesHero.ButtonTitle !== null &&
                      <div className='btn-green'><Link to=''>{data.ratepage.data.attributes.RatesHero.ButtonTitle}</Link></div>
                    }
                </div>
              </div>
          </div>
      </div>
      <div className='container mg-top-50 mg-bottom-50'>
        <h2 className='center'>{data.ratepage.data.attributes.FeaturedRatesTitle}</h2>
        <hr className="green center"></hr>
      </div>
      <div className='rates-cta' style={{backgroundImage: `url(${data.ratepage.data.attributes.RatesCTA.BackgroundImage.data.attributes.url})`}}>
        <div className='overlay'></div>
        <div className='container rates-cta-flex max-800 mg-auto'>
            <div className='rates-cta-item'>
                <h5>{data.ratepage.data.attributes.RatesCTA.SuperTitle}</h5>
                <h2>{data.ratepage.data.attributes.RatesCTA.Title}</h2>
                <hr className='orange' />
                <div>{parse(data.ratepage.data.attributes.RatesCTA.Description)}</div>
                {data.ratepage.data.attributes.RatesCTA.ButtonTitle !== null &&
                  <div className='btn-white'><Link to={data.ratepage.data.attributes.RatesCTA.ButtonURL}>{data.ratepage.data.attributes.RatesCTA.ButtonTitle}</Link></div>
                }
            </div>
            <div className='rates-cta-item'>
                <div className='rates-cta-box'>
                    <div className='rates-cta-type'>{data.ratepage.data.attributes.RatesCTA.GreenAreaText}</div>
                    <div className='rates-cta-info'>
                        <h2>{data.ratepage.data.attributes.RatesCTA.type_of_rate.data.attributes.rates.data[1].attributes.APY}</h2>
                        <h4>{data.ratepage.data.attributes.RatesCTA.BelowRateText}</h4>
                        <hr className='green center' />
                        <p>{data.ratepage.data.attributes.RatesCTA.BottomAreaText}</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
      <div className='qa-section container'>
        <h2 className='center mg-top-50'>{data.ratepage.data.attributes.QATitle}</h2>
        <hr className='center green'></hr>
        
        <div className='qa-container'>
        {data.ratepage.data.attributes.QA.map((item) => (
          <details className='qa-item'>
            <summary className='question'>{item.Question}</summary>
            <div className='answer'>{parse(item.Answer)}</div>
          </details>
          ))}
        </div>
      </div>
        </>
      )}
      <div className='calculators' id="calculators">
        {/* <div id='sgi' data-guid='b147b219-a6a5-4b4d-9f60-00e285df54de'></div> */}
      </div>
      {data && (
        <>
        <div className='rates-table container'>
        <h2 className='rates center'>Rates</h2>
        <hr className='green center' />
        <p className='center'>Rates Effective: {data.ratepage.data.attributes.RatesEffective}</p>
        <table className='mg-top-50' role='presentation'>
            <tr>
                <th className='orange-header' colSpan='5'>DEMAND DEPOSIT PRODUCTS</th>
            </tr>
            <tr>
                <th colSpan='2'>{data.typeOfRates.data[0].attributes.RateType}</th>
                <th className='center'>INTEREST RATE</th>
                <th className='center'>APY</th>
                <th className='center'>Minimum Opening Deposit</th>
            </tr>
            {data.typeOfRates.data[0].attributes.rates.data.map((rate) => (
            <tr key={rate.id}>
                <td>{rate.id === '1' ? 'Balance' : ''}</td>
                <td>{rate.attributes.Balances}</td>
                <td className='center'>{rate.attributes.InterestRate}</td>
                <td className='center'>{rate.attributes.APY}</td>
                <td className='center'></td>
            </tr>
            ))}
            <tr>
                <th colSpan='2'>{data.typeOfRates.data[1].attributes.RateType}</th>
                <th className='center'>INTEREST RATE</th>
                <th className='center'>APY</th>
                <th className='center'>Minimum Opening Deposit</th>
            </tr>
            {data.typeOfRates.data[1].attributes.rates.data.map((rate) => (
            <tr key={rate.id} className={counter}>
                <td>{counter === 0 ? 'Balance' : ''}</td>
                <td>{rate.attributes.Balances}</td>
                <td className='center'>{rate.attributes.InterestRate}</td>
                <td className='center'>{rate.attributes.APY}</td>
                <td className='center'></td>
                {addcounter()}
            </tr>
            ))}
            {resetcounter()}
            
            <tr>
                <th colSpan='2'>{data.typeOfRates.data[4].attributes.RateType}</th>
                <th className='center'>INTEREST RATE</th>
                <th className='center'>APY</th>
                <th className='center'>Minimum Opening Deposit</th>
            </tr>
            {data.typeOfRates.data[4].attributes.rates.data.map((rate) => (
            <tr key={rate.id}>
                <td>{counter === 0 ? 'Balance' : ''}</td>
                <td>{rate.attributes.Balances}</td>
                <td className='center'>{rate.attributes.InterestRate}</td>
                <td className='center'>{rate.attributes.APY}</td>
                <td className='center'>{counter === 0 ? `${data.typeOfRates.data[4].attributes.MinimumOpening}` : ''}</td>
                {addcounter()}
            </tr>
            ))}
            {resetcounter()}
            <tr>
                <th colSpan='2'>{data.typeOfRates.data[5].attributes.RateType}</th>
                <th className='center'>INTEREST RATE</th>
                <th className='center'>APY</th>
                <th className='center'>Minimum Opening Deposit</th>
            </tr>
            {data.typeOfRates.data[5].attributes.rates.data.map((rate) => (
            <tr key={rate.id}>
                <td>{counter === 0 ? 'Balance' : ''}</td>
                <td>{rate.attributes.Balances}</td>
                <td className='center'>{rate.attributes.InterestRate}</td>
                <td className='center'>{rate.attributes.APY}</td>
                <td className='center'>{counter === 0 ? `${data.typeOfRates.data[5].attributes.MinimumOpening}` : ''}</td>
                {addcounter()}
            </tr>
            ))}
            {resetcounter()}
            <tr>
                <th colSpan='2'>{data.typeOfRates.data[6].attributes.RateType}</th>
                <th className='center'>INTEREST RATE</th>
                <th className='center'>APY</th>
                <th className='center'>Minimum Opening Deposit</th>
            </tr>
            {data.typeOfRates.data[6].attributes.rates.data.map((rate) => (
            <tr key={rate.id}>
                <td>{counter === 0 ? 'Balance' : ''}</td>
                <td>{rate.attributes.Balances}</td>
                <td className='center'>{rate.attributes.InterestRate}</td>
                <td className='center'>{rate.attributes.APY}</td>
                <td className='center'>{counter === 0 ? `${data.typeOfRates.data[6].attributes.MinimumOpening}` : ''}</td>
                {addcounter()}
            </tr>
            ))}
            {resetcounter()}
            <tr>
                <th colSpan='2'>{data.typeOfRates.data[7].attributes.RateType}</th>
                <th className='center'>INTEREST RATE</th>
                <th className='center'>APY</th>
                <th className='center'>Minimum Opening Deposit</th>
            </tr>
            {data.typeOfRates.data[7].attributes.rates.data.map((rate) => (
            <tr key={rate.id}>
                <td>{counter === 0 ? 'Balance' : ''}</td>
                <td>{rate.attributes.Balances}</td>
                <td className='center'>{rate.attributes.InterestRate}</td>
                <td className='center'>{rate.attributes.APY}</td>
                <td className='center'>{counter === 0 ? `${data.typeOfRates.data[7].attributes.MinimumOpening}` : ''}</td>
                {addcounter()}
            </tr>
            ))}
            {resetcounter()}
            <tr>
                <th colSpan='2'>{data.typeOfRates.data[8].attributes.RateType}</th>
                <th className='center'>INTEREST RATE</th>
                <th className='center'>APY</th>
                <th className='center'>Minimum Opening Deposit</th>
            </tr>
            {data.typeOfRates.data[8].attributes.rates.data.map((rate) => (
            <tr key={rate.id}>
                <td>{counter === 0 ? 'Balance' : ''}</td>
                <td>{rate.attributes.Balances}</td>
                <td className='center'>{rate.attributes.InterestRate}</td>
                <td className='center'>{rate.attributes.APY}</td>
                <td className='center'>{counter === 0 ? `${data.typeOfRates.data[8].attributes.MinimumOpening}` : ''}</td>
                {addcounter()}
            </tr>
            ))}
            {resetcounter()}
        </table>
        {/* <div className='btn-green center mg-tb-15 '><Link to='/'>Open Account</Link></div> */}
        <table role='presentation'>
            <tr>
                <th className='orange-header' colSpan='5'>CERTIFICATE OF DEPOSIT</th>
            </tr>
            
            <tr>
                <th colSpan='2'>{data.typeOfRates.data[2].attributes.RateType}</th>
                <th className='center'>INTEREST RATE</th>
                <th className='center'>APY</th>
                <th className='center'>Minimum Opening Deposit</th>
            </tr>
            {data.typeOfRates.data[2].attributes.rates.data.map((rate) => (
            <tr key={rate.id}>
                <td>{counter === 0 ? 'Balance' : ''}</td>
                <td>{rate.attributes.Balances}</td>
                <td className='center'>{rate.attributes.InterestRate}</td>
                <td className='center'>{rate.attributes.APY}</td>
                <td className='center'></td>
                {addcounter()}
            </tr>
            ))}
            {resetcounter()}
            <tr>
                <th colSpan='2'>{data.typeOfRates.data[3].attributes.RateType}</th>
                <th className='center'>INTEREST RATE</th>
                <th className='center'>APY</th>
                <th className='center'>Minimum Opening Deposit</th>
            </tr>
            {data.typeOfRates.data[3].attributes.rates.data.map((rate) => (
            <tr key={rate.id}>
                <td>{counter === 0 ? 'Balance' : ''}</td>
                <td>{rate.attributes.Balances}</td>
                <td className='center'>{rate.attributes.InterestRate}</td>
                <td className='center'>{rate.attributes.APY}</td>
                <td className='center'></td>
                {addcounter()}
            </tr>
            ))}
            {resetcounter()}
            {
            data.typeOfRates.data[9] && (
              <>
                <tr>
                  <th colSpan='2'>{data.typeOfRates.data[9].attributes.RateType}</th>
                  <th className='center'>INTEREST RATE</th>
                  <th className='center'>APY</th>
                  <th className='center'>Minimum Opening Deposit</th>
                </tr>
                {data.typeOfRates.data[9].attributes.rates.data.map((rate, index) => (
                  <tr key={rate.id}>
                    <td>{index === 0 ? 'Balance' : ''}</td>
                    <td>{rate.attributes.Balances}</td>
                    <td className='center'>{rate.attributes.InterestRate}</td>
                    <td className='center'>{rate.attributes.APY}</td>
                    <td className='center'></td>
                    {addcounter()}
                  </tr>
                ))}
                {resetcounter()}
              </>
            )
          }
            
        </table>
        {/* <div className='btn-green center mg-tb-15 '><Link to='/'>Open Account</Link></div> */}
      </div>
        </>
      )}
    </main>
  )
}
export default Rates;