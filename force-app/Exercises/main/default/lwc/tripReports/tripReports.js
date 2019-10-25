import { LightningElement, track } from "lwc";

export default class TripReports extends LightningElement {
	@track mode = "browse";
	@track selectedRecordId = 0;

	handleTripReportModeChange(event) {
		this.mode = event.detail.mode;
		this.selectedTripReportId = event.detail.Id;
	}

	get browseMode() {
		return this.mode === "browse";
	}
	get addOrEditMode() {
		return this.mode === "add" || this.mode === "edit";
	}
}
