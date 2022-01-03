import * as React from 'react'
import styled from '@emotion/styled'
import base from '../components/Airtable'
import { useEffect, useState } from 'react'
import Historic from '../components/Historic'

const IndexPage = () => {
  const [userData, setUserData] = useState([])
  const [totalNico, setTotalNico] = useState()
  const [totalLudo, setTotalLudo] = useState(0)
  const [pfs, setPfs] = useState(0)

  const getData = async () => {
    const data = await base('Table')
      .select({
        sort: [{ field: 'id', direction: 'desc' }],
      })
      .firstPage()
      .catch(err => console.error(err))
    setUserData(data)
  }
  useEffect(() => {
    getData()
  }, [])

  const createData = async nb => {
    base('Table').create(
      [
        {
          fields: {
            number: nb,
            name: 'Nico',
          },
        },
      ],

      function (err, records) {
        if (err) {
          console.error(err)
          return
        }
        records.forEach(function (record) {
          console.log(record.getId())
        })
      }
    )
    setPfs(0)
    getData()
  }

  let tempLudo = 0
  let tempNico = 0

  useEffect(() => {
    userData.forEach(data => {
      const { fields: user } = data
      user.name === 'Nico'
        ? (tempNico += user.number)
        : (tempLudo += user.number)

      setTotalNico(tempNico)
      setTotalLudo(tempLudo)
    })
  }, [userData])

  const addPfs = nb => {
    setPfs(nb + pfs)
  }

  return (
    <Wrapper>
      <h1>Nico Ludo</h1>
      <h2>Calculatrice Foe</h2>
      <div>
        <p>Ajout :</p>
        <button onClick={() => addPfs(10)}>+10</button>
        <button onClick={() => addPfs(1)}>+1</button>
        <input type='text' placeholder={pfs} />
        <button onClick={() => createData(pfs)}>Valider</button>
      </div>
      <div className='body'>
        <div>
          <h3>
            Nico <span>: {totalNico}</span>
          </h3>
          <Historic Name='Nico' data={userData} />
        </div>
        <div>
          <h3>
            Ludo: <span>{totalLudo}</span>
          </h3>
          <Historic Name='Ludo' data={userData} />
        </div>
      </div>
    </Wrapper>
  )
}

export default IndexPage

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 450px;
  width: 100%;
  margin: 0 auto;
  button {
    height: 30px;
    margin: 0 5px;
  }
  input {
    width: 30px;
    height: 30px;
    text-align: center;
  }
  .body {
    display: flex;
    justify-content: space-around;
    width: 100%;
    > div {
      margin-top: 10px;
      border: 1px solid #ccc;
    }
  }
  h3 {
    text-align: center;
  }
`
