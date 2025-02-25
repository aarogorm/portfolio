import WindowsXPPopup from './Popup/Popup';
import TaskBar from './TaskBar/TaskBar';
import DesktopIcon from './DesktopIcons/DesktopIcon';
import { useState } from 'react';
import ReactPlayer from 'react-player/youtube';

export const Desktop = () => {
  const [icons] = useState([
    {
      id: 'projects',
      title: 'my projects',
      icon: 'folder.png',
      position: { x: 20, y: 20 }
    },
    {
      id: 'listening',
      title: 'what i\'m listening to',
      icon: 'Spotify_logo_2008.png',
      position: { x: 20, y: 120 }
    },
    {
      id: 'recycle-bin',
      title: 'Recycle Bin',
      icon: 'recycle-bin.png',
      position: { x: 20, y: 220 }
    },
  ]);

  const [windows, setWindows] = useState([
    {
      id: 1,
      title: 'Welcome!',
      content: <div>
        <p>
                    Welcome to my portfolio! Inside you will find many interesting findings and {<div class="wordart purple" style={{ padding: 2 }}><span class="text">cool</span></div>} facts
        </p>
        <img src="clippy.gif" height={'50px'} style={{ paddingLeft: '300px' }} />
      </div>,
      position: { x: 500, y: 100 },
      zIndex: 1
    },
    {
      id: 2,
      title: 'warning',
      content: 'this is not a warning. you have been warned.',
      position: { x: 1350, y: 350 },
      zIndex: 1
    }
  ]);

  const [selectedIcon, setSelectedIcon] = useState(null);
  const [activeWindowId, setActiveWindowId] = useState(null);
  const [maxZIndex, setMaxZIndex] = useState(1);

  const handleIconClick = (iconId) => {
    setSelectedIcon(iconId);

    const windowCount = windows.length;
    const basePosition = {
      x: 100 + (windowCount * 30),
      y: 100 + (windowCount * 30)
    };

    let newWindow = {
      id: Date.now(),
      position: basePosition,
      zIndex: maxZIndex + 1,
      isMinimized: false
    };

    switch (iconId) {
    case 'projects':
      newWindow = {
        ...newWindow,
        title: 'My Projects',
        content: (
          <div style={{ height: '500px' }}>
            <DesktopIcon
              key={'sayanything'}
              title={'Say Anything Experience'}
              icon={'sayanything.png'}
              position={{ x: 0, y: 40 }}
              isSelected={selectedIcon === 'sayanything'}
              onClick={() => handleIconClick('sayanything')}
            />
          </div>
        )
      };
      break;
    case 'listening':
      newWindow = {
        ...newWindow,
        title: 'Currently Listening',
        content: (
          <div style={{ padding: '10px' }}>
            <div style={{ marginBottom: '15px', fontWeight: 'bold' }}>
                                Now Playing:
            </div>
            <div style={{ marginLeft: '10px', display: 'flex', justifyContent: 'space-between', }}>
                                Track: I'm In Hell<br />
                                Artist: Good Hangs<br />
                                Album: Greatest Hangs
              <img src='nowplaying.png' style={{ width: '125px', height: '125px' }} />
            </div>
          </div>
        )
      };
      break;
    case 'recycle-bin':
      newWindow = {
        ...newWindow,
        title: 'Recycle Bin',
        content: (
          <div style={{ padding: '10px', color: '#666' }}>
                            The Recycle Bin is empty
          </div>
        )
      };
      break;
    case 'sayanything':
      newWindow = {
        ...newWindow,
        title: 'Say Anything Experience',
        content: (
          <div style={{
            width: '396px',
            height: '300px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginLeft: '-15px'
          }}>
            <ReactPlayer
              url="https://www.youtube.com/watch?v=VRz-vNzm8pM"
              width='355px'
              height='200px'
              controls={true}
            />
            <div style={{ height: '100px', padding: '10px' }}>
              <p style={{ fontFamily: 'Tahoma, Arial, sans-serif' }}>
                                    a project i made for a 3D modeling art class in college.
                                    inspired by the KID A MNESIA EXHIBITION
              </p>
              <br />
              <p style={{ fontFamily: 'Tahoma, Arial, sans-serif' }}>
                                    modeling done in Maya, game created in Unity and coding done in C#
              </p>
            </div>

          </div>
        )
      };
      break;
    default:
      return;
    }

    setWindows(prev => [...prev, newWindow]);
    setActiveWindowId(newWindow.id);
    setMaxZIndex(prev => prev + 1);
  };

  const bringToFront = (windowId) => {
    setMaxZIndex(prev => prev + 1);
    setWindows(prev => prev.map(win => ({
      ...win,
      zIndex: win.id === windowId ? maxZIndex + 1 : win.zIndex,
      isMinimized: false
    })));
    setActiveWindowId(windowId);
  };

  const toggleWindow = (windowId) => {
    setWindows(prev => prev.map(win => {
      if (win.id === windowId) {
        return {
          ...win,
          isMinimized: !win.isMinimized
        };
      }
      return win;
    }));
    setActiveWindowId(windowId);
  };

  const closeWindow = (windowId) => {
    setWindows(prev => prev.filter(win => win.id !== windowId));
    if (activeWindowId === windowId) {
      setActiveWindowId(null);
    }
  };

  const handleDesktopClick = (e) => {
    if (e.target === e.currentTarget) {
      setSelectedIcon(null);
    }
  };

  return <div style={{
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height: '100vh',
    width: '100vw',
    padding: 0,
    margin: 0,
    backgroundImage: 'url(\'/redmoondesert.png\')',
    zIndex: 0
  }}
  onClick={handleDesktopClick}
  >
    <div style={{ zIndex: 1 }}>
      {icons.map(icon => (
        <DesktopIcon
          key={icon.id}
          title={icon.title}
          icon={icon.icon}
          position={icon.position}
          isSelected={selectedIcon === icon.id}
          onClick={() => handleIconClick(icon.id)}
        />
      ))}

      {windows.map(window => !window.isMinimized && (
        <WindowsXPPopup
          key={window.id}
          title={window.title}
          initialPosition={window.position}
          zIndex={window.zIndex}
          onClose={() => closeWindow(window.id)}
          onFocus={() => bringToFront(window.id)}
        >
          {window.content}
        </WindowsXPPopup>
      ))}
    </div>
    <TaskBar
      windows={windows}
      activeWindowId={activeWindowId}
      onWindowSelect={toggleWindow}
    />
  </div>;
};