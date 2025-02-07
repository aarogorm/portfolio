import React, { useState } from 'react';

const TaskBar = ({ 
  windows = [], 
  onWindowSelect = () => {},
  activeWindowId = null
}) => {
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      height: '30px',
      background: 'linear-gradient(180deg, #2256CB 0%, #245BDB 8%, #245FDC 40%, #2463DF 88%, #2467E0 93%, #246AE3 95%, #246DE6 96%, #2471E9 97%, #2475EC 98%, #2478EF 100%)',
      display: 'flex',
      alignItems: 'stretch',
      padding: '0 2px',
      boxShadow: '0 -1px 3px rgba(0,0,0,0.3)',
      zIndex: 9999
    }}>
      {/* Start Button */}
      <button
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '2px 10px',
          margin: '2px',
          background: isStartMenuOpen 
            ? 'linear-gradient(180deg, #2B71E5 0%, #2C74E8 3%, #2C77EB 5%, #2C7BEE 8%, #2C7EF1 11%, #2C82F4 14%, #2D85F7 17%, #2D89FA 20%, #2D8CFD 23%, #2D90FF 26%, #2EA7FF 100%)'
            : 'linear-gradient(180deg, #3C8AF5 0%, #3C8DF8 3%, #3C91FB 5%, #3C94FE 8%, #3D98FF 11%, #3E9FFF 20%, #3EA3FF 23%, #3EA6FF 26%, #3EAAFF 29%, #3FAEFF 32%, #3FB1FF 35%, #3FB5FF 38%, #40B8FF 41%, #40BCFF 44%, #40BFFF 47%, #41C3FF 50%, #41C6FF 53%, #41CAFF 56%, #42CDFF 59%, #42D1FF 62%, #42D4FF 65%, #43D8FF 68%, #43DBFF 71%, #43DFFF 74%, #44E2FF 77%, #44E6FF 80%, #44E9FF 83%, #45EDFF 86%, #45F0FF 89%, #45F4FF 92%, #46F7FF 95%, #46FBFF 98%, #46FFFF 100%)',
          border: 'none',
          borderRadius: '3px',
          cursor: 'pointer',
          fontFamily: 'Tahoma, Arial, sans-serif',
          fontSize: '13px',
          fontWeight: 'bold',
          color: 'white',
          textShadow: '1px 1px 1px rgba(0,0,0,0.7)'
        }}
        onMouseDown={() => setIsStartMenuOpen(!isStartMenuOpen)}
      >
        start
      </button>

      {/* Quick Launch Divider */}
      <div style={{
        width: '1px',
        margin: '2px 4px',
        background: 'rgba(0,0,0,0.2)',
        boxShadow: '1px 0 rgba(255,255,255,0.1)'
      }} />

      {/* Window Buttons */}
      <div style={{
        display: 'flex',
        flex: 1,
        padding: '2px 0'
      }}>
        {windows.map(window => (
          <button
            key={window.id}
            onClick={() => onWindowSelect(window.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              minWidth: '160px',
              maxWidth: '200px',
              margin: '0 2px',
              padding: '2px 8px',
              background: activeWindowId === window.id
                ? 'linear-gradient(180deg, #3C8AF5 0%, #3C8DF8 3%, #3C91FB 5%, #3C94FE 8%, #3D98FF 11%, #3E9FFF 20%)'
                : 'linear-gradient(180deg, #2256CB 0%, #245BDB 8%, #245FDC 40%)',
              border: '1px solid rgba(0,0,0,0.3)',
              borderRadius: '2px',
              cursor: 'pointer',
              fontFamily: 'Tahoma, Arial, sans-serif',
              fontSize: '12px',
              color: 'white',
              textAlign: 'left',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}
          >
            <img 
              src="/api/placeholder/16/16"
              style={{ marginRight: '5px', flexShrink: 0 }}
            />
            {window.title}
          </button>
        ))}
      </div>

      {/* System Tray */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        padding: '0 10px',
        background: 'linear-gradient(180deg, #1D4A9E 0%, #1E4EAB 8%, #1E51AE 40%, #1E54B1 88%, #1E57B4 93%, #1E5AB7 95%, #1E5DBA 96%, #1E60BD 97%, #1E63C0 98%, #1E66C3 100%)',
        margin: '2px 0',
        borderLeft: '1px solid rgba(0,0,0,0.2)'
      }}>
        <span style={{
          color: 'white',
          fontSize: '11px',
          fontFamily: 'Tahoma, Arial, sans-serif'
        }}>
          {new Date().toLocaleTimeString([], { timeStyle: 'short' })}
        </span>
      </div>
    </div>
  );
};

export default TaskBar;