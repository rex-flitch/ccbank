import React, { useState } from 'react'
//import useFetch from '../hooks/useFetch'
import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import parse from 'html-react-parser'
import AccountLogin from '../components/AccountLogin'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
// import Lightbox from '../components/Lightbox'
import useWindowWidth from '../hooks/useWindowWidth'

const HOMEPAGEINFO = gql`
    query getCtas {
        homepage {
            data {
                attributes {
                    HomepageRates {
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
                    HomepageHero {
                        id,
                        Title,
                        Description,
                        ButtonURL,
                        ButtonTitle,
                        SecondButtonTitle,
                        SecondButtonURL,
                        Active,
                        BackgroundImage {
                            data {
                                attributes {
                                    url
                                    alternativeText
                                }
                            }
                        }
                    }
                    HomepageCTA {
                        Title,
                        Description,
                        id,
                        ButtonTitle,
                        ButtonURL,
                        Image {
                            data {
                                attributes {
                                    url
                                    alternativeText
                                }
                            }
                        }
                    }
                    HomepageIconCTA {
                        id,
                        Title,
                        Description,
                        ButtonURL,
                        ButtonTitle,
                        Icon {
                            data {
                              attributes {
                                url
                                alternativeText
                              }
                            }
                        }
                    }
                    AlternatingImageColorCTA {
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
                              alternativeText
                            }
                          }
                        }
                    }
                    HomepageVideo {
                        Description,
                        Title,
                        YouTubeSRC,
                        Video {
                          data {
                            attributes {
                              url
                              alternativeText
                            }
                          }
                        }
                    }
                    NewsBackground {
                        data {
                            attributes {
                                url
                                alternativeText
                            }
                        }
                    }
                    Locations {
                        Title,
                        LocationMap {
                            data {
                            attributes {
                                url
                                alternativeText
                            }
                            }
                        }
                    }
                    Quote,
                    QuoteYouTubeLink,
                    LookingFor {
                        id,
                        Title,
                        Description,
                        ButtonURL,
                        ButtonTitle,
                        Image {
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
        lookingFors {
            data {
              attributes {
                Title,
                ButtonURL,
                ButtonTitle,
                LookingForList {
                  LinkText,
                  LinkURL,
                  id
                }
              }
            }
        }
        genericRates {
            data {
              attributes {
                Title,
                APY6Months,
                APY12Months,
                APY24Months,
                ButtonTitle,
                ButtonURL,
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
        ccBanksNews(sort:"Date:desc")
        {
            data {
                id,
                attributes {
                    Title,
                    Date,
                    ShortStory,
                    slug,
                    Media {
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
        ccBankLocations(sort:"City") {
            data {
              attributes {
                City,
                Address,
                Zip,
                State,
                Telephone,
                HasATM,
                Map,
                EmbedMapCode,
                LobbyHours,
                DriveThroughHours,
                Image {
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
`
export default function Homepage() {
    //const { loading, error, data } = useFetch('http://localhost:1337/api/image-ctas')
    const [activeIndex, setActiveIndex] = useState(0);

    const handleLinkClick = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };
    const [isOpen, setIsOpen] = useState(false);
    const videoId = 'dzq0ARCN7qw'; // Replace YOUR_VIDEO_ID with the actual YouTube video ID

    const openLightbox = () => setIsOpen(true);
    const closeLightbox = () => setIsOpen(false);
    const { loading, error, data } = useQuery(HOMEPAGEINFO)
    const windowWidth = useWindowWidth();
      const isMobile = windowWidth <= 1200;

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error :(</p>
    
    const CustomDot = ({ index, onClick, active }) => {
        const dotText = ['PERSONAL CHECKING','BUSINESS CHECKING', 'INTELLIGENT LENDING', 'SAVINGS & CDS','HOME EQUITY LINE OF CREDIT'][index]; // Define your custom dot texts
      
        return (
          <button
            style={{
              color: active ? '#03873d' : '#666666', // Change the active and inactive dot color
              fontWeight: active ? 'bold' : '700',
              border: 'none',
              borderBottom: active ? '4px solid #de7205' : 'none',
              cursor: 'pointer',
              background: 'none',
              role: 'list',
              margin: '0 5px', // Adjust the spacing between dots
            }}
            onClick={() => onClick()}
          >
            {dotText}
          </button>
        );
      };
      const activeHomepageHero = data.homepage.data.attributes.HomepageHero.filter(hero => hero.Active);
      const CustomSliderDot = ({ onMove, index, onClick, active }) => {
        const hero = activeHomepageHero[index];
        const imageUrl = hero.BackgroundImage.data[0].attributes.url;

        return (
            <li
                className={active ? 'active' : 'inactive'}
                style={{ background: `url(${imageUrl}) center center / cover no-repeat`, margin: '0 10px 10px 0' }}
            >
                <button
                    onClick={() => onClick()}
                    style={{
                        background: 'none',
                        border: '1px solid #fff',
                        width: '75px',
                        height: '100%',
                        cursor: 'pointer',
                    }}
                >
                    <span>Slide</span>
                </button>
            </li>
        );
    };
    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 1,
          slidesToSlide: 1 // optional, default to 1.
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 1,
          slidesToSlide: 1 // optional, default to 1.
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
          slidesToSlide: 1 // optional, default to 1.
        }
      };
      
      const responsivenews = {
        desktop: {
          breakpoint: { max: 3000, min: 1624 },
          items: 1,
          slidesToSlide: 1,
          partialVisibilityGutter: 20,
          partialVisible: true
        },
        tablet: {
          breakpoint: { max: 1624, min: 992 },
          items: 1,
          slidesToSlide: 1, // optional, default to 1.
          partialVisibilityGutter: 10,
          partialVisible: true
        },
        mobile: {
          breakpoint: { max: 992, min: 0 },
          items: 1,
          slidesToSlide: 1, // optional, default to 1.
          centerMode: false,
          partialVisible: false
        }
      };

    console.log(data)
    return (
        <main className='wrapper' id='main' tabindex="-1">
            {data.homepage.data.attributes.HomepageHero.some((hero) => hero.Active) && (
            <div className='hero-banner banner-slider'>
            <div className='login-wrapper'><AccountLogin /></div>
            <Carousel 
            swipeable={true}
            draggable={true}
            showDots={true}
            responsive={responsive}
            ssr={true} // means to render carousel on server-side.
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={7000}
            keyBoardControl={true}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            dotListClass="custom-home-dot-list-style"
            itemClass="carousel-item-padding-40-px"
            className='hero-slider'
            customDot={<CustomSliderDot />}
            >
                {data.homepage.data.attributes.HomepageHero.map((hero) => 
                    hero.Active && (
                <div key={hero.id} className='hero' id={`hero-id-${hero.id}`} style={{
                    backgroundImage: hero.BackgroundImage?.data[0]?.attributes?.url
                      ? `url(${hero.BackgroundImage.data[0].attributes.url})`
                      : 'none' // Or you can leave this out if no default is needed
                  }}>
                    <div className='grad-overlay'></div>
                    <div className='inner-container'>
                        <div className='login-container'></div>
                        <div className='inner-hero'>
                            {hero.Title !== null &&
                                <h1>{hero.Title}</h1>
                            }
                            <hr className='orange'></hr>
                            {hero.Description !== null &&
                                <p>{hero.Description}</p>
                            }
                            <div className='homepage-hero-buttons'>
                            {hero.ButtonTitle !== null &&
                                <div className='btn-green'>
                                    {hero.ButtonURL === "https://ccbank.lendio.com/bp/intelligent-lending" ? (
                                        <a href={hero.ButtonURL} target="_blank" rel="noopener noreferrer">{hero.ButtonTitle}</a>
                                    ) : (
                                        <Link to={hero.ButtonURL}>{hero.ButtonTitle}</Link>
                                    )}
                                </div>
                            }
                            {hero.SecondButtonTitle !== null &&
                                <div className='btn-green'><Link to={hero.SecondButtonURL}>{hero.SecondButtonTitle}</Link></div>
                            }
                            {hero.id === '69' &&
                                <div className='hero-mobile'>
                                    <div className='btn-green'><a href='#warrior'>Open Video</a></div>
                                    
                                </div>
                            }
                            </div>
                        </div>
                        {hero.id === '69' &&
                        <div className='hero-image'>
                            <a href='#warrior'><img src='https://res.cloudinary.com/dk6kie30d/image/upload/v1713365856/Screen_Shot_2024_04_16_at_4_54_32_PM_4152f0a70f.png' alt='CCBank and Utah Warrior Youtube Screenshot' /></a>
                        </div>
                        }
                    </div>
                </div>
                ))}
                </Carousel>
            </div>
            )}
            <div className='looking-for container'>
                <Carousel 
                    swipeable={true}
                    draggable={true}
                    showDots={true}
                    responsive={responsive}
                    ssr={true} // means to render carousel on server-side.
                    infinite={true}
                    autoPlay={false}
                    autoPlaySpeed={6000}
                    keyBoardControl={true}
                    containerClass="carousel-container"
                    removeArrowOnDeviceType={["tablet", "mobile"]}
                    dotListClass="custom-dot-list-style"
                    itemClass="carousel-item-padding-40-px"
                    className='hero-slider'
                    customDot={<CustomDot />}
                >
                    {data.homepage.data.attributes.LookingFor.map((look) => (
                        <div key={look.id} className='looking-item'>
                            <div className='look-info'>
                                <h3 className='orange'>{look.Title}</h3>
                                <hr className='green'></hr>
                                <p>
                                    {parse(look.Description)}
                                    {look.id === '4' && ` ${data.homepage.data.attributes.HomepageRates.type_of_rate.data.attributes.rates.data[1].attributes.APY} APY* 12-month CD.`}
                                </p>
                                {look.ButtonTitle !== null &&
                                    <div className='btn-green mg-top-50'><Link to={look.ButtonURL}>{look.ButtonTitle}</Link></div>
                                }
                            </div>
                            <div className='look-image'>
                                <img src={look.Image.data.attributes.url} alt={look.Image.data.attributes.alternativeText}/>
                            </div>
                        </div>
                    ))}
                </Carousel>
            </div>

            {/* <Lightbox isOpen={isOpen} videoId={videoId} onClose={closeLightbox} /> */}
            <div className='cta-wrapper home'>
                <div className='cta-box container'>
                    {data.homepage.data.attributes.HomepageCTA.map((cta) => (
                        <div key={cta.id} className='cta'>
                            <div id={`cta-id-${cta.id}`} className='cta-image' role='img' aria-label={cta.Image.data.attributes.alternativeText} style={{backgroundImage: `url(${cta.Image.data.attributes.url})`}}></div>
                            <div className='cta-info'>
                                <div className='title'><h2>{cta.Title}</h2></div>
                                <hr className='green'></hr>
                                <div className='desciption'><p>{cta.Description}</p></div>
                                {cta.ButtonTitle !== null &&
                                    <div className='btn-ghost-green'><Link to={cta.ButtonURL}>{cta.ButtonTitle}</Link></div>
                                }
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className='rates-cta' style={{backgroundImage: `url(${data.homepage.data.attributes.HomepageRates.BackgroundImage.data.attributes.url})`}}>
                <div className='overlay'></div>
                <div className='container rates-cta-flex max-800 mg-auto'>
                    <div className='rates-cta-item'>
                        <h5>{data.homepage.data.attributes.HomepageRates.SuperTitle}</h5>
                        <h2>{data.homepage.data.attributes.HomepageRates.Title}</h2>
                        <hr className='orange' />
                        <div>{parse(data.homepage.data.attributes.HomepageRates.Description)}</div>
                        <div className='btn-green'><Link to={data.homepage.data.attributes.HomepageRates.ButtonURL}>{data.homepage.data.attributes.HomepageRates.ButtonTitle}</Link></div>
                    </div>
                    <div className='rates-cta-item'>
                        <div className='rates-cta-box'>
                            <div className='rates-cta-type'>{data.homepage.data.attributes.HomepageRates.GreenAreaText}</div>
                            <div className='rates-cta-info'>
                                <h2>{data.homepage.data.attributes.HomepageRates.type_of_rate.data.attributes.rates.data[1].attributes.APY}</h2>
                                <h4>{data.homepage.data.attributes.HomepageRates.BelowRateText}</h4>
                                <hr className='green center' />
                                <p>{data.homepage.data.attributes.HomepageRates.BottomAreaText}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='alt-image-color'>
                <div className='container'>
                    {data.homepage.data.attributes.AlternatingImageColorCTA.map((altcta) => (
                        <div key={altcta.id} className='alt-cta'>

                            {altcta.ImagePlacement === 'Left' &&
                                <div className={altcta.ImageBackgroundColor === 'Orange' ? 'alt-cta-image left alt-cta-orange' : 'alt-cta-image left alt-cta-green'}><img src={altcta.Image.data.attributes.url} alt={altcta.Image.data.attributes.alternativeText}/></div>
                            }

                            <div className='alt-cta-info'>
                                <div className='title'><h2>{altcta.Title}</h2></div>
                                <hr className='orange'></hr>
                                <div className='desciption'><p>{altcta.Description}</p></div>
                                <div className='btn-ghost-green'><Link to={altcta.ButtonURL}>{altcta.ButtonTitle}</Link></div>
                            </div>
                            {altcta.ImagePlacement === 'Right' &&
                                <div className={altcta.ImageBackgroundColor === 'Orange' ? 'alt-cta-image right alt-cta-orange' : 'alt-cta-image right alt-cta-green'}><img src={altcta.Image.data.attributes.url} alt={altcta.Image.data.attributes.alternativeText}/></div>
                            }
                        </div>
                    ))}
                </div>
            </div>
            <div className='quote container'>
                <div className='quote-inner'>
                    {parse(data.homepage.data.attributes.Quote)}
                    <div className='quote-youtube'><Link to={data.homepage.data.attributes.QuoteYouTubeLink} target='_blank' rel='noopener noreferrer' aria-label="New Window"><img src="https://res.cloudinary.com/dk6kie30d/image/upload/v1702595891/youtube_icon_web_1fa1f6445f.png" alt="YouTube Icon"/></Link></div>
                </div>
            </div>
            {/* <div className='icon-cta'>
                <div className='container cta-icon-box'>
                    {data.homepage.data.attributes.HomepageIconCTA.map((iconcta) => (
                        <div key={iconcta.id} className='iconcta'>
                            <div className='iconcta-image'><img src={iconcta.Icon.data.attributes.url} alt={iconcta.Title}/></div>
                            <div className='iconcta-info'>
                                <div className='title'><h3 className='orange'>{iconcta.Title}</h3></div>
                                <hr className='green'></hr>
                                <div className='desciption'><p>{iconcta.Description}</p></div>
                                <div className='btn-ghost-green'><Link to={`/api/details/${iconcta.id}`}>Read more</Link></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div> */}
            <div className='video-wrapper'>
                <div className='video-box container'>
                    <div className='video-player'>
                        {data.homepage.data.attributes.HomepageVideo[1].Video.data !== null &&
                            <video controls>
                                <source src={data.homepage.data.attributes.HomepageVideo[1].Video.data.attributes.url} type="video/mp4"/>
                            </video>
                        }
                        {data.homepage.data.attributes.HomepageVideo[1].YouTubeSRC !== null &&
                            <iframe className="youtube" src={data.homepage.data.attributes.HomepageVideo[1].YouTubeSRC} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                        }
                        
                    </div>
                    <div className='video-info'>
                        <h2>{data.homepage.data.attributes.HomepageVideo[1].Title}</h2>
                        <hr className='green'></hr>
                        <p>{data.homepage.data.attributes.HomepageVideo[1].Description}</p>
                    </div>
                </div>
            </div>
            <div className='video-wrapper'>
                <div className='video-box container'>
                    <div className='video-info'>
                        <h2>{data.homepage.data.attributes.HomepageVideo[0].Title}</h2>
                        <hr className='green'></hr>
                        <p>{data.homepage.data.attributes.HomepageVideo[0].Description}</p>
                    </div>
                    <div className='video-player'>
                        {data.homepage.data.attributes.HomepageVideo[0].Video.data !== null &&
                            <video controls>
                                <source src={data.homepage.data.attributes.HomepageVideo[0].Video.data.attributes.url} type="video/mp4"/>
                            </video>
                        }
                        {data.homepage.data.attributes.HomepageVideo[0].YouTubeSRC !== null &&
                            <iframe className="youtube" src={data.homepage.data.attributes.HomepageVideo[0].YouTubeSRC} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                        }
                        
                    </div>
                </div>
            </div>
            <div className='video-wrapper' id='warrior'>
                <div className='video-box container'>
                    <div className='video-player'>
                        {data.homepage.data.attributes.HomepageVideo[2].Video.data !== null &&
                            <video controls>
                                <source src={data.homepage.data.attributes.HomepageVideo[2].Video.data.attributes.url} type="video/mp4"/>
                            </video>
                        }
                        {data.homepage.data.attributes.HomepageVideo[2].YouTubeSRC !== null &&
                            <iframe className="youtube" src={data.homepage.data.attributes.HomepageVideo[2].YouTubeSRC} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                        }
                        
                    </div>
                    <div className='video-info'>
                        <h2>{data.homepage.data.attributes.HomepageVideo[2].Title}</h2>
                        <hr className='green'></hr>
                        <p>{data.homepage.data.attributes.HomepageVideo[2].Description}</p>
                    </div>
                </div>
            </div>
            <div className='cc-locations'>
                <div className='cc-locations-box'>
                    <h2 className='center orange'>{data.homepage.data.attributes.Locations.Title}</h2>
                    <hr className='green center mg-bottom-50'></hr>
                    <div className='cc-locations-inner' style={{backgroundImage: `url(${data.homepage.data.attributes.Locations.LocationMap.data.attributes.url})`}}>
                        <div className='container cc-locations-innerhtml'>
                            <div className='cc-locations-flex left'>
                            {data.ccBankLocations.data.map((locate, index) => (
                                // <div key={locate.id} className={`locate item-${index+1}`}>
                                // <div key={locate.id} className={`locate item-${index+1 > 3 ? 'right' : 'left'}`}>
                                //     <div className='locate-info'>
                                //         <div className='city'><h3 className='green'>{locate.attributes.City}</h3></div>
                                //         <div className='address'><p>{locate.attributes.Address}</p></div>
                                //         <div className='address-1'><p>{locate.attributes.City}, {locate.attributes.State} {locate.attributes.Zip}</p></div>
                                //         <div className='telephone'><p>{locate.attributes.Telephone}</p></div>
                                //         <div className='atm'><p>{locate.attributes.HasATM === true ? 'ATM Available' : ''}</p></div>
                                //         <div className='btn-green'><a href="/">HOURS & DIRECTIONS</a></div>
                                //     </div>
                                // </div>
                                <div role="button" tabindex="0" key={locate.id} onClick={() => handleLinkClick(index)} className={activeIndex === index ? 'locations-info-titles active' : 'locations-info-titles'}>
                                    <div className='left-links'>
                                        <div>{locate.attributes.City}</div>
                                    </div>
                                </div>
                            ))}
                                <div className='location-img mg-top-50'>
                                    {data.ccBankLocations.data.map((locate, index) => (
                                        <div key={locate.id} className={`locations-info ${activeIndex === index ? 'active' : ''}`}>
                                            <img src={locate.attributes.Image.data.attributes.url} alt={locate.attributes.Image.data.attributes.alternativeText} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className='cc-locations-flex right'>
                            {data.ccBankLocations.data.map((locate2, index) => (
                                <div key={locate2.id} className={`locations-info ${activeIndex === index ? 'active' : ''}`}>
                                    <div className='right-map'>
                                    {locate2.attributes.EmbedMapCode !== null &&
                                        <div>{parse(locate2.attributes.EmbedMapCode)}</div>
                                    }
                                    </div>
                                    <div className='hours-info'>
                                        <div className='location-address'>
                                            <p><strong>{locate2.attributes.City}</strong></p>
                                            <p>{locate2.attributes.Address}<br />
                                            {locate2.attributes.City === 'Corporate Office' &&
                                                <span>Pleasant Grove, </span>
                                            } 
                                            {locate2.attributes.City !== 'Corporate Office' &&
                                                <span>{locate2.attributes.City}, </span>
                                            }
                                            {locate2.attributes.State} {locate2.attributes.Zip}</p>
                                            {locate2.attributes.Telephone !== null &&
                                                <p>{locate2.attributes.Telephone}</p>
                                            }
                                        </div>
                                        <div className='location-hours-home'>
                                        {locate2.attributes.LobbyHours !== null &&
                                            <p><strong>Lobby Hours</strong><br />{locate2.attributes.LobbyHours}</p>
                                        }
                                        {locate2.attributes.DriveThroughHours !== null &&
                                            <p><strong>Drive-Thru Hours</strong><br />{parse(locate2.attributes.DriveThroughHours)}</p>
                                        }
                                        </div>
                                    </div>
                                </div>

                            ))}
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='cc-news-preview mg-bottom-50'>
                <h2 className='center'>News</h2>
                <hr className='green center'></hr>
                <div className='cc-news-preview-box'>
                <Carousel 
                swipeable={true}
                draggable={true}
                showDots={false}
                responsive={responsivenews}
                centerMode={!isMobile}
                ssr={true} // means to render carousel on server-side.
                infinite={true}
                keyBoardControl={true}
                containerClass="carousel-container"
                // removeArrowOnDeviceType={["tablet", "mobile"]}
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
                className='mg-top-50'
                // partialVisbile={true}
                >
                {data.ccBanksNews.data.slice(0, 3).map((news) => (
                    <div key={news.id} className='cc-news-homepage-inner'>
                        <div className='cc-news-image' role='img' aria-label={news.attributes.Media.data[0].attributes.alternativeText}style={{backgroundImage: `url(${news.attributes.Media.data[0].attributes.url})`}}></div>
                        <div className='cc-news-info'>
                            <h4 className="orange fjalla"><Link to={`/news/${news.attributes.slug}`}>{news.attributes.Title}</Link></h4>
                            <p>{news.attributes.ShortStory.substring(0, 150)}...</p>
                            <div className='btn-ghost-green'><Link className='bold uppercase' to={`/news/${news.attributes.slug}`}>Read more</Link></div>
                        </div>
                    </div>
                ))}
                </Carousel>
                <div className='center'><div className='btn-ghost-green'><Link to='/news'>SEE ALL</Link></div></div>
                </div>
                {/* <div className='cc-news-preview-box container'>
                    {data.ccBanksNews.data.slice(0, 3).map((news) => (
                        <div key={news.id} className='cc-news-preview-inner'>
                            <div className='cc-news-image' role='img' aria-label={news.attributes.Media.data[0].attributes.alternativeText}style={{backgroundImage: `url(${news.attributes.Media.data[0].attributes.url})`}}></div>
                            <div className='cc-news-info'>
                                <h4 className="orange fjalla"><Link to={`/news/${news.attributes.slug}`}>{news.attributes.Title}</Link></h4>
                                <p>{news.attributes.ShortStory.substring(0, 250)}...</p>
                                <div><Link className='bold uppercase' to={`/news/${news.attributes.slug}`}>Read more</Link></div>
                            </div>
                        </div>
                    ))}
                </div> */}
            </div>
        </main>
    )
}
