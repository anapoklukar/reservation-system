import React from "react";
import { Resource } from "../../types";

interface ResourceItemProps {
  resource: Resource;
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export const ResourceItem: React.FC<ResourceItemProps> = ({ resource, onToggle, onEdit, onDelete }) => {
  const handleMouseEnter = (e: React.MouseEvent<HTMLLIElement>) => {
    e.currentTarget.style.backgroundColor = "#f1f3f4";
    const icons = e.currentTarget.querySelector(".action-icons") as HTMLDivElement;
    if (icons) icons.style.display = "flex";
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLLIElement>) => {
    e.currentTarget.style.backgroundColor = "transparent";
    const icons = e.currentTarget.querySelector(".action-icons") as HTMLDivElement;
    if (icons) icons.style.display = "none";
  };

  const iconButtonStyle: React.CSSProperties = {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
    padding: "6px",
    borderRadius: "50%",
    transition: "background-color 0.2s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <li
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "6px 10px",
        borderRadius: "8px",
        marginBottom: "4px",
        position: "relative",
        cursor: "pointer",
        transition: "background 0.2s",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <input
          type="checkbox"
          checked={resource.visible}
          onChange={onToggle}
          style={{
            accentColor: resource.color,
            width: "16px",
            height: "16px",
            cursor: "pointer",
          }}
        />
        <span
          title={resource.name}
          style={{
            fontSize: "0.95em",
            userSelect: "none",
            maxWidth: "120px",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            display: "inline-block",
          }}
        >
          {resource.name}
        </span>
      </label>

      <div
        className="action-icons"
        style={{
          display: "none",
          gap: "6px",
          alignItems: "center",
          position: "absolute",
          right: "10px",
        }}
      >
        <button
          onClick={onEdit}
          style={{
            ...iconButtonStyle,
            color: "#5f6368",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#e0e0e0";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
          }}
          aria-label="Edit"
        >
          ✏️
        </button>
        <button
          onClick={onDelete}
          style={{
            ...iconButtonStyle,
            color: "#d93025",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#e0e0e0";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
          }}
          aria-label="Delete"
        >
          🗑️
        </button>
      </div>
    </li>
  );
};
