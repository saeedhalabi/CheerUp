const input = document.getElementById("winInput");
const addBtn = document.getElementById("addBtn");
const archiveGrid = document.querySelector(".archive-grid");
const emptyState = document.querySelector(".empty-state");

// Function to add a note
async function addNote() {
  const note = input.value.trim();
  if (!note) return;

  try {
    const { data } = await axios.post("http://localhost:5000/motivate", {
      note,
    });
    const motivation = data.motivation;

    emptyState.style.display = "none";
    archiveGrid.style.display = "grid";

    const card = document.createElement("div");
    card.className = "archive-card";
    card.innerHTML = `
      <p class="headline">${escapeHTML(note)}</p>
      <p class="motivation">💡 ${escapeHTML(motivation)}</p>
    `;

    archiveGrid.appendChild(card);
    input.value = "";
  } catch (err) {
    console.error("Error posting motivation note:", err);
    alert("Something went wrong. Please try again.");
  }
}

// Click handler
addBtn.addEventListener("click", addNote);

// Pressing Enter should trigger the same thing
input.addEventListener("keypress", e => {
  if (e.key === "Enter") {
    addNote();
  }
});

// Basic XSS protection
function escapeHTML(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}
