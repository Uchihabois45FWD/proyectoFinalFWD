import NoticiasDestacadas from "./NoticiasDestacadas"

const ListaNoticiasDestacadas = ({noticias}) => {
    return (
        <>
            {noticias.filter(noticia => noticia.destacado).map((noticia) => {
                return (
                    <NoticiasDestacadas
                        key={noticia.id}
                        titulo={noticia.titulo_noticia}
                        descripcion={noticia.descripcion_noticia}
                        primer_dia={noticia.dia_de_notificacion}
                        ultimo_dia=""
                        cupos=""
                        inscructor=""
                    />
                )
            })}
        </>
    )
}

export default ListaNoticiasDestacadas
