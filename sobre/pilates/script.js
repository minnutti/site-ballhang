//
document.addEventListener("DOMContentLoaded", function () {
  // ------------------------------------------------------------------------
  // Efeito de scroll na navbar
  // ------------------------------------------------------------------------
  const header = document.querySelector(".header");

  function handleScroll() {
    if (header.dataset.lockedScrolled !== undefined) return;

    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", handleScroll);
  handleScroll(); // executa uma vez ao carregar, caso a página já abra rolada

  // ------------------------------------------------------------------------

  //Scroll suave quando clica no item da nav bar
  const navLinks = document.querySelectorAll('.nav a[href^="#"]');

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);
      const headerHeight = document.querySelector(".header").offsetHeight;

      const scrollToTarget = () => {
        const targetPosition = targetSection.offsetTop - headerHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      };

      const img = targetSection.querySelector("img");
      if (img && !img.complete) {
        img.addEventListener("load", scrollToTarget, { once: true });
      } else {
        scrollToTarget();
      }

      // closeMenu();
    });
  });

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Botão "Agende sua consulta" - scroll para contato
  const btnAgendar = document.querySelector(".btn-agendar");

  if (btnAgendar) {
    btnAgendar.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Animação de entrada dos cards
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  const cards = document.querySelectorAll(
    ".diferencial-card, .especialidade-card",
  );
  if (cards.length) {
    cards.forEach((card) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(30px)";
      card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      observer.observe(card);
    });
  }

  const textContent = document.querySelector(".text-content");
  if (textContent) {
    textContent.style.opacity = "0";
    textContent.style.transform = "translateX(-30px)";
    textContent.style.transition = "opacity 0.8s ease, transform 0.8s ease";
    observer.observe(textContent);
  }

  const imageContainer = document.querySelector(".image-container");
  if (imageContainer) {
    imageContainer.style.opacity = "0";
    imageContainer.style.transform = "translateX(30px)";
    imageContainer.style.transition = "opacity 0.8s ease, transform 0.8s ease";
    observer.observe(imageContainer);
  }

  const btn = document.getElementById("floatingBtn");
  const footer = document.querySelector("footer");
  const logo = document.querySelector(".logo");

  if (btn && footer) {
    function updateButtonPosition() {
      const scrollY = window.scrollY || window.pageYOffset;
      const windowHeight = window.innerHeight;
      const footerTop = footer.getBoundingClientRect().top + scrollY;
      const distanceFromBottom = scrollY + windowHeight - footerTop;

      const isMobile = window.innerWidth <= 768;

      if (scrollY > 300) {
        btn.classList.add("show");
        if (isMobile) logo.classList.add("scrolled");
      } else {
        btn.classList.remove("show");
        if (logo) logo.classList.remove("scrolled");
      }

      if (distanceFromBottom > 0) {
        btn.style.position = "absolute";
        btn.style.bottom = `${footer.offsetHeight + 10}px`;
      } else {
        btn.style.position = "fixed";
        btn.style.bottom = "2rem";
      }
    }
  }

  window.addEventListener("scroll", updateButtonPosition);
  window.addEventListener("resize", updateButtonPosition);
  updateButtonPosition();

  //header com efeito glass
  

  // Dropdown da navbar -- do Claude

  /*
  const dropdownItem = document.querySelector(".has-dropdown");
  const dropdownToggle = document.querySelector(".dropdown-toggle");

  if (dropdownToggle && dropdownItem) {
    dropdownToggle.addEventListener("click", function (e) {
      e.stopPropagation();
      const isOpen = dropdownItem.classList.toggle("active");
      this.setAttribute("aria-expanded", isOpen);
    });

    // fundo opaco na navbar
    //document.querySelector(".header").classList.toggle("dropdown-open", isOpen);

    document.addEventListener("click", function () {
      dropdownItem.classList.remove("active");
      dropdownToggle.setAttribute("aria-expanded", "false");
    });

    document.querySelector(".dropdown").addEventListener("click", function (e) {
      e.stopPropagation();
    });
  }
    */
});

/* =========================================================
   NAVBAR — MENU DESKTOP + MENU MOBILE
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector(".header");
  const navBottom = document.querySelector(".nav-bottom");

  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");

  const mobileMenu = document.querySelector("#mobile-menu");

  const dropdownItem = document.querySelector(".has-dropdown");

  const dropdownToggle = document.querySelector(".dropdown-toggle");

  const dropdown = document.querySelector(".dropdown");

  /*
  ================================
        CALCULAR HEADER HEIGHT
  ================================
  */
  function updateHeaderHeightVar() {
    if (header) {
      document.documentElement.style.setProperty(
        "--header-height",
        header.offsetHeight + "px",
      );
    }
  }

  updateHeaderHeightVar();
  window.addEventListener("resize", updateHeaderHeightVar);
  window.addEventListener("scroll", updateHeaderHeightVar);

  /* =====================================================
       MENU MOBILE
       ===================================================== */

  function closeMobileMenu() {
    if (!mobileMenu || !mobileMenuToggle) return;

    mobileMenu.classList.remove("mobile-menu-open");

    mobileMenuToggle.setAttribute("aria-expanded", "false");

    delete header.dataset.lockedScrolled;

    /* Fecha também o submenu Aulas */
    if (dropdownItem) {
      dropdownItem.classList.remove("active");
    }

    if (dropdownToggle) {
      dropdownToggle.setAttribute("aria-expanded", "false");
    }
  }

  function openMobileMenu() {
    if (!mobileMenu || !mobileMenuToggle) return;

    mobileMenu.classList.add("mobile-menu-open");

    mobileMenuToggle.setAttribute("aria-expanded", "true");

    // trava o estado visual do header no que já estava
    header.dataset.lockedScrolled = header.classList.contains("scrolled");
  }

  if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener("click", function (e) {
      e.stopPropagation();

      const isOpen = mobileMenu.classList.contains("mobile-menu-open");

      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  /* =====================================================
       DROPDOWN "AULAS"
       ===================================================== */

  if (dropdownToggle && dropdownItem) {
    dropdownToggle.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      const isOpen = dropdownItem.classList.toggle("active");

      dropdownToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }

  /* Impede o clique dentro do submenu de fechar o menu */
  if (dropdown) {
    dropdown.addEventListener("click", function (e) {
      e.stopPropagation();
    });
  }

  /* =====================================================
       FECHAR AO CLICAR EM LINKS
       ===================================================== */

  if (mobileMenu) {
    const menuLinks = mobileMenu.querySelectorAll("a:not(.dropdown-toggle)");

    menuLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        closeMobileMenu();
      });
    });
  }

  /* =====================================================
       FECHAR AO CLICAR FORA
       ===================================================== */

  document.addEventListener("click", function (e) {
    if (mobileMenu && mobileMenuToggle && !navBottom.contains(e.target)) {
      closeMobileMenu();
    }
  });

  /* =====================================================
       ESC FECHA O MENU
       ===================================================== */

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeMobileMenu();

      if (dropdownItem) {
        dropdownItem.classList.remove("active");
      }

      if (dropdownToggle) {
        dropdownToggle.setAttribute("aria-expanded", "false");
      }
    }
  });

  /* =====================================================
       SE A TELA VOLTAR PARA DESKTOP
       ===================================================== */

  window.addEventListener("resize", function () {
    if (window.innerWidth > 768) {
      closeMobileMenu();
    }
  });
});
