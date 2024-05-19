// MODULE
import React, { useRef, useState, useEffect } from "react";
import { select } from "d3";
import { useQuery } from "@tanstack/react-query";
// API
import { memberRepositorySelectDateCommitGET } from "../../../api/github";
// TYPE
type D3CalenderType = {
  id: string;
  repoName: string;
  year: number;
};

const useGetCommitDataList = (
  id: string,
  repoName: string,
  page: number,
  year: number
) => {
  return useQuery({
    queryKey: ["repoCommitData", id, repoName, page, year],
    queryFn: () =>
      memberRepositorySelectDateCommitGET(id, repoName, page, year),
    staleTime: 1000 * 60 * 60,
  });
};

const D3Calendar: React.FC<D3CalenderType> = ({ id, repoName, year }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [commitData, setCommitData] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const selectedYear = 2023;
  const cellSize = 15;

  const { isLoading, error, data } = useGetCommitDataList(
    id,
    repoName,
    page,
    selectedYear
  );

  useEffect(() => {
    if (!isLoading && error === null) {
      setCommitData(data?.data);
    }
    renderCalendar();
  }, [commitData, isLoading, selectedYear]);

  const renderCalendar = () => {
    const width = 1000;
    const height = 600;
    const yearSpacing = 30;

    select(svgRef.current).selectAll("*").remove();

    const svg = select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    const g = svg.append("g").attr("transform", "translate(0, 0)");

    // Draw rectangles for each year
    for (let year = selectedYear; year < selectedYear + 5; year++) {
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
    for (let year = selectedYear; year < selectedYear + 5; year++) {
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
          .style("fill", "none")
          .style("stroke", "#000")
          .style("stroke-width", 1);
        g.append("text")
          .attr("x", x + (width / 12 - cellSize) / 4)
          .attr("y", y - 5)
          .style("text-anchor", "middle")
          .style("dominant-baseline", "central")
          .style("font-size", "12px")
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
          const currentDate = new Date(year, month - 1, day); // month는 0부터 시작하므로 1을 뺍니다.
          const formattedDate = currentDate.toISOString().split("T")[0]; // ISO 형식의 날짜를 YYYY-MM-DD 형식으로 변환합니다.
          const hasCommit = commitData.some(
            (data) => data.date === formattedDate
          ); // 해당 날짜에 커밋이 있는지 확인합니다.
          g.append("rect")
            .attr("x", dayX)
            .attr("y", dayY)
            .attr("width", (width / 12 - cellSize) / 7)
            .attr("height", height / 10 - cellSize)
            .style("fill", hasCommit ? "green" : "none") // 커밋이 있는 날은 녹색으로 표시합니다.
            .style("stroke", "#000")
            .style("stroke-width", 1);
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
      {commitData.length > 0 ? <svg ref={svgRef}></svg> : <div>Loading...</div>}
    </div>
  );
};

export default D3Calendar;
