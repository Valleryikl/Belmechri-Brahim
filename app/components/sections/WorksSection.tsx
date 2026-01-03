export default function WorksSection() {
  return (
    <section className="mx-[8%] pt-[100px] relative z-51 works-section">
      <h3>Works</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        <WorkCard />
        <WorkCard />
        <WorkCard />
        <WorkCard />
        <WorkCard />
        <WorkCard />
      </div>
    </section>
  )
}

type CardProps = { img?: string; }
function WorkCard({ img }: CardProps) {
  return (
    <div className="bg-white/5 p-5">
      <div className="aspect-video rounded-xl bg-black/30 mb-4" />
    </div>
  )
}