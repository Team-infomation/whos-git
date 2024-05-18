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
    const width = 1000;
    const height = 400;
    const yearSpacing = 30;

    select(svgRef.current).selectAll("*").remove();

    const svg = select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    const g = svg.append("g").attr("transform", "translate(0, 0)");

    // Draw rectangles for each year
    for (let year = selectedYear; year < selectedYear + 10; year++) {
      const x = 0;
      const y =
        ((year - selectedYear) % 10) * (height / 10) +
        yearSpacing * (year - selectedYear);
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
        .style("margin-top", "20px")
        .style("font-size", "20px")
        .style("text-anchor", "middle")
        .style("dominant-baseline", "central")
        .text(year);
    }

    // Draw rectangles and text for each month of each year
    for (let year = selectedYear; year < selectedYear + 10; year++) {
      for (let month = 1; month <= 12; month++) {
        const x = ((month - 1) % 12) * (width / 12) + cellSize + 5; // 월별 간격에 5px의 여백을 추가합니다.
        const y =
          ((year - selectedYear) % 10) * (height / 10) +
          cellSize +
          yearSpacing * (year - selectedYear) +
          5; // 월별 간격에 5px의 여백을 추가합니다.
        const daysInMonth = new Date(year, month, 0).getDate();
        g.append("rect")
          .attr("x", x)
          .attr("y", y)
          .attr("width", (width / 12 - cellSize) / 2) // 일별 사각형의 가로 길이를 설정합니다.
          .attr("height", (height / 10 - cellSize) / 5) // 일별 사각형의 세로 길이를 설정합니다.
          .style("fill", "none")
          .style("stroke", "#000")
          .style("stroke-width", 1);
        // Add month text
        g.append("text")
          .attr("x", x + (width / 12 - cellSize) / 4)
          .attr("y", y - 5) // 위에 표시하므로 y 위치를 조정합니다.
          .style("text-anchor", "middle")
          .style("dominant-baseline", "central")
          .style("font-size", "12px")
          .text(getMonthName(month)); // getMonthName 함수를 사용하여 월을 텍스트로 변환합니다.

        // Draw rectangles for each day of each month
        for (let day = 1; day <= daysInMonth; day++) {
          const dayX =
            ((month - 1) % 12) * (width / 12) +
            cellSize +
            ((day - 1) % 7) * ((width / 12 - cellSize) / 7); // 월별 사각형의 가로 길이를 기준으로 나누어 각 일의 위치를 계산합니다.
          const dayY =
            ((year - selectedYear) % 10) * (height / 10) +
            cellSize +
            Math.floor((day - 1) / 7) * ((height / 10 - cellSize) / 5) + // 월별 사각형의 세로 길이를 기준으로 나누어 각 일의 위치를 계산합니다.
            yearSpacing * (year - selectedYear) +
            5; // 월별 간격에 5px의 여백을 추가합니다.
          g.append("rect")
            .attr("x", dayX)
            .attr("y", dayY)
            .attr("width", (width / 12 - cellSize) / 7) // 일별 사각형의 가로 길이를 설정합니다.
            .attr("height", height / 10 - cellSize) // 일별 사각형의 세로 길이를 설정합니다.
            .style("fill", "none")
            .style("stroke", "#000")
            .style("stroke-width", 1);
          // g.append("text")
          //   .attr("x", dayX + (width / 12 - cellSize) / 7 / 2) // 텍스트의 x 위치를 사각형의 중심으로 설정합니다.
          //   .attr("y", dayY + (height / 10 - cellSize)) // 텍스트의 y 위치를 사각형의 중심으로 설정합니다.
          //   .attr("dy", "0.35em") // 텍스트의 위치를 조정합니다.
          //   .style("text-anchor", "middle")
          //   .style("dominant-baseline", "middle")
          //   .style("font-size", "10px") // 텍스트의 크기를 조정합니다.
          //   .text(day);
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
    <div style={{ overflowX: "auto", maxWidth: "1000px" }}>
      {commitData.length > 0 ? <svg ref={svgRef}></svg> : <div>Loading...</div>}
    </div>
  );
};

export default D3Calendar;
