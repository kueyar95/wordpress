<?php

function lapizzeria_setup(){

    //Gutenberg
        //Soporte a estilos por default de Gutenberg al tema
        add_theme_support('wp-block-styles');

        //Soporte a contenido completo
        add_theme_support('align-wide');

        //Paleta de colores
        add_theme_support('editor-color-palette', array(
            array(
                'name' => 'Rojo',
                'slug' => 'rojo',
                'color' => '#a61206'
            ),
            array(
                'name' => 'Naranja',
                'slug' => 'naranja',
                'color' => '#F19F30'
            ),
            array(
                'name' => 'Verde',
                'slug' => 'verde',
                'color' => '#127427'
            ),
            array(
                'name' => 'Blanco',
                'slug' => 'blanco',
                'color' => '#FFFFFF'
            ),
            array(
                'name' => 'Negro',
                'slug' => 'negro',
                'color' => '#000000'
            ),
        ));
        //Deshabilita los colores personalizados
        add_theme_support('disable-custom-colors');

    //Imágenes destacadas
    add_theme_support('post-thumbnails');

    //Tamaños de imágenes
    add_image_size('nosotros', 437, 291, true);
    add_image_size('especialidades', 768, 515, true);
    add_image_size('especialidades_portrait', 435, 526, true);
}
add_action('after_setup_theme','lapizzeria_setup');

function lapizzeria(){
    wp_enqueue_style('normalize', 'https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css', array(),'8.0.1');
    wp_enqueue_style('googlefonts', 'https://fonts.googleapis.com/css2?family=Open+Sans&family=Raleway:wght@400;700;900&display=swap', array(), '1.0.0');

    wp_enqueue_style('slicknavCSS', 'https://cdnjs.cloudflare.com/ajax/libs/SlickNav/1.0.10/slicknav.min.css', array('normalize'), '1.0.10');
    wp_enqueue_script('slicknavJS', 'https://cdnjs.cloudflare.com/ajax/libs/SlickNav/1.0.10/jquery.slicknav.min.js', array('jquery'), '1.0.10', true);
    
    wp_enqueue_style('style', get_stylesheet_uri(), array('normalize'), '1.0.0');
    wp_enqueue_script('scripts', get_template_directory_uri() . '/js/scripts.js', array('jquery'), '1.0.0', true);
    
}
add_action('wp_enqueue_scripts', 'lapizzeria');

//Menús

function lapizzeria_menus(){
    register_nav_menus(array(
        'header_menu' => 'Header Menu',
        'redes-sociales' => 'Redes Sociales'
    ));
}
add_action('init', 'lapizzeria_menus');

//Zona de widgets
function lapizzeria_widgets(){
    register_sidebar(array(
        'name' => 'Blog Sidebar',
        'id' => 'blog_sidebar',
        'before_widget' => '<div class="widget">',
        'after_widget' => '</div>',
        'before_title' => '<h3>',
        'after_title' => '</h3>'
    ));
}
add_action('widgets_init', 'lapizzeria_widgets');

//Agregar botones paginador
function lapizzeria_botones_paginador(){
    return 'class="boton boton-secundario"';
}
add_filter('next_posts_link_attributes', 'lapizzeria_botones_paginador');
add_filter('previous_posts_link_attributes','lapizzeria_botones_paginador');