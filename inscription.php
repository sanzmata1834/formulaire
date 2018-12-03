<?php
$nom = $_POST["nom"];
$prenom = $_POST["prenom"];
$date = $_POST["datepicker"];
$cp = $_POST["cp"];
$ville = $_POST["ville"];
$mail = $_POST["mail"];
$mdp1 = $_POST["mdp1"];
$mdp2 = $_POST["mdp2"];

echo "Vous êtes bien enregistrés, voici vos données :<br>";
echo "<p>Votre nom est : ".$nom."</p>";
echo "<p>Votre prenom est : ".$prenom."</p>";
echo $date;
echo $cp;
echo $ville;
echo $mail;
echo $mdp1;
echo $mdp2;
?>