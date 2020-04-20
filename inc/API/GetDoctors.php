<?php
require '../../vendor/autoload.php';

use Inc\Booking;

// $data = json_decode(file_get_contents("php://input"), TRUE);

if (isset($_GET)) {
	new GetDoctors($_GET);
}

class GetDoctors
{
	private $API;
	private $book;
	private $data = [];

	public function __construct($get)
	{
		$this->book = new Booking();
		if ($get['API'] == 'get_all_doctors'){
			$this->getAllDoctors();
		}
		if ($get['API'] == 'get_doctor_schedule'){
			if (!empty($get['id'])) {
				$this->getDoctorScheduleById($get['id']);
			}
		}
		// $this->getDoctorById();
		// $this->getDoctorScheduleById();
	}

	public function getAllDoctors()
	{
		$this->data = $this->book->getData('doctors', "*");
		echo json_encode([
			'status' => 'success',
			'doctors' => $this->data
		]);
	}

	public function getDoctorById()
	{
		$this->data = $this->book->getData('doctors', "*", ["id" => 3]);
		echo json_encode([
			'status' => 'success',
			'doctors' => $this->data
		]);	
	}

	public function getDoctorScheduleById($id)
	{
		$this->data = $this->book->getData('doctor_schedule', "*", ["doctor_id" => $id]);
		echo json_encode([
			'status' => 'success',
			'schedule' => $this->data
		]);	
	}
}
?>