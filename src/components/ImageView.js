import React from 'react';

const ImageView = ({ leftImage, rightImage }) => {
    leftImage = {
        url: 'https://www.flaticon.com/svg/static/icons/svg/174/174857.svg'
    }   
    rightImage = {
        url: 'https://www.flaticon.com/svg/static/icons/svg/174/174857.svg'
    }
  return (
    <div className="image-view-wrapper">
      <div className="image-container">
        <img src={leftImage.url} alt="Left comparison" className="image" />
      </div>
      <div className="divider"></div>
      <div className="image-container">
        <img src={rightImage.url} alt="Right comparison" className="image" />
      </div>
    </div>
  );
};

export default ImageView;

