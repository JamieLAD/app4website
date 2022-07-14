<?php
/**
 * Timber starter-theme
 * https://github.com/timber/starter-theme
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since   Timber 0.1
 */

/**
 * If you are installing Timber as a Composer dependency in your theme, you'll need this block
 * to load your dependencies and initialize Timber. If you are using Timber via the WordPress.org
 * plug-in, you can safely delete this block.
 */
$composer_autoload = __DIR__ . '/vendor/autoload.php';
if ( file_exists( $composer_autoload ) ) {
	require_once $composer_autoload;
	$timber = new Timber\Timber();
}

/**
 * This ensures that Timber is loaded and available as a PHP class.
 * If not, it gives an error message to help direct developers on where to activate
 */
if ( ! class_exists( 'Timber' ) ) {

	add_action(
		'admin_notices',
		function() {
			echo '<div class="error"><p>Timber not activated. Make sure you activate the plugin in <a href="' . esc_url( admin_url( 'plugins.php#timber' ) ) . '">' . esc_url( admin_url( 'plugins.php' ) ) . '</a></p></div>';
		}
	);

	add_filter(
		'template_include',
		function( $template ) {
			return get_stylesheet_directory() . '/static/no-timber.html';
		}
	);
	return;
}

/**
 * Sets the directories (inside your theme) to find .twig files
 */
Timber::$dirname = array( 'templates', 'views' );

/**
 * By default, Timber does NOT autoescape values. Want to enable Twig's autoescape?
 * No prob! Just set this value to true
 */
Timber::$autoescape = false;


/**
 * We're going to configure our theme inside of a subclass of Timber\Site
 * You can move this to its own file and include here via php's include("MySite.php")
 */
class App4 extends Timber\Site {
	/** Add timber support. */
	public function __construct() {
		add_action( 'after_setup_theme', array( $this, 'theme_supports' ) );
		add_filter( 'timber/context', array( $this, 'add_to_context' ) );
		add_filter( 'timber/twig', array( $this, 'add_to_twig' ) );
		add_action( 'init', array( $this, 'register_post_types' ) );
		add_action( 'init', array( $this, 'register_taxonomies' ) );
		add_action( 'acf/init', array( $this, 'my_acf_init') );
		add_action( 'wp_enqueue_scripts', array( $this, 'loadScripts' ) );
		parent::__construct();
	}
	/** This is where you can register custom post types. */
	public function register_post_types() {

	}
	/** This is where you can register custom taxonomies. */
	public function register_taxonomies() {

	}

	/** This is where you add some context
	 *
	 * @param string $context context['this'] Being the Twig's {{ this }}.
	 */
	public function add_to_context( $context ) {
		$logo = wp_get_attachment_image_url( get_theme_mod( 'custom_logo' ), 'full' );
		$updates = 'Updates';
		$reviews = 'Reviews';
		$posts_per_page = 10;
		global $paged;
		if (!isset($paged) || !$paged){
			$paged = 1;
		}
		$context = Timber::context();
		$args = array(
			'category__not_in' => [7, 5],
			'posts_per_page' => $posts_per_page,
			'paged' => $paged
		);
		$updates_args = array(
			'category__in' => 5,
			'posts_per_page' => $posts_per_page,
			'paged' => $paged
		);
		$reviews_args = array(
			'category__in' => 7,
			'posts_per_page' => $posts_per_page,
			'paged' => $paged
		);
		$context['posts'] = new Timber\PostQuery($args);
		$context['updates_posts'] = new Timber\PostQuery($updates_args);
		$context['reviews_posts'] = new Timber\PostQuery($reviews_args);
		$context['foo']   = 'bar';
		$context['stuff'] = 'I am a value set in your functions.php file';
		$context['notes'] = 'These values are available everytime you call Timber::context();';
     	$context['logo'] =  $logo;
		$context['master'] = new Timber\Menu( 'Master Menu' );
		$context['site']  = $this;
		$context['options'] = get_fields('option');
		return $context;
	}

