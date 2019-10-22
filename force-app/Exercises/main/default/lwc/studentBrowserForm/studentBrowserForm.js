import { LightningElement, api, track, wire } from "lwc";
import getInstructors from "@salesforce/apex/StudentBrowserForm.getInstructors";
import getDeliveriesByInstructor from "@salesforce/apex/StudentBrowserForm.getDeliveriesByInstructor";
export default class StudentBrowserForm extends LightningElement {
	@track instructors = [];
	@track selectedInstructorId = '';
	@track deliveries = [];
	@track selectedDeliveryId = '';
	errors;

	@wire(getInstructors)
	wired_getInstructors({ error, data }) {
		this.instructors = [];
		if (data) {
			data.forEach(instructor => {
				this.instructors.push({
					value: instructor.Id,
					label: instructor.Name
				});
			});
		} else if (error) {
			this.error = error;
		}
	}

	@wire(getDeliveriesByInstructor, { instructorId: "$selectedInstructorId" })
	wired_getDeliveriesByInstructor({ error, data }) {
		this.deliveries = [];
		if (data) {
			this.deliveries.push({
				value: "",
				label: "Any Delivery"
			});
			data.forEach(delivery => {
				this.deliveries.push({
					value: delivery.Id,
					label: `${delivery.Start_Date__c} ${delivery.Location__c} ${delivery.Attendee_Count__c} students`
				});
			});
		} else if (error) {
			this.error = error;
		}
	}
	onInstructorChange(event) {
		this.selectedDeliveryId = '';
		this.selectedInstructorId = event.target.value;
	}
}
