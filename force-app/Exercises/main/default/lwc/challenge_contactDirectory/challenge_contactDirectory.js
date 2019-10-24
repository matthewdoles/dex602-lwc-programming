import { LightningElement, track, wire } from "lwc";
import getContacts from "@salesforce/apex/Contacts.getContacts";

export default class Challenge_contactDirectory extends LightningElement {
	@track contacts;
	@track firstLetter = "";
	error;

	@wire(getContacts, { firstLetter: "$firstLetter" })
	wired_getContacts(result) {
		this.contacts = [];
		if (result.data) {
			result.data.forEach(contact => {
				this.contacts.push({
					contactId: contact.Id,
					name: contact.Name,
					email: contact.Email,
					phone: contact.Phone
				});
			});
		} else if (result.error) {
			this.error = result.error;
		}
	}

	columnConfig = [
		{
			label: "Name",
			fieldName: "name",
			type: "text"
		},
		{
			label: "Email",
			fieldName: "email",
			type: "email"
		},
		{
			label: "Phone",
			fieldName: "phone",
			type: "phone"
		}
	];
}
