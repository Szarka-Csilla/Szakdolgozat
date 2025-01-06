import './App.css';

import { useState } from "react";
import { createPortal } from 'react-dom';
//import BelepesAblak from './BelepesAblak';
import $ from "jquery";
import "./App.css";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';


/*const adatok = [
  { nev: "alma", szin: "piros", mennyi: 3 },
  { nev: "körte", szin: "sárga", mennyi: 24 },
  { nev: "őszibarabck", szin: "narancs", mennyi: 20 },
  { nev: "szilva", szin: "lila", mennyi: 10 }

];*/



function App() {

  //bejelentkezés
  
  //változók
  const [mod, setMod] = useState("");
  const [nev, setNev] = useState("");
  const [email, setEmail] = useState("");
  const [emailUj, setEmailUj] = useState("");
  const [jelsz, setJelsz] = useState("");
  const [telszam, setTelszam] = useState("");
  const [jogosultsag, setJogosultsag] = useState("");
  const [szak, setSzak] = useState("");
  const [szakfelelos, setSzakfelelos] = useState("");
  const [resultText, setResultText] = useState("");
  const [felhnev, setFelhnev] = useState("");
  const [felev, setFelev] = useState("");
  const [result, setResult] = useState([]);
  const [adatok, setAdatok] = useState([]);

  //megjelenítők
  const [Belepes, setBelepes] = useState(true);
  const [showBelepAblak, setShowBelepAblak] = useState(false);
  const [showTablaTeszt, setShowTablaTeszt] = useState(false);
  const [showTablaAdmin, setShowTablaAdmin] = useState(false); //admin
  const [showTablaTO, setShowTablaTO] = useState(false); //tanulmányi osztály/iroda
  const [showTablaSzakfelelos, setShowTablaSzakfelelos] = useState(false); //szakfelelős
  const [showTablaTanszekvezeto, setShowTablaTanszekvezeto] = useState(false); //tanszékvezető
  const [showTablaOktato, setShowTablaOktato] = useState(false); //oktató
  const [showUjOktato, setShowUjOktato] = useState(false);
  const [showUjSzak, setShowUjSzak] = useState(false);
  const [showUjFelev, setShowUjFelev] = useState(false);

  //nem tudom mi
  var n=0;

  var formDataBelepTeszt = new FormData();
  formDataBelepTeszt.append('nev', nev);
  formDataBelepTeszt.append('jelsz', jelsz);
  formDataBelepTeszt.append('mod', mod);
  const requestOptionsBelepTeszt = {
    method: 'POST',
    body: formDataBelepTeszt
  };

  var formDataBelep = new FormData();
  formDataBelep.append('email', email);
  formDataBelep.append('jelsz', jelsz);
  formDataBelep.append('mod', mod);
  const requestOptionsBelep = {
    method: 'POST',
    body: formDataBelep
  };

  var formDataTabla = new FormData();
  formDataTabla.append('nev', result);
  formDataTabla.append('mod', mod);
  const requestOptionsTabla = {
    method: 'POST',
    body: formDataTabla
  };

  var formDataUjSzak = new FormData();
  formDataUjSzak.append('szak', szak);
  formDataUjSzak.append('szakfelelos', szakfelelos);
  formDataUjSzak.append('mod', mod);
  const requestOptionsUjSzak = {
    method: 'POST',
    body: formDataUjSzak
  };

  var formDataUjFelev = new FormData();
  formDataUjFelev.append('felev', felev);
  formDataUjFelev.append('mod', mod);
  const requestOptionsUjFelev = {
    method: 'POST',
    body: formDataUjFelev
  };

  var formDataUjOktato = new FormData();
  formDataUjOktato.append('email', email);
  formDataUjOktato.append('jelsz', jelsz);
  formDataUjOktato.append('nev', nev);
  formDataUjOktato.append('jogosultsag', jogosultsag);
  formDataUjOktato.append('telszam', telszam);
  formDataUjOktato.append('mod', mod);
  const requestOptionsUjOktato = {
    method: 'POST',
    body: formDataUjOktato
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangeJelsz = (e) => {
    setJelsz(e.target.value);
  };

  const handleChangeNev = (e) => {
    setNev(e.target.value);
  };

  const handleChangeTelszam = (e) => {
    setTelszam(e.target.value);
  };

  const handleChangeJogosultsag = (e) => {
    setJogosultsag(e.target.value);
  };

  const handleChangeSzak = (e) => {
    setSzak(e.target.value);
  };

  const handleChangeSzakfelelos = (e) => {
    setSzakfelelos(e.target.value);
  };

  const handleChangeFelev = (e) => {
    
  }

  //bejelentkezés
  const handleSubmitBelep = (e) => {
    e.preventDefault();
    //setMod("belepesTeszt");
    setMod("belepes");
    const form = $(e.target);
    //elküldjük a belépési adatokat
    //fetch('http://localhost:8000/server.php', requestOptionsBelepTeszt)
    fetch('http://localhost:8000/server.php', requestOptionsBelep)
    .then(response => {
      if (!response.ok) {
        throw new Error('response not ok');
      }
      return response.text();
      //return response.json();
    })
    .then(data => {
      console.log('Data received:', data);
      //setResult(data);
      setResultText(data);
      if (data != "")
      {
        setBelepes(false);
        setShowBelepAblak(false);
        //setShowTablaTeszt(true);
        setJogosultsag(data);
        if (data == "Admin") {
          setShowTablaAdmin(true);
        } else if (data == "Szakfelelős") {
          setShowTablaSzakfelelos(true);
        } else if (data == "Tanszékvezető") {
          setShowTablaTanszekvezeto(true);
        }
      }
    })
    .catch(error => {
      console.error('problem with fetch operation: ', error);
    });
  }

  //új oktató felvétele
  const handleSubmitUjOktato = (e) => {
    e.preventDefault();
    setMod("ujOktato");
    fetch('http://localhost:8000/server.php', requestOptionsUjOktato)
    .then(response => {
      if (!response.ok) {
        throw new Error('response not ok');
      }
      return response.text();
    })
    .then(data => {
      console.log('Data received:', data);
      setResultText(data);
    })
    .catch(error => {
      console.error('problem with fetch operation: ', error);
    });
  }

  //új szak felvétele
  const handleSubmitUjSzak = (e) => {
    e.preventDefault();
    setMod("ujSzak");
    fetch('http://localhost:8000/server.php', requestOptionsUjSzak)
    .then(response => {
      if (!response.ok) {
        throw new Error('response not ok');
      }
      return response.text();
    })
    .then(data => {
      console.log('Data received:', data);
      setResultText(data);
    })
    .catch(error => {
      console.error('problem with fetch operation: ', error);
    });
  }

  //új félév felvétele
  const handleSubmitUjFelev = (e) => {
    e.preventDefault();
    setMod("ujFelev");
    fetch('http://localhost:8000/server.php', requestOptionsUjFelev)
    .then(response => {
      if (!response.ok) {
        throw new Error('response not ok');
      }
      return response.text();
    })
    .then(data => {
      console.log('Data received:', data);
      setResultText(data);
    })
    .catch(error => {
      console.error('problem with fetch operation: ', error);
    });
  }

  const nevValt = () => {
    setMod("tablazatLekeres");
    fetch('http://localhost:8000/server.php', requestOptionsTabla)
        .then(response => {
          if (!response.ok) {
            throw new Error('response not ok tabla');
          }
          return response.json();
        })
        .then(data => {
          console.log('Data received:', data);
          setAdatok(data);
        })
        .catch(error => {
          console.error('problem with fetch operation tabla: ', error);
        });
  }

  //ez a belépés felirat, a gomb és a felugró ablak
  const BelepesMezo = () => (
          <div>
          <h4>Bejelentkezés</h4>
            <button onClick={() => setBelepesOda()}> Bejelentkezés </button>
        </div>
  )

  const setBelepesOda = () => {
    setShowBelepAblak(true);
    setBelepes(false);
  }

  //felugró ablak a portálban
  const BelepesAblak = () => (
    <div>
      <div>
      <form
            onSubmit={(event) => handleSubmitBelep(event)}>
        <label htmlFor="name">Email: </label>
        <input
            type="text"
            id="email"
            name="email"
            value={email}
            onChange={(event) =>
                handleChangeEmail(event)
            }
        /><br />
        <label htmlFor="jelsz">Jelszó: </label>
        <input
          type="password"
          id="jelsz"
          name="jelsz"
          value={jelsz}
          onChange={(event) =>
            handleChangeJelsz(event)
          }
        />
        <br />
        <button type="submit">Submit</button>
    </form>
      </div>
      <div>
        <button onClick={() => setBelepesVissza()}>Bezárás</button>
      </div>
      </div>
  )

  const setBelepesVissza = () => {
    setShowBelepAblak(false);
    setBelepes(true);
  }

  //táblázat megjelenítése
  const TablazatTeszt = () => (
    <div>
    <button onClick={() => nevValt()}>Nyomd meg</button>
    <table>
        <tbody>
        <tr>
          <th>Név</th>
          <th>Szín</th>
          <th>Mennyiség</th>
          <th>Gombok</th>
        </tr>
        {adatok.map((val, key) => {
          return (
            <tr key={key}>
              <td>{val.nev}</td>
              <td>{val.szin}</td>
              <td>{val.mennyi}</td>
              <td><button onClick={() => irdKi(key)}>Gomb vagyok {n++}</button></td>
            </tr>
          )
        })}
        </tbody>
      </table>
      </div>
  )

  const TablazatAdmin = () => (
    <div className='fotabla'>
    <button onClick={() => adminUjSzak()}>Új szak felvétele</button>
    <button onClick={() => adminUjFelev()}>Új félév felvétele</button>
    <button onClick={() => nevValt()}>Nyomd meg</button>
    <table>
        <tbody>
        <tr>
          <th>Szervezeti egység</th>
          <th>Szak</th>
          <th>Indul</th>
          <th>Tanév</th>
          <th>Évszak</th>
          <th>Tárgynév</th>
          <th>Tárgykód</th>
          <th>Évfolyam</th>
          <th>Online</th>
          <th>Típus</th>
          <th>Kredit</th>
          <th>Óraszám nappali</th>
          <th>Óraszám levelező</th>
          <th>Követelmény</th>
          <th>Oktató neve nappali</th>
          <th>Oktató neve levelező</th>
          <th>Tanulmányi iroda megjegyzés</th>
          <th>Oktatói megjegyzés</th>
        </tr>
        {adatok.map((val, key) => {
          return (
            <tr key={key}>
              <td>{val.szervEgys}</td>
              <td>{val.szaknev}</td>
              <td>{val.indul}</td>
              <td>{val.tanev}</td>
              <td>{val.evszak}</td>
              <td>{val.targynev}</td>
              <td>{val.targykod}</td>
              <td>{val.evfolyam}</td>
              <td>{val.online}</td>
              <td>{val.tipus}</td>
              <td>{val.kredit}</td>
              <td>{val.oraszamNap}</td>
              <td>{val.oraszamLev}</td>
              <td>{val.kovetelmeny}</td>
              <td>{val.oktatoNap}</td>
              <td>{val.oktatoLev}</td>
              <td>{val.TImegjegyzes}</td>
              <td>{val.oktatoMegjegyzes}</td>
              <td><button onClick={() => irdKi(key)}>Gomb vagyok {n++}</button></td>
            </tr>
          )
        })}
        </tbody>
      </table>
      </div>
  )

  const UjSzak = () => (
    <div>
      <div>
        <form onSubmit={(event) => handleSubmitUjSzak(event)}> 
          <p>Szak: </p>
          <input
              type="text"
              id="szak"
              name="szak"
              value={szak}
              onChange={(event) =>
                handleChangeSzak(event)
              }
          /><br />
          <p>Szakfelelős</p>
          <input
              type="text"
              id="szakfelelos"
              name="szakfelelos"
              value={szakfelelos}
              onChange={(event) =>
                handleChangeSzakfelelos(event)
              }
          /><br />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  )

  const UjFelev = () => (
    <div>
      <div>
        <form onSubmit={(event) => handleSubmitUjFelev(event)}> 
          <p>Félév neve: </p>
          <input
              type="text"
              id="felev"
              name="felev"
              value={felev}
              onChange={(event) =>
                handleChangeFelev(event)
              }
          /><br />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  )

  const adminUjSzak = () => {
    setShowUjSzak(true);
  }

  const adminUjFelev = () => {
    setShowUjFelev(true);
  }

  const TablazatTanszekvezeto = () => (
    <div>
    <button onClick={() => tanszekvezetoUjOktato()}>Új oktató felvétele</button>
    <table>
        <tbody>
        <tr>
          <th>Szervezeti egység</th>
          <th>Szak</th>
          <th>Indul</th>
          <th>Tanév</th>
          <th>Évszak</th>
          <th>Tárgynév</th>
          <th>Tárgykód</th>
          <th>Évfolyam</th>
          <th>Online</th>
          <th>Típus</th>
          <th>Kredit</th>
          <th>Óraszám nappali</th>
          <th>Óraszám levelező</th>
          <th>Követelmény</th>
          <th>Oktató neve nappali</th>
          <th>Oktató neve levelező</th>
          <th>Tanulmányi iroda megjegyzés</th>
          <th>Oktatói megjegyzés</th>
        </tr>
        
            <tr>
              <td>aaaaaaa</td>
              <td>aaaaaaa</td>
              <td>aaaaaaa</td>
              <td>aaaaaaa</td>
              <td>aaaaaaa</td>
              <td>aaaaaaa</td>
              <td>aaaaaaa</td>
              <td>aaaaaaa</td>
              <td>aaaaaaa</td>
              <td>aaaaaaa</td>
              <td>aaaaaaa</td>
              <td>aaaaaaa</td>
              <td>aaaaaaa</td>
              <td>aaaaaaa</td>
              <td>aaaaaaa</td>
              <td>aaaaaaa</td>
              <td>aaaaaaa</td>
              <td>aaaaaaa</td>
            </tr>
          
        
        </tbody>
      </table>
      </div>
  )

  const TablazatSzakfelelos = () => (
    <div>
    <button >Szakok indítása</button>
    <table>
        <tbody>
        <tr>
          <th>Szervezeti egység</th>
          <th>Szak</th>
          <th>Indul</th>
          <th>Tanév</th>
          <th>Évszak</th>
          <th>Tárgynév</th>
          <th>Tárgykód</th>
          <th>Évfolyam</th>
          <th>Online</th>
          <th>Típus</th>
          <th>Kredit</th>
          <th>Óraszám nappali</th>
          <th>Óraszám levelező</th>
          <th>Követelmény</th>
          <th>Oktató neve nappali</th>
          <th>Oktató neve levelező</th>
          <th>Tanulmányi iroda megjegyzés</th>
          <th>Oktatói megjegyzés</th>
        </tr>
        
            <tr>
              <td>aaaaaaa</td>
              <td>aaaaaaa</td>
              <td>aaaaaaa</td>
              <td>aaaaaaa</td>
              <td>aaaaaaa</td>
              <td>aaaaaaa</td>
              <td>aaaaaaa</td>
              <td>aaaaaaa</td>
              <td>aaaaaaa</td>
              <td>aaaaaaa</td>
              <td>aaaaaaa</td>
              <td>aaaaaaa</td>
              <td>aaaaaaa</td>
              <td>aaaaaaa</td>
              <td>aaaaaaa</td>
              <td>aaaaaaa</td>
              <td>aaaaaaa</td>
              <td>aaaaaaa</td>
            </tr>
          
        
        </tbody>
      </table>
      </div>
  )

  const UjOktato = () => (
    <div>
      <div>
        <form onSubmit={(event) => handleSubmitUjOktato(event)}>
          <p>E-mail cím: </p>
        <input
              type="text"
              id="email"
              name="email"
              value={email}
              onChange={(event) =>
                handleChangeEmail(event)
              }
          /><br />
          <p>Név: </p>
        <input
              type="text"
              id="nev"
              name="nev"
              value={nev}
              onChange={(event) =>
                handleChangeNev(event)
              }
          /><br />
          <p>Jelszó: </p>
        <input
              type="password"
              id="jelsz"
              name="jelsz"
              value={jelsz}
              onChange={(event) =>
                handleChangeJelsz(event)
              }
          /><br />
          <p>Telefonszám: </p>
        <input
              type="text"
              id="telszam"
              name="telszam"
              value={telszam}
              onChange={(event) =>
                handleChangeTelszam(event)
              }
          /><br />
          <p>Jogosultság: </p>
          <input
              type="text"
              id="jogosultsag"
              name="jogosultsag"
              value={jogosultsag}
              onChange={(event) =>
                handleChangeJogosultsag(event)
              }
          /><br />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  )

  const tanszekvezetoUjOktato = () => {
    setShowUjOktato(true);
  }

  const irdKi = (id) => {
    console.log(id);
  }

  return (
    <div className="App">
        <div className="felhNev">
          {result.map((val) => <p>{val.nev}</p>)}
          <br /><p>{email}</p>
        </div>
        
        { Belepes ? <BelepesMezo /> : null}
        { showBelepAblak ? <BelepesAblak /> : null}
        { showUjSzak ? <UjSzak /> : null}
        { showUjFelev ? <UjFelev /> : null}
        { showUjOktato ? <UjOktato /> : null}
        { showTablaAdmin ? <TablazatAdmin /> : null}
        { showTablaSzakfelelos ? <TablazatSzakfelelos /> : null}
        { showTablaTanszekvezeto ? <TablazatTanszekvezeto /> : null}
        
    </div>
  );

  //ha csak kapunk

  /*
  const [adatok,setAdatok] = useState([]);
  const aaa = "aaa";
  var formData = new FormData();
  formData.append('aaa', aaa);
  const requestOptions = {
    method: 'POST',
    body: formData
  };
  

  //const handleSubmit = (e) => {
    
    fetch('http://localhost:8000/server.php')
    .then(response => {
      if (!response.ok) {
        throw new Error('response not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Data received:', data);
      setAdatok(data);
    })
    .catch(error => {
      console.error('problem with fetch operation: ', error);
    });
  //}
    

  return (
    <><div className="App">
      <form 
        >
        <button type="submit">Gomb</button>
      </form>
      <table>
        <tbody>
        <tr>
          <th>Név</th>
          <th>Szín</th>
          <th>Mennyiség</th>
        </tr>
        {adatok.map((val, key) => {
          return (
            <tr key={key}>
              <td>{val.nev}</td>
              <td>{val.szin}</td>
              <td>{val.mennyi}</td>
            </tr>
            
          )
        })}
        </tbody>
      </table>
      
    </div>
    
    </>
    
  )*/
  

  //ha küldünk is valamit
  /*
  onSubmit={(event) => handleSubmit(event)}
  const [name, setName] = useState("");
  const [result, setResult] = useState("");

  const postData = {
    name: 'www'
  };

  var formData = new FormData();
  formData.append('name', name);
  const requestOptions = {
    method: 'POST',
    body: formData
  };

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = $(e.target);
    fetch('http://localhost:8000/server.php', requestOptions)
    .then(response => {
      if (!response.ok) {
        throw new Error('response not ok');
      }
      return response.text();
    })
    .then(data => {
      console.log('Data received:', data);
      setResult(data);
    })
    .catch(error => {
      console.error('problem with fetch operation: ', error);
    });
  }
  
  return (
    <div className="App">
        <form
                onSubmit={(event) => handleSubmit(event)}>
            <label htmlFor="name">Name: </label>
            <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(event) =>
                    handleChange(event)
                }
            />
            <br />
            <button type="submit">Submit</button>
        </form>
        <h1>{result}</h1>
    </div>
  );*/  
}

/*function App() {
  return (
    <div className="App">
      <h1>
        Cím
      </h1>
      <p>
        Lorem ipsum
      </p>
      <table style={{margin: "auto"}}>
        <tr>
          <td>aaa</td>
          <td>bbb</td>
        </tr>
      </table>
    </div>
  );
}*/

export default App;
