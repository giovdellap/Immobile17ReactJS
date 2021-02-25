import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Container } from "react-bootstrap";

const PersonalCalendar = ({ appuntamenti, onClick }) => {
	var events = [];
	console.log("PPP: " + appuntamenti.length);
	for (let i = 0; i < appuntamenti.length; i++) {
		const appuntamento = appuntamenti[i];
		var event = {
			start: appuntamento.inizio,
			end: appuntamento.fine,
			id: appuntamento.id,
		};
		events.push(event);
	}
	console.log("EVENTO:" + events);

	const today = new Date();
	return (
		<div>
			<Container fluid>
				{console.log("PORCA MADONNA")}
				<FullCalendar
					plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
					headerToolbar={{
						left: "prev,next today",
						center: "title",
						right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
					}}
					initialDate={
						today.getFullYear() +
						"-" +
						String(today.getMonth() + 1).padStart(2, "0") +
						"-" +
						today.getDate()
					}
					initialView="timeGridWeek"
					navLinks="true" // can click day/week names to navigate views
					businessHours="false" // display business hours
					editable="false"
					selectable="true"
					themeSystem="bootstrap"
					slotMinTime="07:00:00"
					slotMaxTime="22:00:00"
					events={events}
					eventClick={function (info) {
						onClick(info.event.id);
					}}
				/>
			</Container>
		</div>
	);
};

export default PersonalCalendar;
