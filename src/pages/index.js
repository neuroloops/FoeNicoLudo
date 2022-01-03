import * as React from 'react'
import styled from '@emotion/styled'

const IndexPage = () => {
  return (
    <Wrapper>
      <main>
        <h1>Nico Ludo</h1>
        <h2>Calculatrice Foe</h2>
        <div className='body'>
          <div>
            <h3>Nico</h3>
            <h4>Ajout</h4>
            <div>
              <button>+10</button>
              <button>+1</button>
              <input type='text' />
            </div>
            <button>Valider</button>
          </div>
          <div>
            <h3>Ludo</h3>
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
`
