export function VolumeCalc(size: number, type: string) {
  if (type.toLowerCase() === "byte") {
    const calc = size > 1000 ? (size / 1000).toFixed(2) + "MB" : size + "Byte";
    return calc;
  } else if (type.toLowerCase() === "mb") {
    const calc = size > 1000 ? (size / 1000).toFixed(2) + "GB" : size + "MB";
    return calc;
  } else if (type.toLowerCase() === "gb") {
    const calc = size > 1000 ? (size / 1000).toFixed(2) + "TB" : size + "GB";
    return calc;
  }
}

export function DateFormChange(date: string) {
  const dateTime = new Date(date);

  // const formatDate =
  //   dateTime.toLocaleDateString("ko-KR", {
  //     hour12: false,
  //     minuteZeroPad: true,
  //   }) +
  //   " " +
  //   dateTime.toLocaleTimeString("ko-KR", {
  //     hour12: false,
  //     minuteZeroPad: true,
  //   });

  // console.log(formatDate);
  // return formatDate;
  const years = dateTime.getFullYear();
  const months = dateTime.getMonth() + 1;
  const days = dateTime.getDate();
  const hours = dateTime.getHours();
  const minutes = dateTime.getMinutes();
  const seconds = dateTime.getSeconds();
  return `${years}년 ${months}월 ${days}일 ${hours}:${minutes}:${seconds}`;
}
