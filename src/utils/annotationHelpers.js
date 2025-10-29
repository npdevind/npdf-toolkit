export const createTextAnnotation = (
  text,
  pdfWidth,
  pdfHeight,
  scrollX = 0,
  scrollY = 0
) => {
  const centerX = scrollX + pdfWidth / 2 - 50;
  const centerY = scrollY + pdfHeight / 2 - 20;

  return {
    id: Date.now(),
    text,
    x: centerX,
    y: centerY,
    fontSize: 14,
    color: "#000000",
  };
};
