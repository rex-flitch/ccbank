import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import parse from 'html-react-parser'
import AccountLogin from '../components/AccountLogin'
import Calculator from '../components/Calculator'

const CONSTRUCTIONLOTLOANINFO = gql`
  query getConstuctionLoans {
    constructionAndLotLoan {
      data {
        id
        attributes {
          ConstructionHero {
            id
            Title,
            Description,
            ButtonURL,
            ButtonTitle,
            BackgroundImage {
              data {
                id
                attributes {
                  url,
                  alternativeText
                }
              }
            }
          }
          ConstructionTitle,
          ConstructionDescription,
          ReputableAffiliationsTitle,
          ReputableAffiliationsDescriptionTop,
          ReputableAffiliationsDescriptionBottom,
          ReputableAffiliationsBoxes {
            id,
            SuperTitle,
            MainTitle
          }
          AgreeableTerms {
            id
            Title,
            Text,
            BackgroundImage {
              data {
                id
                attributes {
                  url,
                  alternativeText
                }
              }
            }
            ButtonURL,
            ButtonTitle
          }
          LotLoans {
            id
            Title,
            Text,
            ButtonURL,
            ButtonTitle,
            BackgroundImage {
              data {
                id
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
  }
`
export default function Calc() {
  
    const { data } = useQuery(CONSTRUCTIONLOTLOANINFO)

    return (
        <main className='wrapper merchant' id='main' tabindex="-1">
            <div className='hero-banner'>
            {data && (
                <>
                <div className='hero bg-center' style={{backgroundImage: `url(${data.constructionAndLotLoan.data.attributes.ConstructionHero.BackgroundImage.data[0].attributes.url})`}}>
                    <div className='grad-overlay'></div>
                    <div className='inner-container'>
                        <AccountLogin />
                        <div className='inner-hero'>
                            <h1>{data.constructionAndLotLoan.data.attributes.ConstructionHero.Title}</h1>
                            <hr className='orange'></hr>
                            {data.constructionAndLotLoan.data.attributes.ConstructionHero.Description !== null &&
                            <p>{data.constructionAndLotLoan.data.attributes.ConstructionHero.Description}</p>
                            }
                            {data.constructionAndLotLoan.data.attributes.ConstructionHero.ButtonTitle !== null &&
                            <div className='btn-green'><Link to=''>{data.constructionAndLotLoan.data.attributes.ConstructionHero.ButtonTitle}</Link></div>
                            }
                        </div>
                    </div>
                </div>
                </>
            )}
            </div>
            <h2 className='center mg-top-50'>{data && (
                <>
                {data.constructionAndLotLoan.data.attributes.ConstructionTitle}
                </>
            )}
            </h2>
            <hr className='green center'></hr>
            <div className='max-800 mg-top-20 mg-auto'>
            {data && (
                <>
                {parse(data.constructionAndLotLoan.data.attributes.ConstructionDescription)}
                </>
            )}
            </div>
            <div>
                {data && (
                    <>
                    <div className='agreement mg-top-50' style={{backgroundImage: `url(${data.constructionAndLotLoan.data.attributes.AgreeableTerms.BackgroundImage.data.attributes.url})`}}>
                <div className='grad-overlay'></div>
                <div className='background-left-text-text pd-tb-30 container max-800'>
                    <h2 className='white max-400'>{data.constructionAndLotLoan.data.attributes.AgreeableTerms.Title}</h2>
                    <hr className='orange'></hr>
                    <div className='max-400 white'>{parse(data.constructionAndLotLoan.data.attributes.AgreeableTerms.Text)}</div>
                </div>
            </div>
            <h2 className='mg-top-50 center'>{data.constructionAndLotLoan.data.attributes.ReputableAffiliationsTitle}</h2>
            <hr className='green center'></hr>
            <div className='max-800 mg-top-20 mg-auto'>{parse(data.constructionAndLotLoan.data.attributes.ReputableAffiliationsDescriptionTop)}</div>
            <div className='box-cta max-800 mg-auto'>
                {data.constructionAndLotLoan.data.attributes.ReputableAffiliationsBoxes.map((box) => (
                    <div key='box.id' className='box-item'>
                        <h5 className='center'>{box.SuperTitle}</h5>
                        <h4 className='green center'>{box.MainTitle}</h4>
                    </div>
                ))}
            </div>
            <div className='max-800 mg-top-20 mg-auto'>{parse(data.constructionAndLotLoan.data.attributes.ReputableAffiliationsDescriptionBottom)}</div>
                    </>
                )}
            </div>
            <Calculator />
            {data && (
                <>
                <div className='right-image-cta container mg-top-50 mg-bottom-50'>
                    <div className='ric-info'>
                        <h2>{data.constructionAndLotLoan.data.attributes.LotLoans.Title}</h2>
                        <hr className='green'></hr>
                        <div>{parse(data.constructionAndLotLoan.data.attributes.LotLoans.Text)}</div>
                        <div className='btn-green'><Link to={data.constructionAndLotLoan.data.attributes.LotLoans.ButtonURL}>{data.constructionAndLotLoan.data.attributes.LotLoans.ButtonTitle}</Link></div>
                        <ul className='green'>
                            <li>Up to 75% financing</li>
                            <li>Option to set up automatic payments</li>
                            <li>Term options up to 10 years amortization</li>
                        </ul>
                    </div>
                    <div className='ric-image'><img src={data.constructionAndLotLoan.data.attributes.LotLoans.BackgroundImage.data.attributes.url} alt={data.constructionAndLotLoan.data.attributes.LotLoans.BackgroundImage.data.attributes.alternativeText}></img></div>
            </div>
                </>
            )}
        </main>
    );
}