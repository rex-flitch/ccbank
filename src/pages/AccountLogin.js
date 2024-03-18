import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import parse from 'html-react-parser'
import AccountLogin from '../components/AccountLogin'

export default function AchDebitAuthorization() {
    return (
        <main className='wrapper biller-solutions' id='main' tabindex="-1">
            <div className='account-login bg-grey pd-tb-50'>
                <div className='container'>
                    <AccountLogin /> 
                </div>
            </div>
        </main>
      )
    }