<?php get_header(); ?>

<main class="pagina seccion no-sidebars contenedor">
    <?php
        $author = get_queried_object();
    ?>
    <h2 class="text-center texto-primario">
        Autor: <?php echo $author->data->display_name; ?>
    </h2>
    <p class="text-center"><?php echo get_the_author_meta('description', $author->data->ID); ?></p>
    <ul class="listado-blog">
        <?php while (have_posts()) : the_post(); ?>
            <?php get_template_part('templates-parts/loop', 'blog'); ?>
        <?php endwhile; ?>
    </ul>
</main>

<?php get_footer(); ?>