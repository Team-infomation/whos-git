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
