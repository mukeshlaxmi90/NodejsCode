document.addEventListener("DOMContentLoaded", function () {
  console.log("✅ datainsert.js loaded");

  const btn = document.getElementById("testBtn");
  if (btn) {
    btn.addEventListener("click", function () {
      alert("🎉 Button clicked! This alert is working.");
    });
  } else {
    console.error("❌ Button not found!");
  }
});
