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
import SiteHeader from './components/SiteHeader'
import SiteFooter from './components/SiteFooter'

// apollo client
const client = new ApolloClient({
  uri: 'https://whispering-hamlet-41063-0292a439d9c6.herokuapp.com/graphql',
  //uri: 'http://localhost:1337/graphql',
  cache: new InMemoryCache()
})

function App() {
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
              <Route path="/rates" element={<Rates />}/>
              <Route path="/business-banking" element={<BusinessBanking />}/>
              <Route path="/merchant-services" element={<Merchant />}/>
              <Route path="/construction-lot-loans" element={<Construction />}/>
              <Route path="/loan-officers" element={<LoanOfficers />}/>
              <Route path="/heloc" element={<Heloc />}/>
              <Route path="/commercial-industrial-loans" element={<CommercialIndustrialLoans />}/>
              <Route path="/sbaloans" element={<SBALoans />}/>
            </Routes>
            <SiteFooter />
          </div>
        </ApolloProvider>
      </Router>
  );
}

export default App;
