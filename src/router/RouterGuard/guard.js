import { Navigate, useLocation, useNavigate } from 'react-router-dom'

let temp = null

function Guard ({ element, meta, handleRouteBefore }) {
  meta = meta || {}

  const location = useLocation()
  const { pathname } = location

  const navigate = useNavigate()

  if (handleRouteBefore) {
    if (temp === element) {
      return element
    }
    const pathRes = handleRouteBefore({ pathname, meta })
    const pathResType = Object.prototype.toString.call(pathRes).match(/s(w+)]/)[1]
    if (pathResType === 'Promise') {
      pathRes.then(res => {
        if (res && res !== pathname) {
          navigate(res, { replace: true })
        }
      })
    } else {
      if (pathRes && pathRes !== pathname) {
        element = <Navigate to={pathRes} replace={true} />
      }
    }
  }

  temp = element
  return element
}

export default Guard
