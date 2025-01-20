import { useState } from "react";

function CreateTodo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div>
      <input
        style={{
          padding: 10,
          margin: 10,
        }}
        value={title} // Bind input value to state
        onChange={(e) => setTitle(e.target.value)} // Update state
        type="text"
        placeholder="Title"
      />
      <br />
      <input
        style={{
          padding: 10,
          margin: 10,
        }}
        value={description} // Bind input value to state
        onChange={(e) => setDescription(e.target.value)} // Update state
        type="text"
        placeholder="Description"
      />
      <br />
      <button
        onClick={() => {
          // Validate input
          if (!title || !description) {
            alert("Both fields are required!");
            return;
          }

          // Send POST request
          fetch("http://localhost:3000/todos", {
            method: "POST",
            body: JSON.stringify({ title, description }),
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then(async (res) => {
              if (res.ok) {
                const data = await res.json();
                console.log(data);
                alert("Todo added successfully");
                setTitle(""); // Clear title
                setDescription(""); // Clear description
              } else {
                alert("Failed to add todo");
              }
            })
            .catch((err) => console.error("Error:", err));
        }}
        style={{
          padding: 10,
          margin: 10,
        }}
      >
        Add a Todo
      </button>
    </div>
  );
}

export default CreateTodo;
