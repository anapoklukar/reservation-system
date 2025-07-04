import React from "react";

interface TruncatedTextProps {
  text: string;
  maxWidth?: string;
  fontSize?: string;
  fontWeight?: string | number;
  color?: string;
  marginBottom?: string;
  paddingRight?: string;
  className?: string;
}

export const TruncatedText: React.FC<TruncatedTextProps> = ({
  text,
  maxWidth = "300px",
  fontSize = "1em",
  fontWeight = "normal",
  color = "inherit",
  marginBottom = "0",
  paddingRight = "0",
  className = "",
}) => {
  return (
    <div
      title={text}
      className={className}
      style={{
        fontWeight,
        fontSize,
        color,
        marginBottom,
        paddingRight,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        maxWidth,
      }}
    >
      {text}
    </div>
  );
};
