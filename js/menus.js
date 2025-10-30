document.addEventListener("DOMContentLoaded", () => {
  // --- Toggle main menu ---
  const menuButton = document.querySelector(".navbar-mobile-toggle");
  const mobileMenu = document.querySelector('[data-click-menu-id="mobile-menu"]');

  menuButton.addEventListener("click", (e) => {
    e.preventDefault();
    mobileMenu.classList.toggle("visible");
  });

  // --- Toggle submenus ---
  const submenuButtons = document.querySelectorAll(".navbar-mobile-item-main");

  submenuButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault(); // prevent navigation if the element is an <a> tag

      const menuId = btn.dataset.clickMenuTarget;
      const submenu = document.querySelector(`[data-click-menu-id="${menuId}"]`);
      if (!submenu) return;

      // --- Close other open submenus ---
      document.querySelectorAll('.navbar-mobile-item-submenu.visible').forEach(openMenu => {
        if (openMenu !== submenu) {
          openMenu.classList.remove("visible");

          // Find the button that controls this submenu
          const parentButton = document.querySelector(
            `.navbar-mobile-item-main[data-click-menu-target="${openMenu.dataset.clickMenuId}"]`
          );

          if (parentButton) {
            const iconClosed = parentButton.querySelector(".navbar-mobile-item-icon-closed");
            const iconOpened = parentButton.querySelector(".navbar-mobile-item-icon-opened");

            if (iconClosed && iconOpened) {
              iconClosed.classList.remove("hidden");
              iconOpened.classList.remove("visible");
            }
          }
        }
      });

      // --- Toggle visibility of the current submenu ---
      submenu.classList.toggle("visible");

      // --- Toggle icons of the current button ---
      const iconClosed = btn.querySelector(".navbar-mobile-item-icon-closed");
      const iconOpened = btn.querySelector(".navbar-mobile-item-icon-opened");

      if (iconClosed && iconOpened) {
        iconClosed.classList.toggle("hidden");
        iconOpened.classList.toggle("visible");
      }
    });
  });
});
