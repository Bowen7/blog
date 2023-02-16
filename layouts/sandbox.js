import { useState } from 'react'
import { Github } from 'lucide-react'

export const Sandbox = (props) => {
  const {
    children,
    preview,
    previewVisible: initialPreviewVisible = true,
    link
  } = props
  const [previewVisible, setPreviewVisible] = useState(initialPreviewVisible)

  return (
    <div className="[&>div>div]:rounded-none [&>div>div]:shadow-none [&>div>div]:my-0 my-6 rounded-lg shadow-lg divide-y">
      {children}
      {preview && (
        <>
          {previewVisible && (
            <div className="px-4 py-2 overflow-auto">{preview}</div>
          )}
          <div className="flex items-center justify-between px-4 py-2 text-sm">
            <span
              className="cursor-pointer"
              onClick={() => setPreviewVisible(!previewVisible)}
            >
              {previewVisible ? 'Hidden Preview' : 'Show Preview'}
            </span>
            {link && (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: 0 }}
              >
                <Github size="18" />
              </a>
            )}
          </div>
        </>
      )}
    </div>
  )
}
