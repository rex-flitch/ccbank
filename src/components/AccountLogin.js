import React, { useState } from 'react';
//import { useQuery, gql } from '@apollo/client'
import { Link } from 'react-router-dom'

export default function AccountLogin() {

  const [isActive1, setIsActive1] = useState(true); // Set initial state to true
  const [isActive2, setIsActive2] = useState(false);

  const toggleClass = (divNumber) => {
    if (divNumber === 1) {
      setIsActive1(true);
      setIsActive2(false);
    } else if (divNumber === 2) {
      setIsActive1(false);
      setIsActive2(true);
    }
  };

  return (
    <div className='login-containter'>
        <div className="accordion-area">
            <div className="accordion-wrapper">

                <div className={`accordion-item personal-banking ${isActive1 ? 'active' : 'inactive'}`}>
                    <div className="accordion-title" role="button" tabindex="0" onClick={() => toggleClass(1)}>Personal Banking</div>
                    <div className={`accordion-body ${isActive1 ? 'active' : 'inactive'}`}>
                        <form className="login-fields" action="https://cibng.ibanking-services.com/EamWeb/Remote/RemoteLoginAPI.aspx? FIORG=18U&orgId=18U_124302927&FIFID=124302927&brand=18U_124302927&appId=ceb" method="POST"> 
                            <input className="login-input" name="_textBoxUserId" type="text" maxLength="32" id="_textBoxUserId" placeholder="User ID" aria-label="User ID"/> 
                            <input name="_textBoxCompanyId" type="hidden" maxLength="26" id="_textBoxCompanyId" value="18U_124302927"/> 
                            <input name="_buttonContinue" type="submit" value="Sign In" id="_buttonContinue_1" className="login-btn-1" /> 
                        </form>
                        <div className="login-buttons">
                            <ul className="login-button-group">
                            <li className="pw-reset-link"><a href="https://cibng.ibanking-services.com/EamWeb/Remote/RemoteLoginApi.aspx?orgId=18U_124302927&FIFID=124302927&brand=18U_124302927&appId=CeB&FIORG=18U&startPage=ForgotUserId" target="_blank" rel="noreferrer" className="reset-link" aria-label='New Window'>Forgot  ID/Password?</a> </li>
                            </ul>
                        </div>
                        <div className='account-button'><Link to='https://b124302927.flex.online-banking-services.com/cuFlexEnrollment/#!/selfEnrollment/home' target="_blank" rel="noopener noreferrer" aria-label='New Window'>Enroll in Personal Banking</Link></div>
                    </div>
                </div>

                <div className={`accordion-item commercial-banking ${isActive2 ? 'active' : 'inactive'}`}>
                    <div className="accordion-title" role="button" tabindex="0" onClick={() => toggleClass(2)}>Business Banking</div>
                    <div className={`accordion-body ${isActive2 ? 'active' : 'inactive'}`}>
                        <form className="login-fields" action="https://ccbankutah.ebanking-services.com/EamWeb/Remote/RemoteLoginApi.aspx?appID=beb&brand=ccbankutah" method="POST"> 
                            <span className="cid-messg">If you don’t have the company ID, please call 801-763-5066</span>
                            <input className="login-input" name="_textBoxCompanyId" type="text" maxLength="26" id="_textBoxCompanyId" placeholder="Company ID" aria-label="Company ID"/>
                            <input className="login-input" name="_textBoxUserId" type="text" maxLength="32" id="_textBoxUserId" placeholder="User ID" aria-label="User ID"/> 
                            <input name="_buttonContinue" type="submit" value="Sign In" id="_buttonContinue_2" className="remoteFrame button login-btn-1" /> 
                        </form> 
                        <div className='account-button'><Link to='https://ccbankutah.ebanking-services.com/Nubi/Trace/Enroll.aspx' target="_blank" rel="noopener noreferrer" aria-label='New Window'>Enroll in Business Banking</Link></div>
                    </div>
                </div>

                {/* <div className="accordion-item credit-card">
                    <div className='accordion-title cclogin'><a href="https://www.mycardstatement.com/#/">Credit Card Login</a></div>
                </div> */}

            </div>
        </div>
    </div>
  )
}