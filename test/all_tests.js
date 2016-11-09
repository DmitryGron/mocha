var expect  = require("chai").expect;
var assert = require('assert');
var chai = require('chai');
var request = require("request");
var url = require('./api');
var pages = require('./pages');
var forms = require('./forms');
var resp = require('./response');




describe("TowerGate", function() {

    var findUrl = url.home+pages.find; // link to address page for finding postcode
    var occupationUrl = url.home+pages.occupations; // occupation page
    var retrieveUrl = url.home+pages.retrieve; // link to address page for finding ifo regarding postcode
    var claimsUrl = url.home+pages.claims; // claims page
    var detailsUrl = url.home+pages.details; // clientDetails page

    var expectedResponse = 200;
    var addressId; // empty var for addressId
    var postCode = '02004';
    var definePostCode = 'postCode';
    var defineAddress = 'addressId';
    var clients = ["individual", "executor", "trustee", "power of attorney"];



    this.timeout(20000);

	describe("occupation", function() {


		it("returns status 200 and return occupation", function(done) {
			var expectedBody = resp.occupation; // container for

	        request.get(occupationUrl, function(error, response, body) {
				expect(response.statusCode).to.equal(expectedResponse);
				expect(JSON.parse(body)).to.deep.equal(expectedBody);
				done();
			});

		});
	});

	describe("address", function() {

        it("return postcode", function(done) {
            var checkNoError = resp.checkPostcodeError;


            request.post(findUrl,  forms.sendForm(definePostCode, postCode), function (error, response, body) {
                expect(JSON.parse(body)).to.have.not.deep.property(checkNoError);
                expect(response.statusCode).to.equal(expectedResponse);
                parsedBody = JSON.parse(body);
                addressId = parsedBody.addressList[0].Id;
                done();
            });
        });

        it("return retrieve", function(done) {
            var checkNoError = resp.checkError;

            request.post(retrieveUrl, forms.sendForm(defineAddress, addressId), function (error, response, body) {
                expect(response.statusCode).to.equal(expectedResponse);
                parsedBody = JSON.parse(body);
                expect(parsedBody).to.have.not.deep.property(checkNoError);
                done();
            });
        });
    });

    describe("claims", function() {






        it("return claims", function(done) {



            var checkClaims= resp.claimsResponse;
            var checkNoError = resp.checkError;

            request.get(claimsUrl, function (error, response, body) {
                expect(response.statusCode).to.equal(expectedResponse);
                expect(JSON.parse(body)).to.have.not.deep.property(checkNoError);
                expect(JSON.parse(body)).to.have.deep.property(checkClaims);
                done();
            });
        });
    });


    describe("details", function() {
        it("return claims", function(done) {
            var expected = clients.length;

            function checkDone() {
              expected--;
//              console.log("EXPECTED>>>", expected);
              if (expected === 0) {
                done();
              }
            }

            clients.forEach(function (item, clients) {
                var who = forms.sendDetails(item);

                request.post(detailsUrl, who, function(error, response, body) {
//                    console.log("who>>>", who);

                    parsedBody = JSON.parse(body);
//                    console.log("BODY>>>", parsedBody);

                    expect(parsedBody.QuoteId).to.deep.equal(3903);
                    expect(response.statusCode).to.equal(expectedResponse);
                    checkDone();
                });

            });

        });
    });












});
