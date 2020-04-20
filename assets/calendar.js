$(document).ready(function($) {
	
	const addAppointmentAPI = 'inc/API/AddAppointment.php';
	const getDoctorsAPI = 'inc/API/GetDoctors.php';
	const getProceduresAPI = 'inc/API/Procedures.php';
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
			branches: [
				'Branch 1',
				'Branch 2',
				'Branch 3',
			],
			branch: '',
			doctors: [],
			doctor: { id: '', name: '' },
			procedures: [],
			procedure: '',
			appointments: []
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
			            info.el.classList.add('event-tooltip');
			            // info.el.setAttribute("data-tippy-content","Book Here");
			            // info.el.style.opacity = 1;
			            // info.el.style.verticalAlign = 'middle';
			            // info.el.style.textAlign = 'center';
			            // info.el.style.borderRadius = '20px';
			            // info.el.style.color = '#FFF';
			        	// var title = info.event.extendedProps.available;
			        	
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
						    	vm.isFull = false;
	        				}
            			}
						setTimeout(function(){
							// tippy('[data-tippy-content]');
						    tippy('.fc-bgevent.event-tooltip', {
						    	content: 'Book Now',
							});
						},100);
			        },
			        eventClick: function(info) { 
			        },
			        dayRender: function (info) {
			        	let allDates = moment(info.date).format('YYYY-MM-DD');
			        	let today = moment(new Date()).format('YYYY-MM-DD')
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
				    	let checkEvent = vm.appointments;
    					// let events = vm.calendar.getEvents();
				    	// let isFull = false;
				   //  	$.each(events, function(index, val) {
							// let d = moment(val.start).format('YYYY-MM-DD')
				   //  		if (d == date) {
							// 	console.log(date)
				   //  			isFull = true;
				   //  		}
				    	// Allow 1 event per day

							// if (val.extendedProps.appointment) {
							// 	let d = moment(val.start).format('YYYY-MM-DD')
					  //   		if (d == date) {
				   //  				isFull = true;
					  //   		}
							// }
						// });

				    	if ( !vm.isFull ) {
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
					            			vm.calendar.addEventSource([{
					            				id: Math.random().toString(36).substring(2, 10),
					            				title: procedureName,
					            				start: date,
					            				appointment: true,
					            				procedureId: procedureId,
					            				procedureDuration: procedureTime,
					            				docSchedId : val.id
					            			}]);
					            			vm.appointments.push({
					            				date: date,
					            				procedure_id: procedureId,
					            				procedure_duration: procedureTime
					            			});
					            		}
						    		});
						    		vm.isFull = true;
						    	}
					    	}
				    	}

				    },
				    // select: function(info) {
				    //   alert('selected ' + info.startStr + ' to ' + info.endStr);
				    // }
			    });
    			this.calendar.render();
				this.viewTitle = this.calendar.view.title;
			},
			addAppointment: function(e) {
				let bday = this.birthYear+'-'+this.birthMonth+'-'+this.birthDay;
				let isValidDate = moment(bday, 'YYYY-M-D', true);

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
				
    			let events = this.calendar.getEvents();
    			let appointment = [];
				$.each(events, function(index, val) {
					if (val.extendedProps.appointment) {
						appointment.push({
							id: val.extendedProps.procedureId,
							time: val.extendedProps.procedureDuration,
							doctor_schedule_id: val.extendedProps.docSchedId
						})
					}
				});
				if (appointment.length <= 0) {
					this.errors.push("Please book an appointment");
				}
				console.log(appointment[0].time)

				if (this.errors.length <= 0) {

					return new Promise((resolve, reject) => {
						let birthDate = moment(bday).format('YYYY-MM-DD');
						let vm = this;
						vm.loading = true;
						vm.status = false;
						axios({
							method: 'post',
						  	url: addAppointmentAPI,
						  	data: {
						    	full_name: this.fullName,
						    	gender: this.gender,
						    	contact_number: this.contactNumber,
						    	birth_date: birthDate,
						    	email_address: this.email,
						    	source: this.source,
						    	remarks: this.remarks,
						    	procedure_id: appointment[0].id,
						    	procedure_duration: appointment[0].time,
						    	doctor_id: this.doctor.id,
						    	doctor_schedule_id: appointment[0].doctor_schedule_id
						  	}
						})
						.then((response) => {
							console.log(response);
							setTimeout(function(){
								vm.loading = false;
							},500);
							if (response.data.status == 'success') {
								alert('Successfully Added')
								setTimeout(function(){
									vm.status = true;
								},500);
							} else if (response.data.status == 'full') {
								alert('Fully book')
							} else {
								alert('Something went wrong, Please try again')
							}
							resolve(response)
						})
						.catch((response) => {
							reject(response)
							setTimeout(function(){
								vm.loading = false;
							},500);
							alert('Something went wrong, Please try again')
						});
					});
					// let dateStart = moment(this.startDate).format('YYYY-MM-DD');
					// let dateEnd = moment(this.endDate).format('YYYY-MM-DD');
				}

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
				    // console.log(response)
				   	const doctorsData = response.data.doctors;
				    let docs = this.doctors;
				   	$.each(doctorsData, function(index, val) {
				   		// console.log(val.name)
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
				    // console.log(response);
				    let vm = this;
				    let doctorScheds = [];
				    if (response.data.status == 'success') {
				    	let sched = response.data.schedule;
				    	$.each(sched, function(index, val) {
				    		let startTime = JSON.parse(val.time_duration).start;
				    		let endTime = JSON.parse(val.time_duration).end;
				    		doctorScheds.push({
				    			id: val.id,
				    			available: true,
				    			title: "Available", //val.id
				    			start: val.date_available,
				    			end: val.date_available,
				    			start_time: startTime,
				    			end_time: endTime,
				    			time_left: val.time_left,
				    			rendering: 'background',
						        // color: '#7cae66',
						     	// display: 'background',
						        backgroundColor: '#7cae66',
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
				    		let hourText = "";
				    		let minuteText = "";
				    		let hour = Number(moment(val.duration, "HH:mm").format("HH"));
				    		let minute = Number(moment(val.duration, "HH:mm").format("m"));
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
				    		// console.log(hourText+minuteText);
						    let procedureName = val.name+" ("+hourText+minuteText+")";
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
			validEmail: function(email) {
		    	let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		      	return re.test(email);
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
					vm.scheduleLoading = true;
					vm.appointments = [];
		    		vm.isFull = false;
    				vm.getDoctorSchedule(vm.doctor.id);
    			} else {
			    	vm.doctor.name = '';
		    	}
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
			this.getAllDoctors();
			this.getAllProcedures();
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
			    	this.procedure= '';
			    	let vm = this;
			    	let events = this.calendar.getEvents();
	    			$.each(events, function(index, val) {
		    			let removeEvent = vm.calendar.getEventById( val.id )
		    			removeEvent.remove();
	    			});	
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
	
	// Vue.component('fullcalendar',{
		// data: function() {
			// return {
				// count: 0
			// }
		// },
		// props: [],
		// template: '#calendar'
	// });
    
   //  console.log(getJsonEvents());
   //  function getJsonEvents() {
   //  	var events1 = [
		 //    {
			//     "title": "All Day Event",
			//     "start": "2020-02-01"
			// },
			// {
			//     "title": "Long Event",
			//     "start": "2020-02-07",
			//     "end": "2020-02-10"
			// },
			// {
			//     "title": "Long Event",
			//     "start": "2020-02-07",
			//     "end": "2020-02-10"
			// },
		 //  ];
   //  	var events = [];
   //  	var asd = [];

   //  	$.getJSON('assets/events.json', function(result) {
   //  		$.each( result, function( key, val ) {
			//     // events.push( "<li id='" + key + "'>" + val + "</li>" );
   //  			// console.log(val)
	  //   		events.push(val)
			// });
   //  	});
   //  	return asd.push(events);
   //  }
});
 