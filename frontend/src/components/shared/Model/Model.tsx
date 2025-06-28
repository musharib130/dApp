import './Model.scss'

interface ModelProps {
  showModal: boolean
  children: React.ReactNode
}

export default function Model({ showModal, children }: ModelProps) {
  return (
    showModal ? (
      <div className='model-root'>
        {children}
      </div>
    ) : null
  )
}
