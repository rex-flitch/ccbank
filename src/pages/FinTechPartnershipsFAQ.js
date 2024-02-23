import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import parse from 'html-react-parser'
import AccountLogin from '../components/AccountLogin'
import Carousel from 'react-multi-carousel'
import Accordion from '../components/Accordion'

const GETFINTECH = gql`
    query FinTech {
        finTechPartnershipsFaq {
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
                QuestionsAnwers {
                  id
                  Question
                  Answer
                }
                Feedback
                FeedbackItems {
                  id
                  MainTitle
                  SuperTitle
                }
              }
            }
          }
    }
`
export default function FinTech() {
  //const { loading, error, data } = useFetch('http://localhost:1337/api/image-ctas')
  const { loading, error, data } = useQuery(GETFINTECH)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>
  
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
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
    <main className='wrapper opp-loans' id='main' tabindex="-1">
      <div className='hero-banner'>
          <div className='hero' style={{backgroundImage: `url(${data.finTechPartnershipsFaq.data.attributes.Hero.BackgroundImage.data[0].attributes.url})`}}>
              <div className='grad-overlay'></div>
              <div className='inner-container'>
                <AccountLogin />
                <div className='inner-hero'>
                    <h1>{data.finTechPartnershipsFaq.data.attributes.Hero.Title}</h1>
                    <hr className='orange'></hr>
                    {data.finTechPartnershipsFaq.data.attributes.Hero.Description !== null &&
                      <p>{parse(data.finTechPartnershipsFaq.data.attributes.Hero.Description)}</p>
                    }
                    {data.finTechPartnershipsFaq.data.attributes.Hero.ButtonTitle !== null &&
                      <div className='btn-green'><Link to=''>{data.finTechPartnershipsFaq.data.attributes.Hero.ButtonTitle}</Link></div>
                    }
                </div>
              </div>
          </div>
      </div>
      <div className='container mg-top-80 mg-bottom-50'>
        <h2 className='center orange max-800 mg-auto'>{data.finTechPartnershipsFaq.data.attributes.Title}</h2>
        <hr className='green center mg-top-20 mg-bottom-20'></hr>
        <div className='max-800 mg-auto'>{parse(data.finTechPartnershipsFaq.data.attributes.Description)}</div>
      </div>
      <div className='bg-grey'>
        <div className='qa-section container pd-tb-30'>
            <h2 className='center mg-top-50'>Frequently Asked Questions</h2>
            <hr className='center green'></hr>
            
            <div className='qa-container'>
            {data.finTechPartnershipsFaq.data.attributes.QuestionsAnwers.map((item) => (
            <Accordion key={item.id} summary={item.Question} details={item.Answer} />
            ))}
            </div>
        </div>
      </div>
      <div className='member-slider container mg-top-80'>
        <h2 className='center mg-top-50'>{data.finTechPartnershipsFaq.data.attributes.Feedback}</h2>
        <hr className="green center mg-bottom-20"></hr>
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
        {data.finTechPartnershipsFaq.data.attributes.FeedbackItems.map((members) => (
          <div key={members.id} className='box-item feedback-item'>
            <div className='center'>{members.SuperTitle}</div>
            <h5 className='green'>{members.MainTitle}</h5>
          </div>
        ))}
        </Carousel>
      </div>
    </main>
  )
}
