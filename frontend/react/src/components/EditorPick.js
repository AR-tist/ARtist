import React from "react";

function EditorPickTile({ imageUrl, title, onClick }) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ width: "175px", marginBottom: "10px", marginLeft: "20px" }}>
        <button
          style={{
            backgroundColor: "transparent",
            border: "none",
            boxShadow: "none",
          }}
          onClick={onClick}
        >
          <img src={imageUrl} alt={title} style={{ cursor: "pointer" }} />
        </button>
        <p style={{ marginTop: "10px", fontSize: "14px", color: "#333" }}>
          {title}
        </p>
      </div>
    </div>
  );
}

const EditorPick = ({ items, onEditorPickClick }) => {
  return (
    <div style={{ marginLeft: "10px", marginBottom: "10px" }}>
      <h2 style={{ marginBottom: "20px" }}>Editor's Pick</h2>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          marginLeft: "-20px",
        }}
      >
        {items.map((item, index) => (
          <EditorPickTile
            key={index}
            imageUrl={item.imageUrl}
            title={item.title}
            onClick={() => onEditorPickClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default EditorPick;