	public function theme_supports() {
		// Add default posts and comments RSS feed links to head.
		add_theme_support( 'automatic-feed-links' );

		/*
		 * Let WordPress manage the document title.
		 * By adding theme support, we declare that this theme does not use a
		 * hard-coded <title> tag in the document head, and expect WordPress to
		 * provide it for us.
		 */
		add_theme_support( 'title-tag' );

		/*
		 * Enable support for Post Thumbnails on posts and pages.
		 *
		 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
		 */
		add_theme_support( 'post-thumbnails' );

		/*
		 * Switch default core markup for search form, comment form, and comments
		 * to output valid HTML5.
		 */
		add_theme_support(
			'html5',
			array(
				'comment-form',
				'comment-list',
				'gallery',
				'caption',
			)
		);

		/*
		 * Enable support for Post Formats.
		 *
		 * See: https://codex.wordpress.org/Post_Formats
		 */
		add_theme_support(
			'post-formats',
			array(
				'aside',
				'image',
				'video',
				'quote',
				'link',
				'gallery',
				'audio',
			)
		);

		add_theme_support( 'menus' );
		add_theme_support( 'custom-logo' );
	}

	/** This Would return 'foo bar!'.
	 *
	 * @param string $text being 'foo', then returned 'foo bar!'.
	 */
	public function myfoo( $text ) {
		$text .= ' bar!';
		return $text;
	}

	/** This is where you can add your own functions to twig.
	 *
	 * @param string $twig get extension.
	 */
	public function add_to_twig( $twig ) {
		$twig->addExtension( new Twig\Extension\StringLoaderExtension() );
		$twig->addFilter( new Twig\TwigFilter( 'myfoo', array( $this, 'myfoo' ) ) );
		return $twig;
	}

	public function loadScripts() {
        wp_enqueue_script( 'bundle.js', get_template_directory_uri() . '/static/bundle.js', array(), '1.0.0', true );
	}

