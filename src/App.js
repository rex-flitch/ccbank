import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

// page & layout imports
import Homepage from './pages/Homepage'
import About from './pages/About'
import AboutOverview from './pages/AboutOverview'
import Locations from './pages/Locations'
import Careers from './pages/Careers'
import Rates from './pages/Rates'
import LocationDetails from './pages/LocationDetails'
import BusinessBanking from './pages/BusinessBanking'
import Merchant from './pages/MerchantServices'
import Construction from './pages/ConstructionLotLoans'
import LoanOfficers from './pages/LoanOfficers'
import Heloc from './pages/Heloc'
import CommercialIndustrialLoans from './pages/CommercialIndustrialLoans'
import SBALoans from './pages/SBALoans'
import TeamMemberDetails from './pages/TeamMemberDetails'
import Calc from './pages/Calc'
import IntraFi from './pages/IntraFi'
import News from './pages/News'
import NewsDetails from './pages/NewsDetails'
import CalculatorDetails from './pages/CalculatorDetails'
import AuthorizationAchDebits from './pages/AuthorizationAchDebits'
import AuthorizationStorage from './pages/AuthorizationStorage'
import AuthorizationStorageDC from './pages/AuthorizationStorageDC'
import EppTermsConditions from './pages/EppTermsConditions'
import PrivacyPolicy from './pages/PrivacyPolicy'
import OnlinePrivacyPolicy from './pages/OnlinePrivacyPolicy'
import SecurityStatements from './pages/SecurityStatements'
import AchDebitAuthorization from './pages/AchDebitAuthorization'
import BusinessChecking from './pages/BusinessChecking'
import PersonalBanking from './pages/PersonalBanking'
import PersonalBankingLanding from './pages/PersonalBankingLanding'
import DepositAccounts from './pages/DepositAccounts'
import OppLoans from './pages/OppLoans'
import CcConnect from './pages/CcConnect'
import CcFlow from './pages/CcFlow'
import ChoiceCash from './pages/ChoiceCash'
import Lendly from './pages/Lendly'
import Rise from './pages/Rise'
import Mdg from './pages/Mdg'
import Today from './pages/Today'
import Xact from './pages/Xact'
import Partners from './pages/Partners'
import OnlineAccountOpening from './pages/OnlineAccountOpening'
import FinancialLibrary from './pages/FinancialLibrary'
import Resources from './pages/Resources'
import SelfDirectedIRA from './pages/SelfDirectedIRA'
import Zelle from './pages/Zelle'
import BusinessManagerConnectAccount from './pages/BusinessManagerConnectAccount'
import PersonalLoans from './pages/PersonalLoans'
import FinTechPartnershipsFAQ from './pages/FinTechPartnershipsFAQ'
import Services from './pages/Services'
import SiteMap from './pages/SiteMap'
import CookiePolicy from './pages/CookiePolicy'
import TextMessageSmsTermsOfUse from './pages/TextMessageSmsTermsOfUse'
import AccessAgreement from './pages/AccessAgreement'
import AccessBusinessAgreement from './pages/AccessBusinessAgreement'
import ExternalFundsDisclosure from './pages/ExternalFundsDisclosure'
import LoanPaymentDisclosure from './pages/LoanPaymentDisclosure'
import OutOfBand from './pages/OutOfBand'
import AccountLogin from './pages/AccountLogin'
import SiteHeader from './components/SiteHeader'
import SiteFooter from './components/SiteFooter'
import useExternalLinkInterceptor from './hooks/useExternalLinkInterceptor'
import ConfirmationModal from './components/ConfirmationModal';
import TagManager from 'react-gtm-module'

const tagManagerArgs = {
  gtmId: 'GTM-WWQ497TF'
}
TagManager.initialize(tagManagerArgs);

// apollo client
const client = new ApolloClient({
  uri: 'https://whispering-hamlet-41063-0292a439d9c6.herokuapp.com/graphql',
  // uri: 'http://localhost:1337/graphql',
  cache: new InMemoryCache(),
  debug: true,
  tracing: true,
  introspection: true,
  playground: true,
  connectToDevTools: true
})

