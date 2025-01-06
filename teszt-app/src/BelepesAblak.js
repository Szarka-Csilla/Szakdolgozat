import { useState } from "react";
import $ from "jquery";

export default function BelepesAblak({ onClose }) {
    const [nev, setNev] = useState("");
    const [jelsz, setJelsz] = useState("");
    const [result, setResult] = useState("");
    const [Belepes, setBelepes] = useState(true);
    const [adatok,setAdatok] = useState([]);

    var formDataBelep = new FormData();
  formDataBelep.append('nev', nev);
  formDataBelep.append('jelsz', jelsz);
  const requestOptionsBelep = {
    method: 'POST',
    body: formDataBelep
  };
  var formDataTabla = new FormData();
  formDataTabla.append('nev', result);
  const requestOptionsTabla = {
    method: 'POST',
    body: formDataTabla
  };

    const handleChangeNev = (e) => {
        setNev(e.target.value);
      };
    
      const handleChangeJelsz = (e) => {
        setJelsz(e.target.value);
      };

      const handleSubmitBelep = (e) => {
        e.preventDefault();
        const form = $(e.target);
        //elküldjük a belépési adatokat
        fetch('http://localhost:8000/server.php', requestOptionsBelep)
        .then(response => {
          if (!response.ok) {
            throw new Error('response not ok');
          }
          return response.text();
        })
        .then(data => {
          console.log('Data received:', data);
          setResult(data);
          if (data != "")
          {
            setBelepes(false);
    
            //táblázat megjelenítése
    
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
    
            //táblázat vége
          }
        })
        .catch(error => {
          console.error('problem with fetch operation: ', error);
        });
      }

    return (
        <div className='modal'>
            <div className='content'>
            <form
                    onSubmit={(event) => handleSubmitBelep(event)}>
                <label htmlFor="name">Name: </label>
                <input
                    type="text"
                    id="nev"
                    name="nev"
                    value={nev}
                    onChange={(event) =>
                        handleChangeNev(event)
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
                <button 
                onClick={onClose}
                //{() => window.close()}
                >Bezárás
                </button>
            </div>
        </div>
    );
}