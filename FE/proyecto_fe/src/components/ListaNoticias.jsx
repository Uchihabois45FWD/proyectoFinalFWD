import NoticiasDestacadas from "./NoticiasDestacadas"

const ListaNoticias = ({noticias}) => {
    return (
        <>
            {noticias.map((noticia) => {
                return (
                    <NoticiasDestacadas
                        key={noticia.id}
                        titulo={noticia.titulo_noticia}
                        descripcion={noticia.descripcion_noticia}
                        dia={noticia.dia_de_notificacion}
                        destacado={noticia.destacado}
                    />
                )
            })}
        </>
    )
}

export default ListaNoticias
