$(document).ready(function($) {

	// register modal component
    Vue.component("modal", {
    	template: "#modal-template"
    });

	const addBookingAPI = 'inc/API/AddBooking.php';
	const getDoctorsAPI = 'inc/API/GetDoctors.php';
	const getProceduresAPI = 'inc/API/GetProcedures.php';
	const getBranchesAPI = 'inc/API/GetBranches.php';
	const getAppointmentsAPI = 'inc/API/GetAppointments.php';
	const calendarElement = 'calendar';

	new Vue({
		el: "#book-now",
		data: {
			fullName: "John Doe",
			gender: "Male",
			contactNumber: "09123",
			email: 'johndoe@gmail.com',
			birthMonth: '9',
			birthDay: '12',
			birthYear: '1990',
			source: 'Internet',
			remarks: 'Lorem ipsum',
			viewTitle: '',
			agree: false,
			calendar: [],
			fullCalendar: null,
			errors: [],
			loading: false,
			schedule: [],
			scheduleLoading: false,
			status: false,
			isFull: false,
			months: [
				'January',
				'February',
				'March',
				'April',
				'May',
				'June',
				'July',
				'August',
				'September',
				'October',
				'November',
				'December'
			],
			branches: [],
			branch: { id: '', name: '' },
			doctors: [],
			doctor: { id: '', name: '' },
			procedures: [],
			procedure: '',
			showModal: '',
			selected: { id:'', doctor: '', timeSlot: [], date: '', doctorSchedId: '' }, //current selected date
			customerBooking: [], //all booking
			appointments: [],
			registerloading: false,
			password: '',
			rePassword: ''
		},
		methods: {
			fullcalendar: function(){
				let vm = this;
				this.fullCalendar = FullCalendar.Calendar;
			    let calendarDraggable = FullCalendarInteraction.Draggable;
			    let el = document.getElementById(calendarElement);
			    this.calendar = new this.fullCalendar(el, {
			        plugins: [ 'interaction', 'dayGrid', 'timeGrid', 'list', 'moment' ],
			        header: {
			            left: 'prev,next today',
			            center: 'title',
			            right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
			        },
			        // titleFormat: '['+this.viewTitle+']',
			        // defaultDate: '2020-02-12',
			      	// navLinks: true, // can click day/week names to navigate views
			      	businessHours: true, // display business hours
			      	// editable: true,
			        eventLimit: false, // allow "more" link when too many events
			        // selectable: true,
			        // droppable: true, // this allows things to be dropped onto the calendar
			        // eventDurationEditable: false,
			        views: {
				    	dayGrid: {
				      		eventLimit: 3 // adjust to 6 only for timeGridWeek/timeGridDay
				    	}
				  	},
			        timeZone: 'UTC',
			        eventTimeFormat: {
						hour: 'numeric',
						// minute: '2-digit',
						meridiem: 'long'
					},
					// timeFormat: 'hh:mm a',
			        eventRender: function(info) {

			            info.el.innerHTML = info.event.title;
			        	let available = info.event.extendedProps.available;
			            if (available) {
			            	info.el.id = 'event-tooltip'+info.event.id;
			            } else {
			            	info.el.classList.add('disabled');
			            }

			        	// Append element
			        	let node = document.createElement("span"); // add element
        				let text_node = document.createTextNode('×'); // add text
        				node.appendChild(text_node); // append the text
        				node.className = 'remove-event'; // add class
            			node.setAttribute('data-id',info.event.id); // add attribute
            			if (info.el.classList.contains('fc-day-grid-event')) {
	        				info.el.appendChild(node); // append the node to element
	        				info.el.getElementsByClassName("remove-event")[0].onclick = function() {
	        					vm.calendar.getEventById( info.event.id ).remove();
								// remove item from array by key value
								vm.customerBooking = vm.customerBooking.filter( obj => obj.id !== info.event.id );
						    	vm.isFull = false;
	        				}
            			}
            			let startTime = info.event.extendedProps.start_time
            			startTime = moment(startTime, "HH:mm").format("h:mm A");
			        	let endTime = info.event.extendedProps.end_time
			        	endTime = moment(endTime, "HH:mm").format("h:mm A");
			        	let timeLeft = info.event.extendedProps.time_left
			        	timeLeft = moment(timeLeft, "HH:mm").format("h:mm");
						setTimeout(function(){
							// tippy('[data-tippy-content]');
						    tippy('.fc-bgevent#event-tooltip'+info.event.id, {
						    	content: 'Book here',
						    	allowHTML: true
							});
						},100);
			        },
			        eventClick: function(info) { 
			        },
			        dayRender: function (info) {
			        	let allDates = moment(info.date).format('YYYY-MM-DD');
			        	let today = moment(new Date()).format('YYYY-MM-DD');
			        	// let isPast = moment(today).isBefore(allDates); // false
			        	let isPast = moment(today).diff(allDates);
			        	if (isPast > 0) { //past dates
			        		// info.el.style.backgroundColor = '#CDCDCD';
			        		// info.el.classList.add('disabled');
			        	}
				    },
				    dayClick: function(info) {
				    },
				    dateClick: function(info) {

				    	let date = info.dateStr;
    					let events = vm.calendar.getEvents();
				    	let isFull = false;
				    	$.each(events, function(index, val) {
							// let d = moment(val.start).format('YYYY-MM-DD')
				   //  		if (d == date) {
							// 	console.log(date)
				   //  			isFull = true;
				   //  		}
				    		// Allow 1 event per day
							if (val.extendedProps.appointment) {
								let start = moment(val.start).format('YYYY-MM-DD')
					    		if (start == date) {
				    				isFull = true;
					    		}
							}
						});

				    	if ( !isFull ) { //vm.isFull
					    	let procedureName = vm.procedure.text;
					    	let procedureTime = vm.procedure.time;
					    	if (!procedureName && !procedureTime) {
					    		alert('Please select a procedure');
					    	} else {
								let procedureId = vm.procedure.id;
								let schedule = vm.schedule
						    	if (schedule.length > 0) { //doctor schedule
						    		// console.log(schedule)
						    		$.each(schedule, function(index, val) {
					            		if (val.start == date) {
			        						if (val.available) {

						            			// show modal
												vm.showModal = 'timeslot';
												vm.selected.timeSlot = [];

												let value = {
													interval: procedureTime,
												  	startTime: val.start_time,
												  	endTime: val.end_time
												};

												let inputDataFormat = "h:mm:ss";
												let outputFormat = "h:mm A";

												let tmp = moment(value.interval, inputDataFormat);
												let dif = tmp - moment().startOf("day");

												let startIntervalTime = moment(value.startTime, inputDataFormat).add(-dif, "ms");
												let endIntervalTime = moment(value.startTime, inputDataFormat);
												let finishTime = moment(value.endTime, inputDataFormat);

												// let intervals = [];
												while(finishTime >= startIntervalTime) {
												    let format = startIntervalTime.format(outputFormat) + " - " + endIntervalTime.format(outputFormat);
												    vm.selected.timeSlot.push(format);
												    startIntervalTime.add(dif, "ms");
												    endIntervalTime.add(dif, "ms");
												}
												vm.selected.timeSlot.shift();
												vm.selected.timeSlot.pop();
												vm.selected.date = moment(date).format('LL');
												vm.selected.doctorSchedId = val.id // doctor schedule id
			        						}
					            		}
						    		});
						    	}
					    	}
				    	}

				    },
			    });
    			this.calendar.render();
				this.viewTitle = this.calendar.view.title;
			},
			addAppointment: function(e) {

					let isValid = this.validateFields();

					if (isValid) {
						this.showModal = 'register';
					}
				

					// return new Promise((resolve, reject) => {
					// 	let birthDate = moment(bday).format('YYYY-MM-DD');
					// 	let vm = this;
					// 	vm.loading = true;
					// 	vm.status = false;
					// 	axios({
					// 		method: 'post',
					// 	  	url: addBookingAPI,
					// 	  	data: {
					// 	    	full_name: this.fullName,
					// 	    	gender: this.gender,
					// 	    	contact_number: this.contactNumber,
					// 	    	birth_date: birthDate,
					// 	    	email_address: this.email,
					// 	    	source: this.source,
					// 	    	remarks: this.remarks,
					// 	    	branch_id: this.branch.id,
					// 	    	doctor_id: this.doctor.id,
					// 	    	booking: this.customerBooking,
					// 	  	}
					// 	})
					// 	.then((response) => {
					// 		// console.log(response);
					// 		setTimeout(function(){
					// 			vm.loading = false;
					// 		},500);

					// 		if (response.data.status == 'invalid') {
					// 			let dates = response.data.data;
					// 			$.each(dates, function(index, val) {
					// 				let date = moment(new Date(val)).format('LL')
					// 				let message = "Selected procedure on "+date+" has already reached the time remaining, \nPlease choose another date or procedure";
					// 				alert(message);
					// 			});
					// 		} else if (response.data.status == 'success') {
					// 			alert('Successfully Added')
					// 			setTimeout(function(){
					// 				vm.status = true;
					// 			},500);
					// 		} else if (response.data.status == 'full') {
					// 			alert('Fully book')
					// 		} else {
					// 			alert('Something went wrong, Please try again')
					// 		}
					// 		resolve(response)
					// 	})
					// 	.catch((response) => {
					// 		reject(response)
					// 		setTimeout(function(){
					// 			vm.loading = false;
					// 		},500);
					// 		alert('Something went wrong, Please try again')
					// 	});
					// });
				

			},
			registerUser: function(e) {
				let isValid = this.validateFields();
				if (isValid) {
					this.showModal = false;
				}
			},
			validateFields: function() {
				let bday = this.birthYear+'-'+this.birthMonth+'-'+this.birthDay;
				let isValidDate = moment(bday, 'YYYY-M-D', true);
				let result = false;
				this.errors = [];
				if (!this.fullName) {
					this.errors.push("Full Name is required");
				}
				if (!this.gender) {
					this.errors.push("Gender is required");
				}
				if (!this.birthYear && !this.birthMonth && !this.birthDay) {
					this.errors.push("Birth Date is required");
				} else if (!isValidDate._isValid) {
					this.errors.push("Invalid birth date");
				}
				if (!this.email) {
					this.errors.push("Email is required");
				} else if (!this.validEmail(this.email)) {
					this.errors.push("Invalid email address");
				}
				if (!this.agree) {
					this.errors.push("Please agree to the terms and conditions");
				}
				if (!this.doctor.id) {
					this.errors.push("Please select a doctor");
				}
				if (!this.branch.id) {
					this.errors.push("Please select a branch");
				}
				if (this.customerBooking.length <= 0) {
					this.errors.push("Please book an appointment");
				}
				if (this.password !== this.rePassword) {
					this.errors.push("Passwords doesn't matched");
				}
				if (this.errors.length <= 0) {
					result = true; //no errors
				}
				return result;
			},
			async getAllDoctors() {
				try {
				    const response = await new Promise((resolve, reject) => {
				    	axios.get(getDoctorsAPI+'?API=get_all_doctors')
						.then(function(response){
							resolve(response)
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
				   	const doctorsData = response.data.doctors;
				    let docs = this.doctors;
				   	$.each(doctorsData, function(index, val) {
				   		docs.push({ id: val.id, name: val.name })
				   	});
				} catch (error) {
				    console.error(error);
				}
			},
			async getDoctorSchedule(doctor_id) {
				try {
				    const response = await new Promise((resolve, reject) => {
				    	axios.get(getDoctorsAPI, {
				    		params: {
				    			API: 'get_doctor_schedule',
				    			id: doctor_id
				    		}
				    	})
						.then(function(response){
							resolve(response)
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
				    let vm = this;
				    let doctorScheds = [];
				    if (response.data.status == 'success') {
				    	let sched = response.data.schedule;
				    	$.each(sched, function(index, val) {

				    		let startTime = JSON.parse(val.time_duration).start;
				    		let endTime = JSON.parse(val.time_duration).end;
				    		let timeLeft = Number(moment(val.time_left, "HH:mm").format("HH"));
					    	// console.log(val.date_available);

				    		doctorScheds.push({
				    			id: val.id,
				    			available: (timeLeft <= 0) ? false : true,
				    			title: (timeLeft <= 0) ? 'FULLY BOOKED' : 'AVAILABLE',
				    			start: val.date_available,
				    			end: val.date_available,
				    			start_time: startTime,
				    			end_time: endTime,
				    			time_left: val.time_left,
				    			rendering: 'background',
						        // color: '#7cae66',
						     	// display: 'background',
						        backgroundColor: (timeLeft <= 0) ? '#F5A18D' : '#E3F4FB',
				    		});
				    	});
				    }
				    vm.schedule = doctorScheds;
				    vm.calendar.addEventSource(doctorScheds);
					vm.scheduleLoading = false;
				} catch (error) {
				    console.error(error);
					vm.scheduleLoading = false;
				}
			},
			async getAllProcedures() {
				try {
				    const response = await new Promise((resolve, reject) => {
				    	axios.get(getProceduresAPI)
						.then(function(response){
							resolve(response)
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
				    	let vm = this;
				    	$.each(response.data.procedures, function(index, val) {
				    		let time = vm.getHoursMinutes(val.duration);
			    			let procedureName = val.name+" ("+time+")";
						    vm.procedures.push({ id: val.id, name: procedureName, text: val.name, duration: val.duration })
				    	});
				    }
				    // this.procedures.push
					this.scheduleLoading = false;
				} catch (error) {
				    console.error(error);
					this.scheduleLoading = false;
				}
			},
			async getAllBranches() {
				try {
				    const response = await new Promise((resolve, reject) => {
				    	axios.get(getBranchesAPI)
						.then(function(response){
							resolve(response)
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
				    // console.log(response)
				    if (response.data.status == 'success') {
				    	this.branches = response.data.branches
				    }
				    // this.procedures.push
					this.scheduleLoading = false;
				} catch (error) {
				    console.error(error);
					this.scheduleLoading = false;
				}
			},
			async getAllAppointments() {
				try {
				    const response = await new Promise((resolve, reject) => {
				    	axios.get(getAppointmentsAPI)
						.then(function(response){
							resolve(response)
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
				    	// console.log(response)
				    if (response.data.status == 'success') {
				    	this.appointments = response.data.appointments;
				    }
				    // this.procedures.push
					this.scheduleLoading = false;
				} catch (error) {
				    console.error(error);
					this.scheduleLoading = false;
				}
			},
			getHoursMinutes: function(time) {
				let hourText = "";
	    		let minuteText = "";
	    		let hour = Number(moment(time, "HH:mm").format("HH"));
	    		let minute = Number(moment(time, "HH:mm").format("m"));
	    		if (hour <= 1) {
	    			hourText = hour+" hour ";
	    		} else {
	    			hourText = hour+" hours ";
	    		}
	    		if (minute > 0) {
	    			if (minute <= 1) {
	    				minuteText = minute+" minute";
	    			} else {
	    				minuteText = minute+" minutes";
	    			}
	    		}
			    return hourText+minuteText;
			},
			bookTimeSlot: function(timeSlot) {
				let date = moment(this.selected.date).format('YYYY-MM-DD');
				let book = this.doctor.id+this.procedure.id+timeSlot+date;
				let id = book.replace(/[^A-Z0-9]/ig, "");
				this.customerBooking.push({
					id: id,
    				start: date,
    				procedure_id: this.procedure.id, //procedure id
    				schedule_id : this.selected.doctorSchedId, // doctor schedule id
    				time_slot: timeSlot,
    				date: date
				});

				this.calendar.addEventSource([{
    				id: id,
    				title: this.procedure.text+' <br>('+timeSlot+')',
    				start: date,
    				appointment: true,
    				procedure_id: this.procedure.id, //procedures id
    				procedure_duration: this.procedure.time,
    				schedule_id : this.selected.doctorSchedId // doctor schedule id
    			}]);

    			this.showModal = false;

			},
			checkTimeSlot: function(doctor_id, procedure_id, sched_id, date, time) {
				let vm = this;
				let result = false;
				let dateFormat = moment(date).format('YYYY-MM-DD');
				let book_id = doctor_id+procedure_id+sched_id+dateFormat+time;
				book_id = this.removeSpecialCharacters(book_id)
				if (this.appointments) {
					$.each(this.appointments, (index, val) => {
						let id = val.doctor_id+val.procedure_id+val.schedule_id+val.date+val.time_slot;
						id = vm.removeSpecialCharacters(id)
						if (book_id == id) {
							result = true;
						} 
    				});	
				}
				return result;
			},
			selectDoctor: function(event) {
		    	let vm = this;
		    	let name = event.target.options[event.target.options.selectedIndex].text;
    			let events = vm.calendar.getEvents();
    			$.each(events, function(index, val) {
	    			let removeEvent = vm.calendar.getEventById( val.id )
	    			removeEvent.remove();
    			});				
    			if (vm.doctor.id) {
			    	vm.doctor.name = name+' - ';
			    	vm.selected.doctor = name;
					vm.scheduleLoading = true;
		    		vm.isFull = false;
    				vm.getDoctorSchedule(vm.doctor.id);
		    		vm.customerBooking = []; //clear data upon changing of doctor
    			} else {
			    	vm.doctor.name = '';
			    	vm.selected.doctor = '';
		    	}
		    },
			removeSpecialCharacters: function(string) {
				//includes removing of spaces
				return string.replace(/[^A-Z0-9]/ig, "");
			},
			validEmail: function(email) {
		    	let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		      	return re.test(email);
		    },
		    navigateMonth: function(nav) {
		    	if (nav == 'prev') {
			    	this.calendar.prev();
		    	} else if (nav == 'next') {
		    		this.calendar.next();
		    	}
		    	this.viewTitle = this.calendar.view.title;
		    }
		},
		computed: {
			totalErrors: function() {
				return Number(this.errors.length);
			},
			years: function() {
				const year = new Date().getFullYear()
      			return Array.from({length: year - 1900}, (value, index) => 1901 + index)
			}
		},
		created(){
			this.getAllAppointments();
			this.getAllDoctors();
			this.getAllProcedures();
			this.getAllBranches();
		},
		watch: {
			status: function() {
				if (this.status) {
					this.fullName = '';
					this.gender = '';
					this.contactNumber = '';
					this.birthDay = '';
					this.birthMonth = '';
					this.birthYear = '';
					this.email = '';
					this.source = '';
					this.remarks = '';
					this.agree = false;
			    	this.doctor.id = '';
			    	this.doctor.name = '';
			    	this.procedure = '';
			    	this.branch.id = '';
			    	this.customerBooking = []
			    	let vm = this;
			    	let events = this.calendar.getEvents();
	    			$.each(events, function(index, val) {
		    			let removeEvent = vm.calendar.getEventById( val.id )
		    			removeEvent.remove();
	    			});	
					this.getAllAppointments();
				}
			},
			showModal: function() {
				if (this.showModal === false) {
					$('body').css('overflow', 'auto');
				} else {
					$('body').css('overflow', 'hidden');
				}
			}
		},
		mounted() {
			// mounted() is called after DOM has been mounted so you can access  the reactive component, templates, and DOM elements and manipulate them. 
			this.fullcalendar();
			Vue.nextTick(function (){
				// Use it immediately after you’ve changed some data to wait for the DOM update.
			    // The whole view is rendered, so I can safely access or query the DOM. ¯\_(ツ)_/¯
			    // this.$nextTick(() => { });
			});

		},
		beforeMount(){
			// call before mounting DOM
		}

	});

	
});
 