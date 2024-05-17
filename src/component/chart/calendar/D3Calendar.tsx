// MODULE
import { useRef, useState, useEffect } from "react";
import { select } from "d3";
const D3Calendar: React.FC = () => {
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = select(svgRef.current);
  }, []);

  return <></>;
};

export default D3Calendar;
