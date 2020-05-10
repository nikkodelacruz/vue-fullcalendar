$(document).ready(function($) {

	// register modal component
    Vue.component("modal", {
    	template: "#modal-template"
    });
window['moment-range'].extendMoment(moment);
    const day_start = moment().startOf('day').hours(7); // 7 am
const day_end   = moment().startOf('day').hours(10) // 10 pm
const day = moment.range(day_start, day_end)
const time_slots = Array.from(day.by('hours', {step: 1}))
// console.log(time_slots);

	
	const start_datex = new Date("2016-05-04T01:00:00");
	let start_date = new Date("2016-05-04T01:00:00");
let  end_date   = new Date("2016-05-04T20:00:00");

var slices = [];
var count = 0;
// var moment;

while (end_date >= start_date) {
    // start = new Date(start.getTime() + (60*60*1000));
    start_date = moment(start_date).add(1, 'h').add(30, 'm');
    slices[count] = moment(start_date).format('h:mm A');
    count++;
}
slices.unshift(moment(start_datex).format('h:mm A'));
slices.pop();
console.log(slices)
// console.log(moment(start_date).format('h:mm'));
// console.log(start.getTime())//1462312800000
// console.log(moment(start).format("h:mm")+ (60*60*1000));

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
			appointments: [],
			showModal: false,
			modalContent: { doctor: '', schedule: '', timeSlot: '' }
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
			            // info.el.setAttribute("data-tippy-content","Book Here");
			            // info.el.style.opacity = 1;
			            // info.el.style.verticalAlign = 'middle';
			            // info.el.style.textAlign = 'center';
			            // info.el.style.borderRadius = '20px';
			            // info.el.style.color = '#FFF';
			        	
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
				    	let checkEvent = vm.appointments;
    					
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
									// show modal
									vm.showModal = true;
						    		$.each(schedule, function(index, val) {
					            		if (val.start == date) {
					            			// console.log(val)
					            			var start = new Date("2016-05-04T00:00:00.000Z");
											var end   = new Date("2016-05-04T23:59:59.999Z");

											var slices = {};
											var count = 0;
											var moment;

											while (end >= start) {
											    start = new Date(start.getTime() + (15*60*1000));
											    slices[count] = start;
											    count++;
											}
											console.log(slices);
					            			vm.modalContent.schedule = val.start_time+' - '+val.end_time;
			        						if (val.available) {
						            			vm.calendar.addEventSource([{
						            				id: Math.random().toString(36).substring(2, 10),
						            				title: procedureName,
						            				start: date,
						            				appointment: true,
						            				procedure_id: procedureId,
						            				procedure_duration: procedureTime,
						            				schedule_id : val.id // doctor schedule id
						            			}]);
						            			// vm.appointments.push({
						            			// 	date: date,
						            			// 	procedure_id: procedureId,
						            			// 	procedure_duration: procedureTime
						            			// });
						    					// vm.isFull = true;
			        						}
					            		}
						    		});
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
    			let appointments = [];
				$.each(events, function(index, val) {
					if (val.extendedProps.appointment) { //get only the appointment
						appointments.push({
							id: val.extendedProps.procedure_id,
							date: moment(val.start).format('YYYY-MM-DD'),
							time_duration: val.extendedProps.procedure_duration,
							schedule_id: val.extendedProps.schedule_id, //doctor schedule id
						})
					}
				});
				if (appointments.length <= 0) {
					this.errors.push("Please book an appointment");
				}
				// console.log(appointments)

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
						    	doctor_id: this.doctor.id, //selected doctor
						    	appointments: appointments
						    	// procedure_id: appointment[0].id,
						    	// procedure_duration: appointment[0].time,
						    	// doctor_schedule_id: appointment[0].doctor_schedule_id
						  	}
						})
						.then((response) => {
							console.log(response);
							setTimeout(function(){
								vm.loading = false;
							},500);

							if (response.data.status == 'invalid') {
								let dates = response.data.data;
								$.each(dates, function(index, val) {
									let date = moment(new Date(val)).format('LL')
									let message = "Selected procedure on "+date+" has already reached the time remaining, \nPlease choose another date or procedure";
									alert(message);
								});
							} else if (response.data.status == 'success') {
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
				    let vm = this;
				    let doctorScheds = [];
				    if (response.data.status == 'success') {
				    	let sched = response.data.schedule;
				    	$.each(sched, function(index, val) {

				    		let startTime = JSON.parse(val.time_duration).start;
				    		let endTime = JSON.parse(val.time_duration).end;
				    		let timeLeft = Number(moment(val.time_left, "HH:mm").format("HH"));
					    	console.log(val.date_available);

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
			    	vm.modalContent.doctor = name;
					vm.scheduleLoading = true;
					vm.appointments = [];
		    		vm.isFull = false;
    				vm.getDoctorSchedule(vm.doctor.id);
    			} else {
			    	vm.doctor.name = '';
			    	vm.modalContent.doctor = '';
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

	
});
 