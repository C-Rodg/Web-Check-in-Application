# Web-Check-in-Application
A web registration check-in system.

## Description

A web registration check-in system using Webpack, React, and Redux.

## Config File
Configure the sampleEventConfig.json with the available fields for walk-ins / fields that can be viewed in admin mode, SMS functionality, Attendee Mode configuration, and Cancel status configuration.  

### Cancelled Strings
This is an array that contains xml element strings that indicate a cancelled registrant i.e. "<qrStatus>Cancelled</qrStatus>".

### Attendee Mode
SearchBy - lastname, email, both.  Enable/disable attendee mode searching, scanning, and walk-ins.

### SMS
Enable/disable SMS functionality.  PhoneField - a field to match on (i.e. 'qrRepNumber') must be specified.  Message - the message to send to number.  Can use placeholders {{qrFirstName}} within message to retreive values from survey data.

### Question Types
Question types include 'T' (text), 'TO' (text - pickone), 'M' (pickmany), 'O' (pickone).

## Contributors

Curtis Rodgers (me) : https://curtisrodgers.com
