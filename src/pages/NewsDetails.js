import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import parse from 'html-react-parser'

const GETNEWSITEM = gql`
    query getNews($slug: String!) {
        ccBanksNews(filters: { slug: { eq: $slug } }) {
            data {
                id,
                attributes {
                    Title,
                    Date,
                    MainStory,
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
    }
`
export default function NewsDetails() {
    const { slug } = useParams()
    const { loading, error, data } = useQuery(GETNEWSITEM, {
        variables: { slug: slug }
    })
    const pageclassname = `${slug} location-details-image`;
    console.log(data)
    if (loading) return <p>Loading...</p>
    if (error) return <p>Error :(</p>
    
    return (
        <main className='wrapper news-items mg-top-50' id='main' tabindex="-1">
            <div className='container max-800 mg-auto'>
                <h1>{data.ccBanksNews.data[0].attributes.Title}</h1>
                <h5>{data.ccBanksNews.data[0].attributes.Date}</h5>
                <div className='news-story'><img src={data.ccBanksNews.data[0].attributes.Media.data[0].attributes.url} alt={data.ccBanksNews.data[0].attributes.Media.data[0].attributes.alternativeText} />{parse(data.ccBanksNews.data[0].attributes.MainStory)}</div>
            </div>
        </main>
    )
}