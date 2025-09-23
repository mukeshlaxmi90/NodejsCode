
  //  document.addEventListener("DOMContentLoaded", () => {
  //   const toast = document.getElementById("toast");
  //   if (toast) {
  //     setTimeout(() => toast.classList.add("show"), 100); // show after 0.1s
  //     setTimeout(() => toast.classList.remove("show"), 3000); // hide after 3s
  //   }
  // });
  
  // public/js/entryform.js


  document.addEventListener("DOMContentLoaded", () => {
  const toast = document.getElementById("toast");
  if (toast) {
    setTimeout(() => toast.classList.add("show"), 100); // show after 0.1s
    setTimeout(() => toast.classList.remove("show"), 3000); // hide after 3s
  }

  const dobInput = document.getElementById("dob");
  const ageInput = document.getElementById("age");

  if (dobInput && ageInput) {
    dobInput.addEventListener("change", () => {
      const dobValue = dobInput.value;
console.log("A",dobValue);
      if (dobValue) {
        const dob = new Date(dobValue);
        console.log("B",dob);
        const today = new Date();
   console.log("C",today);
        let age = today.getFullYear() - dob.getFullYear();
        const monthDiff = today.getMonth() - dob.getMonth();
console.log("D",monthDiff);
        // अगर birthday अभी नहीं आया है इस साल तो 1 साल घटा दो
        if (
          monthDiff < 0 ||
          (monthDiff === 0 && today.getDate() < dob.getDate())
        ) {
          age--;
        }

        ageInput.value = age >= 0 ? age : "";
      } else {
        ageInput.value = "";
      }
    });
  }
});
