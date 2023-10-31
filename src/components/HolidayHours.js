import React from 'react'
import { useQuery, gql } from '@apollo/client'

const HOLIDAYS = gql`
    query getHolidays {
        holidaySchedules(sort: "id") {
            data {
              attributes {
                Date,
                DayOfWeek,
                HolidayName
              }
            }
        }
    }
`

export default function HolidayHours() {
  const { loading, error, data } = useQuery(HOLIDAYS)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  // console.log(data)

  return (
    <div className='holidays'>
        <div className='container'>
            <h2 className='center'>Holiday Schedule</h2>
            <hr className='green center' />
            <div className='holidays-container'>
            {data.holidaySchedules.data.map((holiday) => (
                <div className='holiday-item'>
                    <div className='h-date'>{holiday.attributes.Date}</div>
                    <div className='h-day'>{holiday.attributes.DayOfWeek}</div>
                    <div className='h-name'>{holiday.attributes.HolidayName}</div>
                </div>
            ))}
            </div>
        </div>
    </div>
  )
}
