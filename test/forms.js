function sendForm(define, someCode) {

    var define;
    var someCode;
    if (define == 'postCode') {

        var tempObj = {
                form: {
                    postCode: someCode
                    }
                }
        return tempObj;
    }
    if (define == 'addressId') {

        var tempObj = {
                form: {
                    addressId: someCode
                }
        }
        return tempObj;
    }
};


function sendDetails (who) {
    var who;
    var tempObj = {

        clientDetails: {

            InsuranceFor: who,
            Title: 'someTitle',
            FirstName: 'firstName',
            LastName: 'lastName',
            DOB: 'dob',
            TelephoneNumber: 'telephoneNumber',
            EmailAddress: 'email',
            MarketingEmails: 'marketingEmail',
            QuoteSource: 'quoteSource',
            SessionMarketingSource: 'sessionMarketingSource',
        }
    }
    return tempObj;
};



    module.exports = {

        sendForm: sendForm,
        sendDetails: sendDetails,

    }