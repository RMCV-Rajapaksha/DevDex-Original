import React from 'react'

const ProfilePosts = () => {
    return (
        <div className="w-full flex mt-8 space-x-4">
          {/* Left */}
    <div className="w-[35%]  h-[200px] flex justify-center items-center">
      <img src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg" alt="" className="h-full w-full object-cover"/>
    
    </div>
       {/* Right */}
       <div className="flex flex-col w-[65%]">
        <h1 className="text-xl font-bold md:-2 mb-1 md:text-2xl">
          Title
        </h1>
        <div className="flex mb-2 text-sm font-semibold items-center justify-between text-gray-500 space-x-4 md:mb-4">
          <p>@snehasisdev</p>
          <div className="flex space-x-2">
            <p>16/06/2024</p>
            <p>16:45</p>
          </div>
        </div>
        <p className="text-sm font-medium md:text-base">
        vIn today's fast-paced world, people oftenshare photos and videos of their journeys, but the lack of a centralized platform for sharing these visual memories can hinder communication, especially for non-tech-savvy family members who may struggle to switch between social media platforms or use different networks.
    Conventional event photography often relies on a single photographer or small crew, resulting in missed opportunities and high costs. A more inclusive, affordable solution encourages participants to contribute their images and films, providing a dynamic view of the event. This platform creates a collaborative, immersive experience that satisfies user preferences and makes sharing simple for those unfamiliar with social networking platforms.
    A platform that integrates rete three introduction pages for this mobile app
    
    
    </p>
    </div>
        </div>
      )
    }
    

export default ProfilePosts