import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter, FaHeart, FaCode, FaQuestionCircle, FaTags, FaUsers } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    platform: [
      { to: '/', label: 'Questions', icon: <FaQuestionCircle /> },
      { to: '/tags', label: 'Tags', icon: <FaTags /> },
      { to: '/chat', label: 'AI Assistant', icon: <FaCode /> },
    ],
    company: [
      { href: '#', label: 'About Us' },
      { href: '#', label: 'Privacy Policy' },
      { href: '#', label: 'Terms of Service' },
      { href: '#', label: 'Contact' },
    ],
    social: [
      { href: 'https://github.com', icon: <FaGithub />, label: 'GitHub' },
      { href: 'https://linkedin.com', icon: <FaLinkedin />, label: 'LinkedIn' },
      { href: 'https://twitter.com', icon: <FaTwitter />, label: 'Twitter' },
    ],
  };

  const stats = [
    { value: '10K+', label: 'Questions' },
    { value: '25K+', label: 'Answers' },
    { value: '5K+', label: 'Developers' },
  ];

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-b from-slate-900 to-slate-950"
    >
      {/* Stats Section */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-3 gap-8 mb-12">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-slate-400 text-sm mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand */}
            <div className="md:col-span-1">
              <Link to="/" className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">D</span>
                </div>
                <span className="text-xl font-bold text-white">DevDex</span>
              </Link>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                From Bugs to Brilliance. A Q&A platform for developers to discuss code, solve problems, and grow together.
              </p>
              <div className="flex gap-3">
                {footerLinks.social.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center justify-center text-slate-400 hover:text-white transition-all"
                    title={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Platform Links */}
            <div>
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <FaCode className="text-orange-500" /> Platform
              </h3>
              <ul className="space-y-3">
                {footerLinks.platform.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.to}
                      className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 text-sm"
                    >
                      {link.icon} {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <FaUsers className="text-orange-500" /> Company
              </h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-slate-400 hover:text-white transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-white font-semibold mb-4">Stay Updated</h3>
              <p className="text-slate-400 text-sm mb-4">
                Get the latest developer tips and platform updates.
              </p>
              <form className="space-y-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                />
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-medium rounded-lg hover:from-orange-600 hover:to-pink-600 transition-all text-sm"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm">
              © {currentYear} DevDex. All rights reserved.
            </p>
            <p className="text-slate-500 text-sm flex items-center gap-1">
              Made with <FaHeart className="text-red-500" /> by developers, for developers
            </p>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
