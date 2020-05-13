$(document).ready(function($) {

	const getAppointmentsAPI = 'inc/API/GetAppointments.php?API=details';

	new Vue({
		el: "#view-appointments",
		data: {
			appointments: [],
			loading: false
		},
		methods: {
			async getAllAppointments() {
				let vm = this;
				this.loading = true;
				try {
				    const response = await new Promise((resolve, reject) => {
				    	axios.get(getAppointmentsAPI)
						.then(function(response){
							resolve(response)
							vm.loading = false;
						})
						.catch(function(error){
							// handle error
							reject(error)
							console.log(error)
						})
						.then(function(){
							// always exccuted
						})
				    } );
				    if (response.data.status == 'success') {
				    	this.appointments = response.data.appointments;
				    }
				} catch (error) {
				    console.error(error);
					this.loading = false;
				}
			},
		},
		computed: {
		},
		created(){
			this.getAllAppointments();
		},
		watch: {
		},
		mounted() {
		},

	});

	
});
 