const { registerBlockType } = wp.blocks; //Inicio paso 1
const { RichText, MediaUpload, URLInputButton, BlockControls, InspectorControls, AlignmentToolbar, InnerBlocks } = wp.blockEditor;
const { IconButton, PanelBody, TextControl } = wp.components;
import { ReactComponent as Logo } from "../pizzeria-icon.svg";

registerBlockType("lapizzeria/contenedor", {
  title: "La Pizzeria Contenedor",
  icon: { src: Logo },
  category: "lapizzeria",
  attributes: {
    imageFondo: {
      type: "string",
      selector: ".hero-block",
    },
  },
  edit: (props) => {
	const {attributes: { imageFondo}, setAttributes} = props;

	const onSeleccionarImagen = (newImagen) => {
		setAttributes({ imageFondo: newImagen.sizes.full.url });
	  };
    return (
      <div className="bloque-contenedor" style={{backgroundImage: `url(${imageFondo})`}}>
        <div className="contenido-bloque">
          <div className="imagen-fondo">
			<MediaUpload
				onSelect={onSeleccionarImagen}
				type="image"
				render={({ open }) => (
				<IconButton
					className="lapizzeria-agregar-imagen"
					onClick={open}
					icon="format-image"
					showTooltip="true"
					label="Cambiar Imagen"
				/>
				)}
			/>
		  </div>
          <div className="bloques-internos">
			  <InnerBlocks />
		  </div>
        </div>
      </div>
    );
  },
  save: (props) => {
	const {attributes: { imageFondo}} = props;
    return (
		<div className="bloque-contenedor" style={{backgroundImage: `url(${imageFondo})`}}>
        <div className="contenido-bloque">
          <div className="imagen-fondo">
			
		  </div>
          <div className="bloques-internos">
			  <InnerBlocks.Content />
		  </div>
        </div>
      </div>
	
	);
  },
});
