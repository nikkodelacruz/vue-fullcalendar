<?php
require '../../vendor/autoload.php';

use Inc\Booking;

new Appointments($_GET);

class Appointments
{
	private $API;
	private $book;
	private $data = [];

	public function __construct($get)
	{

		$this->book = new Booking();
		$this->data = $this->book->getData('appointments', "*");

		if ($get && $get['API'] == 'details') {
			$this->getAllAppointmentDetails();
		} else {
			$this->getAllAppointments();
		}

	}

	public function getAllAppointments()
	{
		echo json_encode([
			'status' => 'success',
			'appointments' => $this->data
		]);

	}

	public function getAllAppointmentDetails()
	{
		$appointments = [];

		if (!empty($this->data)) {
			foreach ($this->data as $data) {
				$appointments[] = [
					'patient_name' 		=> $this->book->getData('customers', 'full_name', ['id' => $data['customer_id']], 'get'),
					'patient_number' 	=> $this->book->getData('customers', 'contact_number', ['id' => $data['customer_id']], 'get'),
					'time_slot' 		=> $data['time_slot'],
					'date' 				=> $data['date'],
					'doctor' 			=> $this->book->getData('doctors', 'name', ['id' => $data['doctor_id']], 'get'),
					'status' 				=> $data['status'],
				];
			}
		}

		if (!empty($appointments)) {
			echo json_encode([
				'status' => 'success',
				'appointments' => $appointments
			]);
		}

	}

}
?>