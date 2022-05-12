const { registerBlockType } = wp.blocks;
const { withSelect } = wp.data;
const { RichText, InspectorControls, BlockControls } = wp.blockEditor;
const { PanelBody, RangeControl, SelectControl, TextControl } = wp.components;

import { ReactComponent as Logo } from "../pizzeria-icon.svg";

registerBlockType("lapizzeria/menu", {
  title: "La Pizzeria Menú",
  icon: { src: Logo },
  category: "lapizzeria",
  attributes: {
    cantidadMostrar: {
      type: "number",
    },
    categoriaMenu: {
      type: "number",
    },
	tituloBloque: {
		type: 'string',
		default: 'Titulo Bloque'
	}
  },
  edit: withSelect((select, props) => {
    //Extraer valores
    const {
      attributes: { cantidadMostrar, categoriaMenu },
      setAttributes,
    } = props;

    const onChangeCantMostrar = (newCant) => {
      setAttributes({ cantidadMostrar: parseInt(newCant) });
    };

    const onChangeCategoriaMenu = (newCateg) => {
      setAttributes({ categoriaMenu: parseInt(newCateg) });
    };
	const onChangeTituloBloque = (newTitle) => {
		setAttributes({tituloBloque: newTitle})
	}
    return {
      categorias: select("core").getEntityRecords("taxonomy", "categoria-menu"),
      //Enviar petición a la API
      especialidades: select("core").getEntityRecords(
        "postType",
        "especialidades",
        {
          "categoria-menu": categoriaMenu,
          per_page: cantidadMostrar || 4,
        }
      ),
      onChangeCantMostrar,
      onChangeCategoriaMenu,
	  onChangeTituloBloque,
      props,
    };
  })(
    ({
      especialidades, onChangeCantMostrar, onChangeCategoriaMenu, onChangeTituloBloque, props, categorias}) => {
      console.log(categorias);

      //Extraer valores
      const { attributes: { cantidadMostrar, categoriaMenu, tituloBloque } } = props;

      //Verificar especialidades
      if (!especialidades) {
        return "Cargando...";
      }
      //Si no hay especialidades
      if (especialidades && especialidades.length === 0) {
        return "No hay resultados";
      }

      //Verificar categorias
      if (!categorias) {
        console.log("No hay categorias");
      }
      if (categorias && categorias.length === 0) {
        console.log("No hay resultados");
      }
      //Generar label y value para categorias
      categorias.forEach((categoria) => {
        categoria["label"] = categoria.name;
        categoria["value"] = categoria.id;
      });

      //Arreglos con valores por default
      const opcioDefault = [{ value: "", label: " -- Todos -- " }];
      const listadoCategorias = [...opcioDefault, ...categorias];
      return (
        <>
          <InspectorControls>
            <PanelBody title={"Cantidad a Mostrar"} initialOpen={true}>
              <div className="components-base-control">
                <div className="components-base-control__field">
                  <label className="components-base-control__label">
                    Cantidad a Mostrar
                  </label>
                  <RangeControl
                    onChange={onChangeCantMostrar}
                    min={2}
                    max={10}
                    value={cantidadMostrar || 4}
                  />
                </div>
              </div>
            </PanelBody>
            <PanelBody title={"Categoria de Especialidad"} initialOpen={true}>
              <div className="components-base-control">
                <div className="components-base-control__field">
                  <label className="components-base-control__label">
                    Categoria de Especialidad
                  </label>
                  <SelectControl
                    options={listadoCategorias}
                    onChange={onChangeCategoriaMenu}
                    value={categoriaMenu}
                  />
                </div>
              </div>
            </PanelBody>
            <PanelBody title={"Titulo Bloque"} initialOpen={true}>
              <div className="components-base-control">
                <div className="components-base-control__field">
                  <label className="components-base-control__label">
                    Titulo Bloque
                  </label>
				  <TextControl
				  	onChange={onChangeTituloBloque}
					  value={tituloBloque}
				  />
                </div>
              </div>
            </PanelBody>
          </InspectorControls>
          <h2 className="titulo-menu">{tituloBloque}</h2>
          <ul className="nuestro-menu">
            {especialidades.map((especialidad) => (
              <li>
                <img src={especialidad.imagen_destacada} />
                <div className="platillo">
                  <div className="precio-titulo">
                    <h3>{especialidad.title.rendered}</h3>
                    <p>$ {especialidad.precio}</p>
                  </div>
                  <div className="contenido-platillo">
                    <p>
                      <RichText.Content
                        value={especialidad.content.rendered.substring(0, 100)}
                      />
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </>
      );
    }
  ),
  save: () => {
    return null;
  },
});
