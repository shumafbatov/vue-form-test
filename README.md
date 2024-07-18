# vue-form-test

Write a one page application that contains a form with two fields
email (required) and number (optional)
and submit button
When you click submit, the request goes to the backend where you need to find suitable ones in JSON
according to user search query
display the found data on the client under the form

### Conditions
- you need to add a request processing delay of 5 seconds on the backend (simulating a long response processing time).
  When re-requesting from the front, cancel the previous request.
- mandatory validation of the email and number fields.
  Can be done either on the front or back, be prepared to explain the chosen approach
- at the front on the number field you need to add a mask,
  so that the number is displayed with hyphens every two characters. for example 22-11-22, 83-03-47

### Requirements
- react or vue front (typing to choose from)
- nodejs back (typing is required)
- libraries at your discretion

## Project Setup
You can set the server to ```.env```
```sh
npm install
npm run dev
```

### Data from the server is defined as a constant:

```
[{
email: ‘jim@gmail.com’,
number: ‘221122’
}, {
email: ‘jam@gmail.com’,
number: ‘830347’
}, {
email: ‘john@gmail.com’,
number: ‘221122’
}, {
email: ‘jams@gmail.com’,
number: ‘349425’
}, {
email: ‘jams@gmail.com’,
number: ‘141424’
}, {
email: ‘jill@gmail.com’,
number: ‘822287’
}, {
email: ‘jill@gmail.com’,
number: ‘822286’
}]
```


