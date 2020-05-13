<?php
require '../../vendor/autoload.php';

use Inc\Booking;

new Login();

class Login
{
	private $book;
	private $data;

	public function __construct()
	{
		// axios post
		$this->data = json_decode(file_get_contents("php://input"), TRUE);
		$this->book = new Booking();
		// $this->loginUser($this->data);
	}

	public function loginUser($data)
	{
		$this->book->insertData('customers', [
			'full_name' 		=> $data['full_name'],
			'gender' 			=> $data['gender'],
			'contact_number' 	=> $data['contact_number'],
			'birth_date' 		=> $data['birth_date'],
			'email_address' 	=> $data['email_address'],
			'source' 			=> $data['source'],
			'remarks' 			=> $data['remarks'],
			'password'			=> ''
		]);

		echo json_encode([
			'status' => 'success',
			'data' => $data['booking'],
		]);

	}
}
?>