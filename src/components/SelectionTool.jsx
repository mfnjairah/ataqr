import React, { useState, useRef } from "react";

const SelectionTool = () => {
  const [selection, setSelection] = useState(null);
  const containerRef = useRef(null);

  const handleMouseDown = (e) => {
    const startX = e.clientX;
    const startY = e.clientY;

    setSelection({
      startX,
      startY,
      endX: startX,
      endY: startY,
    });
  };

  const handleMouseMove = (e) => {
    if (selection) {
      setSelection({
        ...selection,
        endX: e.clientX,
        endY: e.clientY,
      });
    }
  };

  const handleMouseUp = () => {
    console.log("Selected area:", selection);
    setSelection(null);
  };

  return (
    <div
      ref={containerRef}
      style={{ position: "relative", width: "100%", height: "100%" }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {selection && (
        <div
          style={{
            position: "absolute",
            border: "1px dashed #000",
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            left: Math.min(selection.startX, selection.endX),
            top: Math.min(selection.startY, selection.endY),
            width: Math.abs(selection.endX - selection.startX),
            height: Math.abs(selection.endY - selection.startY),
          }}
        />
      )}

      <div>This is selectable</div>
      <div>Another selection</div>
    </div>
  );
};

export default SelectionTool;
