export const px2vw = (pixels: number, pixelTotal = 750) => {
  const vwVal = pixels / pixelTotal * 100
  return `${Math.abs(vwVal) >= 0.2 ? vwVal : 0.2}vw`;
};