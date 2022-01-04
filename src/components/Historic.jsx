import React from 'react'
import styled from '@emotion/styled'

const Historic = ({ Name, data }) => {
  return (
    <Ul>
      {data.map(dataMap => {
        const { fields: user } = dataMap

        let tempDate = Date.parse(user.created)
        const newDate = new Date(tempDate).toLocaleString('fr-FR', {
          day: '2-digit',
          month: '2-digit',
        })
        if (user.name === Name) {
          return (
            <li key={user.id} className='historique'>
              <p className='number'>{user.number}</p>
              <p className='date'>{newDate}</p>
            </li>
          )
        }
      })}
    </Ul>
  )
}

export default Historic

const Ul = styled.ul`
  list-style-type: none;
  padding: 0;
  width: 100px;

  .date {
    font-size: 0.8em;
  }

  li {
    display: flex;
    justify-content: space-around;
    height: 1.5rem;
    align-items: center;
  }
  .number {
    width: 30px;
    text-align: right;
  }
`
