import './style.css';
import { useState } from 'react'
import cards from '../../cards.js'
import LogoCubos from '../../assets/cubos-puzzle.png'
import Cardback from '../../assets/card-back.png';
import Congrats from '../../assets/congrats.png';

function Main() {

  cards.sort(() => Math.random() - 0.5);

  const [card, setCard] = useState(cards)

  function handleChange(cardId) {

    const localCard = [...card]

    const findCard = localCard.find((card) =>
      card.id === cardId
    );

    if (!findCard) {
      return
    }

    findCard.turned = true;

    const upSet = localCard.filter((card) => {
      return card.turned === true;
    });

    setTimeout(() => {
      if (upSet.length === 2) {

        if (upSet[0].slug === upSet[1].slug) {
          let localCard1 = localCard.filter((card) => {
            return card.turned === false;
          });
          return setCard(localCard1);
        }

        if (upSet[0].slug !== upSet[1].slug) {
          let localCard2 = localCard.map((card) => {
            return { ...card, turned: false };
          })
          return setCard(localCard2);
        }

      }
    }, 1000 / 2);

    setCard(localCard);
  }

  function handleReset() {
    const localCard = cards.map((card) => {
      return {
        ...card, turned: false
      }
    });

    setCard(localCard);
  }

  return (

    <div className='container'>

      <div className='left'>

        <img src={LogoCubos} alt='logo'></img>


        <button
          onClick={() => handleReset()}
          className='reset'>RESET</button>

      </div>


      <div className='right'>
        {card.length > 0 ?
          card.map((card) => (
            <img
              key={card.id}
              onClick={() => handleChange(card.id)}
              src={card.turned ? card.image : Cardback}
              alt='card'
            ></img>
          ))
          :
          <img className='congrats' alt='congrats' src={Congrats}></img>
        }

      </div>

    </div>
  );
}

export default Main;
