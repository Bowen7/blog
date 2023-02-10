import {
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackProvider,
  UnstyledOpenInCodeSandboxButton
} from '@codesandbox/sandpack-react'
import { githubLight } from '@codesandbox/sandpack-themes'

export const Sandbox = (props) => {
  const { template, files, editorHeight = '600px' } = props
  return (
    <div className="my-6 rounded-lg shadow-lg">
      <SandpackProvider
        template={template}
        theme={githubLight}
        files={files}
        options={{
          classes: {
            'sp-preview': 'h-fit',
            'sp-layout':
              '!block !rounded-none !border-0 !border-gray-200 divide-y',
            'sp-preview-iframe': '!basis-auto',
            'sp-wrapper': '!divide-y'
          }
        }}
      >
        <div className="flex items-center justify-between px-4 py-2">
          <span>SANDBOX</span>
          <UnstyledOpenInCodeSandboxButton>
            Open in CodeSandbox
          </UnstyledOpenInCodeSandboxButton>
        </div>
        <SandpackLayout>
          <SandpackCodeEditor editorHeight={editorHeight} showTabs={false} />
          <SandpackPreview
            className="!h-fit divide-y"
            showOpenInCodeSandbox={false}
          />
        </SandpackLayout>
      </SandpackProvider>
    </div>
  )
}
