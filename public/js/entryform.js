
   document.addEventListener("DOMContentLoaded", () => {
    const toast = document.getElementById("toast");
    if (toast) {
      setTimeout(() => toast.classList.add("show"), 100); // show after 0.1s
      setTimeout(() => toast.classList.remove("show"), 3000); // hide after 3s
    }
  });
