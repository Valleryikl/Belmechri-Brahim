export default function HomeSection() {
  return (
    <section className="home-section bg-bottom home pt-[27vh] pl-[7vw]">
      <h1 className="flex flex-col leading-none mb-[20px]">Professional
        <span className="pl-[58px]">Photographer</span>
      </h1>
      <p className="quote w-[38vw] ml-[58px] mt-[-10px]">Photography is a way to stop the breath of time. <br />
      I'm not looking for perfect shots, but for lively ones — where there is light, emotion, and real stories.</p>
      <button className="backdrop-blur-[5px] border mt-[15px] ml-[15vw] px-[55px] py-[3px] text-[17px] font-semibold
                          hover:scale-[1.1] duration-300 ease-out hover:cursor-pointer"><a href="">My Works</a></button>
    </section>
  )
}
