import React from 'react';
import { FaUtensils, FaStore, FaCalendarAlt } from 'react-icons/fa';

const ServiceCards = () => {
  const services = [
    {
      icon: <FaUtensils />,
      title: "FOOD DELIVERY",
      subtitle: "FROM RESTAURANTS",
      discount: "UPTO 60% OFF",
      color: "#ff5200"
    },
    {
      icon: <FaStore />,
      title: "INSTAMART",
      subtitle: "INSTANT GROCERY",
      discount: "UPTO 60% OFF",
      color: "#2e7d32"
    },
    {
      icon: <FaCalendarAlt />,
      title: "DINEOUT",
      subtitle: "EAT OUT & SAVE MORE",
      discount: "UPTO 50% OFF",
      color: "#9c27b0"
    }
  ];

  return (
    <div className="services">
      <div className="container">
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-icon" style={{ color: service.color }}>{service.icon}</div>
              <div className="service-title">{service.title}</div>
              <div className="service-subtitle">{service.subtitle}</div>
              <div className="service-discount">{service.discount}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceCards;