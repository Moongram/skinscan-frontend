import React, { useState, useRef }  from 'react';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft, faArrowRight, faSearchPlus, faSearchMinus, faSyncAlt } from '@fortawesome/free-solid-svg-icons';

const ImageView = ({ leftImage, rightImage }) => {
  // Example data for demonstration
  const [zoomLevelLeft, setZoomLevelLeft] = useState(1);
  const [zoomLevelRight, setZoomLevelRight] = useState(1);
  const [syncZoom, setSyncZoom] = useState(false);

  const handleZoomIn = (side) => {
    if (syncZoom) {
      setZoomLevelLeft(prev => prev * 1.2);
      setZoomLevelRight(prev => prev * 1.2);
    } else if (side === 'left') {
      setZoomLevelLeft(prev => prev * 1.2);
    } else {
      setZoomLevelRight(prev => prev * 1.2);
    }
  };

  const handleZoomOut = (side) => {
    if (syncZoom) {
      setZoomLevelLeft(prev => prev / 1.2);
      setZoomLevelRight(prev => prev / 1.2);
    } else if (side === 'left') {
      setZoomLevelLeft(prev => prev / 1.2);
    } else {
      setZoomLevelRight(prev => prev / 1.2);
    }
  };
  const toggleSyncZoom = () => {
    setSyncZoom(!syncZoom);
  };

  leftImage = {
    url: '/images/image.png',
    patientName: 'Jane Doe',
    photoId: '13',
    timestamp: '2024-03-20 10:00',
  };

  rightImage = {
    url: '/images/image.png',
    patientName: 'John Smith',
    photoId: '14',
    timestamp: '2024-03-21 11:00',
  };
  
   // Placeholder past images data
   const pastImages = [
    { url: '/images/image.png', patientName: 'Jane Doe', photoId: '1', timestamp: '2024-03-18 09:00' },
    { url: '/images/image.png', patientName: 'Jane Doe', photoId: '2', timestamp: '2024-03-17 08:00' },
    { url: '/images/image.png', patientName: 'Jane Doe', photoId: '3', timestamp: '2024-03-16 07:00' },
    { url: '/images/image.png', patientName: 'Jane Doe', photoId: '4', timestamp: '2024-03-15 06:00' },
    { url: '/images/image.png', patientName: 'Jane Doe', photoId: '5', timestamp: '2024-03-14 10:00' },
    { url: '/images/image.png', patientName: 'Jane Doe', photoId: '6', timestamp: '2024-03-13 11:00' },
    { url: '/images/image.png', patientName: 'Jane Doe', photoId: '7', timestamp: '2024-03-12 12:00' },
    { url: '/images/image.png', patientName: 'Jane Doe', photoId: '8', timestamp: '2024-03-11 13:00' },
    { url: '/images/image.png', patientName: 'Jane Doe', photoId: '9', timestamp: '2024-03-10 14:00' },
    { url: '/images/image.png', patientName: 'Jane Doe', photoId: '10', timestamp: '2024-03-09 15:00' },
    { url: '/images/image.png', patientName: 'Jane Doe', photoId: '11', timestamp: '2024-03-08 16:00' },
    { url: '/images/image.png', patientName: 'Jane Doe', photoId: '12', timestamp: '2024-03-07 17:00' }
  ];
  

  const [selectedLeftImage, setSelectedLeftImage] = useState(leftImage);
  const [selectedRightImage, setSelectedRightImage] = useState(rightImage);

  const [lastClickedPosition, setLastClickedPosition] = useState('right');

  const handleImageClick = (image) => {
    const newPosition = lastClickedPosition === 'left' ? 'right' : 'left';
    if (newPosition === 'left') {
      setSelectedLeftImage(image);
    } else {
      setSelectedRightImage(image);
    }
    setLastClickedPosition(newPosition);
  };
  const imageBarRef = useRef(null);

  const scrollToStart = () => {
    if (imageBarRef.current) {
      imageBarRef.current.scrollLeft = 0;
    }
  };

  const scrollToEnd = () => {
    if (imageBarRef.current) {
      imageBarRef.current.scrollLeft = imageBarRef.current.scrollWidth;
    }
  };
  return (
    <div className="image-view-wrapper">
      <div className="zoom-controls">
        <button onClick={() => handleZoomIn('left')}>
          <FontAwesomeIcon icon={faSearchPlus} /> Zoom In (Left)
        </button>
        <button onClick={() => handleZoomOut('left')}>
          <FontAwesomeIcon icon={faSearchMinus} /> Zoom Out (Left)
        </button>
        <button onClick={() => handleZoomIn('right')}>
          <FontAwesomeIcon icon={faSearchPlus} /> Zoom In (Right)
        </button>
        <button onClick={() => handleZoomOut('right')}>
          <FontAwesomeIcon icon={faSearchMinus} /> Zoom Out (Right)
        </button>
        <button onClick={toggleSyncZoom}>
          <FontAwesomeIcon icon={faSyncAlt} /> {syncZoom ? 'Unsync' : 'Sync'} Zoom
        </button>
      </div>
    <div className="image-container-wrapper">
    <div className="image-container" style={{ transform: `scale(${zoomLevelLeft})` }}>
        <TransformWrapper>
            <TransformComponent>
                <img src={selectedLeftImage.url} alt="test" />
            </TransformComponent>
        </TransformWrapper>
      </div>
      <div className="divider"></div>
      <div className="image-container" style={{ transform: `scale(${zoomLevelRight})` }}>
        <TransformWrapper>
            <TransformComponent>
                <img src={selectedRightImage.url} alt="test" />
            </TransformComponent>
        </TransformWrapper>
      </div>
    </div>
    <div className="image-note">
      Click two images to replace left and right images, scroll to view more past images
    </div>

    <div className="image-bar-container">
    <button className="scroll-button left" onClick={scrollToStart}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <div className="image-bar" ref={imageBarRef}>
          {pastImages.map((image, index) => (
            <img
              key={index}
              src={image.url}
              alt="Past image"
              className="past-image"
              onClick={() => handleImageClick(image)}
            />
          ))}
        </div>
        <button className="scroll-button right" onClick={scrollToEnd}>
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
  </div>
  
  );
};
export default ImageView;
