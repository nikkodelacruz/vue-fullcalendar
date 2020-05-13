<?php
require '../../vendor/autoload.php';

use Inc\Booking;

if (isset($_GET)) {
	new Branches();
}

class Branches
{
	private $book;
	private $data = [];

	public function __construct()
	{		
		$this->book = new Booking();
		$this->getAllBranches();
	}

	public function getAllBranches()
	{
		$this->data = $this->book->getData('branches', '*');
		echo json_encode([
			'status' => 'success',
			'branches' => $this->data
		]);
	}

}
?>