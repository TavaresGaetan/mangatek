import React from 'react';
import './animeList.css';


const testListe = [{title : "Naruto"},{title : "Autre"}]
function AnimesList() {
  return <Anime/>
}

//Props of anime
type AnimeProps = {
  id? : number, 
  title? : string,
  startDate? : string,
  endDate? : string,
  coverImage? : string,
  description? : string
  }
//Creating anime
function Anime({id=0,title="title0",startDate="18-11-2020",endDate="21-11-2020", coverImage="Image", description="Description"}:AnimeProps){
  //const [myTitle, setMyTitle]=React.useState("value")
  return  <div className='animeItem'>
            <p>ID : {id}</p>
            <p>titre : {title}</p>
            <p>Date de début: {startDate}</p>
            <p>Date de fin: {endDate}</p>
            <p>Image : {coverImage}</p>
            <p>Description : {description}</p>
          </div>
}


export default AnimesList;
