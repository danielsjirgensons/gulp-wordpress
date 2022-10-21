<?php
get_header();
?>
<main>
	<?php
	while (have_posts()) : the_post();
	?>

		<section>
			<?php the_title('<h1>', '</h1>'); ?>

			<?php
			the_content();
			?>
		</section>

	<?php
	endwhile; // End of the loop.
	?>
</main>
<?php
get_footer();
