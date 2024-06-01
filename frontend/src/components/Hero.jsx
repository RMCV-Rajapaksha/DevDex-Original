import React from 'react';

function Hero() {
  return (
    <div className="w-screen h-screen ms:h-[80vh] md:h-[80vh] bg-black">
      <div className="max-w-5xl pt-16 mx-auto sm:pt-24">
        <div className="space-y-8 lg:space-y-0 lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="px-6 sm:text-center md:mx-auto md:max-w-2xl lg:col-span-6 lg:flex lg:items-center lg:text-left">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="space-y-2">
                  <span className="rounded-full uppercase bg-pink-500 px-3 py-0.5 text-sm font-semibold leading-5 text-white">
                    Beta Access
                  </span>
                  <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
                    Welcome to <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-600">DevDex</span>
                    <br />
                    Your Coding Problem Solver
                  </h1>
                </div>
                <p className="text-base text-gray-200 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                  Join a community of developers, solve coding problems, and get instant help from our AI-powered chatbot.
                </p>
              </div>
              <div className="border-t border-gray-700"></div>
              <div className="flex items-center space-x-4 text-white">
                <div className="flex items-center space-x-2">
                  <div className="flex flex-shrink-0 -space-x-1">
                    <img loading="lazy" width="400" height="400" decoding="async"
                      className="w-6 h-6 rounded-full max-w-none ring-2 ring-white"
                      style={{ color: "transparent" }} src="https://randomuser.me/api/portraits/men/29.jpg" alt="User 1" />
                    <img loading="lazy" width="400" height="400" decoding="async"
                      className="w-6 h-6 rounded-full max-w-none ring-2 ring-white"
                      style={{ color: "transparent" }} src="https://randomuser.me/api/portraits/men/90.jpg" alt="User 2" />
                    <img loading="lazy" width="100" height="100" decoding="async"
                      className="w-6 h-6 rounded-full max-w-none ring-2 ring-white"
                      style={{ color: "transparent" }} src="https://randomuser.me/api/portraits/men/75.jpg" alt="User 3" />
                    <img loading="lazy" width="200" height="200" decoding="async"
                      className="w-6 h-6 rounded-full max-w-none ring-2 ring-white"
                      style={{ color: "transparent" }} src="https://randomuser.me/api/portraits/men/5.jpg" alt="User 4" />
                  </div>
                  <span className="flex-shrink-0 text-xs font-medium leading-5">+15</span>
                </div>
                <div className="h-4 border-l border-gray-700"></div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-yellow-500 fill-current" viewBox="0 0 24 24">
                    <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"></path>
                  </svg>
                  <svg className="w-4 h-4 text-yellow-500 fill-current" viewBox="0 0 24 24">
                    <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"></path>
                  </svg>
                  <svg className="w-4 h-4 text-yellow-500 fill-current" viewBox="0 0 24 24">
                    <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"></path>
                  </svg>
                  <svg className="w-4 h-4 text-yellow-500 fill-current" viewBox="0 0 24 24">
                    <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"></path>
                  </svg>
                  <svg className="w-4 h-4 text-yellow-500 fill-current" viewBox="0 0 24 24">
                    <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"></path>
                  </svg>
                </div>
                <div className="h-4 border-l border-gray-700"></div>
                <a href="" target="_blank" rel="noopener noreferrer">
                  <img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1&theme=light" className="w-32 h-8 md:w-48 md:h-12 lg:w-64 lg:h-16" width="250" height="54" alt="Product Hunt Badge" />
                </a>
              </div>
            </div>
          </div>
          <div className="flex items-center w-full col-span-6">
            <div className="flex items-center w-full max-w-2xl col-span-6 px-6 mx-auto h-96 lg:h-full">
              <div style={{ width: "100%", height: "100%" }}>
                <div style={{ width: "100%", height: "100%" }}>
                  <iframe frameBorder="0" allowFullScreen="1"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    width="100%" height="100%"
                    src="https://www.youtube.com/embed/mr15Xzb1Ook?autoplay=0&amp;mute=0&amp;controls=0&"
                    id="widget2">
                  </iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
