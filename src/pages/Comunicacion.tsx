import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/comunicacion.css';

const Comunicacion = () => {
  const [text, setText] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [capsLock, setCapsLock] = useState(false);
  const navigate = useNavigate();

  // Teclas del teclado virtual - versión en español
  const firstRow = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'];
  const secondRow = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];
  const thirdRow = ['z', 'x', 'c', 'v', 'b', 'n', 'ñ', 'm'];
  const specialKeys = ['space', 'backspace', 'enter'];

  // Verificar soporte de síntesis de voz
  const [voiceSupported, setVoiceSupported] = useState(true);

  useEffect(() => {
    if (!('speechSynthesis' in window)) {
      setVoiceSupported(false);
      console.warn('La síntesis de voz no está soportada en este navegador');
    }
  }, []);

  const handleKeyPress = (key: string) => {
    let newText = text;
    
    if (key === 'space') {
      newText += ' ';
    } else if (key === 'backspace') {
      newText = newText.slice(0, -1);
    } else if (key === 'enter') {
      newText += '\n';
    } else if (key === 'clear') {
      newText = '';
    } else {
      // Aplicar mayúsculas si capsLock está activado
      newText += capsLock ? key.toUpperCase() : key;
    }
    
    setText(newText);
  };

  const toggleCapsLock = () => {
    setCapsLock(!capsLock);
  };

  const handleSpeak = () => {
    if (!text.trim()) return;
    
    setIsSpeaking(true);
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES';
    utterance.rate = 0.9;
    
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    window.speechSynthesis.speak(utterance);
  };

  const clearAllText = () => {
    setText('');
  };

  return (
    <div className="home-container">
      {/* Botón de regreso */}
      <button onClick={() => navigate('/')} className="back-button">
        <span className="back-icon">←</span> MENÚ PRINCIPAL
      </button>

      <h1 className="home-title">COMUNICACIÓN</h1>

      <div className="communication-content">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Escribe tu mensaje aquí..."
          className="communication-input"
        />
        
        <div className="button-group">
          {text && (
            <button
              onClick={clearAllText}
              className="clear-button"
              disabled={!text}
            >
              BORRAR TODO
            </button>
          )}

          {voiceSupported && text && (
            <button
              onClick={handleSpeak}
              className={`speak-button ${isSpeaking ? 'speaking' : ''}`}
              disabled={isSpeaking}
            >
              {isSpeaking ? '' : ''}
              <span className="speak-icon"> 🔊</span>
            </button>
          )}
        </div>
      </div>

      {/* Teclado siempre visible */}
      <div className="virtual-keyboard">
        <div className="keyboard-row">
          {firstRow.map((key) => (
            <button 
              key={key} 
              onClick={() => handleKeyPress(key)}
              className="keyboard-key"
            >
              {capsLock ? key.toUpperCase() : key}
            </button>
          ))}
        </div>
        
        <div className="keyboard-row">
          {secondRow.map((key) => (
            <button 
              key={key} 
              onClick={() => handleKeyPress(key)}
              className="keyboard-key"
            >
              {capsLock ? key.toUpperCase() : key}
            </button>
          ))}
        </div>
        
        <div className="keyboard-row">
          {thirdRow.map((key) => (
            <button 
              key={key} 
              onClick={() => handleKeyPress(key)}
              className="keyboard-key"
            >
              {capsLock ? key.toUpperCase() : key}
            </button>
          ))}
          
          {/* Botón de mayúsculas */}
          <button 
            onClick={toggleCapsLock}
            className={`keyboard-key caps-lock ${capsLock ? 'active' : ''}`}
          >
            {capsLock ? '⇪' : '⇧'}
          </button>
        </div>
        
        <div className="keyboard-row special-keys">
          {specialKeys.map((key) => (
            <button
              key={key}
              onClick={() => handleKeyPress(key)}
              className={`keyboard-key ${key === 'space' ? 'space-key' : ''}`}
            >
              {key === 'space' ? 'Espacio' : 
               key === 'backspace' ? '⌫' : 
               key === 'enter' ? 'Intro' : ''}
            </button>
          ))}

          {/* Botón para borrar todo */}
          <button
            onClick={clearAllText}
            className="keyboard-key clear-all-key"
          >
            BORRAR
          </button>
        </div>
      </div>
    </div>
  );
};

export default Comunicacion;