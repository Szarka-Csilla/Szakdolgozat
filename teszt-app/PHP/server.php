<?php
    header('Access-Control-Allow-Origin: http://localhost:3000');
    header('Content-Type: application/json');
    require_once("db_connect.php");

    $mod = $_POST['mod'];

    switch ($mod) {
        case "belepesTeszt":
            if((!empty($_POST['nev'])) && (!empty($_POST['jelsz']))) {
                $nev = $_POST['nev'];
                $jelsz = $_POST['jelsz'];
                $bejel = $conn->query("SELECT * FROM felhasznalok WHERE felhnev='$nev'");
                if($bejel->num_rows > 0) {
                    while($row = $bejel->fetch_assoc()) {
                        $hash = $row['jelszo'];
                    }
                }
                if(password_verify($jelsz, $hash)) {
                    $sql = "SELECT * FROM felhasznalok WHERE felhnev='$nev'";
                }
                $result = $conn->query($sql);
                if($result->num_rows > 0) {
                    while ($row = $result->fetch_assoc()) {
                        $mostNev = $row['felhnev'];
                        echo $mostNev;
                    }
                }
                else {
                    echo "nem jó";
                }
            }
            break;
        case "belepes":
            //tényleges belépés
            if((!empty($_POST['email'])) && (!empty($_POST['jelsz']))) {
                $email = $_POST['email'];
                $jelsz = $_POST['jelsz'];
                $bejel = $conn->query("SELECT * FROM felhasznalok WHERE emailCim='$email'");

                //belépés titkosítással
                if($jelsz == "alma") {
                if($bejel->num_rows > 0) {
                    while($row = $bejel->fetch_assoc()) {
                        $hash = $row['jelszo'];
                    }
                }
                if(password_verify($jelsz, $hash)) {
                    //$sql = "SELECT felhasznalok.emailCim, felhasznalok.nev, jogosultsag.jogosultsag
                    $sql = "SELECT jogosultsag.jogosultsag
                     FROM felhasznalok
                     JOIN rendelkezik ON rendelkezik.emailCim=felhasznalok.emailCim
                     JOIN jogosultsag ON jogosultsag.jogosultsag=rendelkezik.jogosultsag
                     WHERE felhasznalok.emailCim='$email'";
                }
            }else {

                //belépés titkosítás nélkül
                
                if($bejel->num_rows > 0) {
                    //$sql = "SELECT felhasznalok.emailCim, felhasznalok.nev, jogosultsag.jogosultsag
                    $sql = "SELECT jogosultsag.jogosultsag
                     FROM felhasznalok
                     JOIN rendelkezik ON rendelkezik.emailCim=felhasznalok.emailCim
                     JOIN jogosultsag ON jogosultsag.jogosultsag=rendelkezik.jogosultsag
                     WHERE felhasznalok.emailCim='$email'";
                }
                else {
                    echo "nincs ilyen felhasználó";
                }
            }
            

                $result = $conn->query($sql);
                if($result->num_rows > 0) {
                    $jogosultsag = "";
                    while ($row = $result->fetch_assoc()) {
                        //$rows[] = $row;
                        $jogosultsag = $row['jogosultsag'];
                        echo $jogosultsag;
                    }
                    //echo json_encode($rows);
                }
                else {
                    echo "nem jó";
                }
            }
            break;
        case "tablazatLekeres":
            //teljes táblázat lekérése
            $sql = $conn->query("SELECT tanterv.szervEgys, szak.szaknev, szak.indul, mostani.tanev, tanterv.evszak,
                                        tanterv.targynev, tanterv.targykod, tanterv.evfolyam, mostani.online,
                                        tanterv.tipus, tanterv.kredit, tanterv.oraszamNap, tanterv.oraszamLev,
                                        tanterv.kovetelmeny, mostani.oktatoNap, mostani.oktatoLev,
                                        mostani.TImegjegyzes, mostani.oktatoMegjegyzes
                                 FROM tanterv
                                 JOIN mostani ON mostani.targykod=tanterv.targykod
                                 JOIN tartozik ON tanterv.targykod=tartozik.targykod
                                 JOIN szak ON tartozik.szaknev=szak.szaknev");
            $rows = array();
            while($row = mysqli_fetch_array($sql)) {
                $rows[] = $row;
            }
            echo json_encode($rows);
            break;
        case "ujOktato":
            //regisztráció
            if(isset($_POST['email']) && isset($_POST['nev']) && isset($_POST['jelsz']) && isset($_POST['telszam']) && isset($_POST['jogosultsag'])) {
                //echo 'im in';
                $email = $_POST['email'];
                $nev = $_POST['nev'];
                $jelsz = $_POST['jelsz'];
                $telszam = $_POST['telszam'];
                $jogosultsag = $_POST['jogosultsag'];
                $jelsz = password_hash($jelsz, PASSWORD_DEFAULT);
                $sql = "INSERT INTO felhasznalok VALUES ('$email', '$nev', '$jelsz', '$telszam')";
                //echo ($sql);
                $conn->query($sql);
                $sql2 = "INSERT INTO rendelkezik VALUES ('$email', '$jogosultsag')";
                $result = $conn->query($sql2);
                echo 'vége';
                //echo ($result);
            }else{
                echo 'elcsesztél valamit';
            }
            break;
        case "ujSzak":
            //új szak hozzáadása
            if(isset($_POST['szak']) && isset($_POST['szakfelelos'])) {
                $szak = $_POST['szak'];
                $szakfelelos = $_POST['szakfelelos'];
                $sql = "INSERT INTO szak VALUES ('$szak', 0)";
                //echo ($sql);
                $conn->query($sql);
                $sql2 = "INSERT INTO hozzafer VALUES ('$szak', '$szakfelelos')";
                $result = $conn->query($sql2);
                echo 'vége';
                //echo ($result);
            }else{
                echo 'elcsesztél valamit';
            }
            break;
        case "ujFelev":
            //új szak hozzáadása
            if(isset($_POST['felev'])) {
                $felev = $_POST['felev'];
                $sql = "INSERT INTO mostani (tanev) VALUES ('$felev')";
                //echo ($sql);
                $conn->query($sql);
                echo 'vége';
                //echo ($result);
            }else{
                echo 'elcsesztél valamit';
            }
            break;
    }

    

    //bejelentkezés
    
    

    //regisztráció
    /*if(isset($_POST['nev']) && isset($_POST['jelsz'])) {
        $nev = $_POST['nev'];
        $jelsz = $_POST['jelsz'];
        $jelsz = password_hash($jelsz, PASSWORD_DEFAULT);
        $sql = "INSERT INTO felhasznalok (felhnev, jelszo) VALUES ('$nev', '$jelsz')";
        //echo ($jelsz);
        $conn->query($sql);
        $sql2 = "SELECT * FROM felhasznalok WHERE felhnev='$nev'";
        $result = $conn->query($sql2);
        while ($row = $result->fetch_assoc()) {
            echo $row['felhnev']."<br />";
        }
        //echo ($result);
    }else{
        echo 'elcsesztél valamit';
    }*/
    
    
    /*if($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            echo json_encode('');
        }
    }else {
        echo 'Nincs adat';
    }*/


    /*$arr = $result -> fetch_all();
    echo json_encode($arr);*/

    /*
    if($result){
        if($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                echo json_encode('<tr><td>'.$row['nev'].'</td><td>'.$row['szin'].'</td><td>'.$row['mennyi'].'</td></tr>');
            }
        } else {
            echo '
                <div>
                    <p>Nincs csoport</p>
                </div>
            ';
        }
        }else {
            echo "<br> Adatbázis hiba.";
        }*/
    /*
    $user = $_POST['name'];
    echo ("Hello from server: $user");
    */
?>