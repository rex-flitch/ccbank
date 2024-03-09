import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import parse from 'html-react-parser'
import AccountLogin from '../components/AccountLogin'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

const PERSONALLOANS = gql`
    query getPersonalLoans {
        personalLoan {
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
                ImageCTA {
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
                Overdraft {
                  Title
                  Date
                  Description
                  ButtonTitle
                  ButtonURL
                  BackgroundImage {
                    data {
                      attributes {
                        url
                        alternativeText
                      }
                    }
                  }
                }
                LoanExperts
                LoanExpertsDesc
              }
            }
          }
          commercialAndIndustrialCAndILoan {
            data {
              attributes {
                NationalExpertsTeam {
                  TeamMemberName
                  TeamMemberImage {
                    data {
                      attributes {
                        url
                        alternativeText
                      }
                    }
                  }
                  TeamMemberPhone
                  TeamMemberEmail
                  TeamMemberPosition
                  slug
                  NMLS
                }
              }
            }
          }
    }
`
export default function PersonalLoans() {
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
          window.Chimney.calculators.createCalc('calculators', '992bb347-c05f-4ea6-aa25-aaa0352409e2');
        }
      }, 1000); // Adjust the delay as necessary
    }
  }, [isScriptLoaded]);
  //const { loading, error, data } = useFetch('http://localhost:1337/api/image-ctas')
  const { data } = useQuery(PERSONALLOANS)

  // if (loading) return <p>Loading...</p>
  // if (error) return <p>Error :(</p>

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
      slidesToSlide: 1 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
      slidesToSlide: 1 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
      slidesToSlide: 1 // optional, default to 1.
    }
  };

  console.log(data)
  return (
    <main className='wrapper merchant' id='main' tabindex="-1">
      {data && (
        <>
        <div className='hero-banner'>
          <div className='hero bg-center' style={{backgroundImage: `url(${data.personalLoan.data.attributes.Hero.BackgroundImage.data[0].attributes.url})`}}>
              <div className='grad-overlay'></div>
              <div className='inner-container'>
                <AccountLogin />
                <div className='inner-hero'>
                    <h1>{data.personalLoan.data.attributes.Hero.Title}</h1>
                    <hr className='orange'></hr>
                    {data.personalLoan.data.attributes.Hero.Description !== null &&
                      <p>{data.personalLoan.data.attributes.Hero.Description}</p>
                    }
                    {data.personalLoan.data.attributes.Hero.ButtonTitle !== null &&
                      <div className='btn-green'><Link to=''>{data.personalLoan.data.attributes.Hero.ButtonTitle}</Link></div>
                    }
                </div>
              </div>
          </div>
      </div>
      <h2 className='center mg-top-80'>{data.personalLoan.data.attributes.Title}</h2>
      <hr className="green center mg-bottom-20"></hr>
      <p className='max-800 mg-auto center'>{parse(data.personalLoan.data.attributes.Description)}</p>
      <div className='cta-box container mg-top-100'>
            {data.personalLoan.data.attributes.ImageCTA.map((cta) => (
                <div key={cta.id} className='cta'>
                    <div className='cta-image' style={{backgroundImage: `url(${cta.Image.data.attributes.url})`}}></div>
                    <div className='cta-info'>
                        <div className='title'><h2>{cta.Title}</h2></div>
                        <hr className='green'></hr>
                        <div className='desciption'><p>{parse(cta.Description)}</p></div>
                        {cta.ButtonTitle !== null &&
                          <div className='btn-ghost-green'><Link reloadDocument to={cta.ButtonURL}>{cta.ButtonTitle}</Link></div>
                        }
                    </div>
                </div>
            ))}
        </div>
      <div className='member-slider container mg-top-80'>
        <h2 className='center mg-top-50'>{data.personalLoan.data.attributes.LoanExperts}</h2>
        <hr className="green center mg-bottom-20"></hr>
        <div className='max-800 mg-auto center'>{parse(data.personalLoan.data.attributes.LoanExpertsDesc)}</div>
        <Carousel 
        swipeable={true}
        draggable={true}
        showDots={false}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        infinite={true}
        keyBoardControl={true}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
        className='mg-top-50'
        >
        {data.commercialAndIndustrialCAndILoan.data.attributes.NationalExpertsTeam.map((members) => (
          <div key={members.id} className='slider-member'>
            <div className='link-overlay'><Link to={`/team/${members.slug}`}></Link></div>
            <div className='slider-image'><img src={members.TeamMemberImage.data.attributes.url} alt={members.TeamMemberImage.data.attributes.alternativeText} /></div>
            <h4 className='green'>{members.TeamMemberName}</h4>
          </div>
        ))}
        </Carousel>
      </div>
      <div className='mg-top-80 relative' style={{backgroundImage: `url(${data.personalLoan.data.attributes.Overdraft.BackgroundImage.data.attributes.url})`}}>
        <div className='overlay'></div>
        <div className='max-800 mg-auto pd-tb-50 z-index-1'>
            <h3 className='white'>{data.personalLoan.data.attributes.Overdraft.Title}</h3>
            <hr className="orange"></hr>
            <div className='white mg-top-20'>{parse(data.personalLoan.data.attributes.Overdraft.Description)}</div>
        </div>
      </div>
        </>
      )}
      {/* <div className='calculators' id="calculators">
      </div> */}
      
    </main>
  )
}
