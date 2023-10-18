import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import parse from 'html-react-parser'
const LOANOFFICERSINFO = gql`
    query getLoanOfficers {
        loanOfficer {
            data {
              attributes {
                LoanOfficersHero {
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
                LoanOfficersTitle,
                LoanOfficersDescription,
                StGeorgeTitle,
                StGeorgeLoanOfficers {
                  TeamMemberName,
                  TeamMemberPhone,
                  TeamMemberEmail,
                  TeamMemberPosition,
                  NMLS,
                  Bio,
                  TeamMemberImage {
                    data {
                      attributes {
                        url,
                        alternativeText
                      }
                    }
                  }
                }
                OremTitle,
                OremLoanOfficers {
                  TeamMemberName,
                  TeamMemberPhone,
                  TeamMemberEmail,
                  TeamMemberPosition,
                  NMLS,
                  Bio,
                  TeamMemberImage {
                    data {
                      attributes {
                        url,
                        alternativeText
                      }
                    }
                  }
                }
                SBATitle,
                SBALoanOfficers {
                  TeamMemberName,
                  TeamMemberPhone,
                  TeamMemberEmail,
                  TeamMemberPosition,
                  NMLS,
                  Bio,
                  TeamMemberImage {
                    data {
                      attributes {
                        url,
                        alternativeText
                      }
                    }
                  }
                }
                SalemTitle,
                SalemLoanOfficers {
                  TeamMemberName,
                  TeamMemberPhone,
                  TeamMemberEmail,
                  TeamMemberPosition,
                  NMLS,
                  Bio,
                  TeamMemberImage {
                    data {
                      attributes {
                        url,
                        alternativeText
                      }
                    }
                  }
                }
                ProvoTitle,
                ProvoLoanOfficers {
                  TeamMemberName,
                  TeamMemberPhone,
                  TeamMemberEmail,
                  TeamMemberPosition,
                  NMLS,
                  Bio,
                  TeamMemberImage {
                    data {
                      attributes {
                        url,
                        alternativeText
                      }
                    }
                  }
                }
                SandyTitle,
                SandyLoanOfficers {
                  TeamMemberName,
                  TeamMemberPhone,
                  TeamMemberEmail,
                  TeamMemberPosition,
                  NMLS,
                  Bio,
                  TeamMemberImage {
                    data {
                      attributes {
                        url,
                        alternativeText
                      }
                    }
                  }
                }
                PleasantGroveTitle,
                PleasantGroveLoanOfficers {
                  TeamMemberName,
                  TeamMemberPhone,
                  TeamMemberEmail,
                  TeamMemberPosition,
                  NMLS,
                  Bio,
                  TeamMemberImage {
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
    }
`
export default function LoanOfficers() {
  //const { loading, error, data } = useFetch('http://localhost:1337/api/image-ctas')
  const { loading, error, data } = useQuery(LOANOFFICERSINFO)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  console.log(data)
  return (
    <div className='wrapper merchant'>
      <div className='hero-banner'>
          <div className='hero bg-center' style={{backgroundImage: `url(${data.loanOfficer.data.attributes.LoanOfficersHero.BackgroundImage.data[0].attributes.url})`}}>
              <div className='grad-overlay'></div>
              <div className='inner-hero'>
                  <h1>{data.loanOfficer.data.attributes.LoanOfficersHero.Title}</h1>
                  <hr className='orange'></hr>
                  {data.loanOfficer.data.attributes.LoanOfficersHero.Description !== null &&
                    <p>{data.loanOfficer.data.attributes.LoanOfficersHero.Description}</p>
                  }
                  {data.loanOfficer.data.attributes.LoanOfficersHero.ButtonTitle !== null &&
                    <div className='btn-green'><Link to=''>{data.loanOfficer.data.attributes.LoanOfficersHero.ButtonTitle}</Link></div>
                  }
              </div>
          </div>
      </div>
      <h2 className='center mg-top-50'>{data.loanOfficer.data.attributes.LoanOfficersTitle}</h2>
      <hr className='green center'></hr>
      <p className='max-800 mg-top-20 mg-auto'>{parse(data.loanOfficer.data.attributes.LoanOfficersDescription)}</p>
      <div className='loan-officers mg-top-50'>
        <div className='loan-officers-inner container'>
            <h2 className='center'>{data.loanOfficer.data.attributes.StGeorgeTitle}</h2>
            <hr className='green center'></hr>
            {data.loanOfficer.data.attributes.StGeorgeLoanOfficers.map((sgloan) => (
            <div key='sgloan.id' className='lo-item'>
                <div className='lo-info'>
                    <div className='lo-image'><img src={sgloan.TeamMemberImage.data.attributes.url} alt={sgloan.TeamMemberImage.data.attributes.alternativeText} /></div>
                    <div className='lo-contact'>
                        <h4 className='green'>{sgloan.TeamMemberName}</h4>
                        <p>{sgloan.TeamMemberPosition}<br />{sgloan.NMLS !== null ? `NMLS ${sgloan.NMLS}` : ''}<br />{sgloan.TeamMemberPhone}<br />{sgloan.TeamMemberEmail}</p>
                    </div>
                </div>
                <div className='lo-bio'>{parse(sgloan.Bio)}</div>
            </div>
            ))}
        </div>
      </div>
      <div className='loan-officers'>
        <div className='loan-officers-inner container'>
            <h2 className='center'>{data.loanOfficer.data.attributes.SalemTitle}</h2>
            <hr className='green center'></hr>
            {data.loanOfficer.data.attributes.SalemLoanOfficers.map((slloan) => (
            <div key='slloan.id' className='lo-item'>
                <div className='lo-info'>
                    <div className='lo-image'><img src={slloan.TeamMemberImage.data.attributes.url} alt={slloan.TeamMemberImage.data.attributes.alternativeText} /></div>
                    <div className='lo-contact'>
                        <h4 className='green'>{slloan.TeamMemberName}</h4>
                        <p>{slloan.TeamMemberPosition}<br />{slloan.NMLS !== null ? `NMLS ${slloan.NMLS}` : ''}<br />{slloan.TeamMemberPhone}<br />{slloan.TeamMemberEmail}</p>
                    </div>
                </div>
                <div className='lo-bio'>{parse(slloan.Bio)}</div>
            </div>
            ))}
        </div>
      </div>
      <div className='loan-officers'>
        <div className='loan-officers-inner container'>
            <h2 className='center'>{data.loanOfficer.data.attributes.ProvoTitle}</h2>
            <hr className='green center'></hr>
            {data.loanOfficer.data.attributes.ProvoLoanOfficers.map((provoloan) => (
            <div key='provoloan.id' className='lo-item'>
                <div className='lo-info'>
                    <div className='lo-image'><img src={provoloan.TeamMemberImage.data.attributes.url} alt={provoloan.TeamMemberImage.data.attributes.alternativeText} /></div>
                    <div className='lo-contact'>
                        <h4 className='green'>{provoloan.TeamMemberName}</h4>
                        <p>{provoloan.TeamMemberPosition}<br />{provoloan.NMLS !== null ? `NMLS ${provoloan.NMLS}` : ''}<br />{provoloan.TeamMemberPhone}<br />{provoloan.TeamMemberEmail}</p>
                    </div>
                </div>
                <div className='lo-bio'>{parse(provoloan.Bio)}</div>
            </div>
            ))}
        </div>
      </div>
      <div className='loan-officers'>
        <div className='loan-officers-inner container'>
            <h2 className='center'>{data.loanOfficer.data.attributes.OremTitle}</h2>
            <hr className='green center'></hr>
            {data.loanOfficer.data.attributes.OremLoanOfficers.map((oremloan) => (
            <div key='oremloan.id' className='lo-item'>
                <div className='lo-info'>
                    <div className='lo-image'><img src={oremloan.TeamMemberImage.data.attributes.url} alt={oremloan.TeamMemberImage.data.attributes.alternativeText} /></div>
                    <div className='lo-contact'>
                        <h4 className='green'>{oremloan.TeamMemberName}</h4>
                        <p>{oremloan.TeamMemberPosition}<br />{oremloan.NMLS !== null ? `NMLS ${oremloan.NMLS}` : ''}<br />{oremloan.TeamMemberPhone}<br />{oremloan.TeamMemberEmail}</p>
                    </div>
                </div>
                <div className='lo-bio'>{parse(oremloan.Bio)}</div>
            </div>
            ))}
        </div>
      </div>
      <div className='loan-officers'>
        <div className='loan-officers-inner container'>
            <h2 className='center'>{data.loanOfficer.data.attributes.PleasantGroveTitle}</h2>
            <hr className='green center'></hr>
            {data.loanOfficer.data.attributes.PleasantGroveLoanOfficers.map((pgloan) => (
            <div key='pgloan.id' className='lo-item'>
                <div className='lo-info'>
                    <div className='lo-image'><img src={pgloan.TeamMemberImage.data.attributes.url} alt={pgloan.TeamMemberImage.data.attributes.alternativeText} /></div>
                    <div className='lo-contact'>
                        <h4 className='green'>{pgloan.TeamMemberName}</h4>
                        <p>{pgloan.TeamMemberPosition}<br />{pgloan.NMLS !== null ? `NMLS ${pgloan.NMLS}` : ''}<br />{pgloan.TeamMemberPhone}<br />{pgloan.TeamMemberEmail}</p>
                    </div>
                </div>
                <div className='lo-bio'>{parse(pgloan.Bio)}</div>
            </div>
            ))}
        </div>
      </div>
      <div className='loan-officers'>
        <div className='loan-officers-inner container'>
            <h2 className='center'>{data.loanOfficer.data.attributes.SBATitle}</h2>
            <hr className='green center'></hr>
            {data.loanOfficer.data.attributes.SBALoanOfficers.map((sbaloan) => (
            <div key='sbaloan.id' className='lo-item'>
                <div className='lo-info'>
                    <div className='lo-image'><img src={sbaloan.TeamMemberImage.data.attributes.url} alt={sbaloan.TeamMemberImage.data.attributes.alternativeText} /></div>
                    <div className='lo-contact'>
                        <h4 className='green'>{sbaloan.TeamMemberName}</h4>
                        <p>{sbaloan.TeamMemberPosition}<br />{sbaloan.NMLS !== null ? `NMLS ${sbaloan.NMLS}` : ''}<br />{sbaloan.TeamMemberPhone}<br />{sbaloan.TeamMemberEmail}</p>
                    </div>
                </div>
                <div className='lo-bio'>{parse(sbaloan.Bio)}</div>
            </div>
            ))}
        </div>
      </div>
      <div className='loan-officers'>
        <div className='loan-officers-inner container'>
            <h2 className='center'>{data.loanOfficer.data.attributes.SandyTitle}</h2>
            <hr className='green center'></hr>
            {data.loanOfficer.data.attributes.SandyLoanOfficers.map((sandyloan) => (
            <div key='sandyloan.id' className='lo-item'>
                <div className='lo-info'>
                    <div className='lo-image'><img src={sandyloan.TeamMemberImage.data.attributes.url} alt={sandyloan.TeamMemberImage.data.attributes.alternativeText} /></div>
                    <div className='lo-contact'>
                        <h4 className='green'>{sandyloan.TeamMemberName}</h4>
                        <p>{sandyloan.TeamMemberPosition}<br />{sandyloan.NMLS !== null ? `NMLS ${sandyloan.NMLS}` : ''}<br />{sandyloan.TeamMemberPhone}<br />{sandyloan.TeamMemberEmail}</p>
                    </div>
                </div>
                <div className='lo-bio'>{parse(sandyloan.Bio)}</div>
            </div>
            ))}
        </div>
      </div>
    </div>
  )
}
