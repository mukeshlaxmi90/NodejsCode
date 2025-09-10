// public/js/dataview.js
function initDataView() {
  console.log("Dataview.js loaded ✅");

  const input = document.getElementById("searchInput");
  const table = document.getElementById("usersTable");
  const headers = table.querySelectorAll("th");
  const tbody = table.querySelector("tbody");


  if (!table) {
    console.warn("⚠️ usersTable not found in DOM, skipping dataview init");
    return;
  }
  // ========================================================
  // 1. 🔎 SEARCH FUNCTIONALITY
  // ========================================================
  if (input) {
    input.addEventListener("keyup", function () {
      const filter = input.value.toLowerCase().trim();
      let visibleCount = 0;
      const rows = tbody.querySelectorAll("tr");

      rows.forEach(row => {
        if (row.classList.contains("no-data") || row.classList.contains("no-match")) return;
        const text = row.textContent.toLowerCase().replace(/\s+/g, " ").trim();
        if (text.includes(filter)) {
          row.style.display = "";
          visibleCount++;
        } else {
          row.style.display = "none";
        }
      });

      let noMatchRow = tbody.querySelector(".no-match");
      if (visibleCount === 0 && filter !== "") {
        if (!noMatchRow) {
          const tr = document.createElement("tr");
          tr.classList.add("no-match");
          tr.innerHTML = `<td colspan="100%" class="no-data">No matching records found</td>`;
          tbody.appendChild(tr);
        }
      } else {
        if (noMatchRow) noMatchRow.remove();
      }
    });
  }
  // ========================================================
  // 2. 🔼🔽 SORTING FUNCTIONALITY
  // ========================================================
  headers.forEach((header, index) => {
    let ascending = true;

    header.addEventListener("click", () => {
      const rowsArray = Array.from(tbody.querySelectorAll("tr"))
        .filter(r => !r.classList.contains("no-data") && !r.classList.contains("no-match") && r.style.display !== "none");

      rowsArray.sort((a, b) => {
        const aText = a.children[index].innerText.trim().toLowerCase();
        const bText = b.children[index].innerText.trim().toLowerCase();

        if (!isNaN(aText) && !isNaN(bText)) {
          return ascending ? aText - bText : bText - aText;
        }
        return ascending ? aText.localeCompare(bText) : bText.localeCompare(aText);
      });

      rowsArray.forEach(row => tbody.appendChild(row));
      ascending = !ascending;

      headers.forEach(h => h.classList.remove("sorted-asc", "sorted-desc"));
      header.classList.add(ascending ? "sorted-asc" : "sorted-desc");
    });
  });

  // ========================================================
  // 3. ↔️ COLUMN REORDER FUNCTIONALITY
  // ========================================================
  let draggedColIndex;

  headers.forEach((header, index) => {
    header.draggable = true;

    header.addEventListener("dragstart", e => {
      draggedColIndex = index;
      e.dataTransfer.effectAllowed = "move";
      e.target.classList.add("dragging");
    });

    header.addEventListener("dragend", e => {
      e.target.classList.remove("dragging");
    });

    header.addEventListener("dragover", e => {
      e.preventDefault();
    });

    header.addEventListener("drop", e => {
      e.preventDefault();
      const targetColIndex = Array.from(headers).indexOf(e.target.closest("th"));
      if (draggedColIndex === targetColIndex || targetColIndex < 0) return;
      moveColumn(table, draggedColIndex, targetColIndex);
    });
  });

  function moveColumn(tbl, fromIndex, toIndex) {
    const rows = tbl.rows;
    for (let i = 0; i < rows.length; i++) {
      const cells = rows[i].children;
      if (toIndex < fromIndex) {
        rows[i].insertBefore(cells[fromIndex], cells[toIndex]);
      } else {
        rows[i].insertBefore(cells[fromIndex], cells[toIndex].nextSibling);
      }
    }
  }
  // ========================================================
  // 4. ↕️ ROW REORDER FUNCTIONALITY
  // ========================================================
  let draggedRow;

  tbody.querySelectorAll("tr").forEach(row => {
    row.draggable = true;

    row.addEventListener("dragstart", e => {
      draggedRow = row;
      e.dataTransfer.effectAllowed = "move";
      row.classList.add("dragging");
    });

    row.addEventListener("dragend", e => {
      row.classList.remove("dragging");
    });
    row.addEventListener("dragover", e => {
      e.preventDefault();
      const targetRow = e.target.closest("tr");
      if (targetRow && targetRow !== draggedRow) {
        const rect = targetRow.getBoundingClientRect();
        const offset = e.clientY - rect.top;
        if (offset > rect.height / 2) {
          targetRow.after(draggedRow);
        } else {
          targetRow.before(draggedRow);
        }
      }
    });
  });
}
document.addEventListener("DOMContentLoaded", initDataView);


