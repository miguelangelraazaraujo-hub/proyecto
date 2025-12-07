document.addEventListener("DOMContentLoaded", () => {
  // --- Toggle main menu ---
  const MENU_BUTTON = document.querySelector(".navbar-mobile-toggle");
  const MOBILE_MENU = document.querySelector('[data-click-menu-id="mobile-menu"]');

  MENU_BUTTON.addEventListener("click", (e) => {
    e.preventDefault();
    MOBILE_MENU.classList.toggle("visible");
  });

  // --- Toggle SUBMENUs ---
  const SUBMENU_BUTTONS = document.querySelectorAll(".navbar-mobile-item-main");

  SUBMENU_BUTTONS.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault(); // prevent navigation if the element is an <a> tag

      const MENU_ID = btn.dataset.clickMenuTarget;
      const SUBMENU = document.querySelector(`[data-click-menu-id="${MENU_ID}"]`);
      if (!SUBMENU) return;

      // --- Close other open SUBMENUs ---
      document.querySelectorAll('.navbar-mobile-item-SUBMENU.visible').forEach(openMenu => {
        if (openMenu !== SUBMENU) {
          openMenu.classList.remove("visible");

          // Find the button that controls this SUBMENU
          const PARENT_BUTTON = document.querySelector(
            `.navbar-mobile-item-main[data-click-menu-target="${openMenu.dataset.clickMenuId}"]`
          );

          if (PARENT_BUTTON) {
            const ICON_CLOSED = PARENT_BUTTON.querySelector(".navbar-mobile-item-icon-closed");
            const ICON_OPENED = PARENT_BUTTON.querySelector(".navbar-mobile-item-icon-opened");

            if (ICON_CLOSED && ICON_OPENED) {
              ICON_CLOSED.classList.remove("hidden");
              ICON_OPENED.classList.remove("visible");
            }
          }
        }
      });

      // --- Toggle visibility of the current SUBMENU ---
      SUBMENU.classList.toggle("visible");

      // --- Toggle icons of the current button ---
      const ICON_CLOSED = btn.querySelector(".navbar-mobile-item-icon-closed");
      const ICON_OPENED = btn.querySelector(".navbar-mobile-item-icon-opened");

      if (ICON_CLOSED && ICON_OPENED) {
        ICON_CLOSED.classList.toggle("hidden");
        ICON_OPENED.classList.toggle("visible");
      }
    });
  });
});
