const sidebar = document.getElementById('sidebar');
const toggleBtn = document.getElementById('toggleSidebar');
const parents = Array.from(document.querySelectorAll('.item.has-children'));
const mainContent = document.querySelector('.main'); // OR '.main-content' agar class add karoge

// Sidebar toggle button click
toggleBtn.addEventListener('click', () => {
  sidebar.classList.toggle('collapsed');
  // Clean up submenu states
  parents.forEach(p => p.classList.remove('show-flyout', 'open'));
});

// Parent item click (accordion / flyout)
parents.forEach(item => {
  const link = item.querySelector('.link');
  link.addEventListener('click', (e) => {
    e.preventDefault();
    if (sidebar.classList.contains('collapsed')) {
      // Collapsed mode: stable flyout
      const isShown = item.classList.contains('show-flyout');
      parents.forEach(p => p.classList.remove('show-flyout'));
      if (!isShown) item.classList.add('show-flyout');
    } else {
      // Expanded mode: accordion open
      const isOpen = item.classList.contains('open');
      parents.forEach(p => p.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    }
  });
});

// Click outside sidebar -> close flyout
document.addEventListener('click', (e) => {
  if (!sidebar.contains(e.target) && sidebar.classList.contains('collapsed')) {
    parents.forEach(p => p.classList.remove('show-flyout'));
  }
});

// Submenu link click -> load page dynamically
document.querySelectorAll('.submenu a').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const page = link.getAttribute('data-page');
    if (!page) return;

    fetch(`/page/${page}`)
      .then(res => res.text())
      .then(html => {
        mainContent.innerHTML = html;
      })
      .catch(err => {
        mainContent.innerHTML = "<h2>Page not found</h2>";
      });
  });
});
