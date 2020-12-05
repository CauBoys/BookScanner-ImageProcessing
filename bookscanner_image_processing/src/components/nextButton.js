import { useHistory } from 'react-router-dom'
import { Button } from 'react-bootstrap'

export const NextButtons = ({ path, name, id, width, height }) => {
  const history = useHistory()
  return (
    <div>
      <Button variant="primary" onClick={() => history.push(`${path}/${id}`)}>
        {name}
      </Button>
    </div>
  )
}
