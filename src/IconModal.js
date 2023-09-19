import React, { useRef, useState, useEffect } from 'react';

const IconModal = ({ onClose }) => {
  const fileInput = useRef(null);
  const [selectedTab, setSelectedTab] = useState('imagen'); // Estado para controlar la pestaña seleccionada
  const [images, setImages] = useState([]);
  const contentRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [selectedImagePath, setSelectedImagePath] = useState(null); 
  const path = "";

  const handleFileUpload = () => {
    fileInput.current.click();
    fileInput.current.onchange = e => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
        setDisabled(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileSelection = (path) => {
    const img = new Image();
  
    img.onload = () => {
      setSelectedImage(path);
      setDisabled(false);
    };
  
    img.onerror = () => {
      console.error("Error al cargar la imagen desde la ruta:", path);
    };
  
    img.src = path;
   
  };


  const toggleImageSelection = (index) => {
    if (selectedImageIndex === index) {
      // Si se hace clic en la imagen ya seleccionada, deselecciónala
      setSelectedImageIndex(null);
    } else {
      // Si se hace clic en una imagen diferente, actualiza la selección
      setSelectedImageIndex(index);
      handleImageClick(index);
    }
  };

  // Llama a handleFileSelection con la imagen seleccionada
  const handleImageClick = (index) => {
    const selectedImage = images[index];
    setSelectedImageIndex(index);
    setSelectedImagePath(selectedImage); 
    handleFileSelection(selectedImage.src);
  };

  const handleSelectImage = () => {

    console.log(selectedImage)
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
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        overflow: 'hidden', // Oculta el desbordamiento
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
          borderRadius: '2px',
          overflow: 'hidden', // Oculta el desbordamiento
        }}
      >
        <div
          style={{
            flexBasis: '10%',
            display: 'flex',
            borderBottom: '1px solid #bababa',
          }}
        >
          <div
            onClick={() => setSelectedTab('imagen')}
            style={{
              flex: 1,
              textAlign: 'center',
              cursor: 'pointer',
              backgroundColor: selectedTab === 'imagen' ? '#F1F1F1' : '#FFFFFF',
            }}
          >
            <p style={{ fontWeight: 'bold', fontSize: '19px' }}>Cargar Icono</p>
          </div>
          <div
            onClick={() => setSelectedTab('plantilla')}
            style={{
              flex: 1,
              textAlign: 'center',
              cursor: 'pointer',
              backgroundColor: selectedTab === 'plantilla' ? '#F1F1F1' : '#FFFFFF',
            }}
          >
            <p style={{ fontWeight: 'bold', fontSize: '19px' }}>Escoger Icono</p>
          </div>
        </div>
        <div
          style={{
            flexBasis: '90%',
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto', // Habilita la barra de desplazamiento vertical
            alignItems: 'center',
            justifyContent: selectedTab === 'imagen' ? 'center' : 'flex-start',
          }}
          ref={contentRef}
        >
          {selectedTab !== 'imagen' ? (
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
            >
              {images.length > 0 ? (
              images.map((image, index) => (
                <div
                  key={index}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    margin: '5px',
                    width: '150px',
                    height: '150px',
                    border: selectedImageIndex === index ? '2px solid blue' : 'none',
                  }}
                  onClick={() => toggleImageSelection(index)}
                >
                  <img
                    src={image}
                    alt={`Imagen ${index}`}
                    style={{
                      maxWidth: '100%',
                      maxHeight: '100%',
                      width: '100%',
                      height: '100%',
                    }}
                  />
                </div>
              ))
            ) : (
              <p>No hay plantillas</p>
            )}
            </div>
          ) : (
            <>
              {selectedImage ? (
                <>
                  <img src={selectedImage}
                    style={{
                      width: '150px',
                      height: '150px'
                    }} />
                  <button type='button'
                    onClick={() => {
                      setSelectedImage(null);
                      setDisabled(true);
                    }}
                    style={{
                      fontSize: '16px',
                      padding: '5px 9px',
                      border: '1px solid #bababa',
                      borderRadius: '0.25rem',
                      marginTop: '10px',
                      backgroundColor: '#F1F1F1',
                      cursor: 'pointer',
                      transition: 'background-color 0.5s ease',
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = '#d9d9d9';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = '#F1F1F1';
                    }}
                  >
                    <img src="trash.png" alt="Eliminar"
                      style={{
                        width: '25px',
                        height: '25px',
                      }} />
                  </button>
                </>
              ) : (
                <button type='button' onClick={handleFileUpload}
                  style={{
                    fontSize: '16px',
                    padding: '12px 18px',
                    border: '1px solid #bababa',
                    borderRadius: '0.25rem',
                    borderColor: '#4f69ff',
                    color: '#4f69ff',
                    backgroundColor: '#F1F1F1',
                    cursor: 'pointer',
                    transition: 'background-color 0.5s ease',

                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = '#d9d9d9';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = '#F1F1F1';
                  }}>
                  Seleccionar Icono</button>
              )}
              <input type="file" accept=".png, .jpg, .jpeg" ref={fileInput} style={{ display: 'none' }} /></>
          )}
        </div>
        <div
          style={{
            flexBasis: '14%',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            paddingRight: '20px',
            paddingLeft: '20px',
            borderTop: '1px solid #bababa',
            backgroundColor: '#F1F1F1',
          }}
        >
          <button type='button' onClick={onClose}
            style={{
              fontSize: '16px',
              padding: '8px 12px',
              border: '1px solid #bababa',
              borderRadius: '0.25rem',
              backgroundColor: '#F1F1F1',
              cursor: 'pointer',
              transition: 'background-color 0.5s ease',

            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#d9d9d9';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = '#F1F1F1';
            }}>
            Cerrar</button>
          <button type='button'
            disabled={disabled}
            onClick={handleSelectImage}
            style={{
              color: 'white',
              marginLeft: '10px',
              fontSize: '16px',
              padding: '8px 12px',
              border: '1px solid #bababa',
              borderRadius: '0.25rem',
              backgroundColor: '#4f69ff',
              cursor: 'pointer',
              transition: 'background-color 0.5s ease',

            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#4044ff';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = '#4f69ff';
            }}>
            Seleccionar</button>
        </div>
      </div>
    </div>
  );
};

export default IconModal;
