import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import parse from 'html-react-parser'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import AccountLogin from '../components/AccountLogin'

const LENDIOQUERY = gql`
    query getLendio {
        lendio {
            data {
              id
              attributes {
                Hero {
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
                Title
                Description
                Step1
                Step2
                Step3
                QA {
                  Question
                  Answer
                }
                BoxInfo {
                  id
                  MainTitle
                  SuperTitle
                }
                Additional
                TeamMembers {
                  id
                  TeamMemberName
                  TeamMemberPhone
                  TeamMemberEmail
                  TeamMemberPosition
                  TeamMemberImage {
                    data {
                      attributes {
                        url
                        alternativeText
                      }
                    }
                  }
                  slug
                  NMLS
                  Bio
                }
              }
            }
          }
          businessBanking {
            data {
              attributes {
                OurBankingTeam {
                  TeamMemberImage {
                    data {
                      attributes {
                        url,
                        alternativeText
                      }
                    }
                  }
                  TeamMemberName,
                  slug
                }
              }
            }
          }
    }
`
export default function Lendio() {
  //const { loading, error, data } = useFetch('http://localhost:1337/api/image-ctas')
  const [iframeHeight, setIframeHeight] = useState('1000px'); // Default height
  const [openIndex, setOpenIndex] = useState(null); // Keep track of which accordion is open.
  
    const updateHeightBasedOnWidth = () => {
        const screenWidth = window.innerWidth;
        if (screenWidth <= 540) {
        setIframeHeight('1600px'); // Smaller devices
        } else if (screenWidth > 1000) {
        setIframeHeight('1300px'); // Larger devices
        } else {
        setIframeHeight('1300px'); // Default for others
        }
    };

    useEffect(() => {
        updateHeightBasedOnWidth();
        window.addEventListener('resize', updateHeightBasedOnWidth);

        return () => {
        window.removeEventListener('resize', updateHeightBasedOnWidth);
        };
    }, []);
  const { loading, error, data } = useQuery(LENDIOQUERY)

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
  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index); // If clicked accordion is already open, close it; otherwise open it.
  };

  console.log(data)
  return (
    <main className='wrapper partners' id='main' tabIndex="-1">
      <div className='hero-banner'>
          <div className='hero' id={`lendio-hero-id-${data.lendio.data.attributes.Hero.id}`} style={{backgroundImage: `url(${data.lendio.data.attributes.Hero.BackgroundImage.data[0].attributes.url})`}}>
              <div className='grad-overlay'></div>
              <div className='inner-container'>
                <AccountLogin />
                <div className='inner-hero'>
                    <h1>{data.lendio.data.attributes.Hero.Title}</h1>
                    <hr className='orange'></hr>
                    {data.lendio.data.attributes.Hero.Description !== null &&
                      <p>{parse(data.lendio.data.attributes.Hero.Description)}</p>
                    }
                    {data.lendio.data.attributes.Hero.ButtonTitle !== null &&
                      <div className='btn-green'><Link to={data.lendio.data.attributes.Hero.ButtonURL}>{data.lendio.data.attributes.Hero.ButtonTitle}</Link></div>
                    }
                </div>
              </div>
          </div>
      </div>
      <div className='container mg-top-80 mg-bottom-50'>
        <div className='steps'>
          <div className='step'>
            <span>1.</span>
            <div>{parse(data.lendio.data.attributes.Step1)}</div>
          </div>
          <div className="line-with-circles"><div className='line'></div></div>
          <div className='step'>
            <span>2.</span>
            <div>{parse(data.lendio.data.attributes.Step2)}</div>
          </div>
          <div className="line-with-circles"><div className='line'></div></div>
          <div className='step'>
            <span>3.</span>
            <div>{parse(data.lendio.data.attributes.Step3)}</div>
          </div>
        </div>
        <div className='small-text'>{parse(data.lendio.data.attributes.Additional)}</div>
      </div>
      <div className='container mg-top-80 mg-bottom-50'>
        <h2 className='center orange'>{data.lendio.data.attributes.Title}</h2>
        <hr className='green center'></hr>
        <p>{data.lendio.data.attributes.Description}</p>
      </div>
      <div className='container mg-top-50 mg-bottom-50'>
        <div className='box-cta mg-auto'>
            {data.lendio.data.attributes.BoxInfo.map((box) => (
                <div key={box.id} className='box-item'>
                    <h4 className='green left'>{box.MainTitle}</h4>
                    <div>{parse(box.SuperTitle)}</div>
                </div>
            ))}
        </div>
      </div>
      {data.lendio.data.attributes.Hero.ButtonTitle !== null &&
        <div className='container center mg-bottom-50'>
          <div className='btn-green'><Link to={data.lendio.data.attributes.Hero.ButtonURL}>{data.lendio.data.attributes.Hero.ButtonTitle}</Link></div>
        </div>
      }
      <div className='faq container mg-top-80 mg-bottom-50'>
        <h2 className='center green'>FAQs</h2>
        <hr className='green center'></hr>
        <div className='qa-container'>
          {data.lendio.data.attributes.QA.map((item, index) => (
            <div
              key={index}
              className='qa-item'
            >
              <summary
                className='question'
                onClick={(e) => {
                  e.preventDefault(); // Prevent default behavior of <summary>
                  toggleAccordion(index);
                }}
                style={{ cursor: 'pointer' }} // Indicate it's clickable
              >
                {item.Question}
              </summary>
              {openIndex === index && ( // Only render the answer if this is the open item
                <div className='answer'>
                  {parse(item.Answer)}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className='grey-box'>
        <div className='member-slider container'>
          <Carousel 
          swipeable={true}
          draggable={true}
          showDots={false}
          responsive={responsive}
          ssr={true} // means to render carousel on server-side.
          infinite={true}
          keyBoardControl={true}
          containerClass="carousel-container"
          // removeArrowOnDeviceType={["tablet", "mobile"]}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
          className='mg-top-50'
          >
          {data.businessBanking.data.attributes.OurBankingTeam.map((members) => (
            <div className='slider-member'>
              <div className='link-overlay'><Link to={`/team/${members.slug}`}></Link></div>
              <div className='slider-image'><img src={members.TeamMemberImage.data.attributes.url} alt={members.TeamMemberImage.data.attributes.alternativeText} /></div>
              <h4 className='green'>{members.TeamMemberName}</h4>
            </div>
          ))}
          </Carousel>
        </div>
      </div>
      <div className='container mg-top-80 mg-bottom-50'>
          <h2 className='center orange'>Contact Us</h2>
          <hr className='green center'></hr>
          <p className='center'>For inquiries/help call (866) 656-2671 or email QuickDecisions@CCBank.com</p>
          <iframe
          src="https://form.jotform.com/241137093047149"
          title="JotForm"
          width="100%"
          style={{ height: iframeHeight }}
          frameBorder="0"
          />
      </div>
    </main>
  )
}
