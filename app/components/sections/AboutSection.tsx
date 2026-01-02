export default function AboutSection() {
  return (
    <section className="about-section flex justify-between mx-[8%] h-full items-center mt-[-1.5%]">
      <div className="img-wrapper">
        <img src="img/photographer.png" alt="Photographer with binoculars" />
      </div>
      <div className="content w-[52%]">
        <h2 className="mb-[30px]">About Me</h2>
        <p>For almost three years, I’ve been capturing the world through my lens — transforming a simple 
          hobby into a passion that lets me freeze emotions, stories, and fleeting moments. Photography isn’t 
          just about images for me — it’s about connection, patience, and the quiet beauty hidden in everyday life.
          <br />
          <br />
          I find inspiration in the calm of nature, the rhythm of cities, and the honesty of people — especially children
          and animals. Every photo I take reflects a feeling, a memory, or a breath of peace. Through my work, I hope to
          share that sense of stillness and wonder with everyone who looks at my pictures.
          </p>
      </div>
    </section>
  )
}
