# billing_standalone
This is a standalone, desktop all that is used to test Avatar billing before final review and validation.


2-12-16
	You stopped working on this again. You left off with finishing the 835 generation but you have no idea if it is correct. Run the generated 835 through clardi or some other thing to see how borked it is.

#### To-do list

* Find out what the hell it is supposed to do.


You added the alert for things. Maybe turn it into a controller for custom alerts. Also animate the appearance and removal.


#### Usefull things

##### Node Webkit cheatsheet
https://gentlenode.com/journal/node-webkit-1-complete-cheatsheet/26

##### Bootstrap material design
http://fezvrasta.github.io/bootstrap-material-design/

##### Angular JS file upload
https://github.com/danialfarid/ng-file-upload


QforV

Can multiple claims be on one 837?
  How are they distinguished apart from each other?

The Perl 835 generator has the option of denying select claims. Do we want to retain that ability for this version?
  This will be v2 of the application. Just the basic, approve-everything setup will be enough to test the billing process.
  For v2, when the user drops the file in, instead of showing the jibberish text, show all of the claims available and give the user the ability to deny any of them with neato material check boxes or something. 
