

const Censoring =  require('censoring');


let Message = {
	sanityCheck( text ) {
		let output = '';

		let scan = new Censoring();
		scan.enableFilters(['phone_number', 'email_address']);

		scan.prepare(text);

		if ( scan.test() ) {
			output = scan.replace();
		} else { output = text; }

		return output;
	}
}

module.exports =  Censoring;
