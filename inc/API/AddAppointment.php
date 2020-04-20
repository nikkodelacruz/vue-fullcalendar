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
		// $this->book->insertData('appointments', [
		// 	'full_name' 		=> $this->data['full_name'],
		// 	'gender' 			=> $this->data['gender'],
		// 	'contact_number' 	=> $this->data['contact_number'],
		// 	'birth_date' 		=> $this->data['birth_date'],
		// 	'email_address' 	=> $this->data['email_address'],
		// 	'source' 			=> $this->data['source'],
		// 	'remarks' 			=> $this->data['remarks'],
		// 	'procedure_id' 			=> $this->data['procedure_id'],
		// ]);



		$procedure_id = $this->data['procedure_id'];
		$duration = $this->data['procedure_duration']; // $duration = "7:00";
		$sched_id = $this->data['doctor_schedule_id'];

		$sched = $this->book->getData('doctor_schedule', "*", ["id" => $sched_id]);
		$time_left = $sched[0]['time_left'];
		$time_duration = $sched[0]['time_duration'];
		$time_duration = json_decode($time_duration);
		
		$start_time = $time_duration->start;
		$end_time = $time_duration->end;

		// $start_time = new DateTime($start_time); // get initial start time
		// $end_time = new DateTime($end_time); // get initial end time
		// $interval1 = $start_time->diff($end_time);
		// $timeLeft = $interval1->format("%H:%I"); // get total hours from start and end
		
		$timeLeft = new DateTime($time_left); // convert time left to time object
		$timeDuration = new DateTime($duration); // total time - duration from selected procedure
		$interval2 = $timeLeft->diff($timeDuration);
		$totalTime = $interval2->format("%H:%I"); // get remaining time deducted from duration of procedure
		
		$durationTime = new DateTime($duration);

		// echo $totalTime;
		if ( $durationTime <= $timeLeft ) {
			$updateSched = $this->book->updatedData(
				'doctor_schedule', 
				[
					'time_left' => $totalTime
				], 
				["id" => $sched_id]
			);
			echo json_encode(['status' => 'success', 'data'=> $updateSched]);
		} else {
			echo json_encode(['status' => 'full']);
		}


	}
}
new AddAppointment();
?>