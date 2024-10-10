import React from 'react';
import { IoMdClose } from 'react-icons/io'; // Optional: Use Heroicons or any icon library for the close button

const ComingSoonDawer = ({ isOpen, onClose, children,subRoute, position = 'right' }) => {
    // Determine the position styles based on the drawer position (left or right)
    const initialPosition = position === 'left' ? '-100%' : '100%'; // Initial position off-screen
    const finalPosition = '0'; // Visible position
  
    // Drawer styles with transition properties
    const drawerStyles = {
      position: 'fixed',
      top: 0,
      [position]: 0, // Position it either left or right based on `position` prop
      height: '100%',
      width: '320px', // Width of the drawer
      maxWidth: '100%',
      backgroundColor: 'white',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      transform: `translateX(${isOpen ? finalPosition : initialPosition})`,
      transition: 'transform 0.3s ease-in-out', // Transition for smooth sliding
      zIndex: 50,
    };
  
    const overlayStyles = {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      opacity: isOpen ? 1 : 0,
      pointerEvents: isOpen ? 'auto' : 'none',
      transition: 'opacity 0.3s ease-in-out',
      zIndex: 40,
    };
  

  return (
     <div>
     {/* Overlay */}
     <div style={overlayStyles} onClick={onClose}></div>

     {/* Drawer Content */}
     <div style={drawerStyles}>
       {/* Drawer Header with Close Button */}
       <div className="flex items-center justify-between p-4 border-b border-gray-200">
         <h2 className="text-lg font-semibold">{`Welcome to ${subRoute}`}</h2>
         <button
           className="text-gray-500 hover:text-gray-700"
           onClick={onClose}
           aria-label="Close Drawer"
         >
           <IoMdClose />
         </button>
       </div>

       {/* Drawer Body */}
       <div className="p-4 overflow-y-auto">{children}</div>
     </div>
   </div>
  );
};

export default ComingSoonDawer;
