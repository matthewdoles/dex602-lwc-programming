import { LightningElement, track, wire } from "lwc";
import getStudents from "@salesforce/apex/StudentBrowser.getStudents";
import { fireEvent } from "c/pubsub";
import { CurrentPageReference } from "lightning/navigation";

export default class StudentBrowser extends LightningElement {
	@track selectedInstructorId;
	@track selectedDeliveryId;

	@wire(CurrentPageReference) pageRef;

	@wire(getStudents, { instructorId: "$selectedInstructorId", courseDeliveryId: "$selectedDeliveryId" })
	students;

	handleFilterChange(event) {
		this.selectedInstructorId = event.detail.instructorId;
		this.selectedDeliveryId = event.detail.deliveryId;
	}

	handleStudentSelected(event) {
		const studentId = event.detail.studentId;
		this.updateSelectedStudent(studentId);
	}
	updateSelectedStudent(studentId) {
		fireEvent(this.pageRef, "studentChange", { studentId });
	}
}