	public function my_acf_init() {

		if( function_exists('acf_add_options_page') ) {
	
			acf_add_options_page(array(
				'page_title' 	=> 'Theme Settings',
				'menu_title'	=> 'Theme Settings',
				'menu_slug' 	=> 'theme-settings',
				'capability'	=> 'edit_posts',
				'redirect'		=> false
			));
			
			acf_add_options_sub_page(array(
				'page_title' 	=> 'Contact Information',
				'menu_title'	=> 'Contact Information',
				'parent_slug'	=> 'theme-settings',
			));
			
			acf_add_options_sub_page(array(
				'page_title' 	=> 'Social Media',
				'menu_title'	=> 'Social Media',
				'parent_slug'	=> 'theme-settings',
			));

			acf_add_options_sub_page(array(
				'page_title' 	=> 'Legal Links',
				'menu_title'	=> 'Legal Links',
				'parent_slug'	=> 'theme-settings',
			));
			
		}

		if( function_exists('acf_register_block') ) {
			
			acf_register_block(array(
				'name'				=> 'hero',
				'title'				=> __('Hero'),
				'description'		=> __('This adds the hero section'),
				'render_callback'	=> array( $this, 'my_acf_block_render_callback'),
				'keywords'			=> array('hero')
			));

			acf_register_block(array(
				'name'				=> 'partners-banner',
				'title'				=> __('Partners Banner'),
				'description'		=> __('This adds a partners banner'),
				'render_callback'	=> array( $this, 'my_acf_block_render_callback'),
				'keywords'			=> array('partners', 'banner')
			));

			acf_register_block(array(
				'name'				=> 'stats-tiles',
				'title'				=> __('Stats Tiles'),
				'description'		=> __('This adds some tiles containing stats'),
				'render_callback'	=> array( $this, 'my_acf_block_render_callback'),
				'keywords'			=> array('stats', 'tiles')
			));

			acf_register_block(array(
				'name'				=> 'case-studies',
				'title'				=> __('Case Studies'),
				'description'		=> __('This adds some case studies'),
				'render_callback'	=> array( $this, 'my_acf_block_render_callback'),
				'keywords'			=> array('case', 'studies')
			));

			acf_register_block(array(
				'name'				=> 'call-to-action',
				'title'				=> __('Call To Action'),
				'description'		=> __('This adds a call to action banner'),
				'render_callback'	=> array( $this, 'my_acf_block_render_callback'),
				'keywords'			=> array('call', 'to', 'action')
			));

			acf_register_block(array(
				'name'				=> 'features-grid',
				'title'				=> __('Features Grid'),
				'description'		=> __('This adds some specified features to your website in a grid-like style.'),
				'render_callback'	=> array( $this, 'my_acf_block_render_callback'),
				'keywords'			=> array('features', 'grid')
			));

			acf_register_block(array(
				'name'				=> 'promo',
				'title'				=> __('Promo'),
				'description'		=> __('This adds a promotional video/image'),
				'render_callback'	=> array( $this, 'my_acf_block_render_callback'),
				'keywords'			=> array('promo', 'promotional', 'promotion', 'video', 'image', 'banner')
			));

			acf_register_block(array(
				'name'				=> 'business-types',
				'title'				=> __('Business Types'),
				'description'		=> __('This adds a block of business types to display'),
				'render_callback'	=> array( $this, 'my_acf_block_render_callback'),
				'keywords'			=> array('business', 'types')
			));

			acf_register_block(array(
				'name'				=> 'updates',
				'title'				=> __('Updates'),
				'description'		=> __('This adds a list of 4 recent update posts'),
				'render_callback'	=> array( $this, 'my_acf_block_render_callback'),
				'keywords'			=> array('updates', 'posts')
			));

			acf_register_block(array(
				'name'				=> 'contact-grid',
				'title'				=> __('Contact Grid'),
				'description'		=> __('Telephone, email and address in a grid-style format'),
				'render_callback'	=> array( $this, 'my_acf_block_render_callback'),
				'keywords'			=> array('contact', 'grid')
			));

			acf_register_block(array(
				'name'				=> 'map',
				'title'				=> __('Map'),
				'description'		=> __('Adds google map'),
				'render_callback'	=> array( $this, 'my_acf_block_render_callback'),
				'keywords'			=> array('map')
			));

			acf_register_block(array(
				'name'				=> 'meet-the-team',
				'title'				=> __('Meet the Team'),
				'description'		=> __('Adds a meet the team section'),
				'render_callback'	=> array( $this, 'my_acf_block_render_callback'),
				'keywords'			=> array('meet', 'the', 'team')
			));

			acf_register_block(array(
				'name'				=> 'customer-reviews',
				'title'				=> __('Customer Reviews'),
				'description'		=> __('A grid-style customer reviews section'),
				'render_callback'	=> array( $this, 'my_acf_block_render_callback'),
				'keywords'			=> array('customer', 'reviews')
			));

			acf_register_block(array(
				'name'				=> 'slider',
				'title'				=> __('Slider'),
				'description'		=> __('Adds a slider'),
				'render_callback'	=> array( $this, 'my_acf_block_render_callback'),
				'keywords'			=> array('slider')
			));

			acf_register_block(array(
				'name'				=> 'features-accordion',
				'title'				=> __('Features Accordion'),
				'description'		=> __('Accordion style features'),
				'render_callback'	=> array( $this, 'my_acf_block_render_callback'),
				'keywords'			=> array('features', 'accordion')
			));

			acf_register_block(array(
				'name'				=> 'image-marquee',
				'title'				=> __('Image Marquee'),
				'description'		=> __('Infinitely horizontal scrolling images, usually used for logos'),
				'render_callback'	=> array( $this, 'my_acf_block_render_callback'),
				'keywords'			=> array('image', 'marquee')
			));

		}
	}

	function my_acf_block_render_callback( $block, $content = '', $is_preview = false ) {
		$slug = str_replace('acf/', '', $block['name']);
		$context = Timber::context();
		$context['post'] = Timber::query_post();
		$context['block'] = $block;
		$context['fields'] = get_fields();
		$context['is_preview'] = $is_preview;
		if ( function_exists( 'yoast_breadcrumb' ) ) {
			$context['breadcrumbs'] = yoast_breadcrumb('<p id="breadcrumbs" class="breadcrumbs">','</p>', false );
		}
		Timber::render( "blocks/{$slug}.twig", $context );
	}

}

new App4();