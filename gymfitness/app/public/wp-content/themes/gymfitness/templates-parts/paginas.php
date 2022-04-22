<?php while (have_posts()) : the_post(); ?>

    <h1 class="text-center texto-primario"><?php the_title(); ?></h1>

    <?php
    if (has_post_thumbnail()) :
        the_post_thumbnail('mediano', array('class' => 'imagen-destacada'));
    endif;
    ?>

    <?php
        //Revisar si el custom types es clases
        if(get_post_type() === 'gymfitness_clases'){
            $horaInicio = get_field('hora_inicio');
            $horaFin = get_field('hora_fin');
    ?>
            <p class="informacion-clase"><?php the_field('dias'); ?> - <?php echo $horaInicio . ' - ' . $horaFin; ?></p>
    <?php
        }
    ?>

    <p><?php the_content(); ?></p>

<?php endwhile; ?>

