import React from 'react';
import CardHeader from '../../../../_components/Containers/CardHeader';
import { useLeftPanelContext } from './LeftPanelProvider';
import { kebabCaseToNormal } from '../../../../Utility/utility';
import SavedEvents from '../../SavedEvents/SavedEvents';

export default function LeftPanelContainer() {
  const { activeTab } = useLeftPanelContext();

  const activeTabComponent = () => {
    switch (activeTab) {
      case 'saved-events':
        return <SavedEvents />;
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
