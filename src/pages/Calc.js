import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import parse from 'html-react-parser'
import AccountLogin from '../components/AccountLogin'
import Calculator from '../components/Calculator'

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
    const { data } = useQuery(GETCALCULATORINFO)

    return (
        <div className='wrapper merchant'>
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
            <div className='pd-tb-50'>
              <div id='sgi' data-guid='32dc0560-655f-438c-b7a6-3751b41da89f'></div>    
            </div>
            <div className='bg-grey pd-tb-50'>
            <div id='sgi' data-guid='992bb347-c05f-4ea6-aa25-aaa0352409e2'></div>    
            </div>
            <div className='pd-tb-50'>
            <div id='sgi' data-guid='a72417a0-9193-4d41-885f-3d3d6a37af3d'></div> 
            </div>
            <div className='bg-grey pd-tb-50'>
            <div id='sgi' data-guid='03d850bf-056d-48f1-af6c-2f2e6f6f6644'></div>   
            </div>
            <div className='pd-tb-50'>
            <div id='sgi' data-guid='793f8707-fa07-4f89-899f-75fc786d3401'></div>   
            </div>
            <div className='bg-grey pd-tb-50'>
            <div id='sgi' data-guid='b147b219-a6a5-4b4d-9f60-00e285df54de'></div> 
            </div>
            <div className='pd-tb-50'>
            <div id='sgi' data-guid='5a45e9d6-00c1-435b-9e8b-7163a8323642'></div>
            </div>
            <div className='bg-grey pd-tb-50'>
            <div id='sgi' data-guid='b6c1d9e5-c496-49b5-9775-b08de3053ee4'></div>
            </div>
            <div className='pd-tb-50'>
            <div id='sgi' data-guid='6b6ba98b-c926-40ad-b876-dcf8388d1b70'></div>
            </div>
            <div className='bg-grey pd-tb-50'>
            <div id='sgi' data-guid='ded713c1-1a14-4131-8d98-f6f01fe04899'></div>
            </div>
            <div className='pd-tb-50'>
            <div id='sgi' data-guid='a4f6565f-9b54-430f-9131-254f42bb32eb'></div>
            </div>
            <div className='bg-grey pd-tb-50'>
            <div id='sgi' data-guid='82f36897-fde6-4a8f-ae81-20045287813d'></div>
            </div>
        </div>
    );
}