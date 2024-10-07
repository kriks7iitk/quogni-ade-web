import React, { useState, useRef } from 'react';
import { CgArrowsExpandLeft } from 'react-icons/cg';
import { RiCollapseDiagonal2Line } from 'react-icons/ri';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const InspectorHeader = ({ toggleDrawer, isCollapsed, activeTab, setActiveTab, tabs, setTabs }) => {

  console.log('activeTab:', activeTab);
  console.log('tabs:', tabs);

  const handleTabClose = (tab) => {
    setTabs((prevTabs) => prevTabs.filter((t) => t !== tab)); // Remove the closed tab
    // Update activeTab if the closed tab was active
    if (activeTab === tab) {
      const remainingTabs = tabs.filter((t) => t !== tab);
      setActiveTab(remainingTabs.length > 0 ? remainingTabs[0] : null); // Set to first remaining tab or null if none left
    }
  };
  
  return (
    <div
      className="inspector-header flex items-center  bg-white p-1 border-b border-gray-200 shadow-sm"
      style={{ width: '100%' }}
    >
      <button
        onClick={toggleDrawer}
        className="toggle-button rounded-full px-4 py-1"
        style={{ whiteSpace: 'nowrap' }}
      >
        {isCollapsed ? <CgArrowsExpandLeft /> : <RiCollapseDiagonal2Line />}
      </button>

      {/* Render Tabs Navigation */}
      <div className="tabs-list flex space-x-4 ml-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`tabs-trigger px-4 py-2 rounded-md ${
              activeTab === tab ? 'bg-[#000050] text-white' : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
            {/* Close Button for Each Tab (Optional) */}
            <span
              className="ml-2 cursor-pointer text-red-500"
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering setActiveTab
                setTabs(tabs.filter((t) => t !== tab)); // Remove the tab
                if (activeTab === tab) setActiveTab(tabs[0] || null); // Update activeTab if the closed tab was active
                handleTabClose(tab);
              }}
            >
              &times;
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default InspectorHeader;
