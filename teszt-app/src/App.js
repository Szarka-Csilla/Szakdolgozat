import './App.css';
import { useState } from "react";
import { useRef } from 'react';
import "./App.css";
import 'reactjs-popup/dist/index.css';

function App() {

  /*TODO:
    -SMTP szerver kell

    -legördülő listák ne defaultak legyenek már
  */
  
  //változók
  const [mod, setMod] = useState("");
  const modRef = useRef("");
  const [nev, setNev] = useState("");
  const nevRef = useRef("");
  const [email, setEmail] = useState("");
  const emailRef = useRef("");
  const [nevMost, setNevMost] = useState(""); //jelenlegi név
  const [emailMost, setEmailMost] = useState(""); //jelenlegi email cím
  const [jelsz, setJelsz] = useState("");
  const jelszRef = useRef("");
  const regiJelsz = useRef("");
  const ujJelsz = useRef("");
  const ujraJelsz = useRef("");
  const telszamRef = useRef("");
  const [jogosultsag, setJogosultsag] = useState("");
  const jogosultsagRef = useRef("");
  const [bejelJog, setBejelJog] = useState("");
  const [szak, setSzak] = useState("");
  const szakRef = useRef("");
  const [resultText, setResultText] = useState("");
  const [felev, setFelev] = useState("");
  const felevRef = useRef("");
  const tiMegjRef = useRef("");
  const [targykod, setTargykod] = useState("");
  const targykodRef = useRef("");
  const [oktatoNap, setOktatoNap] = useState("");
  const [oktatoLev, setOktatoLev] = useState("");
  const oktMegjRef = useRef("");
  const [targymegadasSzak, setTargymegadasSzak] = useState("");
  const targymegadasSzakRef = useRef("");
  const [targymegadasFelev, setTargymegadasFelev] = useState("");
  const targymegadasFelevRef = useRef("");
  const [editTImegj, setEditTImegj] = useState("a");
  const [editNapOkt, setEditNapOkt] = useState("a");
  const [editLevOkt, setEditLevOkt] = useState("a");
  const [editOktMegj, setEditOktMegj] = useState("a");
  const [editOktMegjLev, setEditOktMegjLev] = useState("a");
  const [tantervTabla, setTantervTabla] = useState(false); //a tanterv van-e betöltve
  const szervEgysRef = useRef("");
  const evszakRef = useRef("");
  const targynevRef = useRef("");
  const tipusRef = useRef("");
  const kreditRef = useRef("");
  const napOraRef = useRef("");
  const levOraRef = useRef("");
  const kovetelmenyRef = useRef("");
  const evfolyamRef = useRef(""); 
  const keresesRef = useRef(""); 
  const keresettMezoRef = useRef("");
  const uzenetRef = useRef("");
  const hibaRef = useRef("");
  //const [keresettMezo, setKeresettMezo] = useState("");
  const [adatok, setAdatok] = useState([]); //a betöltött adatok az adatbázisból, mostani tábla
  const [szakEsFelevAdatok, setSzakEsFelevAdatok] = useState([]); //const [felhasznaloJogosultsagai, setFelhasznaloJogosultsagai] = useState([]);
  const [kereses, setKereses] = useState([]); //ebben tároljuk a betöltött adatokat, a másikat változtatjuk a kereséstől függően
  const [oktatok, setOktatok] = useState([]);
  const [szakfelelosok, setSzakfelelosok] = useState([]);
  const [jogosultsagok, setJogosultsagok] = useState([]);
  const [szakok, setSzakok] = useState([]);
  const [inditandoSzakok, setInditandoSzakok] = useState([]);
  const [felhasznaloJogosultsagai, setFelhasznaloJogosultsagai] = useState([]);
  const [targymegadasFelevek, setTargymegadasFelevek] = useState([]);
  const [targymegadasAdatok, setTargymegadasAdatok] = useState([]);
  const [induloSzakok, setInduloSzakok] = useState([]);
  const [targymegadasTargyakBeolv, setTargymegadasTargyakBeolv] = useState([]);
  const [importalandoTargyak, setImportalandoTargyak] = useState([]);

  //megjelenítők
  const [showBelepes, setShowBelepes] = useState(true);
  const [showBelepesMezo, setShowBelepesMezo] = useState(true);
  const [showFejlec, setShowFejlec] = useState(false); //false
  const [showJelszoValt, setShowJelszoValt] = useState(false);
  const [showBelepesAblak, setShowBelepesAblak] = useState(false);
  const [showMelyikJogosultsag, setShowMelyikJogosultsag] = useState(false);
  const [showTablaAdmin, setShowTablaAdmin] = useState(false); //admin
  const [showTablaTO, setShowTablaTO] = useState(false); //tanulmányi osztály/iroda
  const [showTablaSzakfelelos, setShowTablaSzakfelelos] = useState(false); //szakfelelős
  const [showTablaTanszekvezeto, setShowTablaTanszekvezeto] = useState(false); //tanszékvezető
  const [showTablaOktato, setShowTablaOktato] = useState(false); //oktató
  const [showUjOktato, setShowUjOktato] = useState(false);
  const [showUjSzak, setShowUjSzak] = useState(false);
  const [showUjFelev, setShowUjFelev] = useState(false);
  const [showUjTargy, setShowUjTargy] = useState(false);
  const [showMasikSzak, setShowMasikSzak] = useState(false);
  const [showSzakInditasa, setShowSzakInditasa] = useState(false);
  const [showTargyakMegadasaImport, setShowTargyakMegadasaImport] = useState(false);
  const [showTargyakMegadasaManual, setShowTargyakMegadasaManual] = useState(false);
  const [hamburgerOpen, setHamburgerOpen] = useState(true);
  const [showHibauzenet, setShowHibauzenet] = useState(false);
  const [showUzenet, setShowUzenet] = useState(false);

  //FormData-k a kommunikációhoz

  //kiválasztott szakok indítása
  var formDataSzakInditasa = new FormData();
  formDataSzakInditasa.append('inditandoSzakok', JSON.stringify(inditandoSzakok));
  formDataSzakInditasa.append('mod', modRef.current);
  const requestOptionsSzakInditasa = {
    method: 'POST',
    body: formDataSzakInditasa
  }

  //kiválasztott tárgyak importálása
  var formDataTargyImport = new FormData();
  formDataTargyImport.append('importalandoTargyak', JSON.stringify(importalandoTargyak));
  formDataTargyImport.append('szak', targymegadasSzakRef.current);
  formDataTargyImport.append('felev', felev);
  formDataTargyImport.append('mod', modRef.current);
  const requestOptionsTargyImport = {
    method: 'POST',
    body: formDataTargyImport
  }

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
    console.log(email);
  };

  const handleChangeEmailRef = (e) => {
    emailRef.current = e.target.value;
    //console.log(emailRef.current);
  };

  const handleChangeJelsz = (e) => {
    setJelsz(e.target.value);
  };

  const handleChangeJelszRef = (e) => {
    jelszRef.current = e.target.value;
    jelszRef.current = e.target.value;
    console.log(emailRef.current);
  };

  const handleRegiJelszoChange = (e) => {
    regiJelsz.current = e.target.value;
  }

  const handleUjJelszoChange = (e) => {
    ujJelsz.current = e.target.value;
  }

  const handleUjraJelszoChange = (e) => {
    ujraJelsz.current = e.target.value;
  }

  const handleChangeNevRef = (e) => {
    nevRef.current = e.target.value;
  };

  const handleChangeTelszamRef = (e) => {
    telszamRef.current = e.target.value;
  };

  const handleChangeJogosultsag = (e) => {
    setJogosultsag(e.target.value);
  };

  const handleChangeBejelJog = (e) => {
    setBejelJog(e.target.value);
  }

  const handleChangeSzakRef = (e) => {
    szakRef.current = e.target.value;
  };

  const handleChangeSzak = (e) => {
    setSzak(e.target.value);
    szakRef.current = e.target.value;
  }

  const handleChangeFelevRef = (e) => {
    felevRef.current = e.target.value;
  }

  const handleChangeTargykodRef = (e) => {
    targykodRef.current = e.target.value;
  }

  const handleChangeSzervEgysRef = (e) => {
    szervEgysRef.current = e.target.value;
  }

  const handleChangeEvszakRef = (e) => {
    evszakRef.current = e.target.value;
  }

  const handleChangeTargynevRef = (e) => {
    targynevRef.current = e.target.value;
  }

  const handleChangeTipusRef = (e) => {
    tipusRef.current = e.target.value;
  }

  const handleChangeKreditRef = (e) => {
    kreditRef.current = e.target.value;
  }

  const handleChangeNapOraRef = (e) => {
    napOraRef.current = e.target.value;
  }

  const handleChangeLevOraRef = (e) => {
    levOraRef.current = e.target.value;
  }

  const handleChangeKovetelmenyRef = (e) => {
    kovetelmenyRef.current = e.target.value;
  }

  const handleChangeEvfolyamRef = (e) => {
    evfolyamRef.current = e.target.value;
  }

  const handleChangeTImegjRef = (e) => {
    tiMegjRef.current = e.target.value;
  }

  const handleChangeKeresesRef = (e) => {
    keresesRef.current = e.target.value;
  }

  const handleChangeOktNap = (e) => {
    setOktatoNap(e.target.value);
    setNev(e.target.name);
  }

  const handleChangeOktLev = (e) => {
    setOktatoLev(e.target.value);
    setNev(e.target.name);
  }

  const handleChangeOktMegjRef = (e) => {
    oktMegjRef.current = e.target.value;
  }

  const handleChangeInditandoSzak = (e) => {
    if (e.target.checked) {
     // inditandoSzakok.push(e.target.value);
      setInditandoSzakok(
        [
          ...inditandoSzakok,
          e.target.value
        ]
      );
    } else {
      //kivenni a tömbből a szak nevét
      //inditandoSzakok = inditandoSzakok.filter((szak) => szak !== e.target.value);
      //setInditandoSzakok((cv) => cv.filter((szak) => e.target.value !== szak));
      setInditandoSzakok(inditandoSzakok.filter(sz => sz !== e.target.value));
    }
  }

  const handleChangeImportalandoTargyak = (e) => {
    if (e.target.checked) {
      setImportalandoTargyak(
         [
           ...importalandoTargyak,
           e.target.value
         ]
       );
     } else {
       //kivenni a tömbből a szak nevét
       //inditandoSzakok = inditandoSzakok.filter((szak) => szak !== e.target.value);
       //setInditandoSzakok((cv) => cv.filter((szak) => e.target.value !== szak));
       setImportalandoTargyak(importalandoTargyak.filter(sz => sz !== e.target.value));
     }
  }

  const handleChangeTargymegadasSzak = (e) => {
    setTargymegadasSzak(e.target.value);
    console.log(e.target.value);
  }

  const handleChangeTargymegadasFelev = (e) => {
    setTargymegadasFelev(e.target.value);
  }

  const handleChangeKeresettMezo = (e) => {
    //setKeresettMezo(e.target.value);
    keresettMezoRef.current = e.target.value;
    console.log(keresettMezoRef.current);
  }

  const handleKereses = (e) => {
    if (keresettMezoRef.current == "szervEgys")
    {
      setAdatok(kereses.filter(item => {if (!(keresesRef.current)) return true
        if (item.szervEgys.includes(keresesRef.current)) {return true}
      }));
    } else if (keresettMezoRef.current == "szaknev")
    {
      setAdatok(kereses.filter(item => {if (!(keresesRef.current)) return true
        if (item.szaknev.includes(keresesRef.current)) {return true}
      }));
    } else if (keresettMezoRef.current == "indul")
    {
      setAdatok(kereses.filter(item => {if (!(keresesRef.current)) return true
        if (item.indul.includes(keresesRef.current)) {return true}
      }));
    } else if (keresettMezoRef.current == "tanev")
    {
      setAdatok(kereses.filter(item => {if (!(keresesRef.current)) return true
        if (item.tanev.includes(keresesRef.current)) {return true}
      }));
    } else if (keresettMezoRef.current == "evszak")
    {
      setAdatok(kereses.filter(item => {if (!(keresesRef.current)) return true
        if (item.evszak.includes(keresesRef.current)) {return true}
      }));
    } else if (keresettMezoRef.current == "targynev")
    {
      setAdatok(kereses.filter(item => {if (!(keresesRef.current)) return true
        if (item.targynev.includes(keresesRef.current)) {return true}
      }));
    } else if (keresettMezoRef.current == "targykod")
    {
      setAdatok(kereses.filter(item => {if (!(keresesRef.current)) return true
        if (item.targykod.includes(keresesRef.current)) {return true}
      }));
    } else if (keresettMezoRef.current == "evfolyam")
    {
      setAdatok(kereses.filter(item => {if (!(keresesRef.current)) return true
        if (item.evfolyam.includes(keresesRef.current)) {return true}
      }));
    } else if (keresettMezoRef.current == "online")
    {
      setAdatok(kereses.filter(item => {if (!(keresesRef.current)) return true
        if (item.online.includes(keresesRef.current)) {return true}
      }));
    } else if (keresettMezoRef.current == "onlineLev")
    {
      setAdatok(kereses.filter(item => {if (!(keresesRef.current)) return true
        if (item.onlineLev.includes(keresesRef.current)) {return true}
      }));
    } else if (keresettMezoRef.current == "tipus")
    {
      setAdatok(kereses.filter(item => {if (!(keresesRef.current)) return true
        if (item.tipus.includes(keresesRef.current)) {return true}
      }));
    } else if (keresettMezoRef.current == "kredit")
    {
      setAdatok(kereses.filter(item => {if (!(keresesRef.current)) return true
        if (item.kredit.includes(keresesRef.current)) {return true}
      }));
    } else if (keresettMezoRef.current == "oraszamNap")
    {
      setAdatok(kereses.filter(item => {if (!(keresesRef.current)) return true
        if (item.oraszamNap.includes(keresesRef.current)) {return true}
      }));
    } else if (keresettMezoRef.current == "oraszamLev")
    {
      setAdatok(kereses.filter(item => {if (!(keresesRef.current)) return true
        if (item.oraszamLev.includes(keresesRef.current)) {return true}
      }));
    } else if (keresettMezoRef.current == "kovetelmeny")
    {
      setAdatok(kereses.filter(item => {if (!(keresesRef.current)) return true
        if (item.kovetelmeny.includes(keresesRef.current)) {return true}
      }));
    } else if (keresettMezoRef.current == "oktatoNap")
    {
      setAdatok(kereses.filter(item => {if (!(keresesRef.current)) return true
        if (item.oktatoNap.includes(keresesRef.current)) {return true}
      }));
    } else if (keresettMezoRef.current == "oktatoLev")
    {
      setAdatok(kereses.filter(item => {if (!(keresesRef.current)) return true
        if (item.oktatoLev.includes(keresesRef.current)) {return true}
      }));
    } else if (keresettMezoRef.current == "TImegjegyzes")
    {
      setAdatok(kereses.filter(item => {if (!(keresesRef.current)) return true
        if (item.TImegjegyzes.includes(keresesRef.current)) {return true}
      }));
    } else if (keresettMezoRef.current == "oktatoMegjegyzes")
    {
      setAdatok(kereses.filter(item => {if (!(keresesRef.current)) return true
        if (item.oktatoMegjegyzes.includes(keresesRef.current)) {return true}
      }));
    } else if (keresettMezoRef.current == "oktatoMegjegyzesLev")
    {
      setAdatok(kereses.filter(item => {if (!(keresesRef.current)) return true
        if (item.oktatoMegjegyzesLev.includes(keresesRef.current)) {return true}
        if (!(item.oktatoMegjegyzesLev)) {return false}
      }));
    }
    
  }

  //bejelentkezés
  const handleSubmitBelep = (e) => {
    e.preventDefault();
    setMod("belepes");
    setMod("belepes");
    setAdatok([]);
    setKereses([]);
    hibaRef.current = "";
    uzenetRef.current = "";
    modRef.current = "belepes";
    console.log(emailRef.current);
    //elküldjük a belépési adatokat
    
    fetch('http://localhost:8000/server.php', {
      method: 'POST',
      body: JSON.stringify({ email: emailRef.current, jelsz: jelszRef.current, mod: modRef.current }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('response not ok');
      }
      //return response.text();
      return response.json();
    })
    .then(data => {
      console.log('Data received:', data);
      //setResult(data);
      setFelhasznaloJogosultsagai(data);
      
      if (data != "")
      {
        modRef.current = "";
        
        //megnézzük, hogy mennyi elem van a tömbben
        //ha egy, akkor azzal belépünk
        data.map((val, key) => {
          hibaRef.current = val.hiba;
        })
        if ((hibaRef.current != undefined) && (hibaRef.current != ""))
        {
          setShowHibauzenet(true);
        } else {
            if (data.length == 1) {
            data.map((val, key) => {
              jogosultsagRef.current = val.jogosultsag;
              setNevMost(val.nev);
            })
            if (jogosultsagRef.current == "Admin") {
              setShowTablaAdmin(true);
            } else if (jogosultsagRef.current == "Szakfelelős") {
              setShowTablaSzakfelelos(true);
            } else if (jogosultsagRef.current == "Tanszékvezető") {
              setShowTablaTanszekvezeto(true);
            } else if (jogosultsagRef.current == "Tanulmányi iroda") {
              setShowTablaTO(true);
            } else if (jogosultsagRef.current == "Oktató") {
              setShowTablaOktato(true);
            }
            setShowBelepesMezo(false);
            setShowBelepes(false);
            setShowFejlec(true);
            setEmailMost(emailRef.current);
            setShowBelepesAblak(false);
            //setJogosultsag(jogosultsagRef.current);
            setBejelJog(jogosultsagRef.current);
            //ha több, akkor megkérdezzük a felhasználót, hogy melyikkel szeretne belépni, azt beállítjuk egy refre, majd a megfelelő táblát nyitjuk meg
          } else if (data.length > 1) {
            /*data.map((val, key) => {
              setFelhasznaloJogosultsagai(
                [
                  ...felhasznaloJogosultsagai,
                  val.jogosultsag
                ]
              );
            })*/
            console.log(felhasznaloJogosultsagai);
            setShowMelyikJogosultsag(true);
          }
        }
      }
    })
    .catch(error => {
      console.error('problem with fetch operation: ', error);
    });
  }

  const handleJelszoValt = () => {
    modRef.current = "jelszoValt";
    if (ujJelsz.current == ujraJelsz.current)
    {
      fetch('http://localhost:8000/server.php', {
        method: 'POST',
        body: JSON.stringify({ emailCim: emailMost, regiJelsz: regiJelsz.current, ujJelsz: ujJelsz.current, mod: modRef.current }),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('response not ok tabla');
          }
          return response.json();
        })
        .then(data => {
          data.map((val, key) => {
            hibaRef.current = val.hiba;
          })
          if ((hibaRef.current != undefined) && (hibaRef.current != ""))
            {
              setShowHibauzenet(true);
            } else {
              setAdatok(data);
              setKereses(data);
            }
          modRef.current = "";
        })
        .catch(error => {
          console.error('problem with fetch operation tabla: ', error);
        });
    } else {
      console.log("Nem egyezik a két jelszó");
    }
    
  }

  const handleElfelejtettJelszo = () => {
    modRef.current = "elfelejtettJelszo";
    fetch('http://localhost:8000/server.php', {
      method: 'POST',
      body: JSON.stringify({ emailCim: emailRef.current, mod: modRef.current }),
    })
        .then(response => {
          if (!response.ok) {
            throw new Error('response not ok tabla');
          }
          return response.json();
        })
        .then(data => {
          console.log('Data received:', data);
          modRef.current = "";
        })
        .catch(error => {
          console.error('problem with fetch operation tabla: ', error);
        });
  }

  //tábla betöltése
  const tablazatLekeres = () => {
    setMod("tablazatLekeres");
    modRef.current = "tablazatLekeres";
    fetch('http://localhost:8000/server.php', {
      method: 'POST',
      body: JSON.stringify({ emailCim: emailMost, jogosultsag: bejelJog, mod: modRef.current }),
    })
        .then(response => {
          if (!response.ok) {
            throw new Error('response not ok tabla');
          }
          return response.json();
        })
        .then(data => {
          console.log('Data received:', data);
          data.map((val, key) => {
            hibaRef.current = val.hiba;
          })
          if ((hibaRef.current != undefined) && (hibaRef.current != ""))
            {
              setShowHibauzenet(true);
            } else {
              setAdatok(data);
              setKereses(data);
            }
          setMod("");
          modRef.current = "";
          setTantervTabla(false);
        })
        .catch(error => {
          console.error('problem with fetch operation tabla: ', error);
        });
  }

  const tablazatLekeresTanterv = () => {
    modRef.current = "tablazatLekeresTanterv";
    fetch('http://localhost:8000/server.php', {
      method: 'POST',
      body: JSON.stringify({ mod: modRef.current }),
    })
        .then(response => {
          if (!response.ok) {
            throw new Error('response not ok tabla');
          }
          return response.json();
        })
        .then(data => {
          console.log('Data received:', data);
          data.map((val, key) => {
            hibaRef.current = val.hiba;
          })
          if ((hibaRef.current != undefined) && (hibaRef.current != ""))
            {
              setShowHibauzenet(true);
            } else {
              setAdatok(data);
              setKereses(data);
            }
          modRef.current = "";
          setTantervTabla(true);

        })
        .catch(error => {
          console.error('problem with fetch operation tabla: ', error);
        });
  }

  const tablazatLekeresAktualis = () => {
    setMod("tablazatLekeresAktualis");
    modRef.current = "tablazatLekeresAktualis";
    fetch('http://localhost:8000/server.php', {
      method: 'POST',
      body: JSON.stringify({ emailCim: emailMost, jogosultsag: bejelJog, mod: modRef.current }),
    })
        .then(response => {
          if (!response.ok) {
            throw new Error('response not ok tabla');
          }
          return response.json();
        })
        .then(data => {
          console.log('Data received:', data);
          data.map((val, key) => {
            hibaRef.current = val.hiba;
          })
          if ((hibaRef.current != undefined) && (hibaRef.current != ""))
            {
              setShowHibauzenet(true);
            } else {
              setAdatok(data);
              setKereses(data);
            }
          setMod("");
          modRef.current = "";
          setTantervTabla(false);
        })
        .catch(error => {
          console.error('problem with fetch operation tabla: ', error);
        });
  }

  const adminVeglegesitesVissza = (targy, felev, szam) => {
    modRef.current = "adminVeglegesitesVissza";
    fetch('http://localhost:8000/server.php', {
      method: 'POST',
      body: JSON.stringify({ targykod: targy, veglegesites: szam, mod: modRef.current }),
    })
        .then(response => {
          if (!response.ok) {
            throw new Error('response not ok tabla');
          }
          return response.json();
        })
        .then(data => {
          console.log('Data received:', data);
          data.map((val, key) => {
            hibaRef.current = val.hiba;
          })
          if ((hibaRef.current != undefined) && (hibaRef.current != ""))
            {
              setShowHibauzenet(true);
            } else {
              setAdatok(data);
              setKereses(data);
            }
          setMod("");
          modRef.current = "";
          tablazatLekeresAktualis();
        })
        .catch(error => {
          console.error('problem with fetch operation tabla: ', error);
        });
  }

  //új oktató felvétele
  const handleSubmitUjOktato = (e) => {
    e.preventDefault();
    setMod("ujOktato");
    modRef.current = "ujOktato";
    
    fetch('http://localhost:8000/server.php', {
      method: 'POST',
      body: JSON.stringify({ email: emailRef.current, jelsz: jelszRef.current, nev: nevRef.current, jogosultsag: jogosultsag, telszam: telszamRef.current, mod: modRef.current }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('response not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Data received:', data);
      data.map((val, key) => {
        hibaRef.current = val.hiba;
        uzenetRef.current = val.uzenet;
      })
      if ((hibaRef.current != undefined) && (hibaRef.current != ""))
        {
          setShowHibauzenet(true);
        } else {
          setShowUzenet(true);
          setResultText(data);
        }
      setMod("");
      modRef.current = "";
    })
    .catch(error => {
      console.error('problem with fetch operation: ', error);
    });
  }

  //új szak felvétele
  const handleSubmitUjSzak = (e) => {
    e.preventDefault();
    setMod("ujSzak");
    modRef.current = "ujSzak";
    fetch('http://localhost:8000/server.php', {
      method: 'POST',
      body: JSON.stringify({ emailCim: email, szak: szakRef.current, mod: modRef.current }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('response not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Data received:', data);
      data.map((val, key) => {
        hibaRef.current = val.hiba;
        uzenetRef.current = val.uzenet;
      })
      if ((hibaRef.current != undefined) && (hibaRef.current != ""))
        {
          setShowHibauzenet(true);
        } else {
          setShowUzenet(true);
          setResultText(data);
        }
      setMod("");
      modRef.current = "";
    })
    .catch(error => {
      console.error('problem with fetch operation: ', error);
    });
  }

  //új félév felvétele
  const handleSubmitUjFelev = (e) => {
    e.preventDefault();
    setMod("ujFelev");
    modRef.current = "ujFelev";

    fetch('http://localhost:8000/server.php', {
      method: 'POST',
      body: JSON.stringify({ felev: felevRef.current, mod: modRef.current }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('response not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Data received:', data);
      data.map((val, key) => {
        hibaRef.current = val.hiba;
        uzenetRef.current = val.uzenet;
      })
      if ((hibaRef.current != undefined) && (hibaRef.current != ""))
        {
          setShowHibauzenet(true);
        } else {
          setShowUzenet(true);
          setResultText(data);
        }
      setMod("");
      modRef.current = "";
    })
    .catch(error => {
      console.error('problem with fetch operation: ', error);
    });
  }

  //nappalis oktató tárgyhoz rendelése
  const handleSubmitTanszekvezetoNapOktato = () => {
    //e.preventDefault();
    setMod("napOktHozzarendel");
    modRef.current = "napOktHozzarendel";
    fetch('http://localhost:8000/server.php', {
      method: 'POST',
      body: JSON.stringify({ emailCim: oktatoNap, targykod: targykodRef.current, mod: modRef.current }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('response not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Data received:', data);
      data.map((val, key) => {
        hibaRef.current = val.hiba;
        uzenetRef.current = val.uzenet;
      })
      if ((hibaRef.current != undefined) && (hibaRef.current != ""))
        {
          setShowHibauzenet(true);
        } else {
          setShowUzenet(true);
          setResultText(data);
        }
      setMod("");
      modRef.current = "";
      tablazatLekeresAktualis();
    })
    .catch(error => {
      console.error('problem with fetch operation: ', error);
    });
  }

  //levelezős oktató tárgyhoz rendelése
  const handleSubmitTanszekvezetoLevOktato = () => {
    //e.preventDefault();
    setMod("levOktHozzarendel");
    modRef.current = "levOktHozzarendel";
    fetch('http://localhost:8000/server.php', {
      method: 'POST',
      body: JSON.stringify({ emailCim: oktatoLev, targykod: targykodRef.current, mod: modRef.current }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('response not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Data received:', data);
      data.map((val, key) => {
        hibaRef.current = val.hiba;
        uzenetRef.current = val.uzenet;
      })
      if ((hibaRef.current != undefined) && (hibaRef.current != ""))
        {
          setShowHibauzenet(true);
        } else {
          setShowUzenet(true);
          setResultText(data);
        }
      setMod("");
      modRef.current = "";
      tablazatLekeresAktualis();
    })
    .catch(error => {
      console.error('problem with fetch operation: ', error);
    });
  }

  const tanszekvezetoVeglegesites = (targy, felev) => {
    modRef.current = "tanszekvezetoVeglegesites";
    fetch('http://localhost:8000/server.php', {
      method: 'POST',
      body: JSON.stringify({ targykod: targy, felev: felev, mod: modRef.current }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('response not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Data received:', data);
      data.map((val, key) => {
        hibaRef.current = val.hiba;
      })
      if ((hibaRef.current != undefined) && (hibaRef.current != ""))
        {
          setShowHibauzenet(true);
        } else {
          setResultText(data);
        }
      modRef.current = "";
      tablazatLekeresAktualis();
    })
    .catch(error => {
      console.error('problem with fetch operation: ', error);
    });
  }

  //TO megjegyzés mentése
  const handleSubmitTImegjMentes = () => {
    //e.preventDefault();
    setMod("TOmegjMentes");
    modRef.current = "TOmegjMentes";
    fetch('http://localhost:8000/server.php', {
      method: 'POST',
      body: JSON.stringify({ tiMegj: tiMegjRef.current, targykod: targykodRef.current, felev: felevRef.current, mod: modRef.current }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('response not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Data received:', data);
      data.map((val, key) => {
        hibaRef.current = val.hiba;
        uzenetRef.current = val.uzenet;
      })
      if ((hibaRef.current != undefined) && (hibaRef.current != ""))
        {
          setShowHibauzenet(true);
        } else {
          setShowUzenet(true);
          setResultText(data);
        }
      setMod("");
      modRef.current = "";
      tablazatLekeresAktualis();
    })
    .catch(error => {
      console.error('problem with fetch operation: ', error);
    });
  }

  const handleSubmitMasikSzak = (e) => {
    e.preventDefault();
    modRef.current = "masikSzak";
    fetch('http://localhost:8000/server.php', {
      method: 'POST',
      body: JSON.stringify({ targykod: targykodRef.current, szak: szakRef.current, mod: modRef.current }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('response not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Data received:', data);
      data.map((val, key) => {
        hibaRef.current = val.hiba;
        uzenetRef.current = val.uzenet;
      })
      if ((hibaRef.current != undefined) && (hibaRef.current != ""))
        {
          setShowHibauzenet(true);
        } else {
          setShowUzenet(true);
          setResultText(data);
        }
      setMod("");
      modRef.current = "";
    })
    .catch(error => {
      console.error('problem with fetch operation: ', error);
    });
  }

  const handleSubmitUjTargy = (e) => {
    e.preventDefault();
    modRef.current = "ujTargy";
    fetch('http://localhost:8000/server.php', {
      method: 'POST',
      body: JSON.stringify({ targykod: targykodRef.current, targynev: targynevRef.current, kovetelmeny: kovetelmenyRef.current, szervEgys: szervEgysRef.current, tipus: tipusRef.current, kredit: kreditRef.current, szak: szakRef.current, evfolyam: evfolyamRef.current, evszak: evszakRef.current, oraszamNap: napOraRef.current, oraszamLev: levOraRef.current, felev: felevRef.current, mod: modRef.current }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('response not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Data received:', data);
      data.map((val, key) => {
        hibaRef.current = val.hiba;
        uzenetRef.current = val.uzenet;
      })
      if ((hibaRef.current != undefined) && (hibaRef.current != ""))
        {
          setShowHibauzenet(true);
        } else {
          setShowUzenet(true);
          setResultText(data);
        }
      setMod("");
      modRef.current = "";
    })
    .catch(error => {
      console.error('problem with fetch operation: ', error);
    });
  }

  const TOveglegesites = (targy, felev) => {
    modRef.current = "TOveglegesites";
    fetch('http://localhost:8000/server.php', {
      method: 'POST',
      body: JSON.stringify({ targykod: targy, felev: felev, mod: modRef.current }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('response not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Data received:', data);
      data.map((val, key) => {
        hibaRef.current = val.hiba;
      })
      if ((hibaRef.current != undefined) && (hibaRef.current != ""))
        {
          setShowHibauzenet(true);
        } else {
          setResultText(data);
        }
      modRef.current = "";
      tablazatLekeresAktualis();
    })
    .catch(error => {
      console.error('problem with fetch operation: ', error);
    });
  }

  //nappalis oktatói megjegyzés mentése
  const handleSubmitOktMegjMentes = () => {
    //e.preventDefault();
    setMod("OktMegjMentes");
    modRef.current = "OktMegjMentes";
    fetch('http://localhost:8000/server.php', {
      method: 'POST',
      body: JSON.stringify({ oktMegj: oktMegjRef.current, targykod: targykodRef.current, felev: felevRef.current, mod: modRef.current }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('response not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Data received:', data);
      data.map((val, key) => {
        hibaRef.current = val.hiba;
        uzenetRef.current = val.uzenet;
      })
      if ((hibaRef.current != undefined) && (hibaRef.current != ""))
        {
          setShowHibauzenet(true);
        } else {
          setShowUzenet(true);
          setResultText(data);
        }
      setMod("");
      modRef.current = "";
      tablazatLekeresAktualis();
    })
    .catch(error => {
      console.error('problem with fetch operation: ', error);
    });
  }

  //levelezős oktatói megjegyzés mentése
  const handleSubmitOktMegjLevMentes = () => {
    //e.preventDefault();
    setMod("OktMegjLevMentes");
    modRef.current = "OktMegjLevMentes";
    fetch('http://localhost:8000/server.php', {
      method: 'POST',
      body: JSON.stringify({ oktMegj: oktMegjRef.current, targykod: targykodRef.current, felev: felevRef.current, mod: modRef.current }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('response not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Data received:', data);
      data.map((val, key) => {
        hibaRef.current = val.hiba;
        uzenetRef.current = val.uzenet;
      })
      if ((hibaRef.current != undefined) && (hibaRef.current != ""))
        {
          setShowHibauzenet(true);
        } else {
          setShowUzenet(true);
          setResultText(data);
        }
      setMod("");
      modRef.current = "";
      tablazatLekeresAktualis();
    })
    .catch(error => {
      console.error('problem with fetch operation: ', error);
    });
  }

  const oktatoVeglegesites = (targy, felev) => {
    modRef.current = "oktatoVeglegesites";
    fetch('http://localhost:8000/server.php', {
      method: 'POST',
      body: JSON.stringify({ targykod: targy, felev: felev, emailCim: emailMost, mod: modRef.current }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('response not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Data received:', data);
      data.map((val, key) => {
        hibaRef.current = val.hiba;
      })
      if ((hibaRef.current != undefined) && (hibaRef.current != ""))
        {
          setShowHibauzenet(true);
        } else {
          setResultText(data);
        }
      modRef.current = "";
      tablazatLekeresAktualis();
    })
    .catch(error => {
      console.error('problem with fetch operation: ', error);
    });
  }

  //összes oktató beolvasása az adatbázisból
  const osszesOktato = () => {
    setMod("osszesOktato");
    modRef.current = "osszesOktato";
    fetch('http://localhost:8000/server.php', {
      method: 'POST',
      body: JSON.stringify({ mod: modRef.current }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('response not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Data received:', data);
      data.map((val, key) => {
        hibaRef.current = val.hiba;
      })
      if ((hibaRef.current != undefined) && (hibaRef.current != ""))
        {
          setShowHibauzenet(true);
        } else {
          setOktatok(data);
        }
      setMod("");
      modRef.current = "";
    })
    .catch(error => {
      console.error('problem with fetch operation: ', error);
    });
  }

  //összes szakfelelős beolvasása az adatbázisból
  const osszesSzakfelelos = () => {
    setMod("osszesSzakfelelos");
    modRef.current = "osszesSzakfelelos";
    fetch('http://localhost:8000/server.php', {
      method: 'POST',
      body: JSON.stringify({ mod: modRef.current }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('response not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Data received:', data);
      data.map((val, key) => {
        hibaRef.current = val.hiba;
      })
      if ((hibaRef.current != undefined) && (hibaRef.current != ""))
        {
          setShowHibauzenet(true);
        } else {
          setSzakfelelosok(data);
        }
      setMod("");
      modRef.current = "";
    })
    .catch(error => {
      console.error('problem with fetch operation: ', error);
    });
  }

  //összes jogosultság beolvasása az adatbázisból
  const osszesJogosultsag = () => {
    setMod("osszesJogosultsag");
    modRef.current = "osszesJogosultsag";
    fetch('http://localhost:8000/server.php', {
      method: 'POST',
      body: JSON.stringify({ mod: modRef.current }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('response not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Data received:', data);
      data.map((val, key) => {
        hibaRef.current = val.hiba;
      })
      if ((hibaRef.current != undefined) && (hibaRef.current != ""))
        {
          setShowHibauzenet(true);
        } else {
          setJogosultsagok(data);
        }
      setMod("");
      modRef.current = "";
    })
    .catch(error => {
      console.error('problem with fetch operation: ', error);
    });
  }

  //szakfelelős által kezelt szakok listája
  const osszesSajatSzak = () => {
    modRef.current = "osszesSajatSzak";
    emailRef.current = emailMost;
    fetch('http://localhost:8000/server.php', {
      method: 'POST',
      body: JSON.stringify({ emailCim: emailRef.current, mod: modRef.current }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('response not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Data received:', data);
      data.map((val, key) => {
        hibaRef.current = val.hiba;
      })
      if ((hibaRef.current != undefined) && (hibaRef.current != ""))
        {
          setShowHibauzenet(true);
        } else {
          setSzakok(data);
        }
      setMod("");
      modRef.current = "";
    })
    .catch(error => {
      console.error('problem with fetch operation: ', error);
    });
  }

  const osszesSzak = () => {
    setMod("osszesSzak");
    modRef.current = "osszesSzak";
    emailRef.current = emailMost;
    fetch('http://localhost:8000/server.php', {
      method: 'POST',
      body: JSON.stringify({ mod: modRef.current }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('response not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Data received:', data);
      data.map((val, key) => {
        hibaRef.current = val.hiba;
      })
      if ((hibaRef.current != undefined) && (hibaRef.current != ""))
        {
          setShowHibauzenet(true);
        } else {
          setSzakok(data);
        }
      setMod("");
      modRef.current = "";
    })
    .catch(error => {
      console.error('problem with fetch operation: ', error);
    });
  }

  //szakfelelős által kezelt induló szakok listája
  const szakEgyedul = () => {
    setMod("szakEgyedul");
    modRef.current = "szakEgyedul";
    emailRef.current = emailMost;
    fetch('http://localhost:8000/server.php', {
      method: 'POST',
      body: JSON.stringify({ emailCim: emailRef.current, mod: modRef.current }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('response not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Data received:', data);
      data.map((val, key) => {
        hibaRef.current = val.hiba;
      })
      if ((hibaRef.current != undefined) && (hibaRef.current != ""))
        {
          setShowHibauzenet(true);
        } else {
          setInduloSzakok(data);
        }
      setMod("");
      modRef.current = "";
    })
    .catch(error => {
      console.error('problem with fetch operation: ', error);
    });
  }

  //az importálható félévek listája
  const felevEgyedul = () => {
    setMod("felevEgyedul");
    modRef.current = "felevEgyedul";
    emailRef.current = emailMost;
    fetch('http://localhost:8000/server.php', {
      method: 'POST',
      body: JSON.stringify({ mod: modRef.current }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('response not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Data received:', data);
      data.map((val, key) => {
        hibaRef.current = val.hiba;
      })
      if ((hibaRef.current != undefined) && (hibaRef.current != ""))
        {
          setShowHibauzenet(true);
        } else {
          setTargymegadasFelevek(data);
        }
      setMod("");
      modRef.current = "";
    })
    .catch(error => {
      console.error('problem with fetch operation: ', error);
    });
  }

  //kiválasztott szakok indítása
  const handleSubmitSzakInditasa = (e) => {
    e.preventDefault();
    setMod("szakInditasa");
    modRef.current = "szakInditasa";
    fetch('http://localhost:8000/server.php', requestOptionsSzakInditasa)
    .then(response => {
      if (!response.ok) {
        throw new Error('response not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Data received:', data);
      data.map((val, key) => {
        hibaRef.current = val.hiba;
        uzenetRef.current = val.uzenet;
      })
      if ((hibaRef.current != undefined) && (hibaRef.current != ""))
        {
          setShowHibauzenet(true);
        } else {
          setShowUzenet(true);
          setResultText(data);
        }
        setMod("");
        modRef.current = "";
    })
    .catch(error => {
      console.error('problem with fetch operation: ', error);
    });
  }

  //importálható tárgyak beolvasása requestOptionsOsszesOktato
  const handleSubmitTargyImportBeolv = (e) => {
    e.preventDefault();
    setMod("targyImportBeolv");
    modRef.current = "targyImportBeolv";
    targymegadasFelevRef.current = targymegadasFelev;
    setFelev(targymegadasFelev);
    targymegadasSzakRef.current = targymegadasSzak;
    fetch('http://localhost:8000/server.php', {
      method: 'POST',
      body: JSON.stringify({ felev: targymegadasFelevRef.current, szaknev: targymegadasSzakRef.current, mod: modRef.current }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('response not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Data received:', data);
      data.map((val, key) => {
        hibaRef.current = val.hiba;
      })
      if ((hibaRef.current != undefined) && (hibaRef.current != ""))
        {
          setShowHibauzenet(true);
        } else {
          setTargymegadasTargyakBeolv(data);
        }
      setMod("");
      modRef.current = "";
    })
    .catch(error => {
      console.error('problem with fetch operation: ', error);
    });
  }

  //kiválasztott tárgyak importálása
  const handleSubmitTargyImport = (e) => {
    e.preventDefault();
    setMod("targyakImportalasa");
    modRef.current = "targyakImportalasa";
    console.log(felev);
    targymegadasSzakRef.current = targymegadasSzak;
    console.log(targymegadasSzakRef.current);
    fetch('http://localhost:8000/server.php', requestOptionsTargyImport)
    .then(response => {
      if (!response.ok) {
        throw new Error('response not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Data received:', data);
      data.map((val, key) => {
        hibaRef.current = val.hiba;
        uzenetRef.current = val.uzenet;
      })
      if ((hibaRef.current != undefined) && (hibaRef.current != ""))
        {
          setShowHibauzenet(true);
        } else {
          setShowUzenet(true);
          setTargymegadasTargyakBeolv(data);
          setImportalandoTargyak([]);
        }
    })
    .catch(error => {
      console.error('problem with fetch operation: ', error);
    });
  }

  const szakfelelosTargyTorles = (targy, felev) => {
    modRef.current = "szakfelelosTargyTorles";
    fetch('http://localhost:8000/server.php', {
      method: 'POST',
      body: JSON.stringify({ targykod: targy, felev: felev, mod: modRef.current }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('response not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Data received:', data);
      data.map((val, key) => {
        hibaRef.current = val.hiba;
        uzenetRef.current = val.uzenet;
      })
      if ((hibaRef.current != undefined) && (hibaRef.current != ""))
        {
          setShowHibauzenet(true);
        } else {
          setShowUzenet(true);
          setResultText(data);
        }
      modRef.current = "";
      tablazatLekeresAktualis();
    })
    .catch(error => {
      console.error('problem with fetch operation: ', error);
    });
  }
  
  const handleChangeOnline = (targy, felev) => {
    modRef.current = "szakfelelosOnlineValtas";
    fetch('http://localhost:8000/server.php', {
      method: 'POST',
      body: JSON.stringify({ targykod: targy, felev: felev, mod: modRef.current }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('response not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Data received:', data);
      data.map((val, key) => {
        hibaRef.current = val.hiba;
        uzenetRef.current = val.uzenet;
        console.log(uzenetRef.current);
        console.log(hibaRef.current);
      })
      if ((hibaRef.current != undefined) && (hibaRef.current !== ""))
        {
          setShowHibauzenet(true);
          
        } else {
          setShowUzenet(true);
          console.log(uzenetRef.current);
          setResultText(data);
        }
      modRef.current = "";
      tablazatLekeresAktualis();
    })
    .catch(error => {
      console.error('problem with fetch operation: ', error);
    });
  }

  const handleChangeOnlineLev = (targy, felev) => {
    modRef.current = "szakfelelosOnlineLevValtas";
    fetch('http://localhost:8000/server.php', {
      method: 'POST',
      body: JSON.stringify({ targykod: targy, felev: felev, mod: modRef.current }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('response not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Data received:', data);
      data.map((val, key) => {
        hibaRef.current = val.hiba;
        uzenetRef.current = val.uzenet;
        console.log(uzenetRef.current);
        console.log(hibaRef.current);
      })
      if ((hibaRef.current != undefined) && (hibaRef.current !== ""))
        {
          setShowHibauzenet(true);
          
        } else {
          setShowUzenet(true);
          console.log(uzenetRef.current);
          setResultText(data);
        }
      modRef.current = "";
      tablazatLekeresAktualis();
    })
    .catch(error => {
      console.error('problem with fetch operation: ', error);
    });
  }

  const szakfelelosVeglegesites = (targy, felev) => {
    modRef.current = "szakfelelosVeglegesites";
    fetch('http://localhost:8000/server.php', {
      method: 'POST',
      body: JSON.stringify({ targykod: targy, felev: felev, emailCim: emailMost, mod: modRef.current }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('response not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Data received:', data);
      data.map((val, key) => {
        hibaRef.current = val.hiba;
      })
      if ((hibaRef.current != undefined) && (hibaRef.current != ""))
        {
          setShowHibauzenet(true);
        } else {
          setResultText(data);
        }
      modRef.current = "";
      tablazatLekeresAktualis();
    })
    .catch(error => {
      console.error('problem with fetch operation: ', error);
    });
  }

  //ez a belépés felirat és a gomb
  const BelepesMezo = () => (
          <div>
          <h4>Bejelentkezés</h4>
            <button onClick={() => setBelepesOda()}> Bejelentkezés </button>
        </div>
  )

  const setBelepesOda = () => {
    setShowBelepesAblak(true);
    //setMod("belepes");
    setShowBelepesMezo(false);
  }

  //belépés mező
  //onChange doesn't happen on change
 //https://medium.com/@hayavuk/react-forms-d49ec73cc84a
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
            
            onInput={(event) =>
                handleChangeEmailRef(event)
            }
        /><br />
        <label htmlFor="jelsz">Jelszó: </label>
        <input
          type="password"
          id="jelsz"
          name="jelsz"
          
          onInput={(event) =>
            handleChangeJelszRef(event)
          }
        />
        <br />
        <button type="submit">Belépés</button>
    </form>
      </div>
      <div>
        <button onClick={() => setBelepesVissza()}>Bezárás</button>
        
      </div>
      <button onClick={() => handleElfelejtettJelszo()}>Elfelejtett jelszó</button>
      </div>
  )

  const setBelepesVissza = () => {
    setShowBelepesAblak(false);
    setShowBelepesMezo(true);
    setShowBelepes(true);
    setShowMelyikJogosultsag(false);
  }

  const MelyikJogosultsag = () => (
    <div>
      <table>
        <tbody>
          <tr>
            {felhasznaloJogosultsagai.map((val, key) => {
              return (
                <td key={key}>{val.jogosultsag}<br /><button onClick={() => handleJogosultsagValasztas(val.jogosultsag, val.nev)}>{val.jogosultsag}</button></td>
              )
            })}
          </tr>
        </tbody>
      </table>
    </div>
  )

  const handleJogosultsagValasztas = (jog, nev) => {
    if (jog == "Admin") {
      setShowBelepesMezo(false);
      setShowBelepes(false);
      setShowFejlec(true);
      setEmailMost(emailRef.current);
      setNevMost(nev);
      setShowBelepesAblak(false);
      //setJogosultsag(jog);
      setBejelJog(jog);
      setShowTablaAdmin(true);
      setShowMelyikJogosultsag(false);
    } else if (jog == "Tanulmányi iroda") {
      setShowBelepesMezo(false);
      setShowBelepes(false);
      setShowFejlec(true);
      setEmailMost(emailRef.current);
      setNevMost(nev);
      setShowBelepesAblak(false);
      //setJogosultsag(jog);
      setBejelJog(jog);
      setShowTablaTO(true);
      setShowMelyikJogosultsag(false);
    } else if (jog == "Szakfelelős") {
      setShowBelepesMezo(false);
      setShowBelepes(false);
      setShowFejlec(true);
      setEmailMost(emailRef.current);
      setNevMost(nev);
      setShowBelepesAblak(false);
      //setJogosultsag(jog);
      setBejelJog(jog);
      setShowTablaSzakfelelos(true);
      setShowMelyikJogosultsag(false);
    } else if (jog == "Tanszekvezető") {
      setShowBelepesMezo(false);
      setShowBelepes(false);
      setShowFejlec(true);
      setEmailMost(emailRef.current);
      setNevMost(nev);
      setShowBelepesAblak(false);
      //setJogosultsag(jog);
      setBejelJog(jog);
      setShowTablaTanszekvezeto(true);
      setShowMelyikJogosultsag(false);
    } else if (jog == "Oktató") {
      setShowBelepesMezo(false);
      setShowBelepes(false);
      setShowFejlec(true);
      setEmailMost(emailRef.current);
      setNevMost(nev);
      setShowBelepesAblak(false);
      //setJogosultsag(jog);
      setBejelJog(jog);
      setShowTablaOktato(true);
      setShowMelyikJogosultsag(false);
    }
  }

  //táblázat megjelenítése

  //admin táblázata
  const TablazatAdmin = () => (
    <div className="fotabla">
      <div className="FentiGombok">
        <button onClick={() => adminUjSzak()}>Új szak felvétele</button>
        <button onClick={() => adminUjFelev()}>Új félév felvétele</button>
        <button onClick={() => tablazatLekeresAktualis()}>Jelenlegi félév</button>
        <button onClick={() => tablazatLekeres()}>Összes tárgy</button>
      </div>
      <div className="FentiGombok">
        <form onSubmit={(event) => handleKereses(event)}>
        <select onClick={(event) => handleChangeKeresettMezo(event)} onChange={(event) => handleChangeKeresettMezo(event)}>
          <option id="felev" name="felev" value="szervEgys">Szervezeti egység</option>
          <option id="felev" name="felev" value="szaknev">Szak</option>
          <option id="felev" name="felev" value="indul">Indul</option>
          <option id="felev" name="felev" value="tanev">Tanév</option>
          <option id="felev" name="felev" value="evszak">Évszak</option>
          <option id="felev" name="felev" value="targynev">Tárgynév</option>
          <option id="felev" name="felev" value="targykod">Tárgykód</option>
          <option id="felev" name="felev" value="evfolyam">Évfolyam</option>
          <option id="felev" name="felev" value="online">Oktatás módja nappali</option>
          <option id="felev" name="felev" value="onlineLev">Oktatás módja levelező</option>
          <option id="felev" name="felev" value="tipus">Típus</option>
          <option id="felev" name="felev" value="kredit">Kredit</option>
          <option id="felev" name="felev" value="oraszamNap">Óraszám nappali</option>
          <option id="felev" name="felev" value="oraszamLev">Óraszám levelező</option>
          <option id="felev" name="felev" value="kovetelmeny">Követelmény</option>
          <option id="felev" name="felev" value="oktatoNap">Oktató neve nappali</option>
          <option id="felev" name="felev" value="oktatoLev">Oktató neve levelező</option>
          <option id="felev" name="felev" value="TImegjegyzes">Tanulmányi iroda megjegyzés</option>
          <option id="felev" name="felev" value="oktatoMegjegyzes">Oktatói megjegyzés nappali</option>
          <option id="felev" name="felev" value="oktatoMegjegyzesLev">Oktatói megjegyzés levelezős</option>
        </select>
        <input
          type="text"
          id="kereses"
          name="kereses"
          
          onInput={(event) =>
            handleChangeKeresesRef(event)
          }
        />
        <button type="submit">Keresés</button>
        </form>
      </div>
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
          <th>Oktatás módja nappali</th>
          <th>Oktatás módja levelező</th>
          <th>Típus</th>
          <th>Kredit</th>
          <th>Óraszám nappali</th>
          <th>Óraszám levelező</th>
          <th>Követelmény</th>
          <th>Oktató neve nappali</th>
          <th>Oktató neve levelező</th>
          <th>Tanulmányi iroda megjegyzés</th>
          <th>Oktatói megjegyzés nappali</th>
          <th>Oktatói megjegyzés levelezős</th>
        </tr>
        {adatok.map((val, key) => {
          return (
            <tr key={key}>
              <td className='hidden'>{val.mostani_ID}</td>
              <td>{val.szervEgys}</td>
              <td>{val.szaknev}</td>
              <td>{val.indul == 1 ? "Igen" : "Nem"}</td>
              <td>{val.tanev}</td>
              <td>{val.evszak}</td>
              <td>{val.targynev}</td>
              <td>{val.targykod}</td>
              <td>{val.evfolyam}</td>
              <td>{val.online}</td>
              <td>{val.onlineLev}</td>
              <td>{val.tipus}</td>
              <td>{val.kredit}</td>
              <td>{val.oraszamNap}</td>
              <td>{val.oraszamLev}</td>
              <td>{val.kovetelmeny}</td>
              <td>{val.oktatoNap}</td>
              <td>{val.oktatoLev}</td>
              <td>{val.TImegjegyzes}</td>
              <td>{val.oktatoMegjegyzes}</td>
              <td>{val.oktatoMegjegyzesLev}</td>
              <td>{val.veglegesites}</td>
              <td><button disabled={((val.veglegesites == 0) || (val.veglegesites == 5)) ? "true" : ""} onClick={() => adminVeglegesitesVissza(val.mostani_ID, val.veglegesites)}>Véglegesítés visszavonása</button></td>
            </tr>
          )
        })}
        </tbody>
      </table>
      </div>
  )

  //legördülő lista
  const UjSzak = () => (
    <div  className="UjSzak">
      <div>
        <form onSubmit={(event) => handleSubmitUjSzak(event)}> 
          <label>Szak: </label>
          <input
              type="text"
              id="szak"
              name="szak"
              onInput={(event) =>
                handleChangeSzakRef(event)
              }
          />
          <label>Szakfelelős:</label>
          <select value={email} onClick={(event) => handleChangeEmail(event)} onChange={(event) => handleChangeEmail(event)}>
            {szakfelelosok.map((val, key) => {
              return (
                <option id="szakfelelos" name="szakfelelos" key={key} value={val.emailCim}>{val.nev}</option>
              )
            })}
          </select>
          
          <button type="submit">Mentés</button>
        </form>
      </div>
      <div>
        <button onClick={() => setUjSzakVissza()}>Bezárás</button>
      </div>
    </div>
  )

  const setUjSzakVissza = () => {
    setShowUjSzak(false);
  }

  const UjFelev = () => (
    <div className="UjFelev">
      <div>
        <form onSubmit={(event) => handleSubmitUjFelev(event)}> 
          <label>Félév neve: </label>
          <input
              type="text"
              id="felev"
              name="felev"
              onInput={(event) =>
                handleChangeFelevRef(event)
              }
          />
          <button type="submit">Mentés</button>
        </form>
      </div>
      <div>
        <button onClick={() => setUjFelevVissza()}>Bezárás</button>
      </div>
    </div>
  )

  const setUjFelevVissza = () => {
    setShowUjFelev(false);
  }

  const adminUjSzak = () => {
    setShowUjSzak(!showUjSzak);
    //setMod("ujSzak");
    osszesSzakfelelos();
    console.log(szakfelelosok);
  }

  const adminUjFelev = () => {
    setShowUjFelev(!showUjFelev);
    //setMod("ujFelev");
  }

  //TO táblázata
  const TablazatTO = () => (
    <div className='fotabla'>
      <div className="FentiGombok">
        <button onClick={() => tablazatLekeresAktualis()}>Jelenlegi félév</button>
        <button onClick={() => tablazatLekeres()}>Összes tárgy</button>
        <button onClick={() => tablazatLekeresTanterv()}>Tanterv</button>
        <button className={tantervTabla != true ? 'hidden' :  undefined } onClick={() => TOujTargy()}>Új tárgy hozzáadása</button>
      </div>
      <div className="FentiGombok">
        <form onSubmit={(event) => handleKereses(event)}>
        <select onClick={(event) => handleChangeKeresettMezo(event)} onChange={(event) => handleChangeKeresettMezo(event)}>
          <option id="felev" name="felev" value="szervEgys">Szervezeti egység</option>
          <option id="felev" name="felev" value="szaknev">Szak</option>
          <option id="felev" name="felev" value="indul">Indul</option>
          <option id="felev" name="felev" value="tanev">Tanév</option>
          <option id="felev" name="felev" value="evszak">Évszak</option>
          <option id="felev" name="felev" value="targynev">Tárgynév</option>
          <option id="felev" name="felev" value="targykod">Tárgykód</option>
          <option id="felev" name="felev" value="evfolyam">Évfolyam</option>
          <option id="felev" name="felev" value="online">Oktatás módja nappali</option>
          <option id="felev" name="felev" value="onlineLev">Oktatás módja levelező</option>
          <option id="felev" name="felev" value="tipus">Típus</option>
          <option id="felev" name="felev" value="kredit">Kredit</option>
          <option id="felev" name="felev" value="oraszamNap">Óraszám nappali</option>
          <option id="felev" name="felev" value="oraszamLev">Óraszám levelező</option>
          <option id="felev" name="felev" value="kovetelmeny">Követelmény</option>
          <option id="felev" name="felev" value="oktatoNap">Oktató neve nappali</option>
          <option id="felev" name="felev" value="oktatoLev">Oktató neve levelező</option>
          <option id="felev" name="felev" value="TImegjegyzes">Tanulmányi iroda megjegyzés</option>
          <option id="felev" name="felev" value="oktatoMegjegyzes">Oktatói megjegyzés nappali</option>
          <option id="felev" name="felev" value="oktatoMegjegyzesLev">Oktatói megjegyzés levelezős</option>
        </select>
        <input
          type="text"
          id="kereses"
          name="kereses"
          
          onInput={(event) =>
            handleChangeKeresesRef(event)
          }
        />
        <button type="submit">Keresés</button>
        </form>
      </div>
    <table>
        <tbody>
        <tr>
          <th>Szervezeti egység</th>
          <th>Szak</th>
          <th>Indul</th>
          <th className={tantervTabla == true ? 'hidden' :  undefined }>Tanév</th>
          <th>Évszak</th>
          <th>Tárgynév</th>
          <th>Tárgykód</th>
          <th>Évfolyam</th>
          <th className={tantervTabla == true ? 'hidden' :  undefined }>Oktatás módja nappali</th>
          <th className={tantervTabla == true ? 'hidden' :  undefined }>Oktatás módja levelező</th>
          <th>Típus</th>
          <th>Kredit</th>
          <th>Óraszám nappali</th>
          <th>Óraszám levelező</th>
          <th>Követelmény</th>
          <th className={tantervTabla == true ? 'hidden' :  undefined }>Oktató neve nappali</th>
          <th className={tantervTabla == true ? 'hidden' :  undefined }>Oktató neve levelező</th>
          <th className={tantervTabla == true ? 'hidden' :  undefined }>Tanulmányi iroda megjegyzés</th>
          <th className={tantervTabla == true ? 'hidden' :  undefined }>Oktatói megjegyzés nappali</th>
          <th className={tantervTabla == true ? 'hidden' :  undefined }>Oktatói megjegyzés levelezős</th>
        </tr>
        {adatok.map((val, key) => {
          return (
            <tr key={key} className={val.utolsoBelepes=="1" ? "kiemel" : undefined}>
              <td className='hidden'>{val.mostani_ID}</td>
              <td className='hidden'>{val.tanterv_ID}</td>
              <td>{val.szervEgys}</td>
              <td>{val.szaknev}</td>
              <td>{val.indul == 1 ? "Igen" : "Nem"}</td>
              <td className={val.tanev == undefined ? 'hidden' :  undefined }>{val.tanev}</td>
              <td>{val.evszak}</td>
              <td>{val.targynev}</td>
              <td>{val.targykod}</td>
              <td>{val.evfolyam}</td>
              <td className={val.online == undefined ? 'hidden' :  undefined }>{val.online}</td>
              <td className={val.onlineLev == undefined ? 'hidden' :  undefined }>{val.onlineLev}</td>
              <td>{val.tipus}</td>
              <td>{val.kredit}</td>
              <td>{val.oraszamNap}</td>
              <td>{val.oraszamLev}</td>
              <td>{val.kovetelmeny}</td>
              <td className={val.oktatoNap == undefined ? 'hidden' :  undefined }>{val.oktatoNap}</td>
              <td className={val.oktatoLev == undefined ? 'hidden' :  undefined }>{val.oktatoLev}</td>
              { editTImegj == key ? 
              <td className={tantervTabla == true ? 'hidden' :  undefined }>
                <form>
                  <input type="textarea" id="tiMegj" name="tiMegj" onInput={(event) => handleChangeTImegjRef(event)} />
                </form>
              </td> :
              <td className={tantervTabla == true ? 'hidden' :  undefined }>{val.TImegjegyzes}</td> }

              <td className={tantervTabla == true ? 'hidden' :  undefined }>{val.oktatoMegjegyzes}</td>
              <td className={tantervTabla == true ? 'hidden' :  undefined }>{val.oktatoMegjegyzesLev}</td>
              <td><button className={tantervTabla == true ? 'hidden' :  undefined } disabled={((val.veglegesites == 0) || (val.veglegesites == 1)) ? "" : "true"} onClick={() => handleEditTOmegj(key, val.TImegjegyzes)}>Szerkesztés</button>
              <br />
              <button className={tantervTabla != true ? 'hidden' :  undefined } onClick={() => TOmasikSzak(val.tanterv_ID, val.targynev)}>Másolás másik szakkal</button></td>
              <td className={editTImegj != key ? 'hidden' :  undefined }><button onClick={() => TOmegjMentes( val.mostani_ID, val.tanev)}>Mentés</button></td>
              <td className={editTImegj != key ? 'hidden' :  undefined }><button onClick={() => TOkilep()}>Bezárás</button></td>
              <td className={tantervTabla == true ? 'hidden' :  undefined }><button disabled={((val.veglegesites == 0) || (val.veglegesites == 1)) ? "" : "true"} onClick={() => TOveglegesites(val.mostani_ID, val.tanev)}>Véglegesítés</button></td>
            </tr>
          )
        })}
        </tbody>
      </table>
      </div>
  )

  const TOmasikSzak = (targy, nev) => {
    setShowMasikSzak(true);
    targykodRef.current = targy;
    targynevRef.current = nev;
    osszesSzak();
  }

  const MasikSzak = () => (
    <div className="MasikSzak">
      <div>
        <form onSubmit={(event) => handleSubmitMasikSzak(event)}>
          <label>Tárgynév: {targynevRef.current}</label>
          <br />
          <label>Szaknév: </label>
          <select value={szak} onClick={(event) => handleChangeSzak(event)} onChange={(event) => handleChangeSzak(event)}>
            {szakok.map((val, key) => {
              return (
                <option id="szak" name="szak" key={key} value={val.szaknev}>{val.szaknev}</option>
              )
            })}
          </select><br />
          <button type="submit">Mentés</button>
          <button onClick={() => setMasikSzakVissza()}>Bezárás</button>
        </form>
      </div>
    </div>
  )

  const setMasikSzakVissza = () => {
    setShowMasikSzak(false);
  }

  const TOujTargy = () => {
    setShowUjTargy(true);
    osszesSzak(); //->szak[]
    console.log(szakok);
  }

  const UjTargy = () => (
    <div className="UjTargy">
      <div>
        <form onSubmit={(event) => handleSubmitUjTargy(event)}> 
          <label>Tárgykód: </label>
          <input
              type="text"
              id="targykod"
              name="targykod"
              onInput={(event) =>
                handleChangeTargykodRef(event)
              }
          />
          <label>Szervezeti egység: </label>
          <input
              type="text"
              id="szervEgys"
              name="szervEgys"
              onInput={(event) =>
                handleChangeSzervEgysRef(event)
              }
          />
          <label>Évszak: </label>
          <input
              type="text"
              id="evszak"
              name="evszak"
              onInput={(event) =>
                handleChangeEvszakRef(event)
              }
          />
          <label>Tárgynév: </label>
          <input
              type="text"
              id="targynev"
              name="targynev"
              onInput={(event) =>
                handleChangeTargynevRef(event)
              }
          /><br />
          <label>Típus: </label>
          <input
              type="text"
              id="tipus"
              name="tipus"
              onInput={(event) =>
                handleChangeTipusRef(event)
              }
          />
          <label>Szak: </label>
          <select value={szak} onClick={(event) => handleChangeSzak(event)} onChange={(event) => handleChangeSzak(event)}>
            {szakok.map((val, key) => {
              return (
                <option id="szak" name="szak" key={key} value={val.szaknev}>{val.szaknev}</option>
              )
            })}
          </select>
          <label>Kredit: </label>
          <input
              type="text"
              id="kredit"
              name="kredit"
              onInput={(event) =>
                handleChangeKreditRef(event)
              }
          />
          <label>Nappali óraszám: </label>
          <input
              type="text"
              id="napOra"
              name="napOra"
              onInput={(event) =>
                handleChangeNapOraRef(event)
              }
          /><br />
          <label>Levelezős óraszám: </label>
          <input
              type="text"
              id="levOra"
              name="levOra"
              onInput={(event) =>
                handleChangeLevOraRef(event)
              }
          />
          <label>Követelmény: </label>
          <input
              type="text"
              id="kovetelmeny"
              name="kovetelmeny"
              onInput={(event) =>
                handleChangeKovetelmenyRef(event)
              }
          />
          <label>Évfolyam: </label>
          <input
              type="text"
              id="evfolyam"
              name="evfolyam"
              onInput={(event) =>
                handleChangeEvfolyamRef(event)
              }
          />
          <label>Félév: </label>
          <input
              type="text"
              id="felev"
              name="felev"
              onInput={(event) =>
                handleChangeFelevRef(event)
              }
          /><br />
          <button type="submit">Mentés</button>
          <button onClick={() => setUjTargyVissza()}>Bezárás</button>
        </form>
      </div>
      
    </div>
  )

  const setUjTargyVissza = () => {
    setShowUjTargy(false);
  }

  const handleEditTOmegj = (id, megj) => {
    setEditTImegj(id);
    //setMod("TOmegjMentes");
    if (megj == null) {
      tiMegjRef.current = "";
    } else {
      tiMegjRef.current = megj;
    }
  }

  const TOmegjMentes = (id, felev) => {
    setTargykod(id);
    targykodRef.current = id;
    felevRef.current = felev;
    //setMod("TOmegjMentes");
    handleSubmitTImegjMentes();
  }

  const TOkilep = () => {
    setEditTImegj("a")
  }

  //tanszékvezető táblázata
  const TablazatTanszekvezeto = () => (
    <div className="fotabla">
      <div className="FentiGombok">
        <button onClick={() => tanszekvezetoUjOktato()}>Új oktató felvétele</button>
        <button onClick={() => tablazatLekeresAktualis()}>Jelenlegi félév</button>
        <button onClick={() => tablazatLekeres()}>Összes tárgy</button>
      </div>
      <div className="FentiGombok">
        <form onSubmit={(event) => handleKereses(event)}>
        <select onClick={(event) => handleChangeKeresettMezo(event)} onChange={(event) => handleChangeKeresettMezo(event)}>
          <option id="felev" name="felev" value="szervEgys">Szervezeti egység</option>
          <option id="felev" name="felev" value="szaknev">Szak</option>
          <option id="felev" name="felev" value="indul">Indul</option>
          <option id="felev" name="felev" value="tanev">Tanév</option>
          <option id="felev" name="felev" value="evszak">Évszak</option>
          <option id="felev" name="felev" value="targynev">Tárgynév</option>
          <option id="felev" name="felev" value="targykod">Tárgykód</option>
          <option id="felev" name="felev" value="evfolyam">Évfolyam</option>
          <option id="felev" name="felev" value="online">Oktatás módja nappali</option>
          <option id="felev" name="felev" value="onlineLev">Oktatás módja levelező</option>
          <option id="felev" name="felev" value="tipus">Típus</option>
          <option id="felev" name="felev" value="kredit">Kredit</option>
          <option id="felev" name="felev" value="oraszamNap">Óraszám nappali</option>
          <option id="felev" name="felev" value="oraszamLev">Óraszám levelező</option>
          <option id="felev" name="felev" value="kovetelmeny">Követelmény</option>
          <option id="felev" name="felev" value="oktatoNap">Oktató neve nappali</option>
          <option id="felev" name="felev" value="oktatoLev">Oktató neve levelező</option>
          <option id="felev" name="felev" value="TImegjegyzes">Tanulmányi iroda megjegyzés</option>
          <option id="felev" name="felev" value="oktatoMegjegyzes">Oktatói megjegyzés nappali</option>
          <option id="felev" name="felev" value="oktatoMegjegyzesLev">Oktatói megjegyzés levelezős</option>
        </select>
        <input
          type="text"
          id="kereses"
          name="kereses"
          
          onInput={(event) =>
            handleChangeKeresesRef(event)
          }
        />
        <button type="submit">Keresés</button>
        </form>
      </div>
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
          <th>Oktatás módja nappali</th>
          <th>Oktatás módja levelező</th>
          <th>Típus</th>
          <th>Kredit</th>
          <th>Óraszám nappali</th>
          <th>Óraszám levelező</th>
          <th>Követelmény</th>
          <th>Oktató neve nappali</th>
          <th>Oktató neve levelező</th>
          <th>Tanulmányi iroda megjegyzés</th>
          <th>Oktatói megjegyzés nappali</th>
          <th>Oktatói megjegyzés levelező</th>
        </tr>
        {adatok.map((val, key) => {
          return (
            <tr key={key} className={val.utolsoBelepes=="1" ? "kiemel" : undefined}>
              <td className='hidden'>{val.mostani_ID}</td>
              <td>{val.szervEgys}</td>
              <td>{val.szaknev}</td>
              <td>{val.indul == 1 ? "Igen" : "Nem"}</td>
              <td>{val.tanev}</td>
              <td>{val.evszak}</td>
              <td>{val.targynev}</td>
              <td>{val.targykod}</td>
              <td>{val.evfolyam}</td>
              <td>{val.online}</td>
              <td>{val.onlineLev}</td>
              <td>{val.tipus}</td>
              <td>{val.kredit}</td>
              <td>{val.oraszamNap}</td>
              <td>{val.oraszamLev}</td>
              <td>{val.kovetelmeny}</td>
              { editNapOkt == key ?
              <td> 
                <select value={oktatoNap} onClick={(event) => handleChangeOktNap(event)} onChange={(event) => handleChangeOktNap(event)}>
                  {oktatok.map((val, key) => {
                    return (
                      <option key={key} value={val.emailCim}>{val.nev}</option>
                    )
                  })}
                </select>
              </td> : 
              <td>{val.oktatoNap}</td> }
              { editLevOkt == key ? 
              <td>
                <select value={oktatoLev} onClick={(event) => handleChangeOktLev(event)} onChange={(event) => handleChangeOktLev(event)}>
                  {oktatok.map((val, key) => {
                    return (
                      <option key={key} value={val.emailCim}>{val.nev}</option>
                    )
                  })}
                </select>
              </td> : 
              <td>{val.oktatoLev}</td> }
              <td>{val.TImegjegyzes}</td>
              <td>{val.oktatoMegjegyzes}</td>
              <td>{val.oktatoMegjegyzesLev}</td>
              <td><button disabled={val.veglegesites == 2 ? "" : "true"} onClick={() => handleEditTanszekvezetoNapOktato(key, val.oktatoNap)}>Nappalis oktató hozzárendelése</button>
              <br />
              <button disabled={val.veglegesites == 2 ? "" : "true"} onClick={() => handleEditTanszekvezetoLevOktato(key, val.oktatoLev)}>Levelezős oktató hozzárendelése</button></td>
              <td className={editNapOkt != key ? 'hidden' :  'kisgomb' }><div className="kisgombok"><button onClick={() => tanszekvezetoNapOktMentes( val.mostani_ID)}>Mentés</button><button onClick={() => tanszekvezetoNapOktKilep()}>Bezárás</button></div></td>

              <td className={editLevOkt != key ? 'hidden' :  'kisgomb' }><div className="kisgombok"><button onClick={() => tanszekvezetoLevOktMentes( val.mostani_ID)}>Mentés</button><button onClick={() => tanszekvezetoLevOktKilep()}>Bezárás</button></div></td>
              <td><button disabled={val.veglegesites == 2 ? "" : "true"} onClick={() => tanszekvezetoVeglegesites(val.mostani_ID, val.tanev)}>Véglegesítés</button></td>
            </tr>
          )
        })}
        </tbody>
      </table>
      </div>
  )

  const tanszekvezetoNapOktMentes = (id) => {
    setTargykod(id);
    targykodRef.current = id;
    handleSubmitTanszekvezetoNapOktato();
  }

  const tanszekvezetoLevOktMentes = (id) => {
    setTargykod(id);
    targykodRef.current = id;
    handleSubmitTanszekvezetoLevOktato();
  }

  const tanszekvezetoNapOktKilep = () => {
    setEditNapOkt("a")
  }

  const tanszekvezetoLevOktKilep = () => {
    setEditLevOkt("a")
  }

  const handleEditTanszekvezetoNapOktato = (id, oktato) => {
    setEditNapOkt(id);
    setOktatoNap(oktato);
    //setMod("osszesOktato");
    //beolvassuk az összes oktatót az adatbázisból
    osszesOktato();
    //setMod("napOktHozzarendel");
  }

  const handleEditTanszekvezetoLevOktato = (id, oktato) => {
    setEditLevOkt(id);
    setOktatoLev(oktato);
    //setMod("osszesOktato");
    osszesOktato();
    //setMod("levOktHozzarendel");
  }

  //legördülő lista
  const UjOktato = () => (
    <div className="UjOktato">
      <div>
        <form onSubmit={(event) => handleSubmitUjOktato(event)}>
          <label>E-mail cím: </label>
        <input
              type="text"
              id="email"
              name="email"
              onInput={(event) =>
                handleChangeEmailRef(event)
              }
          />
          <label>Név: </label>
        <input
              type="text"
              id="nev"
              name="nev"
              onInput={(event) =>
                handleChangeNevRef(event)
              }
          />
          <label>Jelszó: </label>
        <input
              type="password"
              id="jelsz"
              name="jelsz"
              onInput={(event) =>
                handleChangeJelszRef(event)
              }
          />
          <label>Telefonszám: </label>
        <input
              type="text"
              id="telszam"
              name="telszam"
              onInput={(event) =>
                handleChangeTelszamRef(event)
              }
          />
          <label>Jogosultság: </label>
          <select value={jogosultsag} onClick={(event) => handleChangeJogosultsag(event)} onChange={(event) => handleChangeJogosultsag(event)}>
            {jogosultsagok.map((val, key) => {
              return (
                <option id="jogosultsag" name="jogosultsag" key={key} value={val.jogosultsag}>{val.jogosultsag}</option>
              )
            })}
          </select>
          <br />
          <button type="submit">Felvesz</button>
          <button onClick={() => setUjOktatoVissza()}>Bezárás</button>
        </form>
      </div>
    </div>
  )

  const tanszekvezetoUjOktato = () => {
    setShowUjOktato(!showUjOktato);
    
    if (email != "") {
      setEmail("");
    }
    if (jelsz != "") {
      setJelsz("");
    }
    //if (jogosultsagok.length == 0) {
      osszesJogosultsag();
      //setMod("ujOktato");
      console.log(mod);
    //}
  }

  const setUjOktatoVissza = () => {
    setShowUjOktato(false);
  }

  //szakfelelős táblázata
  const TablazatSzakfelelos = () => (
    <div className="fotabla">
      <div className="FentiGombok">
        <button onClick={() => szakfelelosSzakInditasa()}>Szakok indítása</button>
        <button onClick={() => szakfelelosTargyakMegadasaImport()}>Tárgyak importálása</button>
        <button onClick={() => tablazatLekeresAktualis()}>Jelenlegi félév</button>
        <button onClick={() => tablazatLekeres()}>Összes tárgy</button>
      </div>
      <div className="FentiGombok">
        <form onSubmit={(event) => handleKereses(event)}>
        <select onClick={(event) => handleChangeKeresettMezo(event)} onChange={(event) => handleChangeKeresettMezo(event)}>
          <option id="felev" name="felev" value="szervEgys">Szervezeti egység</option>
          <option id="felev" name="felev" value="szaknev">Szak</option>
          <option id="felev" name="felev" value="indul">Indul</option>
          <option id="felev" name="felev" value="tanev">Tanév</option>
          <option id="felev" name="felev" value="evszak">Évszak</option>
          <option id="felev" name="felev" value="targynev">Tárgynév</option>
          <option id="felev" name="felev" value="targykod">Tárgykód</option>
          <option id="felev" name="felev" value="evfolyam">Évfolyam</option>
          <option id="felev" name="felev" value="online">Oktatás módja nappali</option>
          <option id="felev" name="felev" value="onlineLev">Oktatás módja levelező</option>
          <option id="felev" name="felev" value="tipus">Típus</option>
          <option id="felev" name="felev" value="kredit">Kredit</option>
          <option id="felev" name="felev" value="oraszamNap">Óraszám nappali</option>
          <option id="felev" name="felev" value="oraszamLev">Óraszám levelező</option>
          <option id="felev" name="felev" value="kovetelmeny">Követelmény</option>
          <option id="felev" name="felev" value="oktatoNap">Oktató neve nappali</option>
          <option id="felev" name="felev" value="oktatoLev">Oktató neve levelező</option>
          <option id="felev" name="felev" value="TImegjegyzes">Tanulmányi iroda megjegyzés</option>
          <option id="felev" name="felev" value="oktatoMegjegyzes">Oktatói megjegyzés nappali</option>
          <option id="felev" name="felev" value="oktatoMegjegyzesLev">Oktatói megjegyzés levelezős</option>
        </select>
        <input
          type="text"
          id="kereses"
          name="kereses"
          
          onInput={(event) =>
            handleChangeKeresesRef(event)
          }
        />
        <button type="submit">Keresés</button>
        </form>
      </div>
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
          <th>Oktatás módja nappali</th>
          <th>Oktatás módja levelező</th>
          <th>Típus</th>
          <th>Kredit</th>
          <th>Óraszám nappali</th>
          <th>Óraszám levelező</th>
          <th>Követelmény</th>
          <th>Oktató neve nappali</th>
          <th>Oktató neve levelező</th>
          <th>Tanulmányi iroda megjegyzés</th>
          <th>Oktatói megjegyzés nappali</th>
          <th>Oktatói megjegyzés levelező</th>
        </tr>
        {adatok.map((val, key) => {
          return (
            <tr key={key} className={val.utolsoBelepes=="1" ? "kiemel" : undefined}>
              <td className='hidden'>{val.mostani_ID}</td>
              <td>{val.szervEgys}</td>
              <td>{val.szaknev}</td>
              <td>{val.indul == 1 ? "Igen" : "Nem"}</td>
              <td>{val.tanev}</td>
              <td>{val.evszak}</td>
              <td>{val.targynev}</td>
              <td>{val.targykod}</td>
              <td>{val.evfolyam}</td>
              <td>{val.online}<br /><button className='Kisgomb' onClick={() => handleChangeOnline(val.mostani_ID, val.tanev)}>Váltás</button></td>
              <td>{val.onlineLev}<br /><button className='Kisgomb' onClick={() => handleChangeOnlineLev(val.mostani_ID, val.tanev)}>Váltás</button></td>
              <td>{val.tipus}</td>
              <td>{val.kredit}</td>
              <td>{val.oraszamNap}</td>
              <td>{val.oraszamLev}</td>
              <td>{val.kovetelmeny}</td>
              <td>{val.oktatoNap}</td>
              <td>{val.oktatoLev}</td>
              <td>{val.TImegjegyzes}</td>
              <td>{val.oktatoMegjegyzes}</td>
              <td>{val.oktatoMegjegyzesLev}</td>
              <td><button onClick={() => szakfelelosTargyTorles(val.mostani_ID, val.tanev)}>Tárgy törlése</button></td>
              <td><button disabled={val.veglegesites == 0 ? "" : "true"} onClick={() => szakfelelosVeglegesites(val.mostani_ID, val.tanev)}>Véglegesítés</button></td>
            </tr>
          )
        })}
        </tbody>
      </table>
      </div>
  )

  const szakfelelosSzakInditasa = () => {
    setShowSzakInditasa(!showSzakInditasa);
    //if (szakok.length == 0) {
      osszesSajatSzak();
      
    //}
  }

  const setSzakInditasaVissza = () => {
    setShowSzakInditasa(false);
  }

  //itt van a lista a checkboxokkal
  const SzakInditasa = () => (
    <div className='SzakInditasa'>
      <form onSubmit={(event) => handleSubmitSzakInditasa(event)}>
        <table>
          <tbody>
            {szakok.map((val, key) => {
              return (
                <tr key={key}>
                  <td>
                    <input type="checkbox" value={val.szaknev} checked={inditandoSzakok.includes(val.szaknev)} onChange={(event) => handleChangeInditandoSzak(event)}/><p>{val.szaknev}</p><br />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <button type="submit">Szak(ok) indítása</button>
      </form>
      <div>
        <button onClick={() => setSzakInditasaVissza()}>Bezárás</button>
      </div>
    </div>
  )

  const szakfelelosTargyakMegadasaImport = () => {
    setInduloSzakok([]);
    setTargymegadasFelevek([]);
    setImportalandoTargyak([]);
    setShowTargyakMegadasaImport(!showTargyakMegadasaImport);
    szakEgyedul();
    //setMod("szakEsFelev");
    
    
  }

  const kiir = () => {
    //console.log(targymegadasSzak);
    //console.log(targymegadasFelev);
    felevEgyedul();
    console.log(targymegadasFelev);
    console.log(targymegadasSzak);
    //setMod("targyImportBeolv");
  }

  //ha importálunk tárgyakat a tantervből
  //checkboxokhoz targymegadasTargyakBeolv
  const TargyakMegadasaImport = () => (
    <div className="TargyakMegadasaImport">
      <form onSubmit={(event) => handleSubmitTargyImportBeolv(event)}>
        <p>Szak: </p>
          <select value={targymegadasSzak} onClick={(event) => handleChangeTargymegadasSzak(event)} onChange={(event) => handleChangeTargymegadasSzak(event)}>
            {induloSzakok.map((val, key) => {
              return (
                <option id="szaknev" name="szaknev" key={key} value={val.szaknev}>{val.szaknev}</option>
              )
            })}
          </select>
          <br />
        <p>Félév: </p>
          <select value={targymegadasFelev} onClick={(event) => handleChangeTargymegadasFelev(event)} onChange={(event) => handleChangeTargymegadasFelev(event)}>
            {targymegadasFelevek.map((val, key) => {
              return (
                <option id="felev" name="felev" key={key} value={val.tanev}>{val.tanev}</option>
              )
            })}
            <option id="felev" name="felev" value="tanterv">Tanterv</option>
          </select>
          <br />
        <button type="submit">Beolvasás</button>
      </form>
      <button onClick={() => kiir()}>Félévek betöltése</button>

      <form onSubmit={(event) => handleSubmitTargyImport(event)}>
        <table>
          <tbody>
            {targymegadasTargyakBeolv.map((val, key) => {
              return (
                <tr key={key}>
                  <td>
                    <input type="checkbox" value={val.targykod} checked={importalandoTargyak.includes(val.targykod)} onChange={(event) => handleChangeImportalandoTargyak(event)}/><p>{val.targykod} - {val.targynev}</p><br />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <button type="submit">Importálás</button>
      </form>
    </div>
  )

  const szakfelelosTargyakMegadasaManual = () => {
    //setShowTargyakMegadasaManual(true);
    osszesSajatSzak();
    osszesSajatSzak();
  }

  //ha manuálisan adunk meg tárgyat
  //ez inkább ne legyen
  /*const TargyakMegadasaManual = () => (
    <div className='fotabla'>
      <form onSubmit={(event) => handleSubmitTargyManual(event)}> 
        <p>Szak: </p>
          <select value={targymegadasSzak} onChange={(event) => handleChangeTargymegadasSzak(event)}>
            {szakok.map((val, key) => {
              return (
                <option id="szaknev" name="szaknev" key={key} value={val.szaknev}>{val.szaknev}</option>
              )
            })}
          </select>
          <br />    
      <p>Tárgy neve: </p>
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
  )*/

  //oktató táblázata
  const TablazatOktato = () => (
    <div className='fotabla'>
      <div className="FentiGombok">
        <button onClick={() => tablazatLekeresAktualis()}>Jelenlegi félév</button>
        <button onClick={() => tablazatLekeres()}>Összes tárgy</button>
      </div>
      <div className="FentiGombok">
        <form onSubmit={(event) => handleKereses(event)}>
        <select onClick={(event) => handleChangeKeresettMezo(event)} onChange={(event) => handleChangeKeresettMezo(event)}>
          <option id="felev" name="felev" value="szervEgys">Szervezeti egység</option>
          <option id="felev" name="felev" value="szaknev">Szak</option>
          <option id="felev" name="felev" value="indul">Indul</option>
          <option id="felev" name="felev" value="tanev">Tanév</option>
          <option id="felev" name="felev" value="evszak">Évszak</option>
          <option id="felev" name="felev" value="targynev">Tárgynév</option>
          <option id="felev" name="felev" value="targykod">Tárgykód</option>
          <option id="felev" name="felev" value="evfolyam">Évfolyam</option>
          <option id="felev" name="felev" value="online">Oktatás módja nappali</option>
          <option id="felev" name="felev" value="onlineLev">Oktatás módja levelező</option>
          <option id="felev" name="felev" value="tipus">Típus</option>
          <option id="felev" name="felev" value="kredit">Kredit</option>
          <option id="felev" name="felev" value="oraszamNap">Óraszám nappali</option>
          <option id="felev" name="felev" value="oraszamLev">Óraszám levelező</option>
          <option id="felev" name="felev" value="kovetelmeny">Követelmény</option>
          <option id="felev" name="felev" value="oktatoNap">Oktató neve nappali</option>
          <option id="felev" name="felev" value="oktatoLev">Oktató neve levelező</option>
          <option id="felev" name="felev" value="TImegjegyzes">Tanulmányi iroda megjegyzés</option>
          <option id="felev" name="felev" value="oktatoMegjegyzes">Oktatói megjegyzés nappali</option>
          <option id="felev" name="felev" value="oktatoMegjegyzesLev">Oktatói megjegyzés levelezős</option>
        </select>
        <input
          type="text"
          id="kereses"
          name="kereses"
          
          onInput={(event) =>
            handleChangeKeresesRef(event)
          }
        />
        <button type="submit">Keresés</button>
        </form>
      </div>
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
          <th>Oktatás módja nappali</th>
          <th>Oktatás módja levelező</th>
          <th>Típus</th>
          <th>Kredit</th>
          <th>Óraszám nappali</th>
          <th>Óraszám levelező</th>
          <th>Követelmény</th>
          <th>Oktató neve nappali</th>
          <th>Oktató neve levelező</th>
          <th>Tanulmányi iroda megjegyzés</th>
          <th>Oktatói megjegyzés nappali</th>
          <th>Oktatói megjegyzés levelező</th>
        </tr>
        {adatok.map((val, key) => {
          return (
            <tr key={key} className={val.utolsoBelepes=="1" ? "kiemel" : undefined}>
              <td className='hidden'>{val.mostani_ID}</td>
              <td>{val.szervEgys}</td>
              <td>{val.szaknev}</td>
              <td>{val.indul == 1 ? "Igen" : "Nem"}</td>
              <td>{val.tanev}</td>
              <td>{val.evszak}</td>
              <td>{val.targynev}</td>
              <td>{val.targykod}</td>
              <td>{val.evfolyam}</td>
              <td>{val.online}</td>
              <td>{val.onlineLev}</td>
              <td>{val.tipus}</td>
              <td>{val.kredit}</td>
              <td>{val.oraszamNap}</td>
              <td>{val.oraszamLev}</td>
              <td>{val.kovetelmeny}</td>
              <td>{val.oktatoNap}</td>
              <td>{val.oktatoLev}</td>
              <td>{val.TImegjegyzes}</td>
              { editOktMegj == key ? 
              <td>
                <form>
                  <input type="textarea" id="oktMegj" placeholder={oktMegjRef.current} name="oktMegj" onClick={(event) => handleChangeOktMegjRef(event)} onInput={(event) => handleChangeOktMegjRef(event)} />
                </form>
              </td> :
              <td>{val.oktatoMegjegyzes}</td> }

              { editOktMegjLev == key ? 
              <td>
                <form>
                  <input type="textarea" id="oktMegj" placeholder={oktMegjRef.current} name="oktMegj" onClick={(event) => handleChangeOktMegjRef(event)} onInput={(event) => handleChangeOktMegjRef(event)} />
                </form>
              </td> :
              <td>{val.oktatoMegjegyzesLev}</td> }

              <td><button className={val.oktatoNap == nevMost ? undefined : "hidden"} disabled={val.veglegesites == 3 ? "" : "true"} onClick={() => handleEditOktmegj(key, val.oktatoMegjegyzes)}>Nappalis megjegyzés szerkesztése</button>
              <br />
              <button className={val.oktatoLev == nevMost ? undefined : "hidden"} disabled={val.veglegesites == 3 ? "" : "true"} onClick={() => handleEditOktmegjLev(key, val.oktatoMegjegyzesLev)}>Levelezős megjegyzés szerkesztése</button></td>
              <td className={editOktMegj != key ? 'hidden' :  undefined }><button onClick={() => oktmegjMentes( val.mostani_ID, val.tanev)}>Mentés</button></td>
              <td className={editOktMegj != key ? 'hidden' :  undefined }><button onClick={() => oktKilep()}>Bezárás</button></td>
              <td className={editOktMegjLev != key ? 'hidden' :  undefined }><button onClick={() => oktmegjLevMentes( val.mostani_ID, val.tanev)}>Mentés</button></td>
              <td className={editOktMegjLev != key ? 'hidden' :  undefined }><button onClick={() => oktLevKilep()}>Bezárás</button></td>
              <td><button disabled={val.veglegesites == 3 ? "" : "true"} onClick={() => oktatoVeglegesites(val.mostani_ID, val.tanev)}>Véglegesítés</button></td>
            </tr>
          )
        })}
        </tbody>
      </table>
      </div>
  )

  const handleEditOktmegj = (id, megj) => {
    setEditOktMegj(id);
    //setMod("OktMegjMentes");
    if (megj == null) {
      oktMegjRef.current = "";
    } else {
      oktMegjRef.current = megj;
    }
  }

  const oktmegjMentes = (id, felev) => {
    setTargykod(id);
    targykodRef.current = id;
    felevRef.current = felev;
    handleSubmitOktMegjMentes();
  }

  const oktKilep = () => {
    setEditOktMegj("a")
  }

  const handleEditOktmegjLev = (id, megj) => {
    setEditOktMegjLev(id);
    //setMod("OktMegjMentes");
    if (megj == null) {
      oktMegjRef.current = "";
    } else {
      oktMegjRef.current = megj;
    }
  }

  const oktmegjLevMentes = (id, felev) => {
    setTargykod(id);
    targykodRef.current = id;
    felevRef.current = felev;
    handleSubmitOktMegjLevMentes();
  }

  const oktLevKilep = () => {
    setEditOktMegjLev("a")
  }

  const Fejlec = () => (
    <div>
      <div>
        <ul>
        <div className={showJelszoValt ? undefined : 'hidden'}>
            <li><label>Új jelszó: </label><input type='password' onClick={(event) => handleUjJelszoChange(event)} onInput={(event) => handleUjJelszoChange(event)}></input></li>
            <li><label>Új jelszó újra: </label><input type='password' onClick={(event) => handleUjraJelszoChange(event)} onInput={(event) => handleUjraJelszoChange(event)}></input></li>
            <li><label>Jelenlegi jelszó: </label><input type='password' onClick={(event) => handleRegiJelszoChange(event)} onInput={(event) => handleRegiJelszoChange(event)}></input></li>
            <li><button onClick={() => handleJelszoValt()}>Mentés</button></li>
          </div>
        <div className={hamburgerOpen ? 'hidden' : undefined}><li><button onClick={() => jelszoValt()}>Jelszó megváltoztatása</button></li></div>
        <div className={hamburgerOpen ? 'hidden' : undefined}><li><button onClick={() => kilepes()}>Kilépés</button></li></div>
        <button onClick={toggleHamburger}>{nevMost} - {bejelJog}</button>
        </ul>
      </div>
    </div>
  )

  const jelszoValt = () => {
    setShowJelszoValt(!showJelszoValt);
  }

  const toggleHamburger = () => {
    setHamburgerOpen(!hamburgerOpen);
  }

  const Hibauzenet = () => {
    <div>
    <div className="Hibauzenet" onClick={(event) => hibauzenetBezar(event)}>
      <p>{hibaRef.current}</p>
    </div>
    </div>
  }

  const Uzenet = () => {
    <div>
    <div className="Uzenet" onClick={(event) => uzenetBezar(event)}>
      <p>{uzenetRef.current}</p>
    </div>
    </div>
  }

  const hibauzenetBezar = () => {
    setShowHibauzenet(false);
    //hibaRef.current="";
  }

  const uzenetBezar = () => {
    setShowUzenet(false);
    //uzenetRef.current="";
  }

  const kilepes = () => {
    setShowBelepesMezo(true);
    setShowBelepes(true);
    setShowFejlec(false);
    setShowTablaAdmin(false);
    setShowTablaOktato(false);
    setShowTablaSzakfelelos(false);
    setShowTablaTO(false);
    setShowTablaTanszekvezeto(false);
    setShowUjSzak(false);
    setShowUjFelev(false);
    setShowUjOktato(false);
    setShowUjTargy(false);
    setShowSzakInditasa(false);
    setShowTargyakMegadasaImport(false);
    setShowJelszoValt(false);
    setHamburgerOpen(!hamburgerOpen);
    setShowHibauzenet(false);
    setShowUzenet(false);
    setEmail("");
    setEmailMost("");
    emailRef.current="";
    setJogosultsag("");
    setBejelJog("");
    setAdatok([]);
  }
//https://www.reddit.com/r/webdev/comments/150bdr2/divs_get_cut_off/
  return (
    <div>
      <div className="App">
        <div className="Fejlec">
          { showFejlec ? <Fejlec /> : null }
        </div>
        <div className="Content">
          <p className={showHibauzenet ? "Hibauzenet" : 'hidden'} onClick={(event) => hibauzenetBezar(event)}>{hibaRef.current}</p>
          <p className={showUzenet ? "Uzenet" : 'hidden'} onClick={(event) => uzenetBezar(event)}>{uzenetRef.current}</p>
          <div className={showBelepes ? "Belepes" : 'hidden'}>
            { showBelepesMezo ? <BelepesMezo /> : null }
            { showBelepesAblak ? <BelepesAblak /> : null }
            { showMelyikJogosultsag ? <MelyikJogosultsag /> : null }
          </div>
          <div className="Wrapper">
            { showUjSzak ? <UjSzak /> : null }
            { showUjFelev ? <UjFelev /> : null }
            { showUjOktato ? <UjOktato /> : null }
            { showUjTargy ? <UjTargy /> : null }
            { showTablaAdmin ? <TablazatAdmin /> : null }
            { showMasikSzak ? <MasikSzak /> : null }
            { showTablaTO ? <TablazatTO /> : null }
            { showTargyakMegadasaImport ? <TargyakMegadasaImport /> : null }
            { showSzakInditasa ? <SzakInditasa /> : null }
            { showTablaSzakfelelos ? <TablazatSzakfelelos /> : null }
            { showTablaTanszekvezeto ? <TablazatTanszekvezeto /> : null }
            { showTablaOktato ? <TablazatOktato /> : null }
          </div>
        </div>
      </div>
    </div>
    
  );
}



export default App;
