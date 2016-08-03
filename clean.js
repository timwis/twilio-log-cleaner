const fs = require('fs')
const lipsum = require('lorem-ipsum')

const filename = process.argv[2]
if (!filename) throw new Error('No filename specified')

const file = fs.readFileSync(filename, 'utf8')
const fixture = JSON.parse(file)
const newFixture = Object.assign({}, fixture)

accountId = generateAccountId()
pageToken = generatePageToken()
const phones = {}

const uriProps = [
  'uri',
  'next_page_uri',
  'nextPageUri',
  'first_page_uri',
  'firstPageUri',
  'previous_page_uri',
  'previousPageUri',
]
uriProps.forEach((prop) => {
  if (newFixture[prop]) {
    newFixture[prop] = replaceAccountId(newFixture[prop], accountId)
    newFixture[prop] = replacePageToken(newFixture[prop], pageToken)
  }
})

newFixture.messages = fixture.messages.map((msg) => {
  msg.sid = generateMessageId()
  msg.account_sid = accountId
  msg.accountSid = accountId
  msg.to = getPhoneReplacement(msg.to)
  msg.from = getPhoneReplacement(msg.from)
  msg.body = generateBody()

  msg.uri = replaceAccountId(msg.uri, accountId)
  msg.uri = replaceMessageId(msg.uri, msg.sid)

  msg.subresource_uris.media = replaceAccountId(msg.subresource_uris.media, accountId)
  msg.subresource_uris.media = replaceMessageId(msg.subresource_uris.media, msg.sid)

  msg.subresourceUris.media = replaceAccountId(msg.subresourceUris.media, accountId)
  msg.subresourceUris.media = replaceMessageId(msg.subresourceUris.media, msg.sid)
  return msg
})

// output cleaned fixture
console.log(JSON.stringify(newFixture, null, 2))

function generateAccountId () {
  return 'AC' + guid()
}

function replaceAccountId (str, accountId) {
  return str.replace(/Accounts\/[^\/]+/, 'Accounts/' + accountId)
}

function generatePageToken () {
  return 'PA' + guid()
}

function replacePageToken (str, pageToken) {
  return str.replace(/&PageToken=.+/, '&PageToken=' + pageToken)
}

function generateMessageId () {
  return 'SM' + guid()
}

function replaceMessageId (str, messageId) {
  return str.replace(/Messages\/[^\/]+/, 'Messages/' + messageId)
}

function generatePhone () {
  return '+1' + (Math.random()+'').substring(2, 12)
}

function getPhoneReplacement (phone) {
  if (!phones[phone]) {
    phones[phone] = generatePhone()
  }
  return phones[phone]
}

function generateBody () {
  return lipsum()
}

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1)
  }
  return s4() + s4() + s4() + s4() + s4() + s4() + s4() + s4()
}
