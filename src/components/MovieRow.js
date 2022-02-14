import React, { useState } from 'react';
import './MovieRow.css';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

export default ({title, items}) => {

    const [scrollX, setScrollX] = useState(0);

    const handleLeftArrow = () => {
        let scrollLeftArrow = scrollX + Math.round(window.innerWidth / 2);
        if( scrollLeftArrow > 0) {
            scrollLeftArrow = 0;
        }
        setScrollX( scrollLeftArrow);
    }

    const handleRightArrow = () => {
        let scrollRightArrow = scrollX - Math.round(window.innerWidth / 2);
        let listWidth = items.results.length * 150;
        if((window.innerWidth - listWidth) > scrollRightArrow) {
            scrollRightArrow = (window.innerWidth - listWidth) - 60;
        }
        setScrollX(scrollRightArrow);
    }

    return (
        <div className="movieRow">
            <h2>{title}</h2>
            <div className="movieRow--left" onClick={handleLeftArrow}>
                <NavigateBeforeIcon style={{fontSize: 50}} />
            </div>
            <div className="movieRow--right" onClick={handleRightArrow}>
                <NavigateNextIcon style={{fontSize: 50}} />
            </div>
            <div className="movieRow-listarea">
                <div className="movieRow--list" style={{
                    marginLeft: scrollX,
                    width: items.results.length * 150
                }}>
                    {items.results.length > 0 && items.results.map((item, key)=> (
                       <div key={key} className="movieRow--item">
                            <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={item.original_title}/>
                       </div>
                    ))}
                </div>
          </div>
        </div>
    );
}