import React, { useRef, useState, useEffect } from "react";
import { select } from "d3";
import { memberRepositorySelectDateCommitGET } from "../../../api/github";

const D3Calendar: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [commitData, setCommitData] = useState<any[]>([]);
  const selectedYear = 2023; // Set the selected year
  const cellSize = 16;

  useEffect(() => {
    fetchCommitData(selectedYear);
  }, [selectedYear]);

  const fetchCommitData = async (year: number) => {
    try {
      const response = await memberRepositorySelectDateCommitGET(
        "loginId",
        "repoName",
        1,
        year,
        1 // Start from January
      );
      setCommitData(response.data);
    } catch (error) {
      console.error("Error fetching commit data:", error);
    }
  };

  useEffect(() => {
    renderCalendar();
  }, [commitData]);

  const renderCalendar = () => {
    const width = 960;
    const height = 400;

    select(svgRef.current).selectAll("*").remove();

    const svg = select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    const g = svg.append("g").attr("transform", "translate(30, 20)");

    // Draw rectangles for each year
    for (let year = selectedYear; year < selectedYear + 10; year++) {
      const x = 0;
      const y = ((year - selectedYear) % 10) * (height / 10);
      g.append("rect")
        .attr("x", x)
        .attr("y", y)
        .attr("width", cellSize)
        .attr("height", height / 10)
        .style("fill", "none")
        .style("stroke", "#000")
        .style("stroke-width", 1);
      g.append("text")
        .attr("x", x + cellSize / 2)
        .attr("y", y + height / 10 / 2)
        .style("text-anchor", "middle")
        .style("dominant-baseline", "central")
        .text(year);
    }

    // Draw rectangles and text for each month of each year
    for (let year = selectedYear; year < selectedYear + 10; year++) {
      for (let month = 1; month <= 12; month++) {
        const x = ((month - 1) % 12) * (width / 12) + cellSize;
        const y = ((year - selectedYear) % 10) * (height / 10) + cellSize;
        const daysInMonth = new Date(year, month, 0).getDate();
        g.append("rect")
          .attr("x", x)
          .attr("y", y)
          .attr("width", width / 12 - cellSize)
          .attr("height", cellSize)
          .style("fill", "none")
          .style("stroke", "#000")
          .style("stroke-width", 1);
        g.append("text")
          .attr("x", x + (width / 12 - cellSize) / 2)
          .attr("y", y + cellSize / 2)
          .style("text-anchor", "middle")
          .style("dominant-baseline", "central")
          .style("font-size", "16px")
          .text(daysInMonth);

        // Draw rectangles for each day of each month
        for (let day = 1; day <= daysInMonth; day++) {
          const dayX =
            ((month - 1) % 12) * (width / 12) +
            cellSize +
            ((day - 1) % 7) * (width / 84);
          const dayY =
            ((year - selectedYear) % 10) * (height / 10) +
            cellSize +
            Math.floor((day - 1) / 7) * (height / 70);
          g.append("rect")
            .attr("x", dayX)
            .attr("y", dayY)
            .attr("width", width / 84)
            .attr("height", height / 70)
            .style("fill", "none")
            .style("stroke", "#000")
            .style("stroke-width", 1);
        }
      }
    }
  };

  return (
    <div style={{ overflowX: "scroll", maxWidth: "1000px" }}>
      {commitData.length > 0 ? <svg ref={svgRef}></svg> : <div>Loading...</div>}
    </div>
  );
};

export default D3Calendar;
