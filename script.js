let pagina = 1;
const btnAnterior = document.getElementById("btnPaginaAnterior")
const btnSiguiente = document.getElementById("btnPaginaSiguiente")

btnSiguiente.addEventListener('click',()=>{
    if(pagina < 1000){
        pagina += 1;
        cargarPeliculas()
    }
})
btnAnterior.addEventListener('click',()=>{
    if(pagina > 1){
        pagina -= 1;
        cargarPeliculas()
    }
})

const cargarPeliculas = async()=>{
    try {
        let respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=db505974ac7d649aa04267f6e5e705bb&language=es-MX&page=${pagina}`)
        if(respuesta.status === 200){
            let datos = await respuesta.json()

            let peliculas = '';
            datos.results.forEach(pelicula => {
                peliculas += `
                <div class="movie">
                <img src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}" alt="" class="backdrop">
                <h3>${pelicula.title}</h3>
                </div>`
            });
            const page = document.getElementById('page')
            page.innerHTML = `Page: ${pagina}`
            document.getElementById('content').innerHTML = peliculas
        // history.pushState({},'',`http://127.0.0.1:5500/Proyectos/Galeria_de_Peliculas/index.html${pagina}`)
            
        } else if(respuesta.status === 404){
            console.log('Hubo un error 404');
        } else {
            console.log('Error desconocido');
        }
    } catch(error) {
        console.log(error);
    }
}

cargarPeliculas()