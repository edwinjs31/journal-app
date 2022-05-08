import React from 'react';
import '../../styles/journal.css';

export const NothingSelected = () => {
  return (
    <div className='nothing'>
        <p className='text-center fs-2'>No has seleccionado nada <br /> o crea una nueva entrada !!</p>
        <i className='far fa-star fa-6x mt-5'></i>
    </div>
  )
}
