<?php
/*
    Plugin Name: La Pizzeria Gutenberg Blocks
    Plugin URI:
    Description: Agrega bloques de Gutenberg nativos
    Version: 1.0
    Author: José Cuellar
    Author URI:
    License: GPL2
    License URI: https://www.gnu.org/licenses/gpl-2.0.html
*/

if(!defined('ABSPATH')) exit;

//Categorias de bloques personalizados
function lapizzeria_categoriaPersonalizada($categorias, $post){
    return array_merge(
        $categorias,
        array(
            array(
                'slug' => 'lapizzeria',
                'title' => 'La Pizzeria',
                'icon' => 'store'
            )
        )
    );
}
add_filter('block_categories', 'lapizzeria_categoriaPersonalizada', 10, 2);

//Registrar bloques, scripts y js

function lapizzeria_registrarBloques(){
    //Si gutenber no existe, salir
    if(!function_exists('register_block_type')){
        return;
    }
    //Registrar los bloques en el editor
    wp_register_script(
        'lapizzeria-editor-script', //nombre único
        plugins_url('build/index.js', __FILE__), //archivo con los bloques
        array('wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor'), //dependencias
        filemtime(plugin_dir_path(__FILE__). 'build/index.js')
    );

    //Estilos para el editor
    wp_register_style(
        'lapizzeria-editor-style', //nombre único
        plugins_url('src/css/editor.css', __FILE__), //archivo con el css para el editor
        array('wp-edit-blocks'), //dependencias
        filemtime(plugin_dir_path(__FILE__). 'src/css/editor.css')
    );

    //Estilos para los bloques(backend y frontend)
    wp_register_style(
        'lapizzeria-frontend-styles', //nombre único
        plugins_url('src/css/style.css', __FILE__), //archivo con el css para el editor
        array(), //dependencias
        filemtime(plugin_dir_path(__FILE__). 'src/css/style.css')
    );

    //Arreglo de bloques
    $blocks = [
        'lapizzeria/boxes'
    ];

    //Recorrer bloques, agregar scripts y styles
    foreach($blocks as $block){
        register_block_type($block, array(
            'editor_script' => 'lapizzeria-editor-script', //script principal para editor
            'editor_style' => 'lapizzeria-editor-style', //estilos para el editor
            'style' => 'lapizzeria-frontend-styles' //estilos para el frontend
        ));
    }

    //Registrar un bloque dinámico
    register_block_type('lapizzeria/menu', array(
        'editor_script' => 'lapizzeria-editor-script', //script principal para editor
        'editor_style' => 'lapizzeria-editor-style', //estilos para el editor
        'style' => 'lapizzeria-frontend-styles', //estilos para el frontend
        'render_callback' => 'lapizzeria_especialidades_frontEnd' //Query a la base de datos
    ));

}
add_action('init','lapizzeria_registrarBloques');

//Consulta la bbdd para mostrar los resultados en el frontend

function lapizzeria_especialidades_frontEnd($atts){
    
    echo '<pre>';
    var_dump($atts);
    echo '<pre>';

    //Obtener datos del Query
    $especialidades = wp_get_recent_posts(array(
        'post_type' => 'especialidades',
        'post_status' => 'publish',
        'numberposts' => $atts['cantidadMostrar'],
        'tax_query' => array(
            array(
                'taxonomy' => 'categoria-menu',
                'terms' => $atts['categoriaMenu']
            )
        )
    ));

    //Revisar que haya resultados

    if(count($especialidades) == 0){
        return "No hay especialidades";
    }

    $cuerpo = '';
    $cuerpo .= '<h2 class="titulo-menu">Nuestras Especialidades</h2>';
    $cuerpo .= '<ul class="nuestro-menu">';
    foreach($especialidades as $esp):
        //Obtener un objeto del post
        $post = get_post($esp['ID']);
        setup_postdata($post);
        $cuerpo .= sprintf(
            '<li>
                %1$s
                <div class="platillo">
                <div class="precio-titulo">
                    <h3>%2$s</h3>
                    <p>$ %3$s</p>
                </div>
                <div class="contenido-platillo">
                    <p>
                    %4$s
                    </p>
                </div>
                </div>
            </li>',
            get_the_post_thumbnail($post, 'especialidades'),
            get_the_title($post),
            get_field('precio', $post),
            get_the_content($post)
        );
        wp_reset_postdata();

    endforeach;
    $cuerpo .= '</ul>';

    return $cuerpo;



}