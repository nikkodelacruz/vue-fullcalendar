<?php
namespace Inc;

use Medoo\Medoo;

class Booking
{
	public $db;
	public $db_type; 
	public $db_name; 
	public $db_server; 

	public function __construct()
	{
		$this->db_type = 'mysql'; 
		$this->db_name = 'booking'; 
		$this->db_server = 'localhost'; 
		$this->connectDB();
		// $this->insertDB();
	}

	public function connectDB()
	{
		$this->db = new Medoo([
			'database_type' => $this->db_type,
		    'database_name' => $this->db_name,
		    'server' 		=> $this->db_server,
		    'username' 		=> 'root',
		    'password' 		=> ''
		]);
	}

	public function insertData($table, array $fields)
	{
		if (!empty($table) && !empty($fields)) {
			$this->db->insert($table, $fields);
		}
	}

	public function getData($table, $fields, $id=[])
	{
		if (!empty($id)) {
			$data = $this->db->select($table, $fields, $id);
			return $data;
		} else if (!empty($table) && !empty($fields)) {
			$data = $this->db->select($table, $fields);
			return $data;
		}
	}

	public function updatedData($table, $fields, $id)
	{
		$data = $this->db->update($table, $fields, $id);
		return $data->rowCount();
	}

}

// new Booking();
?>