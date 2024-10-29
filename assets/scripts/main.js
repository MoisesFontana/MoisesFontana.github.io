/************************************************************************/
//** DETECTA O ITEM DE MENU CORRESPONDENTE A SEÇÃO ATUAL E DESTACA ELE **/
/************************************************************************/

document.addEventListener("DOMContentLoaded", () => {
   const sections = document.querySelectorAll("section");
   const menuItems = document.querySelectorAll(".nav-list li a");


   const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
         if (entry.isIntersecting) {
            // Remove 'active' from all menu items
            menuItems.forEach(item => item.classList.remove("active"));

            // Add 'active' to the current menu item
            const id = entry.target.getAttribute("id");
            const menuItem = document.querySelector(`.nav-list li a[href="#${id}"]`);
            if (menuItem) {
               menuItem.classList.add("active");
            }
         }
      });
   }, {
      threshold: 0.6 // Trigger when 60% of the section is visible
   });

   sections.forEach(section => {
      observer.observe(section);
   });
});

//***********************************************************************/
//** MUDA O TEMA DA PÁGINA - DARK/LIGHT MODE ****************************/
//** PERSISTE A ESCOLHA DO USUÁRIO NO LOCALSTORAGE **********************/
//***********************************************************************/
const darkLightCheckbox = document.querySelector('.dark-light-toggle input');
const logoImage = document.querySelector('.logo img');

// Função para aplicar o modo salvo no localStorage
function applySavedMode() {
   const savedMode = localStorage.getItem('mode');

   if (savedMode === 'light') {
      document.body.classList.remove('dark-mode');
      document.body.classList.add('light-mode');
      darkLightCheckbox.checked = true;
      logoImage.src = 'assets/images/logo-black.svg';
   } else {
      document.body.classList.remove('light-mode');
      document.body.classList.add('dark-mode');
      darkLightCheckbox.checked = false;
      logoImage.src = 'assets/images/logo-blue.svg';
   }
}

// Adiciona evento para alternar o modo e salvar a escolha no localStorage
darkLightCheckbox.addEventListener('click', () => {
   if (darkLightCheckbox.checked) {
      document.body.classList.remove('dark-mode');
      document.body.classList.add('light-mode');
      logoImage.src = 'assets/images/logo-black.svg';
      localStorage.setItem('mode', 'light');
   } else {
      document.body.classList.remove('light-mode');
      document.body.classList.add('dark-mode');
      logoImage.src = 'assets/images/logo-blue.svg';
      localStorage.setItem('mode', 'dark');
   }
});

// Aplica o modo salvo quando a página carrega
applySavedMode();
