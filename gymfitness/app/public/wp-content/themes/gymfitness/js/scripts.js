jQuery(document).ready(function ($) {
  $(".site-header .menu-principal .menu").slicknav({
    label: "",
    appendTo: ".site-header",
  });
  //Slider de los testimoniales
  $('.listado-testimoniales').bxSlider({
    auto: true,
    mode: 'fade',
    pager: false,
    controls: false
  });
});

//Posición fija para el header al hacer scroll
window.onscroll = () => {
  const scroll = window.scrollY;

  const headerNav = document.querySelector('.barra-navegacion');
  const documentBody = document.querySelector('body');
  if(scroll > 300){
    headerNav.classList.add('fixed-top');
    documentBody.classList.add('ft-activo');
  }else{
    headerNav.classList.remove('fixed-top');
    documentBody.classList.remove('ft-activo');
  }
}