import React, { useState, useRef } from 'react';
import { CgArrowsExpandLeft } from 'react-icons/cg';
import { RiCollapseDiagonal2Line } from 'react-icons/ri';
import OptionsOverlay from './OptionsOverlay';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import '../inspector.scss';

const InspectorHeader = ({ toggleDrawer, isCollapsed, addTab }) => {
  const [tabs, setTabs] = useState([]);
  const [activeTab, setActiveTab] = useState(null);

  const handleOptionSelect = (optionLabel) => {
    if (!tabs.includes(optionLabel)) {
      setTabs((prevTabs) => [...prevTabs, optionLabel]);
      setActiveTab(optionLabel);
    }
  };
  return (
    <div
      className="inspector-header flex items-center p-1 border-b border-gray-200"
      style={{ width: '100%' }}
    >
      <button
        onClick={toggleDrawer}
        className="toggle-button rounded-full px-4 py-1"
        style={{ whiteSpace: 'nowrap' }}
      >
        {isCollapsed ? <CgArrowsExpandLeft /> : <RiCollapseDiagonal2Line />}
      </button>
      <OptionsOverlay onSelectOption={handleOptionSelect} />

      {/* Render Tabs Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          {tabs.map((tab) => (
            <TabsTrigger key={tab} value={tab}>
              {tab}
              <button
                className="ml-2 mr-1 text-red-500 p-1"
                onClick={(e) => {
                  e.stopPropagation();
                  setTabs(tabs.filter((t) => t !== tab));
                  if (activeTab === tab) setActiveTab(tabs[0] || null);
                }}
              >
                &times;
              </button>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};

export default InspectorHeader;
