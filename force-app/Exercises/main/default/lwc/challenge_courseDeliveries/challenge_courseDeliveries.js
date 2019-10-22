import { LightningElement, track, wire } from "lwc";
import getRecentDeliveries from "@salesforce/apex/CourseDeliveries.getRecentDeliveries";

export default class Challenge_courseDeliveries extends LightningElement {
	@track deliveries = [];
	@track error = "";
	@wire(getRecentDeliveries)
	wired_getRecentDeliveries({ error, data }) {
		this.deliveries = [];
		if (data) {
			data.forEach(delivery => {
				this.deliveries.push({
					value: delivery.Id,
					name: delivery.Course__r.Name,
                    location: delivery.Location__c,
                    startDate: delivery.Start_Date__c
				});
			});
		} else if (error) {
			this.error = error;
		}
	}
}
