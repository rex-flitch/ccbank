import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import MobileMenu from './MobileMenu'
import CookieConsentBanner from './CookieConsentBanner'
import parse from 'html-react-parser'

const CCSettings = gql`
query getHomepage {
  ccBankSettings {
    data {
      attributes {
        Logo {
          data {
            attributes {
              url
            }
          }
        }
        InstagramURL,
        TwitterURL,
        LinkedInURL,
        YouTubeURL
      }
    }
  }
  announcementBars {
    data {
      attributes {
        Announcement
      }
    }
  }
  mainNavigations {
    data {
      id,
      attributes {
        Title,
        Link,
        category_navigations {
          data {
            id,
            attributes {
              CategoryTitle,
              mega_menu_links(sort: "LinkTitle:asc") {
                data {
                  id,
                  attributes {
                    LinkTitle,
                    LinkURL,
                    main_navigations {
                      data {
                        attributes {
                          Title
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
`

export default function SiteHeader() {
  
  // useEffect(() => {
  //   const script = document.createElement('script');
  
  //   script.src = "https://embed.signalintent.com/js/embedded.js?org-guid=4159706a-6c26-49d4-bfac-58d685253c89";
  //   script.async = true;
  
  //   document.body.appendChild(script);
  
  //   return () => {
  //     document.body.removeChild(script);
  //   }
  // }, []);
  
  // const checkForSGI = () => {
  //   const sgiElement = document.getElementById('sgi');
  //   if (sgiElement) {
  //     // Your script here
  //     console.log('Element with ID "sgi" exists on the DOM');
  //     const script = document.createElement('script');

  //     script.src = "https://embed.signalintent.com/js/embedded.js?org-guid=4159706a-6c26-49d4-bfac-58d685253c89";
  //     script.async = true;

  //     document.body.appendChild(script);
  //   } else {
  //     setTimeout(checkForSGI, 5000); // Check again after 1 second
  //   }
  // };

  // useEffect(() => {
  //   checkForSGI(); // Start checking when the component mounts
  // }, []);
  const [isExpanded, setIsExpanded] = useState(false);

    // Event handler for mouse enter
    const handleMouseEnter = () => {
        setIsExpanded(true);
    };

    // Event handler for mouse leave
    const handleMouseLeave = () => {
        setIsExpanded(false);
    };

    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth', // For smooth scrolling
      });
    };
    useEffect(() => {
      // Define the script to be added
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.innerHTML = `
        (function(){var g=function(e,h,f,g){
          this.get=function(a){for(var a=a+"=",c=document.cookie.split(";"),b=0,e=c.length;b<e;b++){for(var d=c[b];" "==d.charAt(0);)d=d.substring(1,d.length);if(0==d.indexOf(a))return d.substring(a.length,d.length)}return null};
          this.set=function(a,c){var b="",b=new Date;b.setTime(b.getTime()+6048E5);b="; expires="+b.toGMTString();document.cookie=a+"="+c+b+"; path=/; "};
          this.check=function(){var a=this.get(f);if(a)a=a.split(":");else if(100!=e)"v"==h&&(e=Math.random()>=e/100?0:100),a=[h,e,0],this.set(f,a.join(":"));else return!0;var c=a[1];if(100==c)return!0;switch(a[0]){case "v":return!1;case "r":return c=a[2]%Math.floor(100/c),a[2]++,this.set(f,a.join(":")),!c}return!0};
          this.go=function(){if(this.check()){var a=document.createElement("script");a.type="text/javascript";a.src=g;document.body&&document.body.appendChild(a)}};
          this.start=function(){var t=this;"complete"!==document.readyState?window.addEventListener?window.addEventListener("load",function(){t.go()},!1):window.attachEvent&&window.attachEvent("onload",function(){t.go()}):t.go()};
        };
        try{(new g(100,"r","QSI_S_ZN_e37aqzn09qqtSjc","https://zne37aqzn09qqtsjc-ccbank.siteintercept.qualtrics.com/SIE/?Q_ZID=ZN_e37aqzn09qqtSjc")).start()}catch(i){}})();
      `;
      
      // Append the script to the body
      document.body.appendChild(script);
  
      // Optional: Cleanup function to remove the script when the component unmounts
      return () => {
        document.body.removeChild(script);
      };
    }, []); // Empty dependency array means this effect runs once on mount

  const { loading, error, data } = useQuery(CCSettings)

  if (loading) return <p></p>
  if (error) return <p>Error :(</p>
  
  //console.log(data)

  return (
    <div className="site-header">

      <a href="#main-nav" className="skip">Skip to main navigation</a>
      <a href="#main" className="skip">Skip to main content</a>
      <a href="#footer" className="skip">Skip to footer</a>
      <div id='ZN_e37aqzn09qqtSjc'></div>
      {/* <div className="scroll-to-top" role="button" tabindex="0" onClick={scrollToTop}>
        <span>↑</span>
      </div> */}
      <CookieConsentBanner />
      {data.announcementBars.data.length > 0 &&
      <div className='announcements-bar'>
        <div className='accouncement'>{parse(data.announcementBars.data[0].attributes.Announcement)}</div>
      </div>
      }
      <div className="top-header">
        <ul className="container">
          <li><Link to="https://secure4.billerweb.com/cap/inetSrv" target="_blank" rel="noopener noreferrer" aria-label="New Window"><img src="https://res.cloudinary.com/dk6kie30d/image/upload/v1698100903/solar_loan_payment_21222ecbfe.png" alt="Solar Loan Payment Icon"/>Solar Loan Payment</Link></li>
          <li><Link to="/careers"><img src="https://res.cloudinary.com/dk6kie30d/image/upload/v1698101083/careers_icon_b81ac6f9b1.png" alt="Careers Icon" />Careers</Link></li>
          <li><Link to="/locations"><img src="https://res.cloudinary.com/dk6kie30d/image/upload/v1698101186/locations_icon_772a372fd8.png" alt="Branch Locations Icon" />Branch Locations</Link></li>
          <li><Link to="/contact"><img src="https://res.cloudinary.com/dk6kie30d/image/upload/v1698267025/phone_icon_e6f6950c1e.png" alt="Contact Icon" />Contact</Link></li>
        </ul>
      </div>
      <div className='top-header-mobile'>
        <div className='mobile-account-login'><Link to="/account-login">ACCOUNT LOGIN</Link></div>
        <div className='mobile-top-right'><Link to="/locations"><img src="https://res.cloudinary.com/dk6kie30d/image/upload/v1698101186/locations_icon_772a372fd8.png" alt="Branch Locations Icon" /></Link></div>
      </div>
      <div className='main-header container'>
        <div className='logo-area'><Link to="/"><img src={data.ccBankSettings.data[0].attributes.Logo.data.attributes.url} alt='CC Bank Logo'/></Link></div>
        <nav className="main-nav" id="main-nav">
          <ul>
            {data.mainNavigations.data.map((nav) => (
              <li key={nav.id}><Link aria-haspopup="true" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} aria-expanded={isExpanded} to={nav.attributes.Link}>{nav.attributes.Title}</Link>
                <div className='mega-menu' id={`main_${nav.id}`}>
                {nav.attributes.category_navigations.data.map((subnav) => {
                  // Checking to see if the category is the Featured Cat and moving it to the first.
                  if (subnav.attributes.CategoryTitle === 'Featured') {
                    return (
                      <div key={subnav.id} className='col first' id={`cat_${subnav.id}`}>
                        <h4>{subnav.attributes.CategoryTitle}</h4>
                        <hr className='orange'></hr>
                        <ul>
                        {subnav.attributes.mega_menu_links.data.map((links) => (
                          //Only show the links that belong in that category
                          links.attributes.main_navigations.data[0].attributes.Title === nav.attributes.Title && (
                            <li key={links.id}><Link reloadDocument to={links.attributes.LinkURL}>{links.attributes.LinkTitle}</Link></li>
                          )))}
                        </ul>
                        {/* <div className='btn-white'><Link to="https://ccbankutah.ebanking-services.com/Nubi/Trace/Enroll.aspx" target="_blank" rel="noopener noreferrer">Open Account</Link></div> */}
                      </div>
                    )
                  } else {
                    return (
                      <div key={subnav.id} className='col' id={`cat_${subnav.id}`}>
                        <h4>{subnav.attributes.CategoryTitle}</h4>
                        <hr className='green'></hr>
                        <ul>
                        {subnav.attributes.mega_menu_links.data.map((links) => (
                          links.attributes.main_navigations.data[0].attributes.Title === nav.attributes.Title && (
                            links.attributes.LinkTitle === "Leadership Team" ? (
                              <li key={links.id}><Link reloadDocument to={{pathname: links.attributes.LinkURL, hash: "#team"}}>{links.attributes.LinkTitle}</Link></li>
                            ) : (
                              <li key={links.id}><Link reloadDocument to={links.attributes.LinkURL}>{links.attributes.LinkTitle}</Link></li>
                            )
                          )))}
                        </ul>
                      </div>
                    )
                  }
                })}
                </div>
              </li>
            ))}
          </ul>
        </nav>
        <MobileMenu />
      </div>
    </div>
  )
}
