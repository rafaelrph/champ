# Requirements
* Internet
* A browser which is running JavaScript

# Run
* At index.html

# Technology 
* Pure JavaScript and HTML5 (CSS3)
* No persistence layer

# Why didn't I create a persistence layer?
There is an API where all data is saved and shared. The focus is a simple website which gets, organises and provides relevant information about the leagues, matches, results, etc. This is a simple website so I didn't find any reason to create a persistence layer. 

On a production environment, a persistence layer would have be used to: save and organise differently the data, providing new information; improve the performance of the website, it will reduce the quantity of requests and returned data from API.

# Why did I choose pure JavaScript?
As I said before, this is a small and simple website. I want to bring the same simplicity to the source code. I didn't find any limitation on the features. JavaScript is getting more popular every second. JavaScript's become really powerful... I didn't use to develop in JavaScript, being honest, I have much more experience in Java, PHP, C# (I'm still working with these languages). I've started studying JS this year. I worked with AngularJS in a small project and I got really interested about JS. I've have been studying JS (ES6, TypeScript, Angular2, NodeJS) for months and I wanted to practice all of this knowledge on this project. 

I didn't use any JS framework because I want to show my develop skills. The project is pretty simple... I thought that a framework wasn't necessary.

I prefered to use JSON because it's really commom, has lots of resources and function on JS.

I know that on a production enrironment, we have to take care of security, build a more robust architecture, use frameworks, etc... As I said, I just want to show my skills, keep the project simple and well organised.

# Workflow
JS files are organised in classes using OOP and MVC concepts.

1. Get data from the API: created the "Service" class which connects and get data from the API. This class has: generic functions to connect to an API; API parameters (url, paths, ids, etc.); specific functions (get results, get teams, etc.)

2. Organise data: created the "Model" class which extract information from data. This class has functions which receive data from the Service class and provide the final information that is showed on the website.

3. Show the information: created the "View" class which inserts, the generated information from Model class, on the website (user interface).

4. Create a controller: created the "Controller" class which controls the features.

If the project was bigger, the classes (Service, Model, View and Controller) would become generic classes, leaving just generic functions. These classes would be extended by other specific classes.
