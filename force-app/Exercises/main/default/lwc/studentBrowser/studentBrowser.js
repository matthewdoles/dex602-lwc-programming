import { LightningElement, track, wire } from 'lwc';
import getStudents from '@salesforce/apex/StudentBrowser.getStudents';

export default class StudentBrowser extends LightningElement {
    @track selectedInstructorId;
    @track selectedDeliveryId;
    
    @wire(getStudents,{ instructorId: "$selectedInstructorId", courseDeliveryId: "$selectedDeliveryId"}) 
    students;

    handleFilterChange(event) {
        this.selectedInstructorId = event.detail.instructorId;
        this.selectedDeliveryId = event.detail.deliveryId;
    }
}