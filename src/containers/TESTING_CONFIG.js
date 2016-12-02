const config = [
		{
			"type" : "T",
			"label" : "First Name",
			"tag" : "qrFirstName",
			"req" : true
		},
		{
			"type" : "T",
			"label" : "Last Name",
			"tag" : "qrLastName",
			"req" : true
		},
		{
			"type" : "T",
			"label" : "Attendee Type",
			"tag" : "qrAttendeeType",
			"req" : true
		},
		{
			"type" : "T",
			"label" : "Email",
			"tag" : "qrEmail",
			"req" : true
		},
		{
			"type" : "T",
			"label" : "Company",
			"tag" : "qrCompany",
			"req" : false
		},
		{
			"type" : "T",
			"label" : "Title",
			"tag" : "qrTitle",
			"req" : false
		},
		{
			"type" : "M",
			"label" : "Bands you like?",
			"tag" : "qrBands",
			"req" : true,
			"responses" : [{
				"rTag" : "qrBands_1",
				"rLabel" : "Beatles"
			}, {
				"rTag" : "qrBands_2",
				"rLabel" : "ACDC"
			}, {
				"rTag" : "qrBands_3",
				"rLabel" : "Bob Dylan"
			}, {
				"rTag" : "qrBands_4",
				"rLabel" : "Led Zeplin"
			}, {
				"rTag" : "qrBands_5",
				"rLabel" : "Katy Perry"
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
			"req" : false
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
			"responses" : [{
				"rTag" : "qrColor_1",
				"rLabel" : "Blue"
			}, {
				"rTag" : "qrColor_2",
				"rLabel" : "Green"
			}, {
				"rTag" : "qrColor_3",
				"rLabel" : "Red"
			}, {
				"rTag" : "qrColor_4",
				"rLabel" : "Yellow"
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