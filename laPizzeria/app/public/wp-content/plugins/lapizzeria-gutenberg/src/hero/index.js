const { registerBlockType } = wp.blocks; //Inicio paso 1
const {RichText, MediaUpload, URLInputButton, BlockControls, InspectorControls, AlignmentToolbar} = wp.blockEditor;
const { IconButton, PanelBody, TextControl } = wp.components;
import { ReactComponent as Logo } from "../pizzeria-icon.svg";

registerBlockType("lapizzeria/hero", {
  title: "La Pizzeria Hero",
  icon: { src: Logo },
  category: "lapizzeria",
  attributes: {
    imageHero: {
      type: "string",
      selector: ".hero-block",
    },
    TitleHero: {
      type: "string",
      source: "html",
      selector: ".hero-block h1",
    },
    TextHero: {
      type: "string",
      source: "html",
      selector: ".hero-block p",
    },
    UrlHero: {
      type: "string",
      source: "attribute",
      attribute: "href",
    },
    AlignmentContent: {
      type: "string",
      default: "center",
    },
    HeightHero: {
        type: "number"
    }
  },
  supports: {
      align: ['wide', 'full']
  },
  edit: (props) => {
    //Extraer valores
    const {
      attributes: { imageHero, TitleHero, TextHero, UrlHero, AlignmentContent, HeightHero},
      setAttributes} = props;
    const onSeleccionarImagen = (newImagen) => {
      setAttributes({ imageHero: newImagen.sizes.full.url });
    };
    const onChangeTitulo = (newTitle) => {
      setAttributes({ TitleHero: newTitle });
    };

    const onChangeTexto = (newText) => {
      setAttributes({ TextHero: newText });
    };
    const onChangeURL = (newURL) => {
      setAttributes({ UrlHero: newURL });
    };
    const onChangeAlignmentContent = (newAlignment) => {
      setAttributes({ AlignmentContent: newAlignment });
    };
    const onChangeHeightHero = (newHeight) => {
        setAttributes({HeightHero: newHeight})
    }
    return (
      <>
        <InspectorControls>
            <PanelBody
            title={'Altura Hero'}
            initialOpen={true}
            >
                <div className="components-base-control">
                    <div className="components-base-control__field">
                    <label className="components-base-control__label">
                        Altura en Pixeles
                    </label>
                    <TextControl
                        type="number"
                        max={700}
                        min={0}
                        step={2}
                        value={HeightHero || 500}
                        onChange={onChangeHeightHero}
                    />
                    </div>
                </div>
            </PanelBody>
        </InspectorControls>
        <div
          className="hero-block"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,.75 ), rgba(0,0,0,.75 )), url( ${imageHero})`,
            textAlign: AlignmentContent, height: `${HeightHero || 400}px`
          }}
        >
          <BlockControls>
            <AlignmentToolbar
              onChange={onChangeAlignmentContent}
              value={AlignmentContent}
            />
          </BlockControls>
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
          <div className="contenido-hero">
            <h1 className="titulo">
                <RichText
                placeholder={"Agrega el Título del Hero"}
                onChange={onChangeTitulo}
                value={TitleHero}
                />
            </h1>
            <p>
                <RichText
                placeholder={"Agrega el Texto del Hero"}
                onChange={onChangeTexto}
                value={TextHero}
                />
            </p>
            <div>
                <a href={UrlHero} className="boton boton-primario">
                Leer Más
                </a>
            </div>
            <URLInputButton onChange={onChangeURL} url={UrlHero} />
          </div>
        </div>
      </>
    );
  },
  save: (props) => {
    const {
      attributes: { imageHero, TitleHero, TextHero, UrlHero, AlignmentContent, HeightHero }} = props;
    return (
        <div className="hero-block" style={{backgroundImage: `linear-gradient(rgba(0,0,0,.75 ), rgba(0,0,0,.75 )), url( ${imageHero})`, textAlign: AlignmentContent, height: `${HeightHero || 400}px`}}>
            <div className="contenido-hero">
                <h1 className="titulo">
                  <RichText.Content value={TitleHero} />
                </h1>
                <p>
                    <RichText.Content value={TextHero} />
                </p>
                <div>
                    <a href={UrlHero} className="boton boton-primario">
                        Leer Más
                    </a>
                </div>
            </div>
        </div>
    );
  },
});
