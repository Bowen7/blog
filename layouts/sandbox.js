import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview
} from '@codesandbox/sandpack-react'

const options = {
  classes: {
    'sp-layout': '!block divide-y my-6 rounded shadow-lg !rounded-lg',
    'sp-stack': '!w-full',
    'sp-preview-container': 'pt-6'
  },
  resizablePanels: false,
  initMode: 'user-visible'
}

export const Sandbox = ({
  files,
  dependencies = {},
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
        dependencies
      }}
    >
      <SandpackLayout>
        <SandpackCodeEditor style={{ height: editorHeight }} />
        <SandpackPreview style={{ height: previewHeight || editorHeight }} />
      </SandpackLayout>
    </SandpackProvider>
  )
}
