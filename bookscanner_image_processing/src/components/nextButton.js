import { useHistory } from 'react-router-dom'

export const NextButtons = ({ path, name }) => {
  const history = useHistory()
  return (
    <div>
      <button onClick={() => history.push(path)}>{name}</button>
    </div>
  )
}
