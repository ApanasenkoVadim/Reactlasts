import React from 'react';
import '../style/footer.css';
import Inst from '../img/inst.svg';
import Wht from '../img/wht.svg';

const Footer = () => {
  const contactDetails = [
    {
      title: 'Phone',
      content: '+7 (499) 350-66-04',
    },
    {
      title: 'Address',
      content: 'Dubininskaya Ulitsa, 96, Moscow, Russia, 115093',
    },
    {
      title: 'Working Hours',
      content: '24 hours a day',
      className: 'working-hours',
    },
  ];

  const socialIcons = [
    { src: Inst, alt: 'Instagram', className: '' },
    { src: Wht, alt: 'WhatsApp', className: 'wht' },
  ];

  const renderContactDetails = () =>
    contactDetails.map(({ title, content, className }, index) => (
      <div
        key={index}
        className={className || title.toLowerCase().replace(/ /g, '-')}
      >
        <p>{title}</p>
        <h2>{content}</h2>
      </div>
    ));

  const renderSocialIcons = () => (
    <div className="socials">
      <p className="socials-title">Socials</p>
      <div className="imgsocial">
        {socialIcons.map(({ src, alt, className }, index) => (
          <img
            key={index}
            src={src}
            alt={alt}
            className={className}
            style={{ width: '38px', height: '38px' }}
          />
        ))}
      </div>
    </div>
  );

  const renderMap = () => (
    <div className="map-container">
      <iframe
        title="IThub College Location"
        className="map-iframe"
        src="https://www.google.com/maps?q=IThub+college+Dubininskaya+Ulitsa+96,+Moscow,+Russia,+115093&hl=en&output=embed"
        allowFullScreen
        loading="lazy"
      ></iframe>
    </div>
  );

  return (
    <footer>
      <div className="contact">
        <h1>Contact</h1>
        <div className="conts">
          {renderContactDetails()}
          {renderSocialIcons()}
        </div>
        {renderMap()}
      </div>
    </footer>
  );
};

export default Footer;