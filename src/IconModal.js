import React, { useRef, useState, useEffect } from 'react';

const IconModal = ({ onClose }) => {
  const fileInput = useRef(null);
  const [selectedTab, setSelectedTab] = useState('imagen');
  const [images, setImages] = useState([]);
  const [myImages, setMyImages] = useState([]);
  const contentRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [selectedMyImageIndex, setSelectedMyImageIndex] = useState(null);
  const [hiddenImages, setHiddenImages] = useState(new Set());
 
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


   const toggleImageSelection = (index) => {
    if (selectedMyImageIndex!=null){
      setSelectedMyImageIndex(null);
    }
    if (selectedImageIndex === index) {
      setSelectedImageIndex(null);
      setSelectedImage(null);
      setDisabled(true);
    } else {
      setSelectedImageIndex(index);
      setDisabled(false);
      setSelectedImage(images[index])
      handleImageClick(index);
    }
  };

  const toggleMyImageSelection = (index) => {
    if (selectedImageIndex!=null){
      setSelectedImageIndex(null);
    }
    if (selectedMyImageIndex === index) {
      setSelectedMyImageIndex(null);
      setSelectedImage(null);
      setDisabled(false);
    } else {
      setSelectedMyImageIndex(index);
      setDisabled(false);
      setSelectedImage(myImages[index])
      handleMyImageClick(index);
    }
  };

  const handleMyImageClick = async (index) => {
    let imagePath = myImages[index];

    const serverURL = 'http://localhost:3000/uploads/assignment/icon/iconos_base/';
    imagePath = imagePath.replace('./', serverURL);

    const response = await fetch(imagePath);
    const blob = await response.blob();

    const reader = new FileReader();

    reader.onloadend = function() {
      setSelectedImage(reader.result);
    }

    reader.readAsDataURL(blob);

  };

  const handleImageClick = async (index) => {
    let imagePath = images[index];

    const serverURL = 'http://localhost:3000/uploads/assignment/icon/iconos_base/';
    imagePath = imagePath.replace('./', serverURL);

    const response = await fetch(imagePath);
    const blob = await response.blob();

    const reader = new FileReader();

    reader.onloadend = function() {
      setSelectedImage(reader.result);
    }

    reader.readAsDataURL(blob);

  };

  const handleSelectImage = () => {   
    console.log(selectedImage)
  };

  const deleteImage = (index) => {
    setHiddenImages(prevHiddenImages => new Set(prevHiddenImages.add(index)));
    console.log();
    setSelectedMyImageIndex(null);
    setSelectedImage(null);
    setDisabled(false);
  }


  useEffect(() => {
    const importAll = (r) => {
      return r.keys().map((key, index) => ({
        image: r(key),
        path: key
      }));
    };
    const imagesContext = require.context('./images', false, /\.(png|jpe?g|svg)$/);
    const imagesList = importAll(imagesContext);
    
    const images = imagesList.map(item => item.image);
    setImages(images);

    const importAll2 = (r) => {
      return r.keys().map((key, index) => ({
        image: r(key),
        path: key
      }));
    };
    const imagesContext2 = require.context('./myimages', false, /\.(png|jpe?g|svg)$/);
    const imagesList2 = importAll2(imagesContext2);
    
    const myimages = imagesList2.map(item => item.image);
    setMyImages(myimages);


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
        overflow: 'hidden',
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
          overflow: 'hidden',
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
            onClick={() => setSelectedTab('imagen_profesor')}
            style={{
              flex: 1,
              textAlign: 'center',
              cursor: 'pointer',
              backgroundColor: selectedTab === 'imagen_profesor' ? '#F1F1F1' : '#FFFFFF',
            }}
          >
            <p style={{ fontWeight: 'bold', fontSize: '19px' }}>Mis Iconos</p>
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
            overflowY: 'auto',
            alignItems: 'center',
            justifyContent: selectedTab === 'imagen' ? 'center' : 'flex-start',
          }}
          ref={contentRef}
        >
  {selectedTab == 'plantilla' ? (
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
            border: selectedImageIndex === index ? '2px solid #4f69ff' : 'none',
            cursor: 'pointer',
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
      <p>No hay iconos</p>
    )}
  </div>
) : selectedTab == 'imagen' ? (
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
            setSelectedImageIndex(null);
            setSelectedMyImageIndex(null);
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
      <>
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
        <input type="file" accept=".png, .jpg, .jpeg" ref={fileInput} style={{ display: 'none' }} />
      </>
    )}
  </>
) : (
  <div
    style={{
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
    }}
  >
    {myImages.length > 0 ? (
  myImages.map((image, index) => (
    !hiddenImages.has(index) && (
      <div
        key={index}
        style={{
          maxWidth: '100%',
          maxHeight: '100%',
          margin: '5px',
          width: '150px',
          height: '150px',
          border: selectedMyImageIndex === index ? '2px solid #4f69ff' : 'none',
          position: 'relative',
          cursor: 'pointer',
        }}
        onClick={() => toggleMyImageSelection(index)}
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
        {selectedMyImageIndex === index && (
          <button
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              fontSize: '16px',
              padding: '5px 9px',
              border: '1px solid #bababa',
              backgroundColor: 'rgba(241, 241, 241, 0.7)',
              cursor: 'pointer',
              transition: 'background-color 0.5s ease',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(217, 217, 217, 1)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(241, 241, 241, 0.7)';
            }}
            onClick={(e) => {
              e.stopPropagation();
              deleteImage(index);
            }}
          >
            <img src="trash.png" alt="Eliminar"
            style={{
              width: '25px',
              height: '25px',
            }} />
          </button>
        )}
      </div>
    )
  ))
) : (
  <p>No hay iconos</p>
)
}
  </div>
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