import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import parse from 'html-react-parser'
import Team from '../components/Team'
import AccountLogin from '../components/AccountLogin'

const ABOUTOVERVIEWPAGEINFO = gql`
    query getAboutOverview {
        aboutOverview {
            data {
              attributes {
                Title,
                Description,
                CommunityGivingTitle,
                CommunityGivingDescription,
                OveriewHero {
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
                OverviewAltCTA {
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
              }
            }
        }
        ccBankLeadershipTeams(sort:"Order:asc") {
            data {
              id,
              attributes {
                Name,
                Position,
                Order,
                Bio,
                Headshot {
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
    }
`

export default function AboutOverview() {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const section = document.getElementById(hash.substring(1));
      if (section) section.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  //const { loading, error, data } = useFetch('http://localhost:1337/api/image-ctas')
  const { loading, error, data } = useQuery(ABOUTOVERVIEWPAGEINFO)

  //const [isActive, setActive] = useState(false);

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  // const ToggleClass = () => {
  //   setActive(!isActive); 
  // };
  console.log(data)
  
  return (
    <main className='wrapper aboutoverview' id='main' tabindex="-1">
      <div className='hero-banner'>
          <div className='hero' style={{backgroundImage: `url(${data.aboutOverview.data.attributes.OveriewHero.BackgroundImage.data[0].attributes.url})`}}>
              <div className='grad-overlay'></div>
              <div className='inner-container'>
                <AccountLogin />
                <div className='inner-hero'>
                    <h1>{data.aboutOverview.data.attributes.OveriewHero.Title}</h1>
                    <hr className='orange'></hr>
                    {data.aboutOverview.data.attributes.OveriewHero.Description !== null &&
                      <p>{data.aboutOverview.data.attributes.OveriewHero.Description}</p>
                    }
                    {data.aboutOverview.data.attributes.OveriewHero.ButtonTitle !== null &&
                      <div className='btn-green'><a href="/">{data.aboutOverview.data.attributes.OveriewHero.ButtonTitle}</a></div>
                    }
                </div>
              </div>
          </div>
      </div>
      <div className='container mg-top-50 mg-bottom-50'>
        <h2 className='center'>{data.aboutOverview.data.attributes.Title}</h2>
        <hr className="green center"></hr>
        <p className='max-800 mg-auto'>{parse(data.aboutOverview.data.attributes.Description)}</p>
      </div>
      <div className='alt-image-color'>
        <div className='container'>
            {data.aboutOverview.data.attributes.OverviewAltCTA.map((altcta) => (
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
      <div className='container community-giving mg-top-50 mg-bottom-50'>
        <h2 className='center'>{data.aboutOverview.data.attributes.CommunityGivingTitle}</h2>
        <hr className="green center"></hr>
        <div className='max-800 mg-auto'>{parse(data.aboutOverview.data.attributes.CommunityGivingDescription)}</div>
      </div>
      <Team teamMembers={data.ccBankLeadershipTeams.data} />
    </main>
  )
}
