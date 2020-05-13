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
		// $this->db_name = 'sql12338743'; 
		// $this->db_server = 'sql12.freemysqlhosting.net';  
		$this->db_name = 'booking'; 
		$this->db_server = 'localhost';  
		$this->connectDB();
	}

	public function connectDB()
	{
		$this->db = new Medoo([
			'database_type' => $this->db_type,
		    'database_name' => $this->db_name,
		    'server' 		=> $this->db_server,
		    // 'username' 		=> 'sql12338743',
		    // 'password' 		=> 'vTiKrqAYpb'
		    'username' 		=> 'root',
		    'password' 		=> ''
		]);
	}

	public function insertData($table, array $fields)
	{
		if (!empty($table) && !empty($fields)) {
			$this->db->insert($table, $fields);
			return $this->db->id();
		}
	}

	public function getData($table, $fields, $id=[], $type='select')
	{
		if (!empty($id) && $type == 'select') {
			$data = $this->db->select($table, $fields, $id);
			return $data;
		} else if (!empty($table) && !empty($fields) && $type == 'select') {
			$data = $this->db->select($table, $fields);
			return $data;
		} else if ($type == 'get'){
			$data = $this->db->get($table, $fields, $id);
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