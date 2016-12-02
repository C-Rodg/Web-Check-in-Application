const config = [
		{
			"type" : "T",
			"label" : "First Name",
			"tag" : "qrFirstName",
			"req" : true,
			"disabled" : false,
			"hint" : "FIRSTNAME"
		},
		{
			"type" : "T",
			"label" : "Last Name",
			"tag" : "qrLastName",
			"req" : true,
			"disabled" : false,
			"hint" : "LASTNAME"
		},
		{
			"type" : "T",
			"label" : "Attendee Type",
			"tag" : "qrAttendeeType",
			"req" : true,
			"disabled" : false
		},
		{
			"type" : "T",
			"label" : "Email",
			"tag" : "qrEmail",
			"req" : true,
			"disabled" : false,
			"hint" : "EMAIL"
		},
		{
			"type" : "T",
			"label" : "Company",
			"tag" : "qrCompany",
			"req" : false,
			"disabled" : false,
			"hint" : "COMPANY"
		},
		{
			"type" : "T",
			"label" : "Title",
			"tag" : "qrTitle",
			"req" : false,
			"disabled" : true
		},
		{
			"type" : "M",
			"label" : "Bands you like?",
			"tag" : "qrBands",
			"req" : true,
			"responses" : [{
				"rTag" : "qrBands_1",
				"rLabel" : "Beatles",
				"disabled" : false
			}, {
				"rTag" : "qrBands_2",
				"rLabel" : "ACDC",
				"disabled" : false
			}, {
				"rTag" : "qrBands_3",
				"rLabel" : "Bob Dylan",
				"disabled" : true
			}, {
				"rTag" : "qrBands_4",
				"rLabel" : "Led Zeplin",
				"disabled" : false
			}, {
				"rTag" : "qrBands_5",
				"rLabel" : "Katy Perry",
				"disabled" : false
			}]
		},
		{
			"type" : "T",
			"label" : "Address 1",
			"tag" : "qrAddress1",
			"req" : false
		},
		{
			"type" : "T",
			"label" : "Address 2",
			"tag" : "qrAddress2",
			"req" : false
		},
		{
			"type" : "T",
			"label" : "City",
			"tag" : "qrCity",
			"req" : false
		},
		{
			"type" : "T",
			"label" : "State",
			"tag" : "qrState",
			"req" : false
		},
		{
			"type" : "T",
			"label" : "Zip Code",
			"tag" : "qrZip",
			"req" : false,
			"disabled" : false
		},
		{
			"type" : "T",
			"label" : "Country",
			"tag" : "qrCountry",
			"req" : true
		},
		{
			"type" : "O",
			"label" : "What is your favorite color?",
			"tag" : "qrColor",
			"req" : true,			
			"hint" : "ATTENDEETYPE",
			"responses" : [{
				"rTag" : "qrColor_1",
				"rLabel" : "Blue",
				"disabled" : false
			}, {
				"rTag" : "qrColor_2",
				"rLabel" : "Green"
			}, {
				"rTag" : "qrColor_3",
				"rLabel" : "Red",
				"disabled" : false
			}, {
				"rTag" : "qrColor_4",
				"rLabel" : "Yellow",
				"disabled" : true
			}, {
				"rTag" : "qrColor_5",
				"rLabel" : "Pink"
			}]
		},
		{
			"type" : "T",
			"label" : "Phone",
			"tag" : "qrPhone",
			"req" : false
		}
	];

export default config;