import React from 'react'
import { footerStyles } from '../assets/dummyStyles'
import logo from '../assets/logo.png'
import { Stethoscope, Activity, Phone, Mail, MapPin, ArrowRight, Send } from 'lucide-react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Doctors", href: "/doctors" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
    { name: "Appointments", href: "/appointments" },
  ];

  const services = [
    { name: "Blood Pressure Check", href: "/services" },
    { name: "Blood Sugar Test", href: "/services" },
    { name: "Full Blood Count", href: "/services" },
    { name: "X-Ray Scan", href: "/services" },
    { name: "Blood Sugar Test", href: "/services" },
  ];

  const socialLinks = [
    {
      Icon: FaFacebook,
      color: footerStyles.facebookColor,
      name: "Facebook",
      href: "https://www.facebook.com/imlucky.boyalamin/",
    },
    {
      Icon: FaTwitter,
      color: footerStyles.twitterColor,
      name: "Twitter",
      href: "https://x.com/MdAlami86729847",
    },
    {
      Icon: FaInstagram,
      color: footerStyles.instagramColor,
      name: "Instagram",
      href: "https://www.instagram.com/hosain7339/",
    },
    {
      Icon: FaLinkedin,
      color: footerStyles.linkedinColor,
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/md-alamin-hossain-60718b219/",
    },
    {
      Icon: FaYoutube,
      color: footerStyles.youtubeColor,
      name: "YouTube",
      href: "https://www.youtube.com/@mdalaminhossain3281",
    },
  ];

  return (
    <footer className={footerStyles.footerContainer}>
      <div className={footerStyles.floatingIcon1}>
        <Stethoscope className={footerStyles.stethoscope} />
      </div>

      <div
        className={footerStyles.floatingIcon2}
        style={{
          animationDelay: "3s",
        }}
      >
        <Activity className={footerStyles.activity} />
      </div>

      <div className={footerStyles.mainContent}>
        <div className={footerStyles.gridContainer}>

          <div className={footerStyles.companySection}>
            <div className={footerStyles.logoContainer}>
              <div className={footerStyles.logoWrapper}>
                <div className={footerStyles.logoImageContainer}>
                  <img
                    src={logo}
                    alt="logo"
                    className={footerStyles.logoImage}
                  />
                </div>
              </div>

              <div>
                <h2 className={footerStyles.companyName}>Medicare</h2>

                <p className={footerStyles.companyTagline}>
                  Healthcare Solution
                </p>
              </div>
            </div>

            <p className={footerStyles.companyDescription}>
              Your trusted partner in healthcare innovation.we are committed to
              providing exceptional care to our patients and helping them lead
              healthy lives.
            </p>

            <div className={footerStyles.contactContainer}>
              <div className={footerStyles.contactIconWrapper}>
                <Phone className={footerStyles.contactIcon} />
              </div>

              <span className={footerStyles.contactText}>
                +8801323156155
              </span>
            </div>

            <div className={footerStyles.contactContainer}>
              <div className={footerStyles.contactIconWrapper}>
                <Mail className={footerStyles.contactIcon} />
              </div>

              <span className={footerStyles.contactText}>
                alaminhossainm272@gmail.com
              </span>
            </div>

            <div className={footerStyles.contactContainer}>
              <div className={footerStyles.contactIconWrapper}>
                <MapPin className={footerStyles.contactIcon} />
              </div>

              <span className={footerStyles.contactText}>
                Dhaka, Bangladesh
              </span>
            </div>
          </div>

          {/* quick links */}
          <div className={footerStyles.linksSection}>
            <h3 className={footerStyles.sectionTitle}>Quick Links</h3>

            <ul className={footerStyles.linkList}>
              {quickLinks.map((link, index) => (
                <li key={index} className={footerStyles.linkItem}>
                  <a
                    href={link.href}
                    className={footerStyles.quickLink}
                    style={{
                      animationDelay: `${index * 60}ms`,
                    }}
                  >
                    <div className={footerStyles.quickLinkIconWrapper}>
                      <ArrowRight className={footerStyles.quickLinkIcon} />
                    </div>

                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className={footerStyles.linksSection}>
            <h3 className={footerStyles.sectionTitle}>Our Services</h3>

            <ul className={footerStyles.linkList}>
              {services.map((service, index) => (
                <li key={index}>
                  <a
                    href={service.href}
                    className={footerStyles.serviceLink}
                  >
                    <div className={footerStyles.serviceIcon}></div>
                    <span>{service.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Social */}
          <div className={footerStyles.newsletterSection}>
            <h3 className={footerStyles.newsletterTitle}>Stay Connected</h3>

            <p className={footerStyles.newsletterDescription}>
              Subscribe for health tips, medical updates, and wellness insights
              delivered to your inbox.
            </p>

            {/* Newsletter form */}
            <div className={footerStyles.newsletterForm}>
              <div className={footerStyles.mobileNewsletterContainer}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className={footerStyles.emailInput}
                />

                <button className={footerStyles.mobileSubscribeButton}>
                  <Send className={footerStyles.mobileButtonIcon} />
                  Subscribe
                </button>
              </div>

              {/* Desktop newsletter */}
              <div className={footerStyles.desktopNewsletterContainer}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className={footerStyles.desktopEmailInput}
                />

                <button className={footerStyles.desktopSubscribeButton}>
                  <Send className={footerStyles.desktopButtonIcon} />

                  <span className={footerStyles.desktopButtonText}>
                    Subscribe
                  </span>
                </button>
              </div>

              {/* Social icons */}
              <div className={footerStyles.socialContainer}>
                {socialLinks.map(({ Icon, color, name, href }, index) => (
                  <a
                    key={index}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={footerStyles.socialLink}
                    style={{
                      animationDelay: `${index * 120}ms`,
                    }}
                  >
                    <div className={footerStyles.socialIconBackground}></div>

                    <Icon
                      className={`${footerStyles.socialIcon} ${color}`}
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>

        </div>

        <div className={footerStyles.bottomSection}>
          <div className={footerStyles.copyrightText}>
            <span>&copy; {currentYear} Medicare Healthcare</span>
          </div>

          <div className={footerStyles.designerText}>
            <span>Designed and Developed by Alamin Hossain</span>
          </div>
        </div>
      </div>

      <style>{footerStyles.animationStyles}</style>
    </footer>
  )
}

export default Footer