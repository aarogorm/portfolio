import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const WindowsXPPopup = ({ 
  title = "Message", 
  children, 
  onClose = () => {},
  width = "400px",
  initialPosition = { x: 100, y: 100 },
  zIndex = 1,
  onFocus = () => {}
}) => {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
    onFocus();
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);
  console.log(title, zIndex);
  return (
    <div 
      style={{
        position: 'absolute',
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: width,
        backgroundColor: '#ECE9D8',
        boxShadow: '2px 2px 8px rgba(0, 0, 0, 0.2)',
        border: '1px solidrgb(19, 0, 233)',
        borderRadius: '3px 3px 0 0',
        fontFamily: 'Tahoma, Arial, sans-serif',
        zIndex: zIndex
      }}
      onClick={onFocus}
    >
      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '3px 5px 3px 8px',
          background: 'linear-gradient(180deg,rgb(42, 0, 230) 0%,rgb(63, 76, 255) 5%,rgb(62, 0, 233) 100%)',
          color: 'white',
          borderRadius: '2px 2px 0 0',
          cursor: 'move',
          userSelect: 'none'
        }}
        onMouseDown={handleMouseDown}
      >
        <div style={{
          fontSize: '13px',
          fontWeight: '600',
        }}>{title}</div>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          style={{
            background: 'none',
            border: 'none',
            padding: '2px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'white',
            borderRadius: '2px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#FF3232';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <X size={16} />
        </button>
      </div>

      <div style={{
        padding: '16px',
        backgroundColor: '#F5F4F1',
        color: '#222222'
      }}>
        {children}
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '8px',
        padding: '16px',
        backgroundColor: '#ECE9D8'
      }}>
        <button 
          onClick={onClose}
          style={{
            padding: '4px 16px',
            backgroundColor: '#ECE9D8',
            border: '1px solid #888888',
            borderRadius: '3px',
            cursor: 'pointer',
            fontSize: '12px',
            boxShadow: '1px 1px 0px white inset, -1px -1px 0px #888888 inset'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#F5F4F1';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#ECE9D8';
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.backgroundColor = '#D8D4C8';
            e.currentTarget.style.boxShadow = '-1px -1px 0px white inset, 1px 1px 0px #888888 inset';
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.backgroundColor = '#F5F4F1';
            e.currentTarget.style.boxShadow = '1px 1px 0px white inset, -1px -1px 0px #888888 inset';
          }}
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default WindowsXPPopup;