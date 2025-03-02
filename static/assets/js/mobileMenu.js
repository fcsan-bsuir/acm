document.addEventListener('DOMContentLoaded', () => {
    const sidebarButton = document.getElementById('burger-button');
    const sidebarMenu = document.querySelector('.mobile-menu');
  
    sidebarButton.addEventListener('click', (event) => {
      event.stopPropagation(); 
      sidebarMenu.classList.toggle('open'); 
    });
  
    sidebarMenu.querySelectorAll('a.mobile-menu-button').forEach(link => {
      link.addEventListener('click', (event) => {
        event.preventDefault(); 
        const targetId = link.getAttribute('href'); 
        const targetSection = document.querySelector(targetId); 
  
        if (targetSection) {
          sidebarMenu.classList.remove('open');
  
          targetSection.scrollIntoView({
            behavior: 'smooth', 
            block: 'start'       
          });
        }
      });
    });
  
    document.addEventListener('click', (event) => {
      if (!sidebarButton.contains(event.target) && !sidebarMenu.contains(event.target)) {
        sidebarMenu.classList.remove('open'); 
      }
    });
  });