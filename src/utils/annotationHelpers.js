export const createTextAnnotation = (text, x, y) => {
  return {
    id: Date.now(),
    text,
    x,
    y,
    fontSize: 16,
    fontFamily: "Arial",
    fontWeight: "normal",
    fontStyle: "normal",
    color: "#000000",
  };
};
