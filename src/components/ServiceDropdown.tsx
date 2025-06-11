import React from "react";

interface ServiceDropdownProps {
  title: string;
  description: string;
  buttonText: string;
  imageSrc?: string; // Made optional
}

const ServiceDropdown: React.FC<ServiceDropdownProps> = ({
  title,
  description,
  buttonText,
  imageSrc,
}) => {
  return (
    <div className="accordion">
      <div className="accordion__intro">
        <h4>
          <span className="site-icon">
            {imageSrc && <img src={imageSrc} width="42" height="42" alt="" />}
          </span>{" "}
          {title}
        </h4>
      </div>
      <div className="accordion__content">
        <p>{description}</p>
      </div>
    </div>
  );
};

export default ServiceDropdown;
