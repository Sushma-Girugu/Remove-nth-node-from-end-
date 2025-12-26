const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

/* Serve frontend files */
app.use(express.static(path.join(__dirname, "../frontend")));

/* API to explain Remove Nth Node from End */
app.get("/api/info", (req, res) => {
  res.json({
    algorithm: "Remove Nth Node From End of Linked List",
    technique: "Two Pointer Technique",
    explanation: [
      "Initialize two pointers fast and slow at the head",
      "Move fast pointer n steps ahead to create a fixed gap",
      "Move both fast and slow pointers together",
      "When fast reaches the end, slow is just before the target node",
      "Remove the node by changing slow.next to slow.next.next",
      "Return the updated linked list"
    ]
  });
});

/* Default route */
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

/* Start server */
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
