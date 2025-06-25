import React, { useState, useEffect } from "react";

function Crud() {
  const [items, setItems] = useState(() => {
    // Load from localStorage on first render
    const saved = localStorage.getItem("crud-items");
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  // Save to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem("crud-items", JSON.stringify(items));
  }, [items]);

  // Create
  const handleAdd = () => {
    if (input.trim() === "") return;
    setItems([...items, input]);
    setInput("");
  };

  // Update
  const handleEdit = (index) => {
    setInput(items[index]);
    setEditIndex(index);
  };

  const handleUpdate = () => {
    if (input.trim() === "") return;
    const updated = [...items];
    updated[editIndex] = input;
    setItems(updated);
    setInput("");
    setEditIndex(null);
  };

  // Delete
  const handleDelete = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  // Read (render)
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f5f5f5",
        boxSizing: "border-box",
        padding: 0,
        margin: 0,
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "3rem 4rem",
          borderRadius: "20px",
          boxShadow: "0 4px 32px rgba(0,0,0,0.12)",
          minWidth: 480,
          maxWidth: "90vw",
        }}
      >
        <h2 style={{ textAlign: "center", fontSize: "2rem", marginBottom: 24 }}>CRUD Operations </h2>
        <div style={{ display: "flex", marginBottom: 20 }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter item"
            style={{
              flex: 1,
              fontSize: "1.2rem",
              padding: "0.5rem 1rem",
              borderRadius: 6,
              border: "1px solid #ccc",
              marginRight: 10,
            }}
          />
          {editIndex === null ? (
            <button
              onClick={handleAdd}
              style={{
                fontSize: "1.1rem",
                padding: "0.5rem 1.2rem",
                borderRadius: 6,
                border: "none",
                background: "#1976d2",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              Add
            </button>
          ) : (
            <button
              onClick={handleUpdate}
              style={{
                fontSize: "1.1rem",
                padding: "0.5rem 1.2rem",
                borderRadius: 6,
                border: "none",
                background: "#388e3c",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              Update
            </button>
          )}
        </div>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {items.map((item, idx) => (
            <li
              key={idx}
              style={{
                margin: "12px 0",
                fontSize: "1.2rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottom: "1px solid #eee",
                paddingBottom: 6,
              }}
            >
              <span>{item}</span>
              <span>
                <button
                  onClick={() => handleEdit(idx)}
                  style={{
                    marginLeft: 8,
                    fontSize: "1rem",
                    padding: "0.3rem 0.8rem",
                    borderRadius: 5,
                    border: "none",
                    background: "#ffb300",
                    color: "#fff",
                    cursor: "pointer",
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(idx)}
                  style={{
                    marginLeft: 6,
                    fontSize: "1rem",
                    padding: "0.3rem 0.8rem",
                    borderRadius: 5,
                    border: "none",
                    background: "#d32f2f",
                    color: "#fff",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Crud;