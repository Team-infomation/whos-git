// MODULE
import { useRef, useState, useEffect } from "react";
import { select } from "d3";
const Test: React.FC = () => {
  const [data, setData] = useState([24, 30, 45, 70, 26]);
  const svgRef = useRef(null);
  useEffect(() => {
    const svg = select(svgRef.current);

    svg
      .selectAll("circle")
      .data(data)
      .join(
        (enter) => enter.append("circle"),
        (update) => update.attr("class", "updated"),
        (exit) => exit.remove()
      )
      .attr("r", (value) => value)
      .attr("cx", (value) => value * 2)
      .attr("cy", (value) => value * 2)
      .attr("stroke", "red");
  }, []);
  return (
    <>
      <svg ref={svgRef}></svg>
      <button
        onClick={() => {
          setData(data.map((el) => el + 5));
        }}
      >
        increase + 5
      </button>
      <button
        onClick={() => {
          setData(data.filter((el) => el > 35));
        }}
      >
        filter circle r should gt 35
      </button>
    </>
  );
};

export default Test;
