Project description
-------------------
Full-stack webbased implementation of the following:

 - Users
	 - Managers
		 - Has employees
		 - Can add questions for employees to fill in
		 - Can view graphs of filled in questions
	 - Employees
		 - Can answer questions from their managers - with a score from 0-10

Implementation
--------------
**Front-end**

 - Angular
	 - AJAX connection with back-end API
 - SASS
 - Gulp-based build system
	 - browser-sync (tool, synchronized browser testing)
	 - JSLint
	 - HTML, CSS, JS minification and concatenation
 - Bower and NPM package management

**Back-end**
- Model-Controller
- Laravel (PHP Framework)
- JSON, Model-based API endpoints
- Database migrations and seeding