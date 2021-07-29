const validator = {};

validator.check = () => {
	let fields = document.getElementsByClassName('required');
	if(fields.length != 0) {
		let error = '';
		Object.keys(fields).map((key) => {
			if(fields[key].value.length == 0) {
				error += fields[key].getAttribute('data-id') + ', ';
			}
		});
		return error;
	}
};

export default validator;
