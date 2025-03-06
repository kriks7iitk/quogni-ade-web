import React, { useRef, useEffect, useCallback } from "react";
import { Overlay } from "react-overlays";

export default function OverlayTrigger({ show, onClose, targetRef, placement = "bottom", children }) {
  const overlayRef = useRef(null);

  // Close overlay when clicking outside
  const handleClickOutside = useCallback(
    (event) => {
      if (
        overlayRef.current &&
        !overlayRef.current.contains(event.target) && // Click is outside overlay
        targetRef.current &&
        !targetRef.current.contains(event.target) // Click is outside target button
      ) {
        onClose(); // Close overlay
      }
    },
    [onClose, targetRef]
  );

  useEffect(() => {
    if (show) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [show, handleClickOutside]);

  return (
    <Overlay show={show} target={targetRef.current} placement={placement}>
      {({ props }) => (
        <div
          ref={overlayRef}
          {...props}
          style={{
            position: "absolute",
            borderRadius: "4px",
            background: "white",
            border: "1px solid var(--slate-600)",
            boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
            ...props.style,
          }}
        >
          {children}
        </div>
      )}
    </Overlay>
  );
}
