const input = document.getElementById("winInput");
const addBtn = document.getElementById("addBtn");
const archiveGrid = document.querySelector(".archive-grid");
const emptyState = document.querySelector(".empty-state");
const loadingEl = document.getElementById("loading");

// Load saved notes from localStorage
window.addEventListener("DOMContentLoaded", loadSavedNotes);

// Function to add a note
async function addNote() {
  const note = input.value.trim();
  if (!note) return;

  setLoading(true);

  try {
    const { data } = await axios.post(
      "https://cheerup-backend.onrender.com/motivate",
      {
        note,
      }
    );
    const motivation = data.motivation;

    // Save to localStorage
    saveNoteToLocalStorage(note, motivation);

    // Add to UI
    renderNoteCard(note, motivation);

    input.value = "";
  } catch (err) {
    console.error("Error posting motivation note:", err);
    alert("Something went wrong. Please try again.");
  } finally {
    setLoading(false);
  }
}

// Render a note card
function renderNoteCard(note, motivation) {
  emptyState.style.display = "none";
  archiveGrid.style.display = "grid";

  const card = document.createElement("div");
  card.className = "archive-card";
  card.innerHTML = `
    <p class="headline">${escapeHTML(note)}</p>
    <p class="motivation">💡 ${escapeHTML(motivation)}</p>
  `;

  archiveGrid.appendChild(card);
}

// Save note to localStorage
function saveNoteToLocalStorage(note, motivation) {
  const notes = JSON.parse(localStorage.getItem("motivations")) || [];
  notes.push({ note, motivation });
  localStorage.setItem("motivations", JSON.stringify(notes));
}

// Load saved notes on page load
function loadSavedNotes() {
  const notes = JSON.parse(localStorage.getItem("motivations")) || [];
  if (notes.length > 0) {
    emptyState.style.display = "none";
    archiveGrid.style.display = "grid";
  }
  notes.forEach(({ note, motivation }) => renderNoteCard(note, motivation));
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

/**
 * Toggles the loading state of the UI.
 * - When `isLoading` is true:
 *   - Shows the loading spinner
 *   - Disables the input and button
 *   - Changes button text to "Generating..."
 * - When `isLoading` is false:
 *   - Hides the loading spinner
 *   - Re-enables the input and button
 *   - Resets button text to "Add"
 */
function setLoading(isLoading) {
  if (isLoading) {
    loadingEl.classList.remove("hidden");
    addBtn.disabled = true;
    addBtn.textContent = "Generating...";
    input.disabled = true;
  } else {
    loadingEl.classList.add("hidden");
    addBtn.disabled = false;
    addBtn.textContent = "Add";
    input.disabled = false;
  }
}
