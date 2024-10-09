import React, { useContext } from 'react';
import ThemeButton from '../../../../_components/Buttons/ThemeButton';
import './right-expanded-tray.theme.scss';
import { VisualBuilderContext } from '../../VisualBuilder';

export default function ExpandedTray({ title, showBack }) {
  const { subRoute } = useContext(VisualBuilderContext);
  // const title =
  return (
    <div className="expanded-tray">
      <div className="expanded-tray-header">
        <ThemeButton
          leftIcon="back-1"
          size="small"
          iconFill="var(--slate-500)"
        />
        <h3 className="expanded-tray-title">Expanded Tray</h3>
      </div>
      <div className="expanded-tray-content">
        <p>ExpandedTray Content goes here</p>
      </div>
    </div>
  );
}
