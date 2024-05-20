// MODULE
import React, { useRef, useState, useEffect } from "react";
import { select } from "d3";
// API
// TYPE
type D3CalenderType = {
  id: string;
  repoName: string;
  year: number;
  propsData: object[];
};

const D3Calendar: React.FC<D3CalenderType> = ({
  id,
  repoName,
  year,
  propsData,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [commitData, setCommitData] = useState<any[]>(propsData);
  const selectedYear = year;
  const cellSize = 15;

  useEffect(() => {
    renderCalendar();
  }, [commitData, selectedYear]);

  const renderCalendar = () => {
    const width = 1000;
    const height = 600;
    const yearSpacing = 50;

    select(svgRef.current).selectAll("*").remove();

    const svg = select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    const g = svg.append("g").attr("transform", "translate(0, 30)");

    // Draw rectangles for each year
    for (let year = selectedYear; year < selectedYear + 1; year++) {
      const x = 0;
      const y =
        ((year - selectedYear) % 10) * (height / 10) +
        yearSpacing * (year - selectedYear);
      g.append("rect")
        .attr("x", x)
        .attr("y", y)
        .attr("width", cellSize)
        .attr("height", height / 10)
        .style("fill", "none");
      g.append("text")
        // .attr("x", x + cellSize / 2)
        .attr("y", y + height / -40)
        .attr("x", 30)
        .style("margin-top", "20px")
        .style("font-size", "20px")
        .style("font-weight", "700")
        .style("text-anchor", "middle")
        .style("dominant-baseline", "central")
        .text(year);
    }

    // Draw rectangles and text for each month of each year
    for (let year = selectedYear; year < selectedYear + 1; year++) {
      for (let month = 1; month <= 12; month++) {
        const x = ((month - 1) % 12) * (width / 12) + cellSize + 5;
        const y =
          ((year - selectedYear) % 10) * (height / 10) +
          cellSize +
          yearSpacing * (year - selectedYear) +
          5;
        const daysInMonth = new Date(year, month, 0).getDate();
        g.append("rect")
          .attr("x", x)
          .attr("y", y)
          .attr("width", (width / 12 - cellSize) / 2)
          .attr("height", (height / 10 - cellSize) / 5)
          .style("fill", "none");
        g.append("text")
          .attr("x", x + (width / 12 - cellSize) / 4)
          .attr("y", y - 10)
          .style("text-anchor", "middle")
          .style("dominant-baseline", "central")
          .style("font-size", "18px")
          .text(getMonthName(month));

        // Draw rectangles for each day of each month
        for (let day = 1; day <= daysInMonth; day++) {
          const dayX =
            ((month - 1) % 12) * (width / 12) +
            cellSize +
            ((day - 1) % 7) * ((width / 12 - cellSize) / 7);
          const dayY =
            ((year - selectedYear) % 10) * (height / 10) +
            cellSize +
            Math.floor((day - 1) / 7) * ((height / 10 - cellSize) / 5) +
            yearSpacing * (year - selectedYear) +
            5;
          const currentDate = new Date(year, month - 1, day);
          const formattedDate = currentDate.toISOString().split("T")[0];
          const hasCommit = commitData.some(
            (data) => data.commit.author.date.split("T")[0] === formattedDate
          );

          g.append("rect")
            .attr("x", dayX - 7)
            .attr("y", dayY + 7)
            .attr("width", 10)
            .attr("height", 10)
            .attr("title", formattedDate)
            .style("fill", hasCommit ? "green" : "none")
            .style("stroke", "#000")
            .style("stroke-width", 0.5);
        }
      }
    }
  };
  const getMonthName = (month) => {
    const monthNames = [
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12",
    ];
    return monthNames[month - 1];
  };
  return (
    <div style={{ overflow: "auto", maxWidth: "1000px" }}>
      {/* {isLoading ? (
        <div>Loading...</div>
      ) : commitData.length > 0 ? (
        <svg ref={svgRef}></svg>
      ) : (
        <div>해당년도에 commit 기록이 없습니다.</div>
      )} */}
      {commitData.length > 0 ? (
        <svg ref={svgRef}></svg>
      ) : (
        <div>해당년도에 commit 기록이 없습니다.</div>
      )}
    </div>
  );
};

export default D3Calendar;
