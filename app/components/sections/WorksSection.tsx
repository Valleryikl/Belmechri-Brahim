export default function WorksSection() {
  return (
    <section id="works" className="mx-[8%] pt-[20px] relative z-51 works-section">
      <h3>Works</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        <WorkCard img="./img/work1.png" />
        <WorkCard img="./img/work2.png" />
        <WorkCard img="./img/work3.png" />
        <WorkCard img="./img/work4.png" />
        <WorkCard img="./img/work5.png" />
        <WorkCard img="./img/work6.png" />
      </div>
    </section>
  )
}

type CardProps = { img?: string; }
function WorkCard({ img }: CardProps) {
  return (
    <div className="bg-white/5 overflow-hidden w-[370px] h-[250px] group">
      <div 
        className="w-full h-full bg-cover bg-center bg-no-repeat 
                   transition-transform duration-500 group-hover:scale-110"
        style={{ 
          backgroundImage: img ? `url(${img})` : 'none' 
        }}>
          </div>
    </div>
  )
}