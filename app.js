const input = document.getElementById("winInput");
const addBtn = document.getElementById("addBtn");
const archiveGrid = document.querySelector(".archive-grid");
const emptyState = document.querySelector(".empty-state");

addBtn.addEventListener("click", async () => {
  const note = input.value.trim();
  if (!note) return;

  try {
    const res = await axios.post("http://localhost:5000/motivate", { note });
    const motivation = res.data.motivation;

    // Hide empty state
    emptyState.style.display = "none";

    // Show the grid
    archiveGrid.style.display = "grid";

    // Add note + motivation to archive
    const div = document.createElement("div");
    div.classList.add("archive-card");
    div.innerHTML = `
      <p class="headline">${note}</p>
      <p class="motivation">💡 ${motivation}</p>
    `;
    archiveGrid.appendChild(div);

    input.value = "";
  } catch (err) {
    console.error(err);
  }
});
