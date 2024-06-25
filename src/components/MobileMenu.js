import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'

const MOBILEMENU = gql`
query getMobileMenu {
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

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  const toggleSubmenu = (submenuId) => {
    if (openSubmenu === submenuId) {
      setOpenSubmenu(null); // Close the submenu if it's already open
    } else {
      setOpenSubmenu(submenuId); // Open the clicked submenu
    }
  };

  const backToMain = () => {
    setOpenSubmenu(null); // Go back to the main menu
  };
  const Submenu = ({ isOpen, children, onBack, onClose }) => {
    return (
      <div className={`submenu ${isOpen ? 'open' : ''}`}>
        <button onClick={onBack} className="back-btn">&larr; Back</button>
        {children}
      </div>
    );
  };
  const { loading, error, data } = useQuery(MOBILEMENU)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>
  let counter = 0
  const resetcounter = () => {
    counter = 0
  }
  const addcounter = () => {
    counter = counter + 1
  }
  //console.log(data)

  return (
    <nav className="mobile-menu">
        <div className="hamburger-icon" onClick={() => setIsOpen(!isOpen)}>
            <div></div>
            <div></div>
            <div></div>
        </div>
        <div className={`menu ${isOpen ? 'open' : ''}`}>
        <button  onClick={() => setIsOpen(!isOpen)} className="close-btn">X</button>
          <ul className='top-level'>
            {data.mainNavigations.data.map((nav) => (
              <li key={nav.id} className='top-level-li'><Link aria-haspopup="true" className='top-level-link right-arrow' to={nav.attributes.Link} onClick={() => toggleSubmenu(nav.id)}>{nav.attributes.Title}</Link>
                <Submenu  isOpen={openSubmenu === nav.id}
                onBack={backToMain}>
                {nav.attributes.category_navigations.data.map((subnav) => {
                  // Checking to see if the category is the Featured Cat and moving it to the first.
                  if (subnav.attributes.CategoryTitle === 'Featured') {
                    return (
                      <div key={subnav.id} className='col first' id={`cat_${subnav.id}`}>
                        <h4>{subnav.attributes.CategoryTitle}</h4>
                        <hr className='white'></hr>
                        <ul>
                        {subnav.attributes.mega_menu_links.data.map((links) => (
                          //Only show the links that belong in that category
                          links.attributes.main_navigations.data[0].attributes.Title === nav.attributes.Title && (
                            <li key={links.id}><Link reloadDocument to={links.attributes.LinkURL}  onClick={() => setIsOpen(!isOpen)}>{links.attributes.LinkTitle}</Link></li>
                          )))}
                        </ul>
                        {nav.attributes.Title === 'Business' &&
                          <div className='btn-white-nav'><Link to="https://ccb.cloud.processmaker.net/webentry/12/business_account" target="_blank" rel="noopener noreferrer">Open Account</Link></div>
                        }
                        {nav.attributes.Title === 'Personal' &&
                          <div className='btn-white-nav'><Link to="https://ccb.cloud.processmaker.net/webentry/22/customer_request" target="_blank" rel="noopener noreferrer">Open Account</Link></div>
                        }
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
                
                </Submenu>
                {addcounter()}
              </li>
            ))}
            <li className='top-level-li'><Link className='top-level-link' to="https://secure4.billerweb.com/cap/inetSrv" onClick={() => setIsOpen(!isOpen)}>Solar Loan Payment</Link></li>
            <li className='top-level-li'><Link className='top-level-link' to="/careers" onClick={() => setIsOpen(!isOpen)}>Careers</Link></li>
            <li className='top-level-li'><Link className='top-level-link' to="/locations" onClick={() => setIsOpen(!isOpen)}>Branch Locations</Link></li>
            <li className='top-level-li'><Link className='top-level-link' to="/contact" onClick={() => setIsOpen(!isOpen)}>Contact</Link></li>
          </ul>
        </div>
    </nav>
  )
}
