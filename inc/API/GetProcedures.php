<?php
require '../../vendor/autoload.php';

use Inc\Booking;

// $data = json_decode(file_get_contents("php://input"), TRUE);

new Procedures();

class Procedures
{
	private $API;
	private $book;
	private $data = [];

	public function __construct()
	{		
		$this->book = new Booking();
		$this->getAllProcedures();
	}

	public function getAllProcedures()
	{
		$this->data = $this->book->getData('procedures', "*");
		echo json_encode([
			'status' => 'success',
			'procedures' => $this->data
		]);
	}

}
?>