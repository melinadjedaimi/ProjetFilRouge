document.addEventListener('DOMContentLoaded', () => {

  // ===================================
  // EXERCICE 1 : Afficher/masquer sections
  // ===================================
  const sections = document.querySelectorAll('.movie-section');

  sections.forEach((section) => {
    // Création du bouton de bascule
    const toggleBtn = document.createElement('button');
    toggleBtn.textContent = 'Masquer';
    toggleBtn.className = 'btn btn-sm btn-outline-secondary mb-3 ms-2';
    toggleBtn.setAttribute('aria-expanded', 'true');

    // Insertion du bouton près du titre de la section
    const title = section.querySelector('h2');
    if (title) {
      title.after(toggleBtn);
    }

    // Événement au clic
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation(); // Évite les conflits de clics
      const grid = section.querySelector('.row');

      if (grid) {
        const isHidden = grid.classList.toggle('hidden');
        toggleBtn.textContent = isHidden ? 'Afficher' : 'Masquer';
        toggleBtn.setAttribute('aria-expanded', String(!isHidden));
      }
    });
  });


  // ===================================
  // EXERCICE 2 : Compteur de films
  // ===================================
  const totalMovies = document.querySelectorAll('article').length;
  const footerContainer = document.querySelector('footer .container, footer');

  if (footerContainer) {
    const counterP = document.createElement('p');
    counterP.className = 'mt-2 fw-bold text-danger';
    counterP.textContent = `Catalogue : ${totalMovies} films disponibles`;
    footerContainer.appendChild(counterP);
  }


  // ===================================
  // EXERCICE 3 : Films vus
  // ===================================
  const movieCards = document.querySelectorAll('article');

  movieCards.forEach((card) => {
    card.addEventListener('click', (e) => {
      // Ignorer si le clic provient du bouton "Plus d'infos" ou de la modal
      if (e.target.closest('.btn') || e.target.closest('.modal')) return;

      card.classList.toggle('watched');
      const title = card.querySelector('h3');
      if (title) openModal(title.textContent);
    });
  });


  // ===================================
  // EXERCICE 4 : Recherche simple
  // ===================================
  const searchInput = document.querySelector('#search');
  const noResults = document.querySelector('#no-results');

  if (searchInput) {
    searchInput.closest('form')?.addEventListener('submit', (event) => event.preventDefault());

    searchInput.addEventListener('input', function () {
      const searchTerm = this.value.toLowerCase().trim();
      const articles = document.querySelectorAll('article');
      let foundCount = 0;

      articles.forEach((article) => {
        const titleElement = article.querySelector('h3');
        const title = titleElement ? titleElement.textContent.toLowerCase() : '';

        // Masquer la colonne parente ou l'article
        const cardContainer = article.closest('.col') || article;

        if (title.includes(searchTerm)) {
          cardContainer.style.display = '';
          foundCount++;
        } else {
          cardContainer.style.display = 'none';
        }
      });

      noResults?.classList.toggle('d-none', foundCount > 0);
    });
  }


  // ===================================
  // EXERCICE 5 : Modal simple
  // ===================================
  const modal = document.querySelector('#modal');
  const modalBody = document.querySelector('#modal-body');
  const closeBtn = document.querySelector('.close');

  function openModal(title) {
    if (modal && modalBody) {
      modalBody.innerHTML = `<h2 class="h4 text-danger mb-3">${title}</h2><p>Détails et fiche complète du film en cours de chargement...</p>`;
      modal.style.display = 'block';
    }
  }

  function closeModal() {
    if (modal) {
      modal.style.display = 'none';
    }
  }

  // Événement de fermeture
  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  // Fermer la modal en cliquant à l'extérieur
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });


  // ===================================
  // EXERCICE 6 (Bonus) : Changement de thème
  // ===================================
  const headerActions = document.querySelector('.navbar .d-flex, .user-actions');

  if (headerActions) {
    const themeBtn = document.createElement('button');
    themeBtn.className = 'btn btn-sm btn-outline-light ms-2';
    themeBtn.textContent = '☀️ Mode clair';

    themeBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark-theme');
      const isDark = document.body.classList.contains('dark-theme');
      document.body.classList.toggle('light-theme', !isDark);
      themeBtn.textContent = isDark ? '☀️ Mode clair' : '🌙 Mode sombre';
    });

    headerActions.appendChild(themeBtn);
  }

});