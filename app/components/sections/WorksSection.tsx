export default function WorksSection() {
  return (
    <div>
      <h3>Works</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <WorkCard />
        <WorkCard />
        <WorkCard />
        <WorkCard />
        <WorkCard />
        <WorkCard />
      </div>
    </div>
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