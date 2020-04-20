<?php
require '../vendor/autoload.php';

use Inc\Booking;

$a = new DateTime('08:00');
$b = new DateTime('12:00');

$interval = $a->diff($b);
// print_r($interval);

// echo $interval->h;
// echo $interval->i;
$timeLeft = $interval->format("%H:%I");
// echo $timeLeft;

$timeLeft = new DateTime($timeLeft);

$oneHour = new DateTime('02:00'); // minus hour
$totalHour = $timeLeft->diff($oneHour);

echo $totalHour->format("%H:%I");


// saveData();
function saveData() {
	$booking = new Booking();
	$booking->insertData('doctor_schedule', [
		'doctor_id' => 7,
		'date_available' => '2021-04-25',
		'time_duration' => '{"start": "9 AM", "end": "7 PM"}'
	]);
}

// getDatax();
function getDatax() {
	$booking = new Booking();
	$data = $booking->getData('doctors', '*');
	var_dump($data);
}
?>