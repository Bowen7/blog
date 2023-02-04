import Link from 'next/link'
const projects = [
  {
    title: 'regex-vis',
    cover: '/projects/regex-vis.png',
    desc: '🎨 Regex visualizer & editor',
    link: 'https://regex-vis.com/'
  }
]

const ProjectCard = ({ title, desc, cover, link }) => {
  return (
    <Link
      href={link}
      className="no-underline w-3/6 sm:w-full flex items-center  py-2 px-4 my-2 cursor-pointer grayscale hover:grayscale-0 transition-all rounded-lg hover:bg-stone-50"
    >
      <img src={cover} className="w-12 h-12" />
      <div className="ml-4">
        <h3 className="mb-0">{title}</h3>
        <p className=" mb-0 mt-1">{desc}</p>
      </div>
    </Link>
  )
}

function About() {
  return (
    <>
      <div className="text-lg">
        <p>
          {
            "Hey, I'm Bowen, a software engineer working at VMware, Inc. I'm interested in web development."
          }
        </p>
        <p>
          {
            "I also enjoy contributing to open source. Here's the list of my open source projects:"
          }
        </p>
      </div>
      <div className="flex flex-wrap">
        {projects.map((project) => (
          <ProjectCard {...project} key={project.title} />
        ))}
      </div>
    </>
  )
}

export default About
