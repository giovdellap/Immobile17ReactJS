import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import bootstrapPlugin from "@fullcalendar/bootstrap";
import listPlugin from "@fullcalendar/list";
import { Container } from "react-bootstrap";
import { getEvents } from "../../../utils/calendarUtils";
import "../../../css/calendar/bootstrap.css";

/**
 *
 * @param appuntamenti gli appuntamenti da visualizzare
 * @param onClick listener degli appuntamenti
 * @returns il rendering del calendario utente
 */
const PersonalCalendar = ({ appuntamenti, onClick }) => {
	const events = getEvents(appuntamenti);

	return (
		<div>
			<Container fluid>
				<FullCalendar
					plugins={[
						dayGridPlugin,
						timeGridPlugin,
						interactionPlugin,
						listPlugin,
						bootstrapPlugin,
					]}
					headerToolbar={{
						left: "prev,next,today",
						center: "title",
						right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
					}}
					initialView="timeGridWeek"
					navLinks="true" // can click day/week names to navigate views
					businessHours="false" // display business hours
					editable="false"
					selectable="true"
					slotMinTime="07:00:00"
					slotMaxTime="22:00:00"
					allDaySlot={false}
					displayEventTime={false}
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
