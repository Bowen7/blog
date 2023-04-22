import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview
} from '@codesandbox/sandpack-react'

const options = {
  classes: {
    'sp-layout': '!block divide-y my-6 rounded shadow-md !rounded-lg',
    'sp-stack': '!w-full',
    'sp-preview-container': 'pt-4 px-2'
  },
  resizablePanels: false
}

export const Sandbox = ({
  files,
  deps = {},
  editorHeight = 300,
  previewHeight
}) => {
  return (
    <SandpackProvider
      theme="light"
      template="react"
      options={options}
      files={files}
      customSetup={{
        dependencies: deps
      }}
    >
      <SandpackLayout>
        <SandpackCodeEditor style={{ height: editorHeight }} />
        <SandpackPreview style={{ height: previewHeight || editorHeight }} />
      </SandpackLayout>
    </SandpackProvider>
  )
}
