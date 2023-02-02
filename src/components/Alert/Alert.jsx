import React from 'react'

const Alert = ({msg,type,hide}) => {
  return (
    <>
        <div className="custom_alert">
            <p className={`alert alert-${type} d-flex justify-content-between`}>{msg}<button onClick={()=> hide(false)} className="btn-close"></button></p>
        </div>
    </>
  )
}

export default Alert