import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
// import parse from 'html-react-parser'
import AccountLogin from '../components/AccountLogin'
// import Calculator from '../components/Calculator'

const GETCALCULATORINFO = gql`
  query getConstuctionLoans {
    calculatorPage {
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
        }
      }
    }
  }
`
export default function Calc() {
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
          window.Chimney.calculators.createCalc('savings-calc', '32dc0560-655f-438c-b7a6-3751b41da89f');
          window.Chimney.calculators.createCalc('commercial-loan-calc', '992bb347-c05f-4ea6-aa25-aaa0352409e2');
          window.Chimney.calculators.createCalc('heloc-calc', 'a72417a0-9193-4d41-885f-3d3d6a37af3d');
          window.Chimney.calculators.createCalc('personal-line-calc', '03d850bf-056d-48f1-af6c-2f2e6f6f6644');
          window.Chimney.calculators.createCalc('business-valuation-calc', '793f8707-fa07-4f89-899f-75fc786d3401');
          window.Chimney.calculators.createCalc('cd-calc', 'b147b219-a6a5-4b4d-9f60-00e285df54de');
          window.Chimney.calculators.createCalc('home-afford-calc', '5a45e9d6-00c1-435b-9e8b-7163a8323642');
          window.Chimney.calculators.createCalc('roth-calc', 'b6c1d9e5-c496-49b5-9775-b08de3053ee4');
          window.Chimney.calculators.createCalc('student-loan-calc', '6b6ba98b-c926-40ad-b876-dcf8388d1b70');
          window.Chimney.calculators.createCalc('budget-calc', 'ded713c1-1a14-4131-8d98-f6f01fe04899');
          window.Chimney.calculators.createCalc('heloc-payment-calc', 'a4f6565f-9b54-430f-9131-254f42bb32eb');
          window.Chimney.calculators.createCalc('heloc-debt-calc', '82f36897-fde6-4a8f-ae81-20045287813d');
        }
      }, 1000); // Adjust the delay as necessary
    }
  }, [isScriptLoaded]);

    const { data } = useQuery(GETCALCULATORINFO)

    return (
      <main className='wrapper merchant' id='main' tabindex="-1">
            <div className='hero-banner'>
            {data && (
                <>
                <div className='hero bg-center' style={{backgroundImage: `url(${data.calculatorPage.data.attributes.Hero.BackgroundImage.data[0].attributes.url})`}}>
                    <div className='grad-overlay'></div>
                    <div className='inner-container'>
                        <AccountLogin />
                        <div className='inner-hero'>
                            <h1>{data.calculatorPage.data.attributes.Hero.Title}</h1>
                            <hr className='orange'></hr>
                            {data.calculatorPage.data.attributes.Hero.Description !== null &&
                            <p>{data.calculatorPage.data.attributes.Hero.Description}</p>
                            }
                            {data.calculatorPage.data.attributes.Hero.ButtonTitle !== null &&
                            <div className='btn-green'><Link to=''>{data.calculatorPage.data.attributes.Hero.ButtonTitle}</Link></div>
                            }
                        </div>
                    </div>
                </div>
                </>
            )}
            </div>
            <h2 className='center mg-top-50'>All Calculators
            </h2>
            <hr className='green center'></hr>
            <div className='pd-tb-50' id="savings-calc">
              
            </div>
            <div className='bg-grey pd-tb-50' id="commercial-loan-calc">
                
            </div>
            <div className='pd-tb-50' id="heloc-calc">
            </div>
            <div className='bg-grey pd-tb-50' id="personal-line-calc">  
            </div>
            <div className='pd-tb-50' id="business-valuation-calc"> 
            </div>
            <div className='bg-grey pd-tb-50' id="cd-calc">
            </div>
            <div className='pd-tb-50' id="home-afford-calc">
            </div>
            <div className='bg-grey pd-tb-50' id="roth-calc">
            </div>
            <div className='pd-tb-50' id="student-loan-calc">
            </div>
            <div className='bg-grey pd-tb-50' id="budget-calc">
            </div>
            <div className='pd-tb-50' id="heloc-payment-calc">
            </div>
            <div className='bg-grey pd-tb-50' id="heloc-debt-calc">
            </div>
        </main>
    );
}