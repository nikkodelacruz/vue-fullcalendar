<?php
require '../../vendor/autoload.php';

use Inc\Booking;

class AddAppointment
{
	private $book;
	private $data;

	public function __construct()
	{
		// axios post
		$this->data = json_decode(file_get_contents("php://input"), TRUE);
		$this->book = new Booking();
		$this->addBooking($this->data);

		
	}

	public function addBooking($data)
	{
		$id = $this->book->insertData('appointments', [
			'full_name' 		=> $data['full_name'],
			'gender' 			=> $data['gender'],
			'contact_number' 	=> $data['contact_number'],
			'birth_date' 		=> $data['birth_date'],
			'email_address' 	=> $data['email_address'],
			'source' 			=> $data['source'],
			'remarks' 			=> $data['remarks'],
		]);

		if (!empty($id)) {
			if (!empty($this->data['booking'])) {
				foreach ($this->data['booking'] as $book) {
					$this->book->insertData('book', [
						'appointment_id' 	=> $id,
						'doctor_id' 		=> $book['doctor_id'],
						'schedule_id' 		=> $book['schedule_id'],
						'procedure_id' 		=> $book['procedure_id'],
						'time_slot' 		=> $book['time_slot'],
						'date'				=> $book['date']
					]);
				}
			}
		}

		echo json_encode([
			'status' => 'success',
			'doctors' => $data,
		]);

	}
}
new AddAppointment();
?>