<?php

//Consultas reutilizables
require get_template_directory() . '/inc/queries.php';



//Cuando el tema es activado
function gymfitness_setup(){

    //Habilitar imagenes destacadas
    add_theme_support('post-thumbnails');

    //Soporte titulos SEO
    add_theme_support('title-tag');

    //Agregar tamaños de imagen personalizados
    add_image_size('square', 350, 350, true);
    add_image_size('portrait', 350, 724, true);
    add_image_size('mediano', 700, 400, true);
    add_image_size('blog', 966, 644, true);
}
add_action('after_setup_theme', 'gymfitness_setup');

//Menú de navegación
function gymfitness_menus(){
    register_nav_menus(array(
        'menu-principal' => __('Menú Principal', 'gymfitness')
    ));
}

add_action('init', 'gymfitness_menus');

//Scripts y styles
function gymfitness_scripts_styles(){
    wp_enqueue_style('normalize',get_template_directory_uri() . '/css/normalize.css',array(),'8.0.1');
    wp_enqueue_style('googleFont', "https://fonts.googleapis.com/css2?family=Open+Sans&family=Raleway:wght@400;700;900&family=Staatliches&display=swap", array(), '1.0.0');
    wp_enqueue_style('slicknavCSS', get_template_directory_uri() . '/css/slicknav.min.css', array(), '1.0.10');
    wp_enqueue_script('slicknavJS', get_template_directory_uri() . '/js/jquery.slicknav.min.js', array('jquery'), '1.0.10', true);

    if(is_page('galeria')): //https://codex.wordpress.org/Conditional_Tags
        wp_enqueue_style('lightboxCSS', get_template_directory_uri() . '/css/lightbox.min.css', array(), '2.11.0');
        wp_enqueue_script('lightboxJS', get_template_directory_uri() . '/js/lightbox.min.js', array('jquery'), '2.11.0', true);
    endif;
    if(is_page('contacto')):
        wp_enqueue_style('leafletCSS', 'https://unpkg.com/leaflet@1.8.0/dist/leaflet.css', array(), '1.8.0', true);
        wp_enqueue_script('leafletJS', "https://unpkg.com/leaflet@1.8.0/dist/leaflet.js", array('jquery'), '1.8.0', true);
    endif;
    if(is_page('inicio')):
        wp_enqueue_style('bxSliderCSS', 'https://cdn.jsdelivr.net/bxslider/4.2.12/jquery.bxslider.css', array(), '4.2.12', true);
        wp_enqueue_script('bxSliderJS', "https://cdn.jsdelivr.net/bxslider/4.2.12/jquery.bxslider.min.js", array('jquery'), '4.2.12', true);
    endif;

    wp_enqueue_script('scripts', get_template_directory_uri() . '/js/scripts.js', array('jquery', 'slicknavJS'), '1.0.10', true);

    //Hoja de estilos principal
    wp_enqueue_style('style',get_stylesheet_uri(),array('normalize','googleFont'),'1.0.0');
}
add_action('wp_enqueue_scripts','gymfitness_scripts_styles');

//Definir widgets

function gymfitness_widgets(){
    register_sidebar(array(
        'name' => 'Sidebar 1',
        'id' => 'sidebar_1',
        'before_widget' => '<div class="widget">',
        'after_widget' => '</div>',
        'before_title' => '<h3 class="text-center texto-primario">',
        'after_title' => '</h3>'
    ));
    register_sidebar(array(
        'name' => 'Sidebar 2',
        'id' => 'sidebar_2',
        'before_widget' => '<div class="widget">',
        'after_widget' => '</div>',
        'before_title' => '<h3 class="text-center texto-primario">',
        'after_title' => '</h3>'
    ));
}


// Deshabilitar el manejo de widgets desde el editor de bloques de Gutenberg
add_filter( 'gutenberg_use_widgets_block_editor', '__return_false', 100 );
 
// Deshabilitar el editor de bloques para el manejo de widgets
add_filter( 'use_widgets_block_editor', '__return_false' );

add_action('widgets_init', 'gymfitness_widgets');

//Imagen hero

function gymfitness_hero_image(){
    //Obtener id página principal
    $frontPageID = get_option('page_on_front');
    //Obtener el id de la imagen
    $imageID = get_field('imagen_hero', $frontPageID);
    //Obtener imagen
    $imagen = wp_get_attachment_image_src($imageID, 'full')[0];

    //Style css
    wp_register_style('custom',false);
    wp_enqueue_style('custom');

    $imagenDestacadaCSS = "
        body.home .site-header {
            background-image: linear-gradient(rgba(0,0,0,0.75),rgba(0,0,0,0.75)), url($imagen);
        }
    ";
    wp_add_inline_style('custom', $imagenDestacadaCSS);
}
add_action('init', 'gymfitness_hero_image');