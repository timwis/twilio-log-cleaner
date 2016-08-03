# Twilio Log Cleaner

Anonymizes twilio SMS logs for use as public sample data or test fixtures.
If you're building an application that uses twilio SMS logs, you may want
to include sample logs in your tests or source code. But you don't want to
give real phone numbers, or your `Account SID`, etc. This tool just replaces
all the potentially sensitive/identifying data with random data.

* `sid`
* `account_sid` and `accountSid`
* `to` and `from`
* `body`
* `account` and `message` and `pagetoken` in all the `uri` fields

## Usage

1. Install dependencies via `npm install`
2. Run using `node clean.js <path-to-file.json>`
