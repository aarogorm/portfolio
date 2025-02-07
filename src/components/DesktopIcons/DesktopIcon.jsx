import React, { useState } from 'react';

const DesktopIcon = ({
  title,
  icon,
  position = { x: 0, y: 0 },
  onClick = () => {},
  isSelected = false
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      style={{
        position: 'absolute',
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: '75px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '3px',
        cursor: 'pointer',
        backgroundColor: isSelected ? 'rgba(49, 99, 206, 0.3)' : 'transparent',
        border: isSelected ? '1px solid rgba(49, 99, 206, 0.6)' : '1px solid transparent',
        borderRadius: '3px'
      }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img 
        src={icon}
        alt={title}
        style={{
          width: '40px',
          height: '40px',
          marginBottom: '4px'
        }}
      />
      <div style={{
        color: 'white',
        fontSize: '12px',
        fontFamily: 'Tahoma, Arial, sans-serif',
        textAlign: 'center',
        textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)',
        wordWrap: 'break-word',
        width: '100%',
        backgroundColor: isHovered || isSelected ? 'rgba(49, 99, 206, 0.3)' : 'transparent',
        padding: '2px',
        borderRadius: '2px'
      }}>
        {title}
      </div>
    </div>
  );
};

export default DesktopIcon;