import React, { useRef, useState,useEffect } from 'react';

const IconModal = ({ onClose }) => {
  const fileInput = useRef(null);
  const [selectedTab, setSelectedTab] = useState('imagen'); // Estado para controlar la pestaña seleccionada
  const [images, setImages] = useState([]);

  const handleFileUpload = () => {
    fileInput.current.click();
  };

  useEffect(() => {
    // Obtener la lista de imágenes de la carpeta "images"
    const importAll = (r) => r.keys().map(r);
    const imagesContext = require.context('./images', false, /\.(png|jpe?g|svg)$/);
    const imagesList = importAll(imagesContext);
    setImages(imagesList);
  }, []);

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
          flexDirection: 'column',
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
          borderRadius: '2px'
        }}
      >
        <div
          style={{
            flexBasis: '10%',
            display: 'flex',
            borderBottom: '1px solid #D1D1D1',
          }}
        >
          <div
            onClick={() => setSelectedTab('imagen')} // Cambiar a la pestaña de imágenes
            style={{
              flex: 1,
              textAlign: 'center',
              cursor: 'pointer',
              padding: '10px',
              backgroundColor: selectedTab === 'imagen' ? '#F1F1F1' : '#FFFFFF',
              borderBottom: selectedTab === 'imagen' ? '4px solid #F1F1F1' : '4px solid #FFFFFF',
            }}
          >
            <p style={{ fontWeight: 'bold', margin: '0' }}>Seleccionar o Cargar Imagen</p>
          </div>
          <div
            onClick={() => setSelectedTab('plantilla')} // Cambiar a la pestaña de plantillas
            style={{
              flex: 1,
              textAlign: 'center',
              cursor: 'pointer',
              padding: '10px',
              backgroundColor: selectedTab === 'plantilla' ? '#F1F1F1' : '#FFFFFF',
              borderBottom: selectedTab === 'plantilla' ? '4px solid #F1F1F1' : '4px solid #FFFFFF',
            }}
          >
            <p style={{ fontWeight: 'bold', margin: '0' }}>Escoger Plantilla</p>
          </div>
        </div>
        <div
          style={{
            flexBasis: '90%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row', // Alinear contenido al centro verticalmente
          }}
        >
          {selectedTab != 'imagen' ? ( // Mostrar imágenes o mensaje según la pestaña seleccionada
            images.length > 0 ? (
              images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Imagen ${index}`}
                  style={{ maxWidth: '40%', maxHeight: '40%', margin: '5px' }}
                />
              ))
            ) : (
              <p>No hay plantillas</p>
            )
          ) : (
            <><button onClick={handleFileUpload}>Seleccionar archivo</button><input type="file" accept=".png, .jpg, .jpeg" ref={fileInput} style={{ display: 'none' }} /></> 
          )}
        </div>
        <div
          style={{
            flexBasis: '10%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingRight: '20px',
            paddingLeft: '20px',
            borderTop: '1px solid #D1D1D1', // Agregar borde superior
          }}
        >
          {/* <p style={{ fontWeight: 'bold' }}>Seleccionar o Cargar Imagen</p> */}
          <button onClick={onClose} style={{ marginLeft: 'auto' }}>Cerrar</button>
        </div>
      </div>
    </div>
  );
};

export default IconModal;

