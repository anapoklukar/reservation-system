import React from "react";
import { Resource } from "../../types";
import { ResourceItem } from "./resource-item";
import { AddCircleButton } from "./add-resource-button";

interface ResourceListProps {
  resources: Resource[];
  onToggleResource: (id: number) => void;
  onEditResource: (resource: Resource) => void;
  onDeleteResource: (resource: Resource) => void;
  onAddResource: () => void;
}

export const ResourceList: React.FC<ResourceListProps> = ({
  resources,
  onToggleResource,
  onEditResource,
  onDeleteResource,
  onAddResource,
}) => {
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "0.5rem",
        }}
      >
        <h3 style={{ margin: 0 }}>Resources</h3>
        <AddCircleButton onClick={onAddResource} />
      </div>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {resources.map((resource) => (
          <ResourceItem
            key={resource.id}
            resource={resource}
            onToggle={() => onToggleResource(resource.id)}
            onEdit={() => onEditResource(resource)}
            onDelete={() => onDeleteResource(resource)}
          />
        ))}
      </ul>
    </div>
  );
};
