import React, { useEffect, useState }from 'react';
import './App.css'
import FeaturedMovie from './components/FeaturedMovie';
import Header from './components/Header';
import MovieRow from './components/MovieRow';
import Tmdb from './Tmdb';


export default () => {

  const [movieList, setMovieList] = useState([]);
  const [featuredData,setFeaturedData] = useState(null);

  useEffect(() =>{
    const loadAll = async () => {
      //Pegando a lista total
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      // Pegando o Featured
      let originals = list.filter( i=> i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length -1));
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
     setFeaturedData(chosenInfo);
    }

    loadAll();
  }, [])

  return (
    <div className ="page">

      <Header />

      {featuredData &&
        <FeaturedMovie item={featuredData} />
      }

     <section className="lists">
      {movieList.map((item, key)=>(
         <MovieRow key={key} title={item.title} items={item.items}/>
      ))}
     </section>

     <footer>Feito por Joel</footer>

     {movieList.length <= 0 &&   
      <div className="loading">
        <img src="https://c.tenor.com/5o2p0tH5LFQAAAAi/hug.gif" alt="Carregango" />
      </div>
      }
    </div>
  )
}