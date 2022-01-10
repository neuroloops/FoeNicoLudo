import * as React from 'react';
import styled from '@emotion/styled';
import base from '../components/Airtable';
import { useEffect, useState } from 'react';
import Historic from '../components/Historic';
import '../assets/main.css';

const IndexPage = () => {
  const [userData, setUserData] = useState([]);
  const [totalNico, setTotalNico] = useState();
  const [totalLudo, setTotalLudo] = useState(0);
  const [pfs, setPfs] = useState(0);

  const getData = async () => {
    const data = await base('Table')
      .select({
        sort: [{ field: 'id', direction: 'desc' }],
      })
      .firstPage()
      .catch(err => console.error(err));
    setUserData(data);
  };
  useEffect(() => {
    getData();
  }, []);

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
          console.error(err);
          return;
        }
        records.forEach(function (record) {
          console.log(record.getId());
        });
      }
    );
    setPfs(0);
    getData();
  };

  let tempLudo = 0;
  let tempNico = 0;

  useEffect(() => {
    userData.forEach(data => {
      const { fields: user } = data;
      user.name === 'Nico'
        ? (tempNico += user.number)
        : (tempLudo += user.number);

      setTotalNico(tempNico);
      setTotalLudo(tempLudo);
    });
  }, [userData]);

  const addPfs = nb => {
    setPfs(nb + pfs);
  };
  const difference = () => {
    return totalLudo > totalNico ? (
      <>Ludo: + {totalLudo - totalNico}</>
    ) : (
      <>nico: + {totalNico - totalLudo}</>
    );
  };

  return (
    <Wrapper>
      <h1>Calculatrice FOE</h1>

      <p>{difference()}</p>

      <div>
        <button onClick={() => addPfs(10)}>+10</button>
        <button onClick={() => addPfs(1)}>+1</button>
        <input
          type='text'
          placeholder={pfs}
          onChange={e => setPfs(+e.target.value)}
        />
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
  );
};

export default IndexPage;

const Wrapper = styled.div`
  background: rgba(227, 212, 169, 1);
  background: -moz-radial-gradient(
    center,
    ellipse cover,
    rgba(227, 212, 169, 1) 0%,
    rgba(227, 212, 169, 1) 24%,
    rgba(177, 140, 88, 1) 100%
  );
  background: -webkit-gradient(
    radial,
    center center,
    0px,
    center center,
    100%,
    color-stop(0%, rgba(227, 212, 169, 1)),
    color-stop(24%, rgba(227, 212, 169, 1)),
    color-stop(100%, rgba(177, 140, 88, 1))
  );
  background: -webkit-radial-gradient(
    center,
    ellipse cover,
    rgba(227, 212, 169, 1) 0%,
    rgba(227, 212, 169, 1) 24%,
    rgba(177, 140, 88, 1) 100%
  );
  background: -o-radial-gradient(
    center,
    ellipse cover,
    rgba(227, 212, 169, 1) 0%,
    rgba(227, 212, 169, 1) 24%,
    rgba(177, 140, 88, 1) 100%
  );
  background: -ms-radial-gradient(
    center,
    ellipse cover,
    rgba(227, 212, 169, 1) 0%,
    rgba(227, 212, 169, 1) 24%,
    rgba(177, 140, 88, 1) 100%
  );
  background: radial-gradient(
    ellipse at center,
    rgba(227, 212, 169, 1) 0%,
    rgba(227, 212, 169, 1) 24%,
    rgba(177, 140, 88, 1) 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#e3d4a9', endColorstr='#b18c58', GradientType=1 );

  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 325px;
  min-width: 215px;
  width: 90%;
  margin: 0 auto;
  border: 5px double #201002;
  button {
    color: #f2d59e;
    font-weight: bold;
    background: #975322;
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
      background: #ece0be;
      border-radius: 5px;
      margin-bottom: 10px;
    }
  }
  h1 {
    text-align: center;
    background: #622317;
    color: #f3d6a0;
    border: 1px solid #8c6747;
    margin: 0;
    width: 100%;
  }

  h3 {
    text-align: center;
  }
`;
