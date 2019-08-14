import React from 'react';

const Foot = props => {
  return (
    <div
      copyrights="&copy; 2017 Zhouyang Lian"
      style={{ backgroundColor: "#2266bb" }}
      links={
        <ul>
          <p className="white-text"> More from me! </p>
          <a href="http://linkedin.com/in/zlian">
            <i alt="LinkedIn Logo" className="fa fa-linkedin-square fa-2x icon" aria-hidden="true" ></i>
          </a>
          <a href="https://github.com/lzy7071">
            <i alt="GitHub Logo" className="fa fa-github fa-2x space-button icon" aria-hidden="true" ></i>
          </a>
          <a href="https://familian.life/">
            <i alt="Portfolio Site" className="fa fa-file-pdf-o fa-2x space-button icon" aria-hidden="true" ></i>
          </a>
        </ul>
      }
    >
        <h5 className="white-text">Hey!</h5>
        <p className="white-text">Thanks so much for coming to check this out.</p>
        <p className="white-text">It's a fun little side project that is still very much a work in progress!</p>
    </div>
  );
}

export default Foot;
