import { useState } from 'react'
import {
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackProvider
} from '@codesandbox/sandpack-react'
import clsx from 'clsx'
import {} from '@heroicons/react/24/outline'

const theme = {
  colors: {
    surface1: '#ffffff',
    surface2: '#F3F3F3',
    surface3: '#f5f5f5',
    clickable: '#959da5',
    base: '#24292e',
    disabled: '#d1d4d8',
    hover: '#24292e',
    accent: '#24292e'
  },
  syntax: {
    keyword: '#d73a49',
    property: '#005cc5',
    plain: '#24292e',
    static: '#032f62',
    string: '#032f62',
    definition: '#6f42c1',
    punctuation: '#24292e',
    tag: '#22863a',
    comment: {
      color: '#6a737d',
      fontStyle: 'normal'
    }
  },
  font: {
    body: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    mono: '"Fira Mono", "DejaVu Sans Mono", Menlo, Consolas, "Liberation Mono", Monaco, "Lucida Console", monospace',
    size: '14px',
    lineHeight: '22px'
  }
}

export const Sandbox = (props) => {
  const { template, files, defaultPreviewVisible = true } = props
  const [previewVisible, setPreviewVisible] = useState(defaultPreviewVisible)
  return (
    <div className="my-6 rounded-lg shadow-lg">
      <SandpackProvider
        template={template}
        theme={theme}
        files={files}
        options={{
          classes: {
            'sp-preview': 'h-fit',
            'sp-layout':
              '!block !rounded-none !border-0 !border-gray-200 divide-y',
            'sp-preview-iframe': '!basis-auto',
            'sp-wrapper': '!divide-y !w-full !inline-block'
          }
        }}
      >
        <div className="flex items-center justify-between px-4 py-2">
          <span>SANDBOX</span>
        </div>
        <SandpackLayout>
          <SandpackCodeEditor showTabs={false} showLineNumbers />
          <div className={clsx(!previewVisible && 'hidden')}>
            <SandpackPreview className="!h-fit divide-y" />
          </div>
        </SandpackLayout>
        <div className="flex items-center px-4 py-2 ">
          <span
            className="cursor-pointer"
            onClick={() => setPreviewVisible((v) => !v)}
          >
            {previewVisible ? 'Hide Preview' : 'Show Preview'}
          </span>
        </div>
      </SandpackProvider>
      {/* Prevent focusing on CodeMirror when clicking outside of it on the right. */}
      <span className="hidden">trick</span>
    </div>
  )
}
