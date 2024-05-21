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

const D3Calendar: React.FC<D3CalenderType> = ({ year, propsData }) => {
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

    const g = svg.append("g").attr("transform", "translate(-25, 30)");

    // Draw rectangles and text for each month of each year
    for (let i = 0; i < 2; i++) {
      // Two rows
      for (let j = 0; j < 6; j++) {
        // Six months per row
        const x = j * (width / 6) + cellSize + 5;
        const y = i * (height / 2) + cellSize + 5;
        const month = i * 6 + j + 1;
        const firstDayOfMonth = new Date(selectedYear, month - 1, 1).getDay();
        const daysInMonth = new Date(selectedYear, month, 0).getDate();

        // Draw rectangles for each day of each month
        for (let day = 1; day <= daysInMonth; day++) {
          const currentDay = new Date(selectedYear, month - 1, day);
          const isCurrentMonth = currentDay.getMonth() === month - 1;
          if (isCurrentMonth) {
            const dayX =
              x +
              ((day - 1 + firstDayOfMonth) % 7) * ((width / 6 - cellSize) / 7) +
              15;
            const dayY =
              y +
              Math.floor((day - 1 + firstDayOfMonth) / 7) *
                ((height / 2 - cellSize) / 13);
            const formattedDate = currentDay.toISOString().split("T")[0];
            const hasCommit = commitData.some((data) => {
              const commitDate = new Date(data.commit.author.date);
              return (
                commitDate.getFullYear() === selectedYear &&
                commitDate.getMonth() + 1 === month &&
                commitDate.getDate() === day
              );
            });

            let commitCount = 0;
            commitData.forEach((data) => {
              const commitDate = new Date(data.commit.author.date);
              if (
                commitDate.getFullYear() === selectedYear &&
                commitDate.getMonth() + 1 === month &&
                commitDate.getDate() === day
              ) {
                commitCount++;
              }
            });
            console.log(commitCount);
            g.append("rect")
              .attr("x", dayX)
              .attr("y", dayY)
              .attr("width", 20)
              .attr("height", 20)
              .attr("title", formattedDate)
              .style("fill", hasCommit ? "green" : "none")
              .style("stroke", "var(--gray)")
              .style("stroke-width", 0.5)
              .style("cursor", hasCommit ? "pointer" : "default");
            g.append("text")
              .attr("x", dayX + 5)
              .attr("y", dayY + 15)
              .style("font-size", "16px")
              .style("color", "#ffffff")
              .text(commitCount === 0 ? "" : commitCount);
          }
        }

        // Draw month text
        g.append("text")
          .attr("x", x + (width / 6 - cellSize) / 2)
          .attr("y", y - 25)
          .style("text-anchor", "middle")
          .style("dominant-baseline", "central")
          .style("font-size", "20px")
          .text(getMonthName(month));
      }
    }
  };

  const getMonthName = (month: any | number) => {
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

  return commitData.length > 0 ? (
    <svg ref={svgRef}></svg>
  ) : (
    <div style={{ padding: "1rem", fontSize: "2.5rem", fontWeight: "bold" }}>
      {year}년에 commit 기록이 없습니다.
    </div>
  );
};

export default D3Calendar;
