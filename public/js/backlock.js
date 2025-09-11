// Jab user back/forward kare, to ye trigger hoga
  window.addEventListener("pageshow", function (event) {
    if (event.persisted) {
      // Agar page cache se aya hai (back/forward), to logout
      window.location.href = "/logout";
    }
  });

  // Back/forward detect
  window.addEventListener("popstate", function () {
    window.location.href = "/logout";
  });
  // Ek dummy state push karna jaruri hai
  history.pushState(null, null, location.href);