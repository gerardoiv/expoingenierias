<?php
require_once PROJECT_ROOT_PATH . "/Model/Database.php";
class ParticipantModel extends Database
{
    public function createParticipant($nombre, $matricula, $email, $password, $semestre, $carrera)
    {
        $query = "INSERT INTO participantes (nombre, matricula, email, password, semestre, carrera) VALUES (?, ?, ?, ?, ?, ?)";
        $params = ["ssssss", $nombre, $matricula, $email, $password, $semestre, $carrera];
        return $this->execute($query, $params);
    }
}