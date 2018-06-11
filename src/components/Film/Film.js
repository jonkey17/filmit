import React, {Component} from 'react';

import './Film.css';

const getImage = (path, imageFormat) => {
  let srcset = imageFormat.poster_sizes
    .map((size) => {
      const computedSize = size.slice(1) + 'w';
      return `${imageFormat.base_url}${size}${path} ${computedSize}`}
    );
  srcset = srcset.slice(0,srcset.length-1).join(',');
  return <img className="Image" srcSet={srcset} src={`${imageFormat.base_url}${imageFormat.poster_sizes[imageFormat.poster_sizes.length - 2]}${path}`}/>
}

const Film =({film, imageFormat})=> {
  let item;
  if(imageFormat && imageFormat.base_url && imageFormat.poster_sizes){
    item = (
      <div className="Film">
        <div>{getImage(film.poster_path, imageFormat)}</div>
        <div className="Description">
          <h1 className="Title">{film.title}</h1>
          <h2 className="OriginalTitle">{film.original_title}</h2>
          <p className="Overview">{film.overview}</p >
        </div>
      </div>
    );
  }
  return item;
}

Film.defaltProps = {
  film: {}
}

export default Film;
