// MODULE
import { useLayoutEffect, useState } from "react";
import D3Calendar from "./calendar/D3Calendar";

// COMPONENT

// TYPE
type ChartContentType = {
  id: string;
  repoName: string;
  year: number;
};
const ChartContents: React.FC<ChartContentType> = ({ id, repoName }) => {
  const [year, setYear] = useState<number>(0);

  useLayoutEffect(() => {
    setYear(2023);
  });
  return (
    <>
      <div>
        <input type="text" />
      </div>
      <D3Calendar id={id} repoName={repoName} year={year} />
    </>
  );
};

export default ChartContents;