function App() {
  const { showModal, handleConfirm, setShowModal } = useExternalLinkInterceptor()
  // Other state and logic for handling the external link interception.
  return (
      <Router>
        <ApolloProvider client={client}>
          <div className="App">
            <SiteHeader />
            <Routes>
              <Route exact path="/" element={<Homepage />}/>
              <Route path="/about" element={<About slug="about"/>}/>
              <Route path="/about-overview" element={<AboutOverview />}/>
              <Route path="/locations" element={<Locations />}/>
              <Route path="/locations/:slug" element={<LocationDetails />}/>
              <Route path="/careers" element={<Careers />}/>
              <Route path="/rates" element={<Rates key={new Date()} />}/>
              <Route path="/business-banking" element={<BusinessBanking />}/>
              <Route path="/merchant-services" element={<Merchant />}/>
              <Route path="/construction-lot-loans" element={<Construction />}/>
              <Route path="/loan-officers" element={<LoanOfficers />}/>
              <Route path="/heloc" element={<Heloc />}/>
              <Route path="/commercial-industrial-loans" element={<CommercialIndustrialLoans />}/>
              <Route path="/sbaloans" element={<SBALoans />}/>
              <Route path="/team/:slug" element={<TeamMemberDetails />}/>
              <Route path="/calc" element={<Calc />}/>
              <Route path="/calculator/:slug" element={<CalculatorDetails />}/>
              <Route path="/intrafi" element={<IntraFi />}/>
              <Route path="/news" element={<News />}/>
              <Route path="/news/:slug" element={<NewsDetails />}/>
              <Route path="/biller-solutions/authorization-ach-debits" element={<AuthorizationAchDebits />}/>
              <Route path="/biller-solutions/authorization-storage-of-bank-information" element={<AuthorizationStorage />}/>
              <Route path="/biller-solutions/authorization-cc-payments" element={<AuthorizationStorageDC />}/>
              <Route path="/biller-solutions/epp-terms-and-conditions" element={<EppTermsConditions />}/>
              <Route path="/biller-solutions/ach-debit-authorization" element={<AchDebitAuthorization />}/>
              <Route path="/privacy-policy" element={<PrivacyPolicy />}/>
              <Route path="/online-privacy-policy" element={<OnlinePrivacyPolicy />}/>
              <Route path="/biller-solutions/security-statements" element={<SecurityStatements />}/>
              <Route path="/business-checking" element={<BusinessChecking />}/>
              <Route path="/personal-banking-solutions" element={<PersonalBanking />}/>
              <Route path="/personal-banking" element={<PersonalBankingLanding />}/>
              <Route path="/deposit-accounts" element={<DepositAccounts />}/>
              <Route path="/ccbank-partners/opploans" element={<OppLoans />}/>
              <Route path="/ccbank-partners/ccconnect" element={<CcConnect />}/>
              <Route path="/ccbank-partners/ccflow" element={<CcFlow />}/>
              <Route path="/ccbank-partners/choice-cash" element={<ChoiceCash />}/>
              <Route path="/ccbank-partners/integracredit" element={<Lendly />}/>
              <Route path="/ccbank-partners/rise" element={<Rise />}/>
              <Route path="/ccbank-partners/mdg" element={<Mdg />}/>
              <Route path="/ccbank-partners/braviant" element={<Today />}/>
              <Route path="/ccbank-partners/xact" element={<Xact />}/>
              <Route path="/online-account-opening" element={<OnlineAccountOpening />}/>
              <Route path="/financial-library" element={<FinancialLibrary />}/>
              <Route path="/ccbank-partners" element={<Partners />}/>
              <Route path="/resources" element={<Resources />}/>
              <Route path="/self-directed-ira" element={<SelfDirectedIRA />}/>
              <Route path="/zelle" element={<Zelle />}/>
              <Route path="/services" element={<Services />}/>
              <Route path="/fintech-partnerships-faq" element={<FinTechPartnershipsFAQ />}/>
              <Route path="/money-market" element={<BusinessManagerConnectAccount />}/>
              <Route path="/personal-loans" element={<PersonalLoans />}/>
              <Route path="/site-map" element={<SiteMap />}/>
              <Route path="/cookie-policy" element={<CookiePolicy />}/>
              <Route path="/text-message-sms-terms-of-use" element={<TextMessageSmsTermsOfUse />}/>
              <Route path="/access-business-agreement" element={<AccessBusinessAgreement />}/>
              <Route path="/access-agreement" element={<AccessAgreement />}/>
              <Route path="/external-funds-disclosure" element={<ExternalFundsDisclosure />}/>
              <Route path="/loan-payment-disclosure" element={<LoanPaymentDisclosure />}/>
              <Route path="/out-of-band-what-you-need-to-know" element={<OutOfBand />}/>
              <Route path="/account-login" element={<AccountLogin />}/>
            </Routes>
            <SiteFooter />
            <ConfirmationModal 
              isOpen={showModal} 
              onConfirm={handleConfirm} 
              onCancel={() => setShowModal(false)}
            />
          </div>
        </ApolloProvider>
      </Router>
  );
}

export default App;
