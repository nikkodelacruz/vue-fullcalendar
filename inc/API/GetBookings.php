<?php
require '../../vendor/autoload.php';

use Inc\Booking;


if (isset($_GET)) {
	new GetBookings($_GET);
}

class GetBookings
{
	private $API;
	private $book;
	private $data = [];

	public function __construct($get)
	{
		$this->book = new Booking();
		$this->getAllBookings();
	}

	public function getAllBookings()
	{
		$this->data = $this->book->getData('book', "*");
		echo json_encode([
			'status' => 'success',
			'bookings' => $this->data
		]);
	}

}
?>