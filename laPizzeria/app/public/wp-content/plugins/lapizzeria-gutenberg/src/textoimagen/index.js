const { registerBlockType } = wp.blocks; //Inicio paso 1
const {RichText, MediaUpload, URLInputButton, BlockControls, AlignmentToolbar} = wp.blockEditor;
const { IconButton } = wp.components;
import { ReactComponent as Logo } from "../pizzeria-icon.svg";          //Fin paso 1

registerBlockType('lapizzeria/textoimagen', {
    title: 'Pizzeria Texto e imagen',
    icon: {src: Logo},
    category: 'lapizzeria',
    attributes: {
        imageBack: {
            type: "string",
            selector: ".ingredientes-bloque",
        },
        TitleHero: {
            type: "string",
            source: "html",
            selector: ".texto-ingredientes h1",
        },
        TextHero: {
            type: "string",
            source: "html",
            selector: ".texto-ingredientes p",
        },
        UrlHero: {
            type: "string",
            source: "attribute",
            attribute: "href",
        },
        imageFondo: {
            type: "string",
            source: "attribute",
            selector: ".imagen-ingredientes img",
            attribute: "src",
            default: Logo
        }
    },
    supports: {
        align: ['wide', 'full']
    },
    edit: props => {
        const {attributes: { imageBack, TitleHero, TextHero, UrlHero, imageFondo}, setAttributes} = props;
        
        const onSeleccionarImagen = (newImagen) => {
            setAttributes({ imageBack: newImagen.sizes.full.url });
        };
        const onChangeTitle = (newTitle) => {
            setAttributes({ TitleHero: newTitle });
          };
      
        const onChangeText = (newText) => {
            setAttributes({ TextHero: newText });
        };
        const onChangeURL = (newURL) => {
            setAttributes({ UrlHero: newURL });
        };
        const onSeleccionarImagenFondo = (newImagenFondo) => {
            setAttributes({imageFondo: newImagenFondo.sizes.full.url});
        }
        return(
            <div className="ingredientes-bloque" style={{background: `url(${imageBack})`}}>
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
                <div className="contenido-ingredientes">
                    <div className="texto-ingredientes">
                        <h1>
                            <RichText
                                placeholder={'Agrega el Título del Hero'}
                                onChange={onChangeTitle}
                                value={TitleHero}
                            />
                        </h1>
                        <p>
                            <RichText
                                placeholder={'Agrega el Texto del Hero'}
                                onChange={onChangeText}
                                value={TextHero}
                            />
                        </p>
                        <div>
                            <a className="boton boto-secundario" href={UrlHero}>
                                Leer Más
                            </a>
                        </div>
                        <URLInputButton
                            onChange={onChangeURL}
                            url={UrlHero}
                        />
                    </div>
                    <div className="imagen-ingredientes">
                        <img src={imageFondo} />
                        <MediaUpload
                            onSelect={onSeleccionarImagenFondo}
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
                </div>
            </div>
        )
    },
    save: props => {
        const {attributes: { imageBack, TitleHero, TextHero, UrlHero, imageFondo}} = props;

        return(
            <div className="ingredientes-bloque" style={{background: `url(${imageBack})`}}>
                <div className="contenido-ingredientes">
                    <div className="texto-ingredientes">
                        <h1>
                            <RichText.Content value={TitleHero} />
                        </h1>
                        <p>
                            <RichText.Content value={TextHero} />
                        </p>
                        <div>
                            <a className="boton boto-secundario" href={UrlHero}>
                                Leer Más
                            </a>
                        </div>
                    </div>
                    <div className="imagen-ingredientes">
                        <img src={imageFondo} />
                    </div>
                </div>
            </div>
        )
    }
})