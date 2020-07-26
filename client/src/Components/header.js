import React, { useEffect, useContext } from 'react'
import logo from '../assets/images/groceryImage.png';
import UserContext from '../context/UserContext'

function Header() {
    const user = useContext(UserContext)

    useEffect(() => {
        // console.log(user)
    })

    return (
        <nav className="flex items-center justify-between flex-wrap p-6">
            <div className="flex items-center flex-shrink-0 text-white mr-6">
                <a className="" href="/"><img className="mx-auto card_element4 my-auto w-12" src={logo} alt="logo" /></a>
            </div>
            <div className="block lg:hidden md:hidden">
                <button className="flex items-center px-3 py-2 border rounded text-white border-white hover:text-white hover:border-white">
                    <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title>
                        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
                </button>
            </div>
            <div className="w-full block lg:w-auto md:w-auto sm:auto ">
                <div className="text-lg lg:flex-grow md:flex-grow sm:flew-grow">
                    <a href="/profile" className="transition duration-500 card_element hover:card_element2 focus:outline-none focus:shadow-outline text-gray-300 font-bold py-2 px-4 mx-2" type="submit">
                        Profile
              </a>
                    <a href="/about" className="transition duration-500 card_element hover:card_element2 focus:outline-none focus:shadow-outline text-gray-300 font-bold py-2 px-4 mx-2" type="submit">
                        About
              </a>
                    <button className="transition duration-500 card_element hover:card_element2 focus:outline-none focus:shadow-outline text-red-600 font-bold py-2 px-4 mx-2" type="submit">
                        Logout
              </button>
                </div>
            </div>
        </nav>
    )
}

export default Header
