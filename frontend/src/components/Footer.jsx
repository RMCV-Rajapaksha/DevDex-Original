const Footer = () => {
  return (
    <footer>
      <div className="py-4 text-white bg-black">
        <div className="container px-4 mx-auto">
          <div className="flex flex-wrap justify-between -mx-4">
            <div className="w-full px-4 my-4 xl:w-1/5">
              <a href="/" className="block w-56 mb-10">
                <svg version="1.1" viewBox="0 0 3368 512" xmlns="http://www.w3.org/2000/svg">
                  <g fill="none" fillRule="evenodd">
                    <g transform="translate(0 -75)">
                      <g transform="translate(0 75)">
                        {/* Your SVG Paths */}
                      </g>
                      <text fill="white" fontFamily="Nunito-Bold, Nunito" fontSize="512" fontWeight="bold">
                        <tspan x="654" y="518">Tailwindow</tspan>
                      </text>
                    </g>
                  </g>
                </svg>
              </a>
              <p className="text-justify">
                DevDex - From Bugs to Brilliance is a platform for coders to discuss errors encountered in code and the problems they face. It features text-to-speech functionality and an AI chatbot to assist users.
              </p>
            </div>

            <div className="w-full px-4 my-4 sm:w-auto">
              <div>
                <h2 className="inline-block pb-4 mb-4 text-2xl border-b-4 border-gray-500">Company</h2>
              </div>
              <ul className="leading-8">
                <li><a href="#" className="hover:text-gray-400">About Us</a></li>
                <li><a href="#" className="hover:text-gray-400">Terms &amp; Conditions</a></li>
                <li><a href="#" className="hover:text-gray-400">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-gray-400">Contact Us</a></li>
              </ul>
            </div>
            <div className="w-full px-4 my-4 sm:w-auto">
              <div>
                <h2 className="inline-block pb-4 mb-4 text-2xl border-b-4 border-gray-500">Blog</h2>
              </div>
              <ul className="leading-8">
                <li><a href="#" className="hover:text-gray-400">Getting Started With HTML and CSS</a></li>
                <li><a href="#" className="hover:text-gray-400">What Is Flex And When to Use It?</a></li>
                <li><a href="#" className="hover:text-gray-400">How TailwindCSS Can Help Your Productivity?</a></li>
                <li><a href="#" className="hover:text-gray-400">5 Tips to Make Responsive Website</a></li>
                <li><a href="#" className="hover:text-gray-400">See More</a></li>
              </ul>
            </div>
            <div className="w-full px-4 my-4 sm:w-auto xl:w-1/5">
              <div>
                <h2 className="inline-block pb-4 mb-4 text-2xl border-b-4 border-gray-500">Connect With Us</h2>
              </div>
              <li><a href="https://www.linkedin.com/in/chamara-vishwajith-09b561242?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" className="hover:text-gray-400">Linkedin</a></li>
                <li><a href="https://www.facebook.com/vira.kuma?mibextid=ZbWKwL" className="hover:text-gray-400">Facebook</a></li>
                <li><a href="https://medium.com/@sch.chamara" className="hover:text-gray-400">Medium</a></li>
            </div>
          </div>
        </div>
      </div>
      <div className="py-4 text-white bg-black">
        <div className="container px-4 mx-auto">
          <div className="flex flex-wrap justify-between -mx-4">
            <div className="w-full px-4 text-center sm:w-auto sm:text-left">
              Copyright © 2024
              <script>{`new Date().getFullYear() > 2020 && document.write("- " + new Date().getFullYear())`}</script>- 2026
              DevDex. All Rights Reserved.
            </div>
            <div className="w-full px-4 text-center sm:w-auto sm:text-left">
              Made with ❤️ by Tailwindow.
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
