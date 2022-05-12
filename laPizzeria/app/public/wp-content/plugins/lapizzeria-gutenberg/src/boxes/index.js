const { registerBlockType } = wp.blocks;                                //Inicio paso 1
const { RichText, InspectorControls, ColorPalette, BlockControls, AlignmentToolbar } = wp.blockEditor;
const { PanelBody } = wp.components;
//Logo para el bloque
import { ReactComponent as Logo } from "../pizzeria-icon.svg";          //Fin paso 1

/*
	7 pasos para crear un bloque de Gutenberg
	1.- Importar el componente que utilizarás
	2.- Coloca el/los componente/s donde deseas utilizarlo/s
	3.- Crea la función que lea los contenidos
	4.- Registra un atributo
	5.- Extrae el contenido desde props
	6.- Guarda el contenido con setAttributes
	7.- Lee los contenidos guardados con save()
*/

registerBlockType("lapizzeria/boxes", {     //Inicio paso 4
  title: "Pizzeria Cajas",
  icon: { src: Logo },
  category: "lapizzeria",
  attributes: {
	headingBox: {
	  type: "string",
	  source: "html",
	  selector: ".box h2",
	},
	textBox: {
		type: "string",
		source: "html",
		selector: ".box p",
	},
	colorFondo: {
		type: "string"
	},
	colorTexto: {
		type: "string"
	},
	alineacionContenido: {
		type: "string",
		default: "center"
	}
											//Fin paso 4
  },
  edit: (props) => {                          //Inicio paso 5
	//Extraer el contenido desde props
	const {
		attributes: {
			headingBox,
			textBox,
			colorFondo,
			colorTexto,
			alineacionContenido
		},
		setAttributes
		} = props;
											  //Fin paso 5

	const onChangeHeadingBox = (newHeading) => {    //Inicio paso 6
	  setAttributes({ headingBox: newHeading });
	};

	const onChangeTextBox = newText => {
		setAttributes({ textBox: newText });
	}

	const onChangeColorFondo = newColor => {
		setAttributes({ colorFondo: newColor});
	}

	const onChangeColorTexto = newColorText => {
		setAttributes({ colorTexto: newColorText});
	}
	const onChangeAlinearContenido = newAlignment => {
		setAttributes({ alineacionContenido: newAlignment});
	}
													//Fin paso 6
													//Inicio paso 2
	return (
		<>
			<InspectorControls>
				<BlockControls>
					<AlignmentToolbar
						onChange={onChangeAlinearContenido}
					/>
				</BlockControls>
				<PanelBody
					title={'Color de Fondo'}
					initialOpen={true}
				>
					<div className="components-base-control">
						<div className="components-base-control__field">
							<label className="components-base-control__label">
								Color de Fondo
							</label>
							<ColorPalette
								onChange = {onChangeColorFondo}
								value={colorFondo}
							/>
						</div>
					</div>
				</PanelBody>
				<PanelBody
					title={'Color de Texto'}
					initialOpen={true}
				>
					<div className="components-base-control">
						<div className="components-base-control__field">
							<label className="components-base-control__label">
								Color de Texto
							</label>
							<ColorPalette
								onChange = {onChangeColorTexto}
								value={colorTexto}
							/>
						</div>
					</div>
				</PanelBody>
			</InspectorControls>
		<div className="box" style={{ backgroundColor: colorFondo, textAlign: alineacionContenido}}>
			<h2 style={{ color: colorTexto}}>
			<RichText
				placeholder="Agrega el Encabezado"
				onChange={onChangeHeadingBox}
				value={headingBox}
			/>
			</h2>
			<p style={{ color: colorTexto}}>
				<RichText
					placeholder="Agrega el Texto"
					onChange={onChangeTextBox}
					value={textBox}
				/>
			</p>
		</div>
	  </>
	);
	// Fin paso 2
  },
  save: (props) => {                                        //Inicio paso 7
	//Extraer el contenido desde props
	const { attributes: { headingBox, textBox, colorFondo, colorTexto, alineacionContenido} } = props;

	return (
	  <div className="box" style={{ backgroundColor: colorFondo, textAlign: alineacionContenido}}>
		<h2 style={{ color: colorTexto}}>
		  <RichText.Content value={headingBox}
		  />
		</h2>
		<p style={{ color: colorTexto}}>
			<RichText.Content value={textBox} />
		</p>
	  </div>
	);
  },                                                        //Fin paso 7
});
