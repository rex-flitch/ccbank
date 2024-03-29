import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import parse from 'html-react-parser'
import AccountLogin from '../components/AccountLogin'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

const CONSTRUCTIONINDUSTRIALINFO = gql`
    query getCandI {
        commercialAndIndustrialCAndILoan {
            data {
              attributes {
                CandIHero {
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
                CandITitle,
                CandIDescription,
                LoanInfoCTA {
                  SuperTitle,
                  MainTitle
                }
                FeaturesCTA {
                  SuperTitle,
                  MainTitle
                }
                NationalExpertsTitle,
                NationalExpertsDescription,
                NationalExpertsTeam {
                  TeamMemberImage {
                    data {
                      attributes {
                        url,
                        alternativeText
                      }
                    }
                  }
                  TeamMemberName,
                  TeamMemberPosition,
                  TeamMemberPhone,
                  TeamMemberEmail,
                  slug,
                  NMLS,
                  Bio
                }
              }
            }
          }
    }
`
export default function CommercialIndustrialLoans() {
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
  const { data } = useQuery(CONSTRUCTIONINDUSTRIALINFO)

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
          <div className='hero bg-center' style={{backgroundImage: `url(${data.commercialAndIndustrialCAndILoan.data.attributes.CandIHero.BackgroundImage.data[0].attributes.url})`}}>
              <div className='grad-overlay'></div>
              <div className='inner-container'>
                <AccountLogin />
                <div className='inner-hero'>
                    <h1>{data.commercialAndIndustrialCAndILoan.data.attributes.CandIHero.Title}</h1>
                    <hr className='orange'></hr>
                    {data.commercialAndIndustrialCAndILoan.data.attributes.CandIHero.Description !== null &&
                      <p>{data.commercialAndIndustrialCAndILoan.data.attributes.CandIHero.Description}</p>
                    }
                    {data.commercialAndIndustrialCAndILoan.data.attributes.CandIHero.ButtonTitle !== null &&
                      <div className='btn-green'><Link to=''>{data.commercialAndIndustrialCAndILoan.data.attributes.CandIHero.ButtonTitle}</Link></div>
                    }
                </div>
              </div>
          </div>
      </div>
      <p className='max-800 mg-top-80 mg-auto center'>{parse(data.commercialAndIndustrialCAndILoan.data.attributes.CandIDescription)}</p>
      <div className='box-cta container mg-top-50 mg-bottom-50'>
            {data.commercialAndIndustrialCAndILoan.data.attributes.LoanInfoCTA.map((box) => (
                <div key='box.id' className='box-item'>
                    <h4 className='green center'>{box.MainTitle}</h4>
                    <p className='center'>{box.SuperTitle}</p>
                </div>
            ))}
        </div>
        <div className='grey-box'>
            <h2 className='center'>Features of our C&I Loans</h2>
            <hr className='center green'></hr>
            <div className='box-cta flex-row max-800 mg-auto'>
                {data.commercialAndIndustrialCAndILoan.data.attributes.FeaturesCTA.map((box) => (
                    <div key='box.id' className='box-item'>
                        <h4 className='green left'>{box.MainTitle}</h4>
                        <p>{box.SuperTitle}</p>
                    </div>
                ))}
            </div>
      </div>
      <div className='member-slider container'>
        <h2 className='center mg-top-50'>{data.commercialAndIndustrialCAndILoan.data.attributes.NationalExpertsTitle}</h2>
        <hr className="green center"></hr>
        <p className='max-800 mg-auto center'>{parse(data.commercialAndIndustrialCAndILoan.data.attributes.NationalExpertsDescription)}</p>
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
          <div className='slider-member'>
            <div className='link-overlay'><Link to={`/team/${members.slug}`}></Link></div>
            <div className='slider-image'><img src={members.TeamMemberImage.data.attributes.url} alt={members.TeamMemberImage.data.attributes.alternativeText} /></div>
            <h4 className='green'>{members.TeamMemberName}</h4>
          </div>
        ))}
        </Carousel>
      </div>
        </>
      )}
      <div className='calculators' id="calculators">
      </div>
    </main>
  )
}
