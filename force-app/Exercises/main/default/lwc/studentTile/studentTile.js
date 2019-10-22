import { LightningElement, api } from "lwc";

export default class StudentTile extends LightningElement {
	@api student = {
		Name: "Matthew Doles",
		PhotoUrl: "/services/images/photo/003B0FakePictId"
	};
	@api selected = false;
	get tileSelected() {
		return this.selected ? "tile selected " : "tile";
	}
	studentClick() {
		// eslint-disable-next-line no-alert
		alert(this.student.Name);
	}
}