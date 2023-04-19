import LoaderStyles from './louder.module.css'

function Louder() {
  return (
    <div className="d-flex justify-content-center">
      <div className={LoaderStyles['lds-ripple']}>
        <div />
        <div />
      </div>
    </div>
  )
}

export default Louder
