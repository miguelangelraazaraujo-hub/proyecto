document.addEventListener("DOMContentLoaded", () => {
  // --- Toggle main menu ---
  const Menu_Button = document.querySelector(".navbar-mobile-toggle");
  const Mobile_Menu = document.querySelector('[data-click-menu-id="mobile-menu"]');

  Menu_Button.addEventListener("click", (e) => {
    e.preventDefault();
    Mobile_Menu.classList.toggle("visible");
  });

  // --- Toggle submenus ---
  const Submenu_Buttons = document.querySelectorAll(".navbar-mobile-item-main");

  Submenu_Buttons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault(); // prevent navigation if the element is an <a> tag

      const Menu_Id = btn.dataset.clickMenuTarget;
      const Submenu = document.querySelector(`[data-click-menu-id="${Menu_Id}"]`);
      if (!Submenu) return;

      // --- Close other open submenus ---
      document.querySelectorAll('.navbar-mobile-item-submenu.visible').forEach(openMenu => {
        if (openMenu !== Submenu) {
          openMenu.classList.remove("visible");

          // Find the button that controls this submenu
          const Parent_Button = document.querySelector(
            `.navbar-mobile-item-main[data-click-menu-target="${openMenu.dataset.clickMenuId}"]`
          );

          if (Parent_Button) {
            const Icon_Closed = Parent_Button.querySelector(".navbar-mobile-item-icon-closed");
            const Icon_Opened = Parent_Button.querySelector(".navbar-mobile-item-icon-opened");

            if (Icon_Closed && Icon_Opened) {
              Icon_Closed.classList.remove("hidden");
              Icon_Opened.classList.remove("visible");
            }
          }
        }
      });

      // --- Toggle visibility of the current submenu ---
      Submenu.classList.toggle("visible");

      // --- Toggle icons of the current button ---
      const Icon_Closed = btn.querySelector(".navbar-mobile-item-icon-closed");
      const Icon_Opened = btn.querySelector(".navbar-mobile-item-icon-opened");

      if (Icon_Closed && Icon_Opened) {
        Icon_Closed.classList.toggle("hidden");
        Icon_Opened.classList.toggle("visible");
      }
    });
  });
});
