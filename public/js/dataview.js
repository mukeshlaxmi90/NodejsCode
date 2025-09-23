// public/js/dataview.js
function initDataView() {
  console.log("Dataview.js loaded ✅");
  const input = document.getElementById("searchInput");
  const table = document.getElementById("usersTable");
  const headers = table.querySelectorAll("th");
  const tbody = table.querySelector("tbody");
  const paginationContainer = document.getElementById("pagination");

  if (!table) {
    console.warn("⚠️ usersTable not found in DOM, skipping dataview init");
    return;
  }

  // ==========================
  // VARIABLES
  // ==========================
  let currentPage = 1;
  const rowsPerPage = 10;
  let filteredRows = Array.from(tbody.querySelectorAll("tr")).filter(
    row => !row.classList.contains("no-data")
  );

  // ==========================
  // UPDATE SERIAL NUMBERS
  // ==========================
  function updateSerialNumbers() {
    filteredRows.forEach((row, index) => {
      if (row.children[0]) row.children[0].textContent = index + 1;
    });
  }
  // ==========================
  // SEARCH FUNCTIONALITY
  // ==========================
  if (input) {
  input.addEventListener("keyup", function () {
    const filter = input.value.toLowerCase().trim();

    // Recalculate filteredRows
    filteredRows = Array.from(tbody.querySelectorAll("tr")).filter(
      row => !row.classList.contains("no-data")
    );

    let visibleCount = 0;

    filteredRows.forEach(row => {
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
      filteredRows = [];
    } else {
      if (noMatchRow) noMatchRow.remove();
      // Keep only visible rows for pagination
      filteredRows = Array.from(tbody.querySelectorAll("tr")).filter(
        row => !row.classList.contains("no-data") && row.style.display !== "none"
      );
    }
    currentPage = 1; // reset page to first
    renderPage();
  });
}
  // ==========================
  // SORTING FUNCTIONALITY
  // ==========================
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

      updateSerialNumbers();
      renderPage();
    });
  });

  // ==========================
  // COLUMN REORDER FUNCTIONALITY
  // ==========================
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

    header.addEventListener("dragover", e => e.preventDefault());

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

  // ==========================
  // ROW REORDER FUNCTIONALITY
  // ==========================
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
      updateSerialNumbers();
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

  // ==========================
  // PAGINATION
  // ==========================
  function renderPagination() {
    paginationContainer.innerHTML = "";

    const totalPages = Math.ceil(filteredRows.length / rowsPerPage);
    if (totalPages <= 1) return;

    const prevBtn = document.createElement("button");
    prevBtn.textContent = "⬅️";
    prevBtn.disabled = currentPage === 1;
    prevBtn.addEventListener("click", () => {
      currentPage--;
      renderPage();
    });
    paginationContainer.appendChild(prevBtn);

    // Page number buttons
    for (let i = 1; i <= totalPages; i++) {
      const btn = document.createElement("button");
      btn.textContent = i;
      if (i === currentPage) btn.classList.add("active-page");
      btn.addEventListener("click", () => {
        currentPage = i;
        renderPage();
      });
      paginationContainer.appendChild(btn);
    }

    const nextBtn = document.createElement("button");
    nextBtn.textContent = "➡️";
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.addEventListener("click", () => {
      currentPage++;
      renderPage();
    });
    paginationContainer.appendChild(nextBtn);
  }

  function renderPage() {
    const start = (currentPage - 1) * rowsPerPage;
    const end = currentPage * rowsPerPage;

    filteredRows.forEach((row, index) => {
      row.style.display = index >= start && index < end ? "" : "none";
    });

    updateSerialNumbers();
    renderPagination();
  }

  // INITIAL RENDER
  renderPage();
}

document.addEventListener("DOMContentLoaded", initDataView);
