import * as React from "react";
import { DiagramComponent } from "@syncfusion/ej2-react-diagrams";

// App component with zoom in/out functionality
export default function Ruler() {
  const diagramRef = React.useRef(null);

  // Function to zoom in
  const handleZoomIn = () => {
    if (diagramRef.current) {
      diagramRef.current.zoomTo({ type: "ZoomIn" });
    }
  };

  // Function to zoom out
  const handleZoomOut = () => {
    if (diagramRef.current) {
      diagramRef.current.zoomTo({ type: "ZoomOut" });
    }
  };

  return (
    <div>
      <div>
        <button onClick={handleZoomIn}>Zoom In</button>
        <button onClick={handleZoomOut}>Zoom Out</button>
      </div>
      <DiagramComponent
        id="container"
        width={"100%"}
        height={"600px"}
        ref={diagramRef}
        rulerSettings={{ showRulers: true }}
        zoomSettings={{
          enableZoom: true, // Enable zooming
          minZoom: 0.25, // Minimum zoom level
          maxZoom: 2,    // Maximum zoom level
        }}
      />
    </div>
  );
}
