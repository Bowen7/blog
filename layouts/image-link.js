export const ImageLink = (props) => {
  const { href, desc, img, title } = props
  return (
    <a
      target="_blank"
      rel="noreferrer"
      href={href}
      className="block border my-4 no-underline rounded-lg overflow-hidden hover:shadow-sm"
    >
      <img src={img} />
      <div className="px-6 py-4">
        <p className="font-bold py-0 my-0">{title}</p>
        <p className="py-0 my-0 text-sm">{desc}</p>
      </div>
    </a>
  )
}
