import React, { useContext, useEffect, useState } from 'react';
import './sideTray.theme.scss';
import ElementTray from './CollapsedTray/ComponentTray/ElementTray';
import { VisualBuilderContext } from '../VisualBuilder';
import ExpandedTray from './ExpandedTray/ExpandedTray';
import CollapsedTray from './CollapsedTray/CollapsedTray';
import CustomSkeleton from '../../Loaders/CustomSkeleton/CustomSkeleton';

export default function RightSideTray() {
  const { expandSideTray } = useContext(VisualBuilderContext);
  const [isLoading, setIsLoading] = useState(false);
  const expandedStyle = {
    width: '300px',
    transition: 'width .6s ease',
  };

  useEffect(() => {
    if (expandSideTray) {
      setIsLoading(true);

      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 600);

      return () => clearTimeout(timer);
    } else {
      setIsLoading(false);
    }
  }, [expandSideTray]);

  const collapsedStyle = {
    width: '100px',
    transition: 'width .6s ease',
  };
  return (
    <div
      className="side-tray"
      style={expandSideTray ? expandedStyle : collapsedStyle}
    >
      {isLoading ? (
        <CustomSkeleton height={20} count={3} />
      ) : expandSideTray ? (
        <ExpandedTray></ExpandedTray>
      ) : (
        <CollapsedTray></CollapsedTray>
      )}
    </div>
  );
}
