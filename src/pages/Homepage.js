import React from 'react'
//import useFetch from '../hooks/useFetch'
import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import parse from 'html-react-parser'

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
                    HomepageCTA {
                        Title,
                        Description,
                        id,
                        Image {
                            data {
                                attributes {
                                    url
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
                            }
                          }
                        }
                    }
                    NewsBackground {
                        data {
                            attributes {
                                url
                            }
                        }
                    }
                    Locations {
                        Title,
                        LocationMap {
                            data {
                            attributes {
                                url
                            }
                            }
                        }
                    }
                    Quote
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
                    Story,
                    Media {
                        data {
                            attributes {
                                url
                            }
                        }
                    }
                }
            }
        }
        ccBankLocations {
            data {
              attributes {
                City,
                Address,
                Zip,
                State,
                Telephone,
                HasATM
              }
            }
        }
    }
`
export default function Homepage() {
    //const { loading, error, data } = useFetch('http://localhost:1337/api/image-ctas')
    const { loading, error, data } = useQuery(HOMEPAGEINFO)

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error :(</p>

    console.log(data)
    return (
        <div className='wrapper'>
            <div className='hero-banner'>
                <div className='hero' style={{backgroundImage: `url(${data.homepage.data.attributes.HomepageHero.BackgroundImage.data[0].attributes.url})`}}>
                    <div className='grad-overlay'></div>
                    <div className='inner-hero'>
                        <h1>{data.homepage.data.attributes.HomepageHero.Title}</h1>
                        <hr className='orange'></hr>
                        <p>{data.homepage.data.attributes.HomepageHero.Description}</p>
                        <div className='btn-green'><a href="/">{data.homepage.data.attributes.HomepageHero.ButtonTitle}</a></div>
                    </div>
                </div>
            </div>
            <div className='looking-for'>
                <div className='container'>
                    <h2>{data.lookingFors.data[0].attributes.Title}</h2>
                    <hr className="green"></hr>
                    <select>
                    {data.lookingFors.data[0].attributes.LookingForList.map((list) => (
                        <option key={list.id}>{list.LinkText}</option>
                    ))}
                    </select>
                    <div className='btn-ghost-green'><Link to={data.lookingFors.data[0].attributes.ButtonURL}>{data.lookingFors.data[0].attributes.ButtonTitle}</Link></div>
                </div>
            </div>
            <div className='cta-wrapper'>
                <div className='cta-box container'>
                    {data.homepage.data.attributes.HomepageCTA.map((cta) => (
                        <div key={cta.id} className='cta'>
                            <div className='cta-image' style={{backgroundImage: `url(${cta.Image.data.attributes.url})`}}></div>
                            <div className='cta-info'>
                                <div className='title'><h2>{cta.Title}</h2></div>
                                <hr className='green'></hr>
                                <div className='desciption'><p>{cta.Description}</p></div>
                                <div className='btn-ghost-green'><Link to={`/api/details/${cta.id}`}>Read more</Link></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className='container mg-top-50 mg-bottom-50'>
                <h2 className='center'>Featured Rates</h2>
                <hr className="green center"></hr>
            </div>
            <div className='rates-cta' style={{backgroundImage: `url(${data.homepage.data.attributes.HomepageRates.BackgroundImage.data.attributes.url})`}}>
                <div className='overlay'></div>
                <div className='container rates-cta-flex max-800 mg-auto'>
                    <div className='rates-cta-item'>
                        <h5>{data.homepage.data.attributes.HomepageRates.SuperTitle}</h5>
                        <h2>{data.homepage.data.attributes.HomepageRates.Title}</h2>
                        <hr className='orange' />
                        <p>{parse(data.homepage.data.attributes.HomepageRates.Description)}</p>
                        <div className='btn-orange'><Link to={data.homepage.data.attributes.HomepageRates.ButtonURL}>{data.homepage.data.attributes.HomepageRates.ButtonTitle}</Link></div>
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
            <div className='quote container'>
                <div className='quote-inner'>
                    {parse(data.homepage.data.attributes.Quote)}
                </div>
            </div>
            <div className='icon-cta'>
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
            </div>
            <div className='video-wrapper'>
                <div className='video-box container'>
                    <div className='video-info'>
                        <h2>{data.homepage.data.attributes.HomepageVideo.Title}</h2>
                        <hr className='green'></hr>
                        <p>{data.homepage.data.attributes.HomepageVideo.Description}</p>
                    </div>
                    <div className='video-player'>
                        {data.homepage.data.attributes.HomepageVideo.Video.data !== null &&
                            <video controls>
                                <source src={data.homepage.data.attributes.HomepageVideo.Video.data.attributes.url} type="video/mp4"/>
                            </video>
                        }
                        {data.homepage.data.attributes.HomepageVideo.YouTubeSRC !== null &&
                            <iframe class="youtube" src={data.homepage.data.attributes.HomepageVideo.YouTubeSRC} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                        }
                        
                    </div>
                </div>
            </div>
            <div className='cc-locations'>
                <div className='cc-locations-box container'>
                    <h2 className='center white'>{data.homepage.data.attributes.Locations.Title}</h2>
                    <hr className='green center mg-bottom-50'></hr>
                    <div className='cc-locations-inner' style={{backgroundImage: `url(${data.homepage.data.attributes.Locations.LocationMap.data.attributes.url})`}}>
                        {data.ccBankLocations.data.map((locate, index) => (
                            // <div key={locate.id} className={`locate item-${index+1}`}>
                            <div key={locate.id} className={`locate item-${index+1 > 3 ? 'right' : 'left'}`}>
                                <div className='locate-info'>
                                    <div className='city'><h3 className='green'>{locate.attributes.City}</h3></div>
                                    <div className='address'><p>{locate.attributes.Address}</p></div>
                                    <div className='address-1'><p>{locate.attributes.City}, {locate.attributes.State} {locate.attributes.Zip}</p></div>
                                    <div className='telephone'><p>{locate.attributes.Telephone}</p></div>
                                    <div className='atm'><p>{locate.attributes.HasATM === true ? 'ATM Available' : ''}</p></div>
                                    <div className='btn-green'><a href="/">HOURS & DIRECTIONS</a></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className='cc-news-preview'>
                <h2 className='center'>News</h2>
                <hr className='green center mg-bottom-50'></hr>
                <div className='cc-news-preview-box container'>
                    {data.ccBanksNews.data.slice(0, 3).map((news) => (
                        <div key={news.id} className='cc-news-preview-inner'>
                            <div className='cc-news-image' style={{backgroundImage: `url(${news.attributes.Media.data[0].attributes.url})`}}></div>
                            <div className='cc-news-info'>
                                <h4 className="orange fjalla">{news.attributes.Title}</h4>
                                <p>{news.attributes.Story.substring(0, 250)}...</p>
                                <div><Link className='bold uppercase' to={`/news/${news.id}`}>Read more</Link></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
