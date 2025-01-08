import React,{ useState } from 'react'

const Navbar = () => {
    const x =1
  const Links =[
      {
        value:x,
        domainName:"Home",
        domain:"/",
        
      },
      {
        value:x+1,
        domainName:"Cart",
        domain:"/cart",
        
      },

      {
        value:x+2,
        domainName:"Profile",
        domain:"/profile",
        
      },

      {
        value:x+3,
        domainName:"Orders",
        domain:"/orders",
        
      },
  ];

  return (
    <div className='shadow-md w-full fixed top-0 left-0'>
      <div>
        <div>
          <div>

          </div>
        </div>
      </div>
      <div className='md:flex bg-white items-center py-3 md:px-10 justify-between px-7'>
        
      <div className='font-bold text-2xl  text-gray-900'>
        Online Retail
      </div>
      <div className={`md:flex  md:pb-0 pb-12  md:static bg-white md:z-auto z-[-1] absolute left-0 w-fdivl md:w-auto md:pl-0 pl-9 md:items-center transition-all duration-500 ease-in top-20 `}>
        {
          Links.map((link)=>(
            <div key={link.domainName} className=' text-xl hover:bg-gray-200 hover:rounded-xl hover:px-3 md:ml-8  md:my-0 my-7'>
              <div>
                <div>
                  </div>
                </div>
              <a href={link.domain} className="text-gray-600 hover:text-gray-400 duration-500">{link.domainName}</a>
            </div>
          ))
        }     
      </div>
      
      </div>
    </div>
  )
}



export default Navbar