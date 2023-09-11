import React, { useRef } from 'react';

const IconModal = ({onClose}) => {
    const fileInput = useRef(null);

    const handleFileUpload = () => {
        fileInput.current.click();
    };
  
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
      }}
    >
      <div
        style={{
          width: '70%',
          height: '80%',
          backgroundColor: '#FFFFFF',
          display: 'flex',
          flexDirection: 'column', // Cambia la dirección del flex a columna
          //border: '1px solid #000',
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
          borderRadius: '2px'
        }}
      >
        <div
          style={{
            flexBasis: '10%', // Toma el 10% de la altura del modal
            display: 'flex',
            justifyContent: 'space-between', // Separa los elementos en el div
            alignItems: 'center',
            paddingRight: '20px', // Agrega un espacio a la derecha
            paddingLeft: '20px', // Agrega un espacio a la izquierda
            borderBottom: '1px solid #D1D1D1',
          }}
        >
          <p style={{fontWeight: 'bold'}}>Seleccionar o Cargar Imagen</p> {/* Texto en negrita */}
          <button onClick={onClose} style={{marginLeft:'auto'}}>Cerrar</button>
        </div>
        <div
          style={{
            flexBasis: '90%', // Toma el 90% de la altura del modal
            display: 'flex',
            justifyContent: 'center', // Separa los elementos en el div
            alignItems: 'center',
          }}
        >
          <button onClick={handleFileUpload}>Seleccionar archivo</button>
          <input type="file" accept=".png, .jpg, .jpeg" ref={fileInput} style={{display:'none'}} /> {/* Input de archivo oculto */}     
        </div>
      </div>
    </div>
  );
};

export default IconModal;
