import { useEffect, useState } from 'react';
import tmdb from '../../api/tmdb'; // Dosya yolunu kontrol edin.
import MovieCard from './MovieCard';
import { request } from '../../api/request'; // Dosya yolunu kontrol edin.
import Blur from '../../baseUI/blur'; // Dosya yolunu kontrol edin.


const MovieList = ({ fetch }) => {
    const [movies, setMovies] = useState([])

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                // `fetch` prop'u doğrudan kategori adını (örn. "Streaming") içerir.
                // `request[fetch]` ile request.js'deki ilgili API yolunu buluruz.
                const apiUrlPath = request[fetch];
                
                // Eğer apiUrlPath tanımsızsa veya boşsa, hata vermemek için kontrol edin.
                if (!apiUrlPath) {
                    console.error(`request.js içinde '${fetch}' için bir API yolu bulunamadı.`);
                    setMovies([]);
                    return; // Fonksiyondan çık
                }

                const { data } = await tmdb.get(apiUrlPath);
                
                // API'den gelen verinin bir dizi olup olmadığını kontrol ediyoruz
                if (data && Array.isArray(data.results)) {
                    setMovies(data.results);
                } else {
                    // Veri gelmezse veya dizi değilse boş bir diziye set ediyoruz
                    console.warn(`API'den gelen 'results' alanı dizi değil veya boş:`, data);
                    setMovies([]);
                }
            } catch (error) {
                console.error("Filmler çekilirken bir hata oluştu:", error);
                // Hata durumunda da `movies` state'ini boş bir dizi olarak ayarlıyoruz
                setMovies([]);
            }
        }
        fetchMovies();
    }, [fetch]); // `fetch` prop'u her değiştiğinde useEffect tekrar çalışır.


    return (
        <div className="flex pb-5 pl-5 pr-9 overflow-x-auto">
            {/* movies'in bir dizi olup olmadığını ve boş olup olmadığını kontrol ediyoruz */}
            {movies.length > 0 ? (
                movies.map((movie) => { 
                    return <MovieCard key={movie.id} {...movie} />
                })
            ) : (
                // Filmler yüklenirken veya bulunamazsa gösterilecek bir mesaj
                <p className="p-5 text-center text-slate-500">Filmler yükleniyor veya bulunamadı...</p>
            )}
            <div className="absolute top-0 right-0 w-16 h-full">
                <Blur />
            </div>
        </div> 
    );
}

export default MovieList;