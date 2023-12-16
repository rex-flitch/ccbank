import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import parse from 'html-react-parser'
import AccountLogin from '../components/AccountLogin'

const NEWSINFO = gql`
    query getNews {
        new {
            data {
              attributes {
                NewsHero {
                  Title
                  Description
                  ButtonURL
                  ButtonTitle
                  BackgroundImage {
                    data {
                      attributes {
                        alternativeText
                        url
                      }
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
        ccBankVideoLibraries {
          data {
            id
            attributes {
              Title
              Description
              YouTubeSRC
            }
          }
        }
    }
`
export default function News() {
  const [displayCount, setDisplayCount] = useState(1);
  /// ----------------------- CHANGE THE useState(1) TO 6 TO DISPLAY 6 INSTEAD OF 1 ------------------
  const { loading, error, data } = useQuery(NEWSINFO)
  console.log(data)
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>
  
  console.log(data)
  return (
    <main className='wrapper merchant' id='main' tabindex="-1">
      <div className='hero-banner'>
          <div className='hero bg-center' style={{backgroundImage: `url(${data.new.data.attributes.NewsHero.BackgroundImage.data[0].attributes.url})`}}>
              <div className='grad-overlay'></div>
              <div className='inner-container'>
                <AccountLogin />
                <div className='inner-hero'>
                    <h1>{data.new.data.attributes.NewsHero.Title}</h1>
                    <hr className='orange'></hr>
                    {data.new.data.attributes.NewsHero.Description !== null &&
                      <p>{data.new.data.attributes.NewsHero.Description}</p>
                    }
                    {data.new.data.attributes.NewsHero.ButtonTitle !== null &&
                      <div className='btn-green'><Link to=''>{data.intraFi.data.attributes.NewsHero.ButtonTitle}</Link></div>
                    }
                </div>
              </div>
          </div>
      </div>
      <div className='cc-news-preview'>
            <div className='cc-news-page-box container'>
                {data.ccBanksNews.data.slice(0, displayCount).map((news) => (
                    <div key={news.id} className='cc-news-page-inner'>
                        <div className='cc-news-overlay'><Link className='bold uppercase' to={`/news/${news.attributes.slug}`}></Link></div>
                        <div className='cc-news-page-image'><img src={news.attributes.Media.data[0].attributes.url} alt={news.attributes.Media.data[0].attributes.alternativeText} /></div>
                        <div className='cc-news-page-info'>
                            <h5 className='center'>PRESS RELEASE</h5>
                            <hr className='center orange'></hr>
                            <h5 className='center dark-grey'>{news.attributes.Date}</h5>
                            <h4 className="fjalla center">{news.attributes.Title}</h4>
                        </div>
                    </div>
                ))}
            </div>
            {displayCount < data.ccBanksNews.data.length && (
              <div className='container width-150'><button className='btn-green center' onClick={() => setDisplayCount(displayCount + 1)}>Show More</button></div>
              // ---------------------  CHANGE THE 1 TO 6 IS SHOW 6 MORE ABOVE ^- setDisplayCount(displayCount + 1)
            )}
        </div>
        <div className='cc-news-preview bg-grey'>
          <h2 className='center black'>Videos</h2>
          <hr className='center orange'></hr>
            <div className='cc-news-page-box container mg-top-50'>
                {data.ccBankVideoLibraries.data.map((video) => (
                  <div key={video.id} className='cc-news-page-inner'>
                    <div className='video-player'>
                      {video.attributes.YouTubeSRC !== null &&
                          <iframe className="youtube" src={video.attributes.YouTubeSRC} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                      }
                    </div>
                    <h4>{video.attributes.Title}</h4>
                    <hr className='orange'></hr>
                  </div>
                ))}
            </div>
        </div>
    </main>
  )
}
