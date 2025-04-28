<?php
class ParticipantController extends BaseController
{
    public function registerAction()
    {
        $strErrorDesc = '';
        $requestMethod = $_SERVER["REQUEST_METHOD"];
        if (strtoupper($requestMethod) == 'POST') {
            $input = json_decode(file_get_contents('php://input'), true);
            try {
                $participantModel = new ParticipantModel();
                $participantModel->createParticipant(
                    $input['name'],
                    $input['studentId'],
                    $input['email'],
                    $input['password'],
                    $input['semester'],
                    $input['career']
                );
                $responseData = json_encode(['success' => true]);
            } catch (Error $e) {
                $strErrorDesc = $e->getMessage() . ' Something went wrong! Please contact support.';
                $strErrorHeader = 'HTTP/1.1 500 Internal Server Error';
            }
        } else {
            $strErrorDesc = 'Method not supported';
            $strErrorHeader = 'HTTP/1.1 422 Unprocessable Entity';
        }
        if (!$strErrorDesc) {
            $this->sendOutput(
                $responseData,
                array('Content-Type: application/json', 'HTTP/1.1 200 OK')
            );
        } else {
            $this->sendOutput(json_encode(array('error' => $strErrorDesc)),
                array('Content-Type: application/json', $strErrorHeader)
            );
        }
    }
}