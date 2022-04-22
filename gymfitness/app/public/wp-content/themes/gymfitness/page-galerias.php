<?php
/*
* Template Name: Template para galerías
*/
get_header();
?>

<main class="contenedor pagina seccion">
    <div class="contenido-principal">
        <?php while (have_posts()) : the_post(); ?>

            <h1 class="text-center texto-primario"><?php the_title(); ?></h1>

        <?php
            //Obtener la galeria de la página actual y después obtener los ids de las imágenes de dicha galería
            $galeria = get_post_gallery(get_the_ID(), false);
            $galeriaImgIds = explode(',',$galeria['ids']);
        ?>
        <ul class="galeria-imagenes">
            <?php
                $i = 1;
                foreach($galeriaImgIds as $galId):
                    $size = ($i == 4 || $i == 6) ? 'portrait' : 'square';
                    $imagenThumb = wp_get_attachment_image_src($galId,$size)[0];
                    $imagen = wp_get_attachment_image_src($galId, 'full')[0];
                    /*echo "<pre>";
                    var_dump($imagenThumb);
                    echo "</pre>";*/
                ?>
                <li>
                    <a href="<?php echo $imagen; ?>" data-lightbox="galeria">
                        <img src="<?php echo $imagenThumb; ?>" alt="imagen clase">
                    </a>
                </li>
                <?php
                $i++;
                endforeach;
            ?>
        </ul>
        <?php endwhile; ?>
    </div>

</main>

<?php get_footer(); ?>