import { motion } from "framer-motion";
import logo from '../assets/images/logo.png'; 

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="py-4 text-white bg-black">
        <div className="container px-4 mx-auto">
          <div className="flex flex-wrap justify-between -mx-4">
            <motion.div 
              className="w-full px-4 my-4 xl:w-1/5"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <a href="/" className="block w-56 mb-10">
                <svg version="1.1" viewBox="0 0 3368 512" xmlns="http://www.w3.org/2000/svg">
                  <g fill="none" fillRule="evenodd">
                    <g transform="translate(0 -75)">
                      <g transform="translate(0 75)">
                        <img src={logo} alt="DevDex Logo" className="w-20 mr-2 h-15" />
                      </g>
                      <text fill="white" fontFamily="Nunito-Bold, Nunito" fontSize="512" fontWeight="bold">
                        <tspan x="654" y="518">DevDex</tspan>
                      </text>
                    </g>
                  </g>
                </svg>
              </a>
              <p className="text-justify">
                DevDex - From Bugs to Brilliance is a platform for coders to discuss errors encountered in code and the problems they face. It features text-to-speech functionality and an AI chatbot to assist users.
              </p>
            </motion.div>

            <motion.div 
              className="w-full px-4 my-4 sm:w-auto"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div>
                <h2 className="inline-block pb-4 mb-4 text-2xl border-b-4 border-gray-500">Company</h2>
              </div>
              <ul className="leading-8">
                {['About Us', 'Terms & Conditions', 'Privacy Policy', 'Contact Us'].map((item, index) => (
                  <motion.li 
                    key={index}
                    whileHover={{ scale: 1.1 }}
                  >
                    <a href="#" className="hover:text-gray-400">{item}</a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div 
              className="w-full px-4 my-4 sm:w-auto"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7 }}
            >
              <div>
                <h2 className="inline-block pb-4 mb-4 text-2xl border-b-4 border-gray-500">Blog</h2>
              </div>
              <ul className="leading-8">
                {[
                  'Getting Started With HTML and CSS',
                  'What Is Flex And When to Use It?',
                  'How TailwindCSS Can Help Your Productivity?',
                  '5 Tips to Make Responsive Website',
                  'See More'
                ].map((item, index) => (
                  <motion.li 
                    key={index}
                    whileHover={{ scale: 1.1 }}
                  >
                    <a href="#" className="hover:text-gray-400">{item}</a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div 
              className="w-full px-4 my-4 sm:w-auto xl:w-1/5"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div>
                <h2 className="inline-block pb-4 mb-4 text-2xl border-b-4 border-gray-500">Connect With Us</h2>
              </div>
              {[
                { name: 'Linkedin', link: 'https://www.linkedin.com/in/chamara-vishwajith-09b561242?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app' },
                { name: 'Facebook', link: 'https://www.facebook.com/vira.kuma?mibextid=ZbWKwL' },
                { name: 'Medium', link: 'https://medium.com/@sch.chamara' }
              ].map((item, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ scale: 1.1 }}
                >
                  <a href={item.link} className="hover:text-gray-400">{item.name}</a>
                </motion.li>
              ))}
            </motion.div>
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
              Made with Advanced Technology
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  )
}

export default Footer;
