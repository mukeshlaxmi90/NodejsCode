 function showLoader() {
      document.getElementById("loaderOverlay").style.display = "flex";
    }
    function hideLoader() {
      document.getElementById("loaderOverlay").style.display = "none";
    }    
  // Sidebar ke sabhi <a> links pe loader lagana
  // document.addEventListener("DOMContentLoaded", function () {
  //   const sidebarLinks = document.querySelectorAll("#sidebar a");

  //   sidebarLinks.forEach(link => {
  //     link.addEventListener("click", function (e) {
  //       // Agar link dummy hai (# ya javascript:void(0)) toh prevent karega
  //       const href = link.getAttribute("href");
  //       if (href === "#" || href === "" || href.startsWith("javascript")) {
  //         e.preventDefault();
  //       }

  //       // Loader show karega
  //       showLoader();

  //       // Example: 2 sec ke baad loader hide (yaha aap actual page load hone par bhi hide kar sakte ho)
  //       setTimeout(() => {
  //         hideLoader();
  //         // Agar aapko redirect karna hai toh:
  //         // if (href && href !== "#" && !href.startsWith("javascript")) {
  //         //   window.location.href = href;
  //         // }
  //       }, 2000);
  //     });
  //   });
  // });

   document.addEventListener("DOMContentLoaded", function () {
    const reportsLink = document.querySelector('a[data-page="Dataview"]');
    
    if (reportsLink) {
      reportsLink.addEventListener("click", function (e) {
        e.preventDefault();

        // Loader show karo
        showLoader();
        // Actual Reports page pe redirect karo (jo EJS render karega)
        window.location.href = "/page/Dataview";  // <-- apna actual route lagaiye
      });
    }
  });

  // Jab page load complete ho jaye, loader hide ho jaye
  window.addEventListener("load", function () {
    hideLoader();
  });