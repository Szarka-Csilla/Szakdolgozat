<?php
    header('Access-Control-Allow-Origin: http://localhost:3000');
    header('Content-Type: application/json');
    require_once("db_connect.php");

    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\SMTP;
    use PHPMailer\PHPMailer\Exception;

    require "vendor/autoload.php";

    $mail = new PHPMailer(true);
    

    //ha nincs textbox
    if(isset($_POST['mod'])) {
        $mod = $_POST['mod'];
        unset($_POST['mod']);
    }else{ //ha van textbox
        $json = file_get_contents('php://input');
        $adatok = array();
        $adatok = json_decode($json, true);
        $mod = $adatok['mod'];
    }
    
    function utf8ize($d) {
        if (is_array($d)) {
            foreach ($d as $k => $v) {
                $d[$k] = utf8ize($v);
            }
        } else if (is_string ($d)) {
            return utf8_encode($d);
        }
        return $d;
    }

    switch ($mod) {
        case "belepes":
            //belépés
            unset($mod);
            $json = file_get_contents('php://input');
            $belepes = array();
            $belepes = json_decode($json, true);
            $email = $belepes['email'];
            $jelsz = $belepes['jelsz'];
            $bejel = $conn->query("SELECT * FROM felhasznalok WHERE emailCim='$email'");
            if($bejel->num_rows > 0) {
                while($row = $bejel->fetch_assoc()) {
                    $hash = $row['jelszo'];
                }
                if(password_verify($jelsz, $hash)) {
                    //$sql = "SELECT felhasznalok.emailCim, felhasznalok.nev, jogosultsag.jogosultsag
                    $sql = "SELECT jogosultsag.jogosultsag, felhasznalok.nev
                    FROM felhasznalok
                    JOIN rendelkezik ON rendelkezik.emailCim=felhasznalok.emailCim
                    JOIN jogosultsag ON jogosultsag.jogosultsag=rendelkezik.jogosultsag
                    WHERE felhasznalok.emailCim='$email'";
                    $result = $conn->query($sql);
                    $rows = array();
                    if($result->num_rows > 0) {
                        $jogosultsag = "";
                        while ($row = $result->fetch_assoc()) {
                            $rows[] = $row;
                            //$jogosultsag = $row['jogosultsag'];
                            //echo $jogosultsag;
                        }
                        echo json_encode($rows);
                        //echo json_encode(utf8ize($rows));
                    }else{
                        $tomb = array('hiba' => 'Ehhez a fiókhoz nem tartozik jogosultság!',
                                      'uzenet' => '');
                        $vissza = array();
                        $vissza[] = $tomb;
                        //$hiba["hiba"] = "Ehhez a fiókhoz nem tartozik jogosultság!";
                        //$uzenet["uzenet"] = "";
                        //$vissza[] = $hiba;
                        //$vissza[] = $uzenet;
                        echo json_encode($vissza);
                    }
                }else{
                    $tomb = array('hiba' => 'Hibás email-cím vagy jelszó!',
                                    'uzenet' => '');
                    $vissza = array();
                    $vissza[] = $tomb;
                    //$hiba["hiba"] = "Hibás email-cím vagy jelszó!";
                    //$uzenet["uzenet"] = "";
                    //$vissza[] = $hiba;
                    //$vissza[] = $uzenet;
                    echo json_encode($vissza);
                }
            }else{
                $tomb = array('hiba' => 'Nincs ehhez az email-címhez tartozó felhasználó!',
                                'uzenet' => '');
                $vissza = array();
                $vissza[] = $tomb;
                //$hiba["hiba"] = "Nincs ehhez az email-címhez tartozó felhasználó!";
                //$uzenet["uzenet"] = "";
                //$vissza[] = $hiba;
                //$vissza[] = $uzenet;
                echo json_encode($vissza);
            }
            
            break;

        case "elfelejtettJelszo":
            //ezt nézd meg
            unset($mod);
            $json = file_get_contents('php://input');
            $elfelejtettJelszo = array();
            $elfelejtettJelszo = json_decode($json, true);
            $emailCim = $elfelejtettJelszo['emailCim'];
            $sql = $conn->query("SELECT emailCim FROM felhasznalok WHERE emailCim='jani@pelda.com'");
            if($sql->num_rows > 0)
            {
                try {
                    //Server settings
                    $mail->SMTPDebug = SMTP::DEBUG_SERVER;
                    $mail->isSMTP();
                    $mail->Host       = "127.0.0.1";
                    $mail->SMTPAuth   = true;
                    $mail->Username   = 'user@example.com';
                    $mail->Password   = 'secret';
                    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
                    $mail->Port       = 465;

                    //Recipients
                    $mail->setFrom('from@example.com', 'Mailer');
                    $mail->addAddress('lioden99@gmail.com');

                    //Content
                    $mail->isHTML(true);
                    $mail->Subject = 'Here is the subject';
                    $mail->Body    = 'This is the HTML message body <b>in bold!</b>';
                    $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

                    $mail->send();
                    echo "Új jelszó elküldve!";
                } catch (Exception $e) {
                    echo "Hiba az üzenet elküldésekor: {$mail->ErrorInfo}";
                }
            }else{
                echo "Nincs ilyen felhasználó!";
            }
            break;

        case "jelszoValt":
            //jelszóváltoztatás
            unset($mod);
            $json = file_get_contents('php://input');
            $jelszoValt = array();
            $jelszoValt = json_decode($json, true);
            $emailCim = $jelszoValt['emailCim'];
            $regiJelsz = $jelszoValt['regiJelsz'];
            $ujJelsz = $jelszoValt['ujJelsz'];
            $sql = $conn->query("SELECT * FROM felhasznalok WHERE emailCim='$emailCim'");
            if($sql->num_rows > 0) {
                while($row = $sql->fetch_assoc()) {
                    $hash = $row['jelszo'];
                }
                if(password_verify($regiJelsz, $hash)) {
                    $ujJelszHash = password_hash($ujJelsz, PASSWORD_DEFAULT);
                    $sql2 = $conn->query("UPDATE felhasznalok SET jelszo='$ujJelszHash' WHERE emailCim='$emailCim'");
                }else{
                    $tomb = array('hiba' => 'Helytelen jelszó!',
                                  'uzenet' => '');
                    $vissza = array();
                    $vissza[] = $tomb;
                    echo json_encode($vissza);
                }
            }else{
                $tomb = array('hiba' => 'Nincs ilyen felhasználó!',
                              'uzenet' => '');
                $vissza = array();
                $vissza[] = $tomb;
                echo json_encode($vissza);
            }
            break;

        case "tablazatLekeres":
            //teljes táblázat lekérése, archív tárgyakat is beleértve
            unset($mod);
            $json = file_get_contents('php://input');
            $tablazatLekeres = array();
            $tablazatLekeres = json_decode($json, true);
            $emailCim = $tablazatLekeres['emailCim'];
            $jogosultsag = $tablazatLekeres['jogosultsag'];
            if($jogosultsag == "Admin" || $jogosultsag == "Tanulmányi iroda" || $jogosultsag == "Tanszékvezető") {
                //mindent látnak
                $sql = $conn->query("SELECT mostani.mostani_ID, tanterv.szervEgys, szak.szaknev, szak.indul, mostani.tanev, tanterv.evszak,
                                        tanterv.targynev, tanterv.targykod, tanterv.evfolyam, mostani.online, mostani.onlineLev,
                                        tanterv.tipus, tanterv.kredit, tanterv.oraszamNap, tanterv.oraszamLev,
                                        tanterv.kovetelmeny, mostani.oktatoNap, mostani.oktatoLev,
                                        mostani.TImegjegyzes, mostani.oktatoMegjegyzes, mostani.oktatoMegjegyzesLev, mostani.utolsoBelepes, mostani.veglegesites
                                        FROM tanterv
                                        JOIN mostani ON mostani.tanterv_ID=tanterv.tanterv_ID
                                        JOIN tartozik ON tanterv.tanterv_ID=tartozik.tanterv_ID
                                        JOIN szak ON tartozik.szaknev=szak.szaknev");
                if($sql->num_rows > 0) {
                    $rows = array();
                    while($row = mysqli_fetch_array($sql)) {
                        $rows[] = $row;
                    }
                    echo json_encode($rows);
                    //echo json_encode(utf8ize($rows));
                }else{
                    $tomb = array('hiba' => 'Nincs betölthető adat!',
                                  'uzenet' => '');
                    $vissza = array();
                    $vissza[] = $tomb;
                    echo json_encode($vissza);
                }
            }else if($jogosultsag == "Szakfelelős") {
                //csak azokhoz a szakokhoz tartozó tárgyakat lássa, amiket ő kezel
                $sql = $conn->query("SELECT mostani.mostani_ID, tanterv.szervEgys, szak.szaknev, szak.indul, mostani.tanev, tanterv.evszak,
                                        tanterv.targynev, tanterv.targykod, tanterv.evfolyam, mostani.online, mostani.onlineLev,
                                        tanterv.tipus, tanterv.kredit, tanterv.oraszamNap, tanterv.oraszamLev,
                                        tanterv.kovetelmeny, mostani.oktatoNap, mostani.oktatoLev,
                                        mostani.TImegjegyzes, mostani.oktatoMegjegyzes, mostani.oktatoMegjegyzesLev, mostani.utolsoBelepes, mostani.veglegesites
                                        FROM tanterv
                                        JOIN mostani ON mostani.tanterv_ID=tanterv.tanterv_ID
                                        JOIN tartozik ON tanterv.tanterv_ID=tartozik.tanterv_ID
                                        JOIN szak ON tartozik.szaknev=szak.szaknev
                                        JOIN hozzafer ON hozzafer.szaknev=szak.szaknev
                                        JOIN felhasznalok ON felhasznalok.emailCim=hozzafer.emailCim
                                        WHERE felhasznalok.emailCim='$emailCim'");
                if($sql->num_rows > 0) {
                    $rows = array();
                    while($row = mysqli_fetch_array($sql)) {
                        $rows[] = $row;
                    }
                    echo json_encode($rows);
                    //echo json_encode(utf8ize($rows));
                }else{
                    $tomb = array('hiba' => 'Nincs betölthető adat!',
                                  'uzenet' => '');
                    $vissza = array();
                    $vissza[] = $tomb;
                    echo json_encode($vissza);
                }
            }else if($jogosultsag == "Oktató") {
                //csak azokat a tárgyakat lássa, amihez hozzárendelték
                $sql = $conn->query("SELECT DISTINCT mostani.mostani_ID, tanterv.szervEgys, szak.szaknev, szak.indul, mostani.tanev, tanterv.evszak,
                                        tanterv.targynev, tanterv.targykod, tanterv.evfolyam, mostani.online, mostani.onlineLev,
                                        tanterv.tipus, tanterv.kredit, tanterv.oraszamNap, tanterv.oraszamLev,
                                        tanterv.kovetelmeny, mostani.oktatoNap, mostani.oktatoLev,
                                        mostani.TImegjegyzes, mostani.oktatoMegjegyzes, mostani.oktatoMegjegyzesLev, mostani.utolsoBelepes, mostani.veglegesites
                                        FROM tanterv
                                        JOIN mostani ON mostani.tanterv_ID=tanterv.tanterv_ID
                                        JOIN tartozik ON tanterv.tanterv_ID=tartozik.tanterv_ID
                                        JOIN szak ON tartozik.szaknev=szak.szaknev
                                        JOIN oktatja ON oktatja.mostani_ID=mostani.mostani_ID
                                        JOIN felhasznalok ON felhasznalok.emailCim=oktatja.emailCim
                                        WHERE felhasznalok.emailCim='$emailCim'");
                if($sql->num_rows > 0) {
                    $rows = array();
                    while($row = mysqli_fetch_array($sql)) {
                        $rows[] = $row;
                    }
                    echo json_encode($rows);
                    //echo json_encode(utf8ize($rows));
                }else{
                    $tomb = array('hiba' => 'Nincs betölthető adat!',
                                  'uzenet' => '');
                    $vissza = array();
                    $vissza[] = $tomb;
                    echo json_encode($vissza);
                }
            }
            break;

        case "tablazatLekeresTanterv":
                //TO a tantervet szeretné nézni
                unset($mod);
                $sql = $conn->query("SELECT tanterv.tanterv_ID, tanterv.szervEgys, szak.szaknev, szak.indul, tanterv.evszak,
                                            tanterv.targynev, tanterv.targykod, tanterv.evfolyam,
                                            tanterv.tipus, tanterv.kredit, tanterv.oraszamNap, tanterv.oraszamLev,
                                            tanterv.kovetelmeny, tanterv.evfolyam, tanterv.felev
                                            FROM tanterv
                                            JOIN tartozik ON tanterv.tanterv_ID=tartozik.tanterv_ID
                                            JOIN szak ON tartozik.szaknev=szak.szaknev");
                if($sql->num_rows > 0) {
                    $rows = array();
                    while($row = mysqli_fetch_array($sql)) {
                        $rows[] = $row;
                    }
                    echo json_encode($rows);
                    //echo json_encode(utf8ize($rows));
                }else{
                    $tomb = array('hiba' => 'Nincs betölthető adat!',
                                  'uzenet' => '');
                    $vissza = array();
                    $vissza[] = $tomb;
                    echo json_encode($vissza);
                }
                break;

        case "tablazatLekeresAktualis":
            //a most aktuális tárgyak betöltése
            unset($mod);
            $json = file_get_contents('php://input');
            $tablazatLekeres = array();
            $tablazatLekeres = json_decode($json, true);
            $emailCim = $tablazatLekeres['emailCim'];
            $jogosultsag = $tablazatLekeres['jogosultsag'];
            //a legújabb félév lekérése
            $sql = $conn->query("SELECT tanev FROM tanev ORDER BY tanev DESC LIMIT 1");
            if($sql->num_rows > 0) {
                $felev = "";
                while ($row = $sql->fetch_assoc()) {
                    $felev = $row['tanev'];
                }
            }
            if($jogosultsag == "Admin" || $jogosultsag == "Tanulmányi iroda" || $jogosultsag == "Tanszékvezető") {
                //mindent látnak
                $sql = $conn->query("SELECT mostani.mostani_ID, tanterv.szervEgys, szak.szaknev, szak.indul, mostani.tanev, tanterv.evszak,
                                        tanterv.targynev, tanterv.targykod, tanterv.evfolyam, mostani.online, mostani.onlineLev,
                                        tanterv.tipus, tanterv.kredit, tanterv.oraszamNap, tanterv.oraszamLev,
                                        tanterv.kovetelmeny, mostani.oktatoNap, mostani.oktatoLev,
                                        mostani.TImegjegyzes, mostani.oktatoMegjegyzes, mostani.oktatoMegjegyzesLev, mostani.utolsoBelepes, mostani.veglegesites
                                        FROM tanterv
                                        JOIN mostani ON mostani.tanterv_ID=tanterv.tanterv_ID
                                        JOIN tartozik ON tanterv.tanterv_ID=tartozik.tanterv_ID
                                        JOIN szak ON tartozik.szaknev=szak.szaknev
                                        WHERE mostani.tanev='$felev'");
                if($sql->num_rows > 0) {
                    $rows = array();
                    while($row = mysqli_fetch_array($sql)) {
                        $rows[] = $row;
                    }
                    echo json_encode($rows);
                    //echo json_encode(utf8ize($rows));
                }else{
                    $tomb = array('hiba' => 'Nincs betölthető adat!',
                                  'uzenet' => '');
                    $vissza = array();
                    $vissza[] = $tomb;
                    echo json_encode($vissza);
                }
            }else if($jogosultsag == "Szakfelelős") {
                //csak azokhoz a szakokhoz tartozó tárgyakat lássa, amiket ő kezel
                $sql = $conn->query("SELECT mostani.mostani_ID, tanterv.szervEgys, szak.szaknev, szak.indul, mostani.tanev, tanterv.evszak,
                                        tanterv.targynev, tanterv.targykod, tanterv.evfolyam, mostani.online, mostani.onlineLev,
                                        tanterv.tipus, tanterv.kredit, tanterv.oraszamNap, tanterv.oraszamLev,
                                        tanterv.kovetelmeny, mostani.oktatoNap, mostani.oktatoLev,
                                        mostani.TImegjegyzes, mostani.oktatoMegjegyzes, mostani.oktatoMegjegyzesLev, mostani.utolsoBelepes, mostani.veglegesites
                                        FROM tanterv
                                        JOIN mostani ON mostani.tanterv_ID=tanterv.tanterv_ID
                                        JOIN tartozik ON tanterv.tanterv_ID=tartozik.tanterv_ID
                                        JOIN szak ON tartozik.szaknev=szak.szaknev
                                        JOIN hozzafer ON hozzafer.szaknev=szak.szaknev
                                        JOIN felhasznalok ON felhasznalok.emailCim=hozzafer.emailCim
                                        WHERE felhasznalok.emailCim='$emailCim' AND mostani.tanev='$felev'");
                if($sql->num_rows > 0) {
                    $rows = array();
                    while($row = mysqli_fetch_array($sql)) {
                        $rows[] = $row;
                    }
                    echo json_encode($rows);
                    //echo json_encode(utf8ize($rows));
                }else{
                    $tomb = array('hiba' => 'Nincs betölthető adat!',
                                  'uzenet' => '');
                    $vissza = array();
                    $vissza[] = $tomb;
                    echo json_encode($vissza);
                }
            }else if($jogosultsag == "Oktató") {
                //csak azokat a tárgyakat lássa, amihez hozzárendelték
                $sql = $conn->query("SELECT DISTINCT mostani.mostani_ID, tanterv.szervEgys, szak.szaknev, szak.indul, mostani.tanev, tanterv.evszak,
                                        tanterv.targynev, tanterv.targykod, tanterv.evfolyam, mostani.online, mostani.onlineLev,
                                        tanterv.tipus, tanterv.kredit, tanterv.oraszamNap, tanterv.oraszamLev,
                                        tanterv.kovetelmeny, mostani.oktatoNap, mostani.oktatoLev,
                                        mostani.TImegjegyzes, mostani.oktatoMegjegyzes, mostani.oktatoMegjegyzesLev, mostani.utolsoBelepes, mostani.veglegesites
                                        FROM tanterv
                                        JOIN mostani ON mostani.tanterv_ID=tanterv.tanterv_ID
                                        JOIN tartozik ON tanterv.tanterv_ID=tartozik.tanterv_ID
                                        JOIN szak ON tartozik.szaknev=szak.szaknev
                                        JOIN oktatja ON oktatja.mostani_ID=mostani.mostani_ID
                                        JOIN felhasznalok ON felhasznalok.emailCim=oktatja.emailCim
                                        WHERE felhasznalok.emailCim='$emailCim' AND mostani.tanev='$felev'");
                if($sql->num_rows > 0) {
                    $rows = array();
                    while($row = mysqli_fetch_array($sql)) {
                        $rows[] = $row;
                    }
                    echo json_encode($rows);
                    //echo json_encode(utf8ize($rows));
                }else{
                    $tomb = array('hiba' => 'Nincs betölthető adat!',
                                  'uzenet' => '');
                    $vissza = array();
                    $vissza[] = $tomb;
                    echo json_encode($vissza);
                }
            }
            break;

        case "adminVeglegesitesVissza":
            unset($mod);
            $json = file_get_contents('php://input');
            $adminVeglegesitesVissza = array();
            $adminVeglegesitesVissza = json_decode($json, true);
            $targykod = $adminVeglegesitesVissza['targykod'];
            $veglegesites = $adminVeglegesitesVissza['veglegesites'];
            $veglegesites = $veglegesites - 1;
            $sql = $conn->query("UPDATE mostani SET veglegesites='$veglegesites' WHERE mostani_ID='$targykod'");
            $sql = $conn->query("UPDATE mostani SET utolsoBelepes=1 WHERE mostani_ID='$targykod'");
            $sql = $conn->query("SELECT mostani.mostani_ID, tanterv.szervEgys, szak.szaknev, szak.indul, mostani.tanev, tanterv.evszak,
                                        tanterv.targynev, tanterv.targykod, tanterv.evfolyam, mostani.online, mostani.onlineLev,
                                        tanterv.tipus, tanterv.kredit, tanterv.oraszamNap, tanterv.oraszamLev,
                                        tanterv.kovetelmeny, mostani.oktatoNap, mostani.oktatoLev,
                                        mostani.TImegjegyzes, mostani.oktatoMegjegyzes, mostani.oktatoMegjegyzesLev, mostani.utolsoBelepes, mostani.veglegesites
                                        FROM tanterv
                                        JOIN mostani ON mostani.tanterv_ID=tanterv.tanterv_ID
                                        JOIN tartozik ON tanterv.tanterv_ID=tartozik.tanterv_ID
                                        JOIN szak ON tartozik.szaknev=szak.szaknev");
            if($sql->num_rows > 0) {
                $rows = array();
                while($row = mysqli_fetch_array($sql)) {
                    $rows[] = $row;
                }
                echo json_encode($rows);
                //echo json_encode(utf8ize($rows));
            }else{
                $tomb = array('hiba' => 'Nincs betölthető adat!',
                              'uzenet' => '');
                $vissza = array();
                $vissza[] = $tomb;
                echo json_encode($vissza);
            }
            break;

        case "ujOktato":
            //regisztráció
            //if(isset($_POST['email']) && isset($_POST['nev']) && isset($_POST['jelsz']) && isset($_POST['telszam']) && isset($_POST['jogosultsag'])) {
            unset($mod);
            $json = file_get_contents('php://input');
            $ujOktato = array();
            $ujOktato = json_decode($json, true);
            $email = $ujOktato['email'];
            /*
            $exp = "/[A-z]([A-z]*[0-9]*)*@([A-z]*[0-9]*)*.[a-z]{2,3}/";
            if($exp, $email) {
                $jelsz = $ujOktato['jelsz'];
                $nev = $ujOktato['nev'];
                $telszam = $ujOktato['telszam'];
                $jogosultsag = $ujOktato['jogosultsag'];
                $jelsz = password_hash($jelsz, PASSWORD_DEFAULT);
                $sql = "INSERT INTO felhasznalok VALUES ('$email', '$nev', '$jelsz', '$telszam')";
                $conn->query($sql);
                $sql2 = "INSERT INTO rendelkezik VALUES ('$email', '$jogosultsag')";
                $result = $conn->query($sql2);
                echo 'vége';
                
            }else{
                $vissza = [ 'error' => 'Érvénytelen email cím' ];
                echo json_encode($vissza);
            }
            */
            $vane = $conn->query("SELECT emailCim FROM felhasznalok WHERE emailCim = '$email'");
            //ha nincs még ilyen felhasználónk, akkor felvesszük az összes adatát
            if($vane->num_rows == 0) {
                $jelsz = $ujOktato['jelsz'];
                $nev = $ujOktato['nev'];
                $telszam = $ujOktato['telszam'];
                $jogosultsag = $ujOktato['jogosultsag'];
                $jelsz = password_hash($jelsz, PASSWORD_DEFAULT);
                $sql = $conn->query("INSERT INTO felhasznalok VALUES ('$email', '$nev', '$jelsz', '$telszam')");
                $sql2 = $conn->query("INSERT INTO rendelkezik VALUES ('$email', '$jogosultsag')");
                if(($sql == true) && ($sql2 == true)) {
                    $tomb = array('hiba' => '',
                                  'uzenet' => 'Új oktató sikeresen felvéve!');
                    $vissza = array();
                    $vissza[] = $tomb;
                    echo json_encode($vissza);
                }else{
                    $tomb = array('hiba' => 'Oktatófelvétel sikertelen!',
                                  'uzenet' => '');
                    $vissza = array();
                    $vissza[] = $tomb;
                    echo json_encode($vissza);
                }
            //viszont ha már van, akkor csak hozzáadjuk az új jogosultságát
            }else{
                $jogosultsag = $ujOktato['jogosultsag'];
                $sql2 = $conn->query("INSERT INTO rendelkezik VALUES ('$email', '$jogosultsag')");
                if($sql == true) {
                    $tomb = array('hiba' => '',
                                  'uzenet' => 'Új oktató sikeresen felvéve!');
                    $vissza = array();
                    $vissza[] = $tomb;
                    echo json_encode($vissza);
                }else{
                    $tomb = array('hiba' => 'Oktatófelvétel sikertelen!',
                                  'uzenet' => '');
                    $vissza = array();
                    $vissza[] = $tomb;
                    echo json_encode($vissza);
                }
            }
            
            /*}else{
                echo 'elcsesztél valamit';
            }*/
            break;

        case "ujSzak":
            //új szak hozzáadása
            //if(isset($_POST['szak']) && isset($_POST['emailCim'])) {
            unset($mod);
            $json = file_get_contents('php://input');
            $ujSzak = array();
            $ujSzak = json_decode($json, true);
            $szak = $ujSzak['szak'];
            $emailCim = $ujSzak['emailCim'];
            $sql = $conn->query("INSERT INTO szak VALUES ('$szak', 0)");
            $sql2 = $conn->query("INSERT INTO hozzafer VALUES ('$szak', '$emailCim')");
            if(($sql == true) && ($sql2 == true)) {
                $tomb = array('hiba' => '',
                              'uzenet' => 'Szak sikeresen hozzáadva az adatbázishoz!');
                $vissza = array();
                $vissza[] = $tomb;
                echo json_encode($vissza);
            }else{
                $tomb = array('hiba' => 'Szakhozzáadás sikertelen!',
                              'uzenet' => '');
                $vissza = array();
                $vissza[] = $tomb;
                echo json_encode($vissza);
            }
            break;

        case "ujFelev":
            //új szak hozzáadása és az előző félévhez tartozó tárgyak archiválása
            //if(isset($_POST['felev'])) {
            unset($mod);
            $json = file_get_contents('php://input');
            $ujFelev = array();
            $ujFelev = json_decode($json, true);
            $felev = $ujFelev['felev'];
            $sql = "INSERT INTO tanev (tanev) VALUES ('$felev')";
            //echo ($sql);
            $conn->query($sql);
            $sql2 = $conn->query("UPDATE szak SET indul=0");
            $sql3 = $conn->query("UPDATE mostani SET veglegesites=5 WHERE mostani.tanev <> '$felev' AND veglegesites <> 5");
            $sql4 = $conn->query("UPDATE mostani SET utolsoBelepes=0 WHERE mostani.tanev <> '$felev' AND veglegesites <> 5");
            if(($sql2 == true) && ($sql3 == true) && ($sql4 == true)) {
                $tomb = array('hiba' => '',
                              'uzenet' => 'Új félév sikeresen felvéve!');
                $vissza = array();
                $vissza[] = $tomb;
                echo json_encode($vissza);
            }else{
                $tomb = array('hiba' => 'Félévefelvétel sikertelen!',
                              'uzenet' => '');
                $vissza = array();
                $vissza[] = $tomb;
                echo json_encode($vissza);
            }
            break;

        case "napOktHozzarendel":
            //nappalis oktató tárgyhoz rendelése
            unset($mod);
            //if(isset($_POST['emailCim']) && isset($_POST['targykod'])) {
            $json = file_get_contents('php://input');
            $napOktHozzarendel = array();
            $napOktHozzarendel = json_decode($json, true);
            $emailCim = $napOktHozzarendel['emailCim'];
            $targykod = $napOktHozzarendel['targykod'];

            $sql = "SELECT felhasznalok.nev FROM felhasznalok WHERE felhasznalok.emailCim='$emailCim'";
            $result = $conn->query($sql);
            if($result->num_rows > 0) {
                $nev = "";
                while ($row = $result->fetch_assoc()) {
                    $nev = $row['nev'];
                }
            }

            $sql2 = $conn->query("INSERT INTO oktatja VALUES ('$emailCim', '$targykod', 'nap')");
            $sql3 = $conn->query("UPDATE mostani SET oktatoNap = (SELECT felhasznalok.nev FROM felhasznalok WHERE felhasznalok.emailCim='$emailCim') WHERE mostani_ID = '$targykod'");
            if(($sql2 == true) && ($sql3 == true)) {
                $tomb = array('hiba' => '',
                              'uzenet' => 'Oktató sikeresen hozzárendelve a tárgyhoz!');
                $vissza = array();
                $vissza[] = $tomb;
                echo json_encode($vissza);
            }else{
                $tomb = array('hiba' => 'Oktatóhozzárendelés sikertelen!',
                              'uzenet' => '');
                $vissza = array();
                $vissza[] = $tomb;
                echo json_encode($vissza);
            }
            break;

        case "levOktHozzarendel":
            //levelezős oktató tárgyhoz rendelése
            unset($mod);
            //if(isset($_POST['emailCim']) && isset($_POST['targykod'])) {
            $json = file_get_contents('php://input');
            $levOktHozzarendel = array();
            $levOktHozzarendel = json_decode($json, true);
            $emailCim = $levOktHozzarendel['emailCim'];
            $targykod = $levOktHozzarendel['targykod'];

            $sql = "SELECT felhasznalok.nev FROM felhasznalok WHERE felhasznalok.emailCim='$emailCim'";
            $result = $conn->query($sql);
            if($result->num_rows > 0) {
                $nev = "";
                while ($row = $result->fetch_assoc()) {
                    $nev = $row['nev'];
                }
            }

            $sql2 = $conn->query("INSERT INTO oktatja VALUES ('$emailCim', '$targykod', 'lev')");
            $sql3 = $conn->query("UPDATE mostani SET oktatoLev = (SELECT felhasznalok.nev FROM felhasznalok WHERE felhasznalok.emailCim='$emailCim')WHERE mostani_ID = '$targykod'");
            if(($sql2 == true) && ($sql3 == true)) {
                $tomb = array('hiba' => '',
                              'uzenet' => 'Oktató sikeresen hozzárendelve a tárgyhoz!');
                $vissza = array();
                $vissza[] = $tomb;
                echo json_encode($vissza);
            }else{
                $tomb = array('hiba' => 'Oktatóhozzárendelés sikertelen!',
                              'uzenet' => '');
                $vissza = array();
                $vissza[] = $tomb;
                echo json_encode($vissza);
            }
            break;

        case "tanszekvezetoVeglegesites":
            unset($mod);
            $json = file_get_contents('php://input');
            $tanszekvezetoVeglegesites = array();
            $tanszekvezetoVeglegesites = json_decode($json, true);
            $targykod = $tanszekvezetoVeglegesites['targykod'];
            $felev = $tanszekvezetoVeglegesites['felev'];
            $sql = $conn->query("UPDATE mostani SET veglegesites=3 WHERE mostani_ID='$targykod' AND tanev='$felev'");
            $sql2 = $conn->query("UPDATE mostani SET utolsoBelepes=0 WHERE mostani_ID='$targykod' AND tanev='$felev'");
            $sql = $conn->query("SELECT mostani.mostani_ID, tanterv.szervEgys, szak.szaknev, szak.indul, mostani.tanev, tanterv.evszak,
                                        tanterv.targynev, tanterv.targykod, tanterv.evfolyam, mostani.online, mostani.onlineLev,
                                        tanterv.tipus, tanterv.kredit, tanterv.oraszamNap, tanterv.oraszamLev,
                                        tanterv.kovetelmeny, mostani.oktatoNap, mostani.oktatoLev,
                                        mostani.TImegjegyzes, mostani.oktatoMegjegyzes, mostani.utolsoBelepes, mostani.veglegesites
                                        FROM tanterv
                                        JOIN mostani ON mostani.tanterv_ID=tanterv.tanterv_ID
                                        JOIN tartozik ON tanterv.tanterv_ID=tartozik.tanterv_ID
                                        JOIN szak ON tartozik.szaknev=szak.szaknev");
            if($sql->num_rows > 0) {
                $rows = array();
                while($row = mysqli_fetch_array($sql)) {
                    $rows[] = $row;
                }
                echo json_encode($rows);
                //echo json_encode(utf8ize($rows));
            }else{
                $tomb = array('hiba' => 'Nincs betölthető adat!',
                              'uzenet' => '');
                $vissza = array();
                $vissza[] = $tomb;
                echo json_encode($vissza);
            }
            //aztán kikeressük az oktató email címét, és küldünk rá egy emailt
            break;

        case "TOmegjMentes":
            //TO megjegyzés elmentése
            //if(isset($_POST['tiMegj']) && isset($_POST['targykod'])) {
            unset($mod);
            $json = file_get_contents('php://input');
            $toMegjMentes = array();
            $toMegjMentes = json_decode($json, true);
            $tiMegj = $toMegjMentes['tiMegj'];
            $targykod = $toMegjMentes['targykod'];
            $felev = $toMegjMentes['felev'];
            $sql = $conn->query("UPDATE mostani SET TImegjegyzes = '$tiMegj' WHERE mostani_ID = '$targykod' AND tanev = '$felev'");
            $sql2 = $conn->query("UPDATE mostani SET veglegesites=0 WHERE mostani_ID='$targykod' AND tanev='$felev'");
            $sql3 = $conn->query("UPDATE mostani SET utolsoBelepes=1 WHERE mostani_ID='$targykod' AND tanev='$felev'");
            if($sql == true) {
                $tomb = array('hiba' => '',
                              'uzenet' => 'Megjegyzés sikeresen hozzáadva!');
                $vissza = array();
                $vissza[] = $tomb;
                echo json_encode($vissza);
            }else{
                $tomb = array('hiba' => 'Sikertelen hozzáadás!',
                              'uzenet' => '');
                $vissza = array();
                $vissza[] = $tomb;
                echo json_encode($vissza);
            }
            break;

        case "masikSzak":
            unset($mod);
            $json = file_get_contents('php://input');
            $masikSzak = array();
            $masikSzak = json_decode($json, true);
            $targykod = $masikSzak['targykod'];
            $szak = $masikSzak['szak'];
            $sql = $conn->query("INSERT INTO tartozik VALUES ('$szak', '$targykod')");
            if($sql == true) {
                $tomb = array('hiba' => '',
                              'uzenet' => 'Tárgy másik szakkal sikeresen hozzáadva a tantervhez!');
                $vissza = array();
                $vissza[] = $tomb;
                echo json_encode($vissza);
            }else{
                $tomb = array('hiba' => 'Tárgyhozzáadás másik szakkal sikertelen!',
                              'uzenet' => '');
                $vissza = array();
                $vissza[] = $tomb;
                echo json_encode($vissza);
            }
            break;

        case "ujTargy":
            unset($mod);
            $json = file_get_contents('php://input');
            $ujTargy = array();
            $ujTargy = json_decode($json, true);
            $targykod = $ujTargy['targykod'];
            $szervEgys = $ujTargy['szervEgys'];
            $evszak = $ujTargy['evszak'];
            $targynev = $ujTargy['targynev'];
            $tipus = $ujTargy['tipus'];
            $kredit = $ujTargy['kredit'];
            $napOra = $ujTargy['oraszamNap'];
            $levOra = $ujTargy['oraszamLev'];
            $kovetelmeny = $ujTargy['kovetelmeny'];
            $evfolyam = $ujTargy['evfolyam'];
            $felev = $ujTargy['felev'];
            $szak = $ujTargy['szak'];
            $sql = $conn->query("INSERT INTO tanterv VALUES ('$targykod', '$szervEgys', '$evszak', '$targynev', '$tipus', '$kredit', '$napOra', '$levOra', '$kovetelmeny', '$evfolyam', '$felev')");
            $sql2 = $conn->query("INSERT INTO tartozik VALUES ('$szak', '$targykod')");
            if(($sql == true) && ($sql2 == true)) {
                $tomb = array('hiba' => '',
                              'uzenet' => 'Tárgy sikeresen hozzáadva a tantervhez!');
                $vissza = array();
                $vissza[] = $tomb;
                echo json_encode($vissza);
            }else{
                $tomb = array('hiba' => 'Tárgyhozzáadás sikertelen!',
                              'uzenet' => '');
                $vissza = array();
                $vissza[] = $tomb;
                echo json_encode($vissza);
            }
            break;

        case "TOveglegesites":
            unset($mod);
            $json = file_get_contents('php://input');
            $TOveglegesites = array();
            $TOveglegesites = json_decode($json, true);
            $targykod = $TOveglegesites['targykod'];
            $felev = $TOveglegesites['felev'];
            $sql = $conn->query("UPDATE mostani SET veglegesites=2 WHERE mostani_ID='$targykod' AND tanev='$felev'");
            $sql = $conn->query("UPDATE mostani SET utolsoBelepes=0 WHERE mostani_ID='$targykod' AND tanev='$felev'");
            $sql2 = $conn->query("SELECT * FROM mostani WHERE tanev='$felev' AND veglegesites<>2");
            $sql = $conn->query("SELECT mostani.mostani_ID, tanterv.szervEgys, szak.szaknev, szak.indul, mostani.tanev, tanterv.evszak,
                                        tanterv.targynev, tanterv.targykod, tanterv.evfolyam, mostani.online, mostani.onlineLev,
                                        tanterv.tipus, tanterv.kredit, tanterv.oraszamNap, tanterv.oraszamLev,
                                        tanterv.kovetelmeny, mostani.oktatoNap, mostani.oktatoLev,
                                        mostani.TImegjegyzes, mostani.oktatoMegjegyzes, mostani.utolsoBelepes, mostani.veglegesites
                                        FROM tanterv
                                        JOIN mostani ON mostani.tanterv_ID=tanterv.tanterv_ID
                                        JOIN tartozik ON tanterv.tanterv_ID=tartozik.tanterv_ID
                                        JOIN szak ON tartozik.szaknev=szak.szaknev");
            if($sql->num_rows > 0) {
                $rows = array();
                while($row = mysqli_fetch_array($sql)) {
                    $rows[] = $row;
                }
                echo json_encode($rows);
                //echo json_encode(utf8ize($rows));
            }else{
                $tomb = array('hiba' => 'Nincs betölthető adat!',
                              'uzenet' => '');
                $vissza = array();
                $vissza[] = $tomb;
                echo json_encode($vissza);
            }
            if(empty($sql2)) {
               //akkor jöhet a kövi fázis, kimegy az email a tanszékvezetőnek 
            }
            echo "vége";
            break;

        case "OktMegjMentes":
            //oktatói megjegyzés elmentése
            //if(isset($_POST['oktMegj']) && isset($_POST['targykod'])) {
            unset($mod);
            $json = file_get_contents('php://input');
            $oktMegjMentes = array();
            $oktMegjMentes = json_decode($json, true);
            $oktMegj = $oktMegjMentes['oktMegj'];
            $targykod = $oktMegjMentes['targykod'];
            $felev = $oktMegjMentes['felev'];
            $sql = $conn->query("UPDATE mostani SET oktatoMegjegyzes = '$oktMegj' WHERE mostani_ID = '$targykod' AND tanev = '$felev'");
            if($sql == true) {
                $tomb = array('hiba' => '',
                              'uzenet' => 'Megjegyzés sikeresen hozzáadva!');
                $vissza = array();
                $vissza[] = $tomb;
                echo json_encode($vissza);
            }else{
                $tomb = array('hiba' => 'Sikertelen hozzáadás!',
                              'uzenet' => '');
                $vissza = array();
                $vissza[] = $tomb;
                echo json_encode($vissza);
            }
            break;

        case "OktMegjLevMentes":
            //oktatói megjegyzés elmentése
            //if(isset($_POST['oktMegj']) && isset($_POST['targykod'])) {
            unset($mod);
            $json = file_get_contents('php://input');
            $oktMegjMentes = array();
            $oktMegjMentes = json_decode($json, true);
            $oktMegj = $oktMegjMentes['oktMegj'];
            $targykod = $oktMegjMentes['targykod'];
            $felev = $oktMegjMentes['felev'];
            $sql = $conn->query("UPDATE mostani SET oktatoMegjegyzesLev = '$oktMegj' WHERE mostani_ID = '$targykod' AND tanev = '$felev'");
            if($sql == true) {
                $tomb = array('hiba' => '',
                                'uzenet' => 'Megjegyzés sikeresen hozzáadva!');
                $vissza = array();
                $vissza[] = $tomb;
                echo json_encode($vissza);
            }else{
                $tomb = array('hiba' => 'Sikertelen hozzáadás!',
                                'uzenet' => '');
                $vissza = array();
                $vissza[] = $tomb;
                echo json_encode($vissza);
            }
            break;

        case "oktatoVeglegesites":
            unset($mod);
            $json = file_get_contents('php://input');
            $oktatoVeglegesites = array();
            $oktatoVeglegesites = json_decode($json, true);
            $targykod = $oktatoVeglegesites['targykod'];
            $felev = $oktatoVeglegesites['felev'];
            $emailCim = $oktatoVeglegesites['emailCim'];
            $sql = $conn->query("UPDATE mostani SET veglegesites=4 WHERE mostani_ID='$targykod' AND tanev='$felev'");
            $sql2 = $conn->query("UPDATE mostani SET utolsoBelepes=0 WHERE mostani_ID='$targykod' AND tanev='$felev'");
            $sql = $conn->query("SELECT mostani.mostani_ID, tanterv.szervEgys, szak.szaknev, szak.indul, mostani.tanev, tanterv.evszak,
                                        tanterv.targynev, tanterv.targykod, tanterv.evfolyam, mostani.online, mostani.onlineLev,
                                        tanterv.tipus, tanterv.kredit, tanterv.oraszamNap, tanterv.oraszamLev,
                                        tanterv.kovetelmeny, mostani.oktatoNap, mostani.oktatoLev,
                                        mostani.TImegjegyzes, mostani.oktatoMegjegyzes, mostani.utolsoBelepes, mostani.veglegesites
                                        FROM tanterv
                                        JOIN mostani ON mostani.tanterv_ID=tanterv.tanterv_ID
                                        JOIN tartozik ON tanterv.tanterv_ID=tartozik.tanterv_ID
                                        JOIN szak ON tartozik.szaknev=szak.szaknev
                                        JOIN oktatja ON oktatja.mostani_ID=mostani.mostani_ID
                                        JOIN felhasznalok ON felhasznalok.emailCim=oktatja.emailCim
                                        WHERE felhasznalok.emailCim='$emailCim'");
            if($sql->num_rows > 0) {
                $rows = array();
                while($row = mysqli_fetch_array($sql)) {
                    $rows[] = $row;
                }
                echo json_encode($rows);
                //echo json_encode(utf8ize($rows));
            }else{
                $tomb = array('hiba' => 'Nincs betölthető adat!',
                              'uzenet' => '');
                $vissza = array();
                $vissza[] = $tomb;
                echo json_encode($vissza);
            }
            break;

        case "osszesOktato":
            //összes oktató megjelenítése legördülő listában
            unset($mod);
            $sql = $conn->query("SELECT felhasznalok.emailCim, felhasznalok.nev FROM felhasznalok
                                            JOIN rendelkezik ON felhasznalok.emailCim=rendelkezik.emailCim
                                            JOIN jogosultsag ON jogosultsag.jogosultsag=rendelkezik.jogosultsag
                                            WHERE jogosultsag.jogosultsag='Oktató'");
            if($sql->num_rows > 0) {
                $rows = array();
                while($row = mysqli_fetch_array($sql)) {
                    $rows[] = $row;
                }
                echo json_encode($rows);
                //echo json_encode(utf8ize($rows));
            }else{
                $tomb = array('hiba' => 'Nincs betölthető adat!',
                              'uzenet' => '');
                $vissza = array();
                $vissza[] = $tomb;
                echo json_encode($vissza);
            }
            break;

        case "osszesSzakfelelos":
            //összes szakfelelős megjelenítése legördülő listában
            unset($mod);
            $sql = $conn->query("SELECT felhasznalok.nev, felhasznalok.emailCim FROM felhasznalok
                                            JOIN rendelkezik ON felhasznalok.emailCim=rendelkezik.emailCim
                                            JOIN jogosultsag ON jogosultsag.jogosultsag=rendelkezik.jogosultsag
                                            WHERE jogosultsag.jogosultsag='Szakfelelős'");
            
            if($sql->num_rows > 0) {
                $rows = array();
                while($row = mysqli_fetch_array($sql)) {
                    $rows[] = $row;
                }
                echo json_encode($rows);
                //echo json_encode(utf8ize($rows));
            }else{
                $tomb = array('hiba' => 'Nincs betölthető adat!',
                              'uzenet' => '');
                $vissza = array();
                $vissza[] = $tomb;
                echo json_encode($vissza);
            }
            break;

        case "osszesJogosultsag":
            //összes jogosultsag megjelenítése legördülő listában
            unset($mod);
            $sql = $conn->query("SELECT jogosultsag FROM jogosultsag WHERE jogosultsag <> 'Admin'");
            if($sql->num_rows > 0) {
                $rows = array();
                while($row = mysqli_fetch_array($sql)) {
                    $rows[] = $row;
                }
                echo json_encode($rows);
                //echo json_encode(utf8ize($rows));
            }else{
                $tomb = array('hiba' => 'Nincs betölthető adat!',
                              'uzenet' => '');
                $vissza = array();
                $vissza[] = $tomb;
                echo json_encode($vissza);
            }
            break;

        case "osszesSajatSzak":
            //a felhasználóhoz hozzárendelt szakok kilistázása
            unset($mod);
            //if(isset($_POST['emailCim'])) {
            $json = file_get_contents('php://input');
            $osszesSzak = array();
            $osszesSzak = json_decode($json, true);
            $emailCim = $osszesSzak['emailCim'];
            $sql = $conn->query("SELECT DISTINCT szak.szaknev FROM szak 
                                        JOIN hozzafer ON szak.szaknev=hozzafer.szaknev
                                        JOIN felhasznalok ON felhasznalok.emailCim=hozzafer.emailCim
                                        WHERE felhasznalok.emailCim='$emailCim'");
            if($sql->num_rows > 0) {
                $rows = array();
                while($row = mysqli_fetch_array($sql)) {
                    $rows[] = $row;
                }
                echo json_encode($rows);
                //echo json_encode(utf8ize($rows));
            }else{
                $tomb = array('hiba' => 'Nincs betölthető adat!',
                              'uzenet' => '');
                $vissza = array();
                $vissza[] = $tomb;
                echo json_encode($vissza);
            }
            /*}else{
                echo 'elcsesztél valamit';
            }*/
            break;
    
        case "osszesSzak":
            //összes szak betöltése
            unset($mod);
            $sql = $conn->query("SELECT szaknev FROM szak");
            if($sql->num_rows > 0) {
                $rows = array();
                while($row = mysqli_fetch_array($sql)) {
                    $rows[] = $row;
                }
                echo json_encode($rows);
                //echo json_encode(utf8ize($rows));
            }else{
                $tomb = array('hiba' => 'Nincs betölthető adat!',
                              'uzenet' => '');
                $vissza = array();
                $vissza[] = $tomb;
                echo json_encode($vissza);
            }
            break;

        case "osszesInduloSzak":
            //a felhasználóhoz hozzárendelt induló szakok kilistázása
            unset($mod);
            //if(isset($_POST['emailCim'])) {
            $json = file_get_contents('php://input');
            $osszesInduloSzak = array();
            $osszesInduloSzak = json_decode($json, true);
            $emailCim = $osszesInduloSzak['emailCim'];
            $sql = $conn->query("SELECT DISTINCT szak.szaknev FROM szak 
                                        JOIN hozzafer ON szak.szaknev=hozzafer.szaknev
                                        JOIN felhasznalok ON felhasznalok.emailCim=hozzafer.emailCim
                                        WHERE felhasznalok.emailCim='$emailCim' AND szak.indul=1");
            if($sql->num_rows > 0) {
                $rows = array();
                while($row = mysqli_fetch_array($sql)) {
                    $rows[] = $row;
                }
                echo json_encode($rows);
                //echo json_encode(utf8ize($rows));
            }else{
                $tomb = array('hiba' => 'Nincs betölthető adat!',
                              'uzenet' => '');
                $vissza = array();
                $vissza[] = $tomb;
                echo json_encode($vissza);
            }
            /*}else{
                echo 'elcsesztél valamit';
            }*/
            break;

        case "szakInditasa":
            //a kiválasztott szakok indítása
            unset($mod);
            $joe = 0;
            if(isset($_POST['inditandoSzakok'])) {
                $inditandoSzakok = array();
                $inditandoSzakok = json_decode($_POST['inditandoSzakok'], true);
                foreach ($inditandoSzakok as $inditani) {
                    $szam = $conn->query("UPDATE szak SET indul = 1 WHERE szak.szaknev = '$inditani'");
                    if ($szam == 1) {
                        $joe = $joe + 1;
                    }
                }
                if ($joe == count($inditandoSzakok)) {
                    $tomb = array('hiba' => '',
                                  'uzenet' => 'Sikeres szakindítás!');
                    $vissza = array();
                    $vissza[] = $tomb;
                    echo json_encode($vissza);
                }else{
                    $tomb = array('hiba' => 'Egy vagy több szak indítása sikertelen!',
                                  'uzenet' => '');
                    $vissza = array();
                    $vissza[] = $tomb;
                    echo json_encode($vissza);
                }
            }
            break;

        case "szakEgyedul":
            //a szakfelelőshöz tartozó, induló szakok megjelenítése
            unset($mod);
            //if(isset($_POST['emailCim'])) {
            $json = file_get_contents('php://input');
            $szakEsFelev = array();
            $szakEsFelev = json_decode($json, true);
            //megkapott email cím a szakokhoz
            $emailCim = $szakEsFelev['emailCim'];
            $sql2 = $conn->query("SELECT DISTINCT szak.szaknev 
                                FROM hozzafer 
                                JOIN szak ON szak.szaknev=hozzafer.szaknev 
                                WHERE szak.indul=1 AND hozzafer.emailCim='$emailCim'");
            if($sql2->num_rows > 0) {
                $rows = array();
                while($row = mysqli_fetch_array($sql2)) {
                    $rows[] = $row;
                }
                echo json_encode($rows);
                //echo json_encode(utf8ize($rows));
            }else{
                $tomb = array('hiba' => 'Nincs betölthető adat!',
                              'uzenet' => '');
                $vissza = array();
                $vissza[] = $tomb;
                echo json_encode($vissza);
            }
            //}
            break;

        case "felevEgyedul":
            //mostani évszakos múlt félévek listája
            unset($mod);
            //if(isset($_POST['emailCim'])) {
            $json = file_get_contents('php://input');
            $szakEsFelev = array();
            $szakEsFelev = json_decode($json, true);
            $sql = $conn->query("SELECT tanev FROM tanev ORDER BY tanev DESC LIMIT 1");
            //utolsó karaktere megmondja, hogy őszi vagy tavaszi félév
            if($sql->num_rows > 0) {
                $felev = "";
                while ($row = $sql->fetch_assoc()) {
                    $felev = $row['tanev'];
                }
            }else{
                $tomb = array('hiba' => 'Nincs betölthető adat!',
                              'uzenet' => '');
                $vissza = array();
                $vissza[] = $tomb;
                echo json_encode($vissza);
            }
            $evszak = substr($felev, -1);
            //ez alapján szűrünk
            if($evszak == "1") {
                $sql2 = $conn->query("SELECT DISTINCT tanev.tanev
                                    FROM tanev 
                                    WHERE tanev.tanev LIKE '%1' AND tanev <> '$felev'");
            }else if($evszak == "2") {
                $sql2 = $conn->query("SELECT DISTINCT tanev.tanev 
                                    FROM tanev 
                                    WHERE tanev.tanev LIKE '%2' AND tanev <> '$felev'");
            }else{
                $tomb = array('hiba' => 'Ilyen szám nem lehet félév végén!',
                              'uzenet' => '');
                $vissza = array();
                $vissza[] = $tomb;
                echo json_encode($vissza);
            }
            if($sql2->num_rows > 0) {
                $rows = array();
                while($row = mysqli_fetch_array($sql2)) {
                    $rows[] = $row;
                }
                echo json_encode($rows);
                //echo json_encode(utf8ize($rows));
            }else{
                $tomb = array('hiba' => 'Nincs betölthető adat!',
                              'uzenet' => '');
                $vissza = array();
                $vissza[] = $tomb;
                echo json_encode($vissza);
            }
            break;

        case "targyImportBeolv":
            //a félévhez tartozó összes tárgy beolvasása, a megadott szak szerint szűrve
            //if(isset($_POST['felev']) && isset($_POST['szaknev'])) {
            //if(isset($_POST['felev'])) {
            unset($mod);
            $json = file_get_contents('php://input');
            $targyImportBeolv = array();
            $targyImportBeolv = json_decode($json, true);
            $felev = $targyImportBeolv['felev'];
            $szaknev = $targyImportBeolv['szaknev'];
            if($felev=="tanterv"){
                $sql = $conn->query("SELECT tanterv.tanterv_ID, tanterv.szervEgys, tanterv.evszak,
                    tanterv.targynev, szak.szaknev, tanterv.targykod, tanterv.evfolyam, 
                    tanterv.tipus, tanterv.kredit, tanterv.oraszamNap, tanterv.oraszamLev,
                    tanterv.kovetelmeny, tanterv.evfolyam, tanterv.felev
                    FROM tanterv
                    JOIN tartozik ON tanterv.tanterv_ID=tartozik.tanterv_ID
                    JOIN szak ON tartozik.szaknev=szak.szaknev
                    WHERE szak.szaknev = '$szaknev'");
            }else{
                $sql = $conn->query("SELECT mostani.mostani_ID, tanterv.szervEgys, szak.szaknev, szak.indul, mostani.tanev, tanterv.evszak,
                    tanterv.targynev, tanterv.targykod, tanterv.evfolyam, mostani.online, mostani.onlineLev,
                    tanterv.tipus, tanterv.kredit, tanterv.oraszamNap, tanterv.oraszamLev,
                    tanterv.kovetelmeny, mostani.oktatoNap, mostani.oktatoLev,
                    mostani.TImegjegyzes, mostani.oktatoMegjegyzes
                    FROM tanterv
                    JOIN mostani ON mostani.tanterv_ID=tanterv.tanterv_ID
                    JOIN tartozik ON tanterv.tanterv_ID=tartozik.tanterv_ID
                    JOIN szak ON tartozik.szaknev=szak.szaknev
                    WHERE mostani.tanev = '$felev' AND szak.szaknev = '$szaknev'");
            }
            
            if($sql->num_rows > 0) {
                $rows = array();
                while($row = mysqli_fetch_array($sql)) {
                    $rows[] = $row;
                }
                echo json_encode($rows);
                //echo json_encode(utf8ize($rows));
            }else{
                $tomb = array('hiba' => 'Nincs betölthető adat!',
                              'uzenet' => '');
                $vissza = array();
                $vissza[] = $tomb;
                echo json_encode($vissza);
            }
            //}
            break;

        case "targyakImportalasa":
            //a kiválasztott tárgyak importálása a mostani félévvel, a tárgykód használatával
            //legújabb félévet megnézzük
            unset($mod);
            $joe = false;
            if(isset($_POST['importalandoTargyak'])) {
                $sql = $conn->query("SELECT tanev FROM tanev ORDER BY tanev DESC LIMIT 1");
                if($sql->num_rows > 0) {
                    $felev = "";
                    while ($row = $sql->fetch_assoc()) {
                        $felev = $row['tanev'];
                    }
                }

                //táblából kivesszük a tárgykódokat, aszerint másolunk (itt van valami a szakokkal)
                $importalandoTargyak = array();
                $importalandoTargyak = json_decode($_POST['importalandoTargyak'], true);
                $szak = $_POST['szak'];
                $valasztottFelev = $_POST['felev'];
                if($valasztottFelev=="tanterv")
                {
                    foreach ($importalandoTargyak as $importalni) {
                        $joe = $conn->query("INSERT INTO mostani (mostani.tanterv_ID, mostani.targykod)
                                        SELECT tanterv.tanterv_ID, tanterv.targykod
                                        FROM tanterv JOIN tartozik ON tanterv.tanterv_ID=tartozik.tanterv_ID JOIN szak ON szak.szaknev=tartozik.szaknev
                                        WHERE tanterv.targykod = '$importalni' AND szak.szaknev = '$szak'");
                        $conn->query("UPDATE mostani SET teremigeny='-' WHERE ISNULL(teremigeny)");
                        $conn->query("UPDATE mostani SET oktatoNap='-' WHERE ISNULL(oktatoNap)");
                        $conn->query("UPDATE mostani SET oktatoLev='-' WHERE ISNULL(oktatoLev)");
                        $conn->query("UPDATE mostani SET TImegjegyzes='-' WHERE ISNULL(TImegjegyzes)");
                        $conn->query("UPDATE mostani SET oktatoMegjegyzes='-' WHERE ISNULL(oktatoMegjegyzes)");
                        $conn->query("UPDATE mostani SET oktatoMegjegyzesLev='-' WHERE ISNULL(oktatoMegjegyzesLev)");
                        $conn->query("UPDATE mostani SET utolsoBelepes=0 WHERE ISNULL(utolsoBelepes)");
                        $conn->query("UPDATE mostani SET online='Nem' WHERE ISNULL(online)");
                        $conn->query("UPDATE mostani SET onlineLev='Nem' WHERE ISNULL(onlineLev)");
                        $conn->query("UPDATE mostani SET tanev='$felev' WHERE ISNULL(tanev)");
                    }
                }else{
                    foreach ($importalandoTargyak as $importalni) {
                        $joe = $conn->query("INSERT INTO mostani (tanterv_ID, targykod, teremigeny, online, onlineLev, oktatoNap, oktatoLev, TImegjegyzes, oktatoMegjegyzes, oktatoMegjegyzesLev, tanev, utolsoBelepes)
                                        SELECT tanterv_ID, targykod, teremigeny, online, onlineLev, oktatoNap, oktatoLev, TImegjegyzes, oktatoMegjegyzes, oktatoMegjegyzesLev, '$felev', utolsoBelepes
                                        FROM mostani
                                        WHERE targykod = '$importalni'");
                    }
                }
                
                $conn->query("UPDATE mostani SET veglegesites=0 WHERE veglegesites IS NULL");
                if($joe == true) {
                    $tomb = array('hiba' => '',
                                  'uzenet' => 'Sikeres adatbetöltés!');
                    $vissza = array();
                    $vissza[] = $tomb;
                    echo json_encode($vissza); 
                }
            }
            break;

        case "szakfelelosTargyTorles":
            unset($mod);
            $json = file_get_contents('php://input');
            $szakfelelosTargyTorles = array();
            $szakfelelosTargyTorles = json_decode($json, true);
            $targykod = $szakfelelosTargyTorles['targykod'];
            $felev = $szakfelelosTargyTorles['felev'];
            $sql = $conn->query("DELETE FROM mostani WHERE targykod='$targykod' AND tanev='$felev'");
            if($sql == true) {
                $tomb = array('hiba' => '',
                              'uzenet' => 'Sikeres törlés!');
                $vissza = array();
                $vissza[] = $tomb;
                echo json_encode($vissza);
            }else{
                $tomb = array('hiba' => 'Törlés sikertelen!',
                              'uzenet' => '');
                $vissza = array();
                $vissza[] = $tomb;
                echo json_encode($vissza);
            }
            break;

        case "szakfelelosOnlineValtas":
            unset($mod);
            $json = file_get_contents('php://input');
            $szakfelelosTargyTorles = array();
            $szakfelelosTargyTorles = json_decode($json, true);
            $targykod = $szakfelelosTargyTorles['targykod'];
            $felev = $szakfelelosTargyTorles['felev'];
            $sql = $conn->query("SELECT online FROM mostani WHERE mostani_ID='$targykod' AND tanev='$felev'");
            if($sql->num_rows > 0) {
                $online = "";
                while ($row = $sql->fetch_assoc()) {
                    $online = $row['online'];
                }
            }
            if($online == "Igen") {
                $sql = $conn->query("UPDATE mostani SET online='Nem' WHERE mostani_ID='$targykod' AND tanev='$felev'");
            }else{
                $sql = $conn->query("UPDATE mostani SET online='Igen' WHERE mostani_ID='$targykod' AND tanev='$felev'");
            }
            $tomb = array('hiba' => '',
                          'uzenet' => 'Sikeres váltás!');
            $vissza = array();
            $vissza[] = $tomb;
            echo json_encode($vissza);
            break;

        case "szakfelelosOnlineLevValtas":
            unset($mod);
            $json = file_get_contents('php://input');
            $szakfelelosTargyTorles = array();
            $szakfelelosTargyTorles = json_decode($json, true);
            $targykod = $szakfelelosTargyTorles['targykod'];
            $felev = $szakfelelosTargyTorles['felev'];
            $sql = $conn->query("SELECT onlineLev FROM mostani WHERE mostani_ID='$targykod' AND tanev='$felev'");
            if($sql->num_rows > 0) {
                $online = "";
                while ($row = $sql->fetch_assoc()) {
                    $online = $row['onlineLev'];
                }
            }
            if($online == "Igen") {
                $sql = $conn->query("UPDATE mostani SET onlineLev='Nem' WHERE mostani_ID='$targykod' AND tanev='$felev'");
            }else{
                $sql = $conn->query("UPDATE mostani SET onlineLev='Igen' WHERE mostani_ID='$targykod' AND tanev='$felev'");
            }
            $tomb = array('hiba' => '',
                            'uzenet' => 'Sikeres váltás!');
            $vissza = array();
            $vissza[] = $tomb;
            echo json_encode($vissza);
            break;

        case "szakfelelosVeglegesites":
            unset($mod);
            $json = file_get_contents('php://input');
            $szakfelelosVeglegesites = array();
            $szakfelelosVeglegesites = json_decode($json, true);
            $targykod = $szakfelelosVeglegesites['targykod'];
            $felev = $szakfelelosVeglegesites['felev'];
            $emailCim = $szakfelelosVeglegesites['emailCim'];
            $sql = $conn->query("UPDATE mostani SET veglegesites=1 WHERE mostani_ID='$targykod' AND tanev='$felev'");
            $sql2 = $conn->query("UPDATE mostani SET utolsoBelepes=0 WHERE mostani_ID='$targykod' AND tanev='$felev'");
            $sql = $conn->query("SELECT mostani.mostani_ID, tanterv.szervEgys, szak.szaknev, szak.indul, mostani.tanev, tanterv.evszak,
                                        tanterv.targynev, tanterv.targykod, tanterv.evfolyam, mostani.online, mostani.onlineLev,
                                        tanterv.tipus, tanterv.kredit, tanterv.oraszamNap, tanterv.oraszamLev,
                                        tanterv.kovetelmeny, mostani.oktatoNap, mostani.oktatoLev,
                                        mostani.TImegjegyzes, mostani.oktatoMegjegyzes, mostani.utolsoBelepes, mostani.veglegesites
                                        FROM tanterv
                                        JOIN mostani ON mostani.tanterv_ID=tanterv.tanterv_ID
                                        JOIN tartozik ON tanterv.tanterv_ID=tartozik.tanterv_ID
                                        JOIN szak ON tartozik.szaknev=szak.szaknev
                                        JOIN hozzafer ON hozzafer.szaknev=szak.szaknev
                                        JOIN felhasznalok ON felhasznalok.emailCim=hozzafer.emailCim
                                        WHERE felhasznalok.emailCim='$emailCim'");
            if($sql->num_rows > 0) {
                $rows = array();
                while($row = mysqli_fetch_array($sql)) {
                    $rows[] = $row;
                }
                echo json_encode($rows);
                //echo json_encode(utf8ize($rows));
            }else{
                $tomb = array('hiba' => 'Nincs betölthető adat!',
                              'uzenet' => '');
                $vissza = array();
                $vissza[] = $tomb;
                echo json_encode($vissza);
            }
            break;

                /*default:
                //belépés(?)
                //if((!empty($_POST['email'])) && (!empty($_POST['jelsz']))) {
                    $json = file_get_contents('php://input');
                    $belepes = array();
                    $belepes = json_decode($json, true);
                    //$email = $_POST['email'];
                    //$jelsz = $_POST['jelsz'];
                    $email = $belepes['email'];
                    $jelsz = $belepes['jelsz'];
                    $bejel = $conn->query("SELECT * FROM felhasznalok WHERE emailCim='$email'");
    
                    //belépés titkosítással
                    //if($jelsz == "alma") {
                        if($jelsz == "aaa") {
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
                            $rows[] = $row;
                            $jogosultsag = $row['jogosultsag'];
                            echo $jogosultsag;
                        }
                        //echo json_encode($rows);
                    }
                    else {
                        echo "nem jó";
                    }
                //}
                break;*/
    }
?>
