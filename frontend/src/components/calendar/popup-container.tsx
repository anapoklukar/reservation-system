import React, { forwardRef } from "react";

interface PopupContainerProps {
  x: number;
  y: number;
  minWidth?: string;
  maxWidth?: string;
  zIndex?: number;
  children: React.ReactNode;
}

export const PopupContainer = forwardRef<HTMLDivElement, PopupContainerProps>(
  ({ x, y, minWidth = "220px", maxWidth = "400px", zIndex = 1000, children }, ref) => {
    return (
      <div
        ref={ref}
        style={{
          position: "fixed",
          top: y,
          left: x,
          backgroundColor: "#fefefe",
          border: "1px solid #ccc",
          padding: "12px 16px",
          borderRadius: "8px",
          zIndex,
          minWidth,
          maxWidth,
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          fontSize: "0.85em",
          fontFamily: "sans-serif",
        }}
      >
        {children}
      </div>
    );
  }
);

PopupContainer.displayName = "PopupContainer";
