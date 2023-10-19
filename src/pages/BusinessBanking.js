import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import parse from 'html-react-parser'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import AccountLogin from '../components/AccountLogin'

const BUSINESSBANKING = gql`
    query getBusinessBanking {
      businessBanking {
        data {
          attributes {
            BusinessBankingHero {
              Title,
              Description,
              ButtonURL,
              ButtonTitle,
              BackgroundImage {
                data {
                  attributes {
                    url
                  }
                }
              }
            }
            BusinessBankingTitle,
            Description,
            BusinessBankingSubHeading,
            OurBankingTeamTitle,
            OurBankingTeamDescription,
            OurBankingTeam {
              TeamMemberImage {
                data {
                  attributes {
                    url,
                    alternativeText
                  }
                }
              }
              TeamMemberName
            }
            BeyondBanking {
              Title,
              Text,
              BackgroundImage {
                data {
                  attributes {
                    url,
                    alternativeText
                  }
                }
              }
            }
            BusinessBankingAltCTA {
                id,
                ImagePlacement,
                ImageBackgroundColor,
                Title,
                Description,
                ButtonTitle,
                ButtonURL,
                Image {
                  data {
                    attributes {
                      url
                    }
                  }
                }
            }
          }
        }
      }
    }
`
export default function BusinessBanking() {
  //const { loading, error, data } = useFetch('http://localhost:1337/api/image-ctas')
  const { loading, error, data } = useQuery(BUSINESSBANKING)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>
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
    <div className='wrapper businessBanking'>
      <div className='hero-banner'>
          <div className='hero' style={{backgroundImage: `url(${data.businessBanking.data.attributes.BusinessBankingHero.BackgroundImage.data[0].attributes.url})`}}>
              <div className='grad-overlay'></div>
              <div className='inner-container'>
                <AccountLogin />
                <div className='inner-hero'>
                    <h1>{data.businessBanking.data.attributes.BusinessBankingHero.Title}</h1>
                    <hr className='orange'></hr>
                    {data.businessBanking.data.attributes.BusinessBankingHero.Description !== null &&
                      <p>{data.businessBanking.data.attributes.BusinessBankingHero.Description}</p>
                    }
                    {data.businessBanking.data.attributes.BusinessBankingHero.ButtonTitle !== null &&
                      <div className='btn-green'><Link to=''>{data.businessBanking.data.attributes.BusinessBankingHero.ButtonTitle}</Link></div>
                    }
                </div>
              </div>
          </div>
      </div>
      <div className='container mg-top-50 mg-bottom-50'>
        <h2 className='center'>{data.businessBanking.data.attributes.BusinessBankingTitle}</h2>
        <hr className="green center"></hr>
        <p className='max-800 mg-auto'>{parse(data.businessBanking.data.attributes.Description)}</p>
      </div>
      <div className='alt-image-color'>
        <div className='container'>
                  <h2 class='center orange'>Lending Solutions</h2>
                  <hr className="green center"></hr>
            {data.businessBanking.data.attributes.BusinessBankingAltCTA.map((altcta) => (
                <div key={altcta.id} className='alt-cta'>

                    {altcta.ImagePlacement === 'Left' &&
                        <div className={altcta.ImageBackgroundColor === 'Orange' ? 'alt-cta-image left alt-cta-orange' : 'alt-cta-image left alt-cta-green'}><img src={altcta.Image.data.attributes.url} alt={altcta.Title}/></div>
                    }

                    <div className='alt-cta-info'>
                        <div className='title'><h2>{altcta.Title}</h2></div>
                        <hr className='orange'></hr>
                        <div className='desciption'><p>{altcta.Description}</p></div>
                        <div className='btn-ghost-green'><Link to={altcta.ButtonURL}>{altcta.ButtonTitle}</Link></div>
                    </div>
                    {altcta.ImagePlacement === 'Right' &&
                        <div className={altcta.ImageBackgroundColor === 'Orange' ? 'alt-cta-image right alt-cta-orange' : 'alt-cta-image right alt-cta-green'}><img src={altcta.Image.data.attributes.url} alt={altcta.Title}/></div>
                    }
                </div>
            ))}
        </div>
      </div>
      <div className='member-slider container'>
        <h2 className='center mg-top-50'>{data.businessBanking.data.attributes.OurBankingTeamTitle}</h2>
        <hr className="green center"></hr>
        <p className='max-800 mg-auto'>{parse(data.businessBanking.data.attributes.OurBankingTeamDescription)}</p>
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
        {data.businessBanking.data.attributes.OurBankingTeam.map((members) => (
          <div className='slider-member'>
            <div className='slider-image'><img src={members.TeamMemberImage.data.attributes.url} alt={members.TeamMemberImage.data.attributes.alternativeText} /></div>
            <h4 className='green'>{members.TeamMemberName}</h4>
          </div>
        ))}
        </Carousel>
      </div>
      <div className='background-left-text' style={{backgroundImage: `url(${data.businessBanking.data.attributes.BeyondBanking.BackgroundImage.data.attributes.url})`}}>
          <div className='grad-overlay'></div>
          <div className='background-left-text-text container'>
            <h3 className='max-400 white'>{data.businessBanking.data.attributes.BeyondBanking.Title}</h3>
            <hr className="orange"></hr>
            <p className='max-400 white mg-top-50'>{parse(data.businessBanking.data.attributes.BeyondBanking.Text)}</p>
          </div>
      </div>
    </div>
  )
}
