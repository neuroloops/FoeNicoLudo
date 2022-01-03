import * as React from 'react'
import styled from '@emotion/styled'
import base from '../components/Airtable'
import { useEffect, useState } from 'react'

const IndexPage = () => {
  const [userData, setUserData] = useState([])
  const [totalNico, setTotalNico] = useState(0)
  const [totalLudo, setTotalLudo] = useState(0)

  const getData = async () => {
    const heroTable = await base('Table')
      .select({})
      .firstPage()
      .catch(err => console.error(err))
    setUserData(heroTable)
  }
  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    userData.forEach(data => {
      const { fields: user } = data
      console.log(user)
      if (user.name === 'Nico') {
        setTotalNico(totalNico + user.number)
      }
      if (user.name === 'Ludo') {
        setTotalLudo(totalLudo + user.number)
      }
    })
  }, [userData])

  console.log(userData)
  return (
    <Wrapper>
      <main>
        <h1>Nico Ludo</h1>
        <h2>Calculatrice Foe</h2>
        <div className='body'>
          <div>
            <h3>Nico</h3>
            <p>total: {totalNico}</p>
            <h4>Ajout</h4>
            <div>
              <button>+10</button>
              <button>+1</button>
              <input type='text' />
              <button>Valider</button>
            </div>

            <h2>historique</h2>
            <ul>
              {userData.map(data => {
                const { fields: user } = data

                let tempDate = Date.parse(user.created)
                const newDate = new Date(tempDate).toLocaleString('fr-FR')

                return (
                  <li key={user.id} className='historique'>
                    <p>{user.name}</p>
                    <p>{user.number}</p>
                    <p>{newDate}</p>
                  </li>
                )
              })}
            </ul>
          </div>
          <div>
            <h3>Ludo</h3>
            <p>total: {totalLudo}</p>
          </div>
        </div>
      </main>
    </Wrapper>
  )
}

export default IndexPage

const Wrapper = styled.div`
  .body {
    display: flex;
  }
  .historique {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0;
    height: 1.5rem;
  }
`
