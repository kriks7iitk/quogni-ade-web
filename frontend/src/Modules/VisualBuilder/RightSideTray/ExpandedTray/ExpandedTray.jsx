import React, { useContext, useEffect } from 'react';
import ThemeButton from '../../../../_components/Buttons/ThemeButton';
import './right-expanded-tray.theme.scss';
import { VisualBuilderContext } from '../../VisualBuilder';
import BackTestTray from '../../BackTest/BackTestTray';
import { useSelector, useDispatch } from 'react-redux';
import CustomSkeleton from '../../../Loaders/CustomSkeleton/CustomSkeleton';
import {
  updateBackButtonState,
  updateTitleState,
  updateRightDrawerJourneyState,
  updateLoadingState,
  fetchStrategyName,
} from '../../../../_stores/right-drawer.reducer';

export default function ExpandedTray() {
  const { subRoute } = useContext(VisualBuilderContext);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.rightDrawerData.loading);
  const showBackButton = useSelector(
    (state) => state.rightDrawerData.showBackButton,
  );
  const title = useSelector((state) => state.rightDrawerData.title);

  useEffect(() => {
    dispatch(fetchStrategyName());
  }, []);

  const onBackButtonHandle = () => {
    dispatch(updateLoadingState(true));
    dispatch(updateRightDrawerJourneyState('back-test'));
    dispatch(updateTitleState('Strategy list'));
    dispatch(updateBackButtonState(false));
    dispatch(updateLoadingState(false));
  };
  return (
    <div className="expanded-tray">
      {!loading ? (
        <>
          <div className="expanded-tray-header">
            <div className="back-button-cont">
              {showBackButton && (
                <ThemeButton
                  leftIcon="back-1"
                  size="small"
                  iconFill="var(--slate-500)"
                  onClick={onBackButtonHandle}
                />
              )}
            </div>
            <h3 className="expanded-tray-title">{title}</h3>
          </div>
          <div className="expanded-tray-content">
            <div className="expanded-tray-content">
              {(() => {
                switch (subRoute) {
                  case 'back-test':
                    return <BackTestTray />;
                  default:
                    return null;
                }
              })()}
            </div>
          </div>
        </>
      ) : (
        <CustomSkeleton count={2} height={30} />
      )}
    </div>
  );
}
