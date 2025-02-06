import React, { useEffect } from 'react';
import CardHeader from '../../_components/Containers/CardHeader';
import { useLeftPanelContext } from './LeftPanelProvider';
import { kebabCaseToNormal } from '../../Utility/utility';

export default function LeftPanelContainer() {
  const { activeTab } = useLeftPanelContext();

  useEffect(() => {
      console.log("active tab is");
      console.log(activeTab);
  }, [activeTab])
  

  const activeTabComponent = () => {
    console.log("active tab us");
    console.log(activeTab);
    
    
    switch (activeTab) {
      case 'saved-events':
        return ;
      case 'saved-screens':
        break;
      default:
        break;
    }
  };
  return (
    <div className="container-card left-panel-container">
      <CardHeader title={kebabCaseToNormal(activeTab)} />
      {activeTabComponent()}
    </div>
  );
}
