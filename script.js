document.addEventListener('DOMContentLoaded', function () {

  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', function () {

      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');

      const filterValue = this.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-categories').split(',');

        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });

    });
  });

});
