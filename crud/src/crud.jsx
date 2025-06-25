import React, { useState, useEffect } from "react";

function Crud() {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);

  // Fetch items from backend
  useEffect(() => {
    fetch("http://localhost:4000/api/items")
      .then(res => res.json())
      .then(data => setItems(data))
      .catch(() => setItems([]));
  }, []);

  // Create
  const handleAdd = async () => {
    if (input.trim() === "") return;
    const res = await fetch("http://localhost:4000/api/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ value: input }),
    });
    if (res.ok) {
      // Refetch items
      fetch("http://localhost:4000/api/items")
        .then(res => res.json())
        .then(data => setItems(data));
      setInput("");
    }
  };

  // Edit (prepare to update)
  const handleEdit = (item) => {
    setInput(item.value);
    setEditId(item.id);
  };

  // Update
  const handleUpdate = async () => {
    if (input.trim() === "" || editId === null) return;
    const res = await fetch(`http://localhost:4000/api/items/${editId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ value: input }),
    });
    if (res.ok) {
      fetch("http://localhost:4000/api/items")
        .then(res => res.json())
        .then(data => setItems(data));
      setInput("");
      setEditId(null);
    }
  };

  // Delete
  const handleDelete = async (id) => {
    await fetch(`http://localhost:4000/api/items/${id}`, { method: "DELETE" });
    fetch("http://localhost:4000/api/items")
      .then(res => res.json())
      .then(data => setItems(data));
  };

  // Render
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
        <h2 style={{ textAlign: "center", fontSize: "2rem", marginBottom: 24 }}>CRUD Operations</h2>
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
          {editId === null ? (
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
          {items.map((item) => (
            <li
              key={item.id}
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
              <span>{item.value}</span>
              <span>
                <button
                  onClick={() => handleEdit(item)}
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
                  onClick={() => handleDelete(item.id)}
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