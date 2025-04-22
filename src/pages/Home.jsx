import ImageButton from '../components/ImageButton'

export default function Home() {
  return (
    <div className="grid grid-cols-2 gap-6 justify-center items-center p-8">
      <ImageButton src="/images/emergencias.png" alt="Emergencias" to="/Emergencias" />
      <ImageButton src="/images/necesidades.png" alt="Necesidades" to="/Necesidades" />
      <ImageButton src="/images/emociones.png" alt="Emociones" to="/Emociones" />
      <ImageButton src="/images/actividades.png" alt="Actividades" to="/Actividades" />
      <ImageButton src="/images/comunicacion.png" alt="Comunicación" to="/Comunicacion" />
      <ImageButton src="/images/comodidad.png" alt="Comodidad" to="/Comodidad" />
    </div> 
  )
}
