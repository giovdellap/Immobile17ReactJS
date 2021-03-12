import React from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import bootstrapPlugin from "@fullcalendar/bootstrap";
import { Container } from "react-bootstrap";
import { getDateString } from "../../../utils/dateUtils";
import { getEvents, getAppuntamentoFromId } from "../../../utils/calendarUtils";
import "../../../css/calendar/bootstrap.css";

/**
 *
 * @param changeWeek: listener dei prev/next buttons
 * @param today: listener del today button
 * @param start: start day
 * @param app: array appuntamenti
 * @param onClick: listener appuntamento
 * @returns rendering calendario
 */
const PrenotationCalendar = ({ changeWeek, today, start, app, onClick }) => {
	var events = [];
	if (typeof app !== "undefined") {
		events = getEvents(app);
	}
	var calendarRef = React.createRef();

	return (
		<div>
			<Container fluid>
				<FullCalendar
					plugins={[
						timeGridPlugin,
						interactionPlugin,
						bootstrapPlugin,
					]}
					ref={calendarRef}
					customButtons={{
						prevCustomButton: {
							text: "<",
							click: function () {
								changeWeek(true);
								calendarRef.current.getApi().prev();
							},
						},
						nextCustomButton: {
							text: ">",
							click: function () {
								changeWeek(false);
								calendarRef.current.getApi().next();
							},
						},
						todayCustomButton: {
							text: "Oggi",
							click: function () {
								today();
							},
						},
					}}
					headerToolbar={{
						left: "prevCustomButton,nextCustomButton,today",
						center: "title",
						right: "timeGridWeek,timeGridDay",
					}}
					initialDate={start + "T00:00:00"}
					initialView="timeGridWeek"
					navLinks="true" // can click day/week names to navigate views
					businessHours="false" // display business hours
					editable="false"
					selectable="true"
					allDaySlot={false}
					displayEventTime={false}
					slotMinTime="08:00:00"
					slotMaxTime="21:00:00"
					eventColor="#59abe3"
					events={events}
					eventClick={function (info) {
						onClick(getAppuntamentoFromId(info.event.id, app));
					}}
				/>
			</Container>
		</div>
	);
};

export default PrenotationCalendar;
