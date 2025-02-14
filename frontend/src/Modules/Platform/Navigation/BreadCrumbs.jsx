import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Breadcrumbs() {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter((segment) => segment);

  return (
    <nav className="breadcrumbs">
      <Link to="/">Home</Link>
      {pathSegments.map((segment, index) => {
        const path = `/${pathSegments.slice(0, index + 1).join("/")}`;
        const formattedSegment = segment.charAt(0).toUpperCase() + segment.slice(1);

        return (
          <span key={index}>
            {" > "}
            <Link to={path}>{formattedSegment}</Link>
          </span>
        );
      })}
    </nav>
  );
}
