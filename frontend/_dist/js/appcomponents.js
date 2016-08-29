!function(){function e(e,n,r){return{request:function(e){return e.headers=e.headers||{},e},responseError:function(e){return 404===e.status?(r.path("/"),n.reject(e)):n.reject(e)}}}function n(e,n){e.$state=n,console.info("angular run()")}angular.module("arboplaats",["ui.router","ngResource","ngStorage","arboplaats.api","rzModule","chart.js"]),angular.module("arboplaats").factory("authInterceptor",e),e.$inject=["$rootScope","$q","$location"],angular.module("arboplaats").run(n),n.$inject=["$rootScope","$state"]}(),function(){function e(e,n,r,s){n.html5Mode(!1);var a={templateUrl:"app/navbar/navbar.html",controller:"NavbarController"};e.state("index",{url:"",views:{NavbarView:a,MainView:{templateUrl:"app/login/login.html",controller:"LoginController"}}}).state("login",{url:"/login",views:{NavbarView:a,MainView:{templateUrl:"app/login/login.html",controller:"LoginController"}}}).state("answering",{url:"/survey",views:{NavbarView:a,MainView:{templateUrl:"app/answering/answering.html",controller:"AnsweringController"}}}).state("manager",{url:"/manager",views:{NavbarView:a,MainView:{templateUrl:"app/manager/manager_portal.html",controller:"ManagerPortalController"}}}).state("manager-employee",{url:"/manager/employee/:user_id",views:{NavbarView:a,MainView:{templateUrl:"app/manager/employee/employee.html",controller:"ManagerEmployeeController"}}}).state("admin",{url:"/admin",views:{NavbarView:a,MainView:{templateUrl:"app/admin/admin.html",controller:"AdminController"}}})}angular.module("arboplaats").config(e),e.$inject=["$stateProvider","$locationProvider","$httpProvider","$compileProvider"]}(),function(){angular.module("arboplaats").constant("CONSTANTS",{API_BASE:"http://localhost:8000"})}(),function(){angular.module("arboplaats.api",["ngResource"]).run()}(),function(){function e(e,n){var r=n.API_BASE;return console.log(r),e(r+"/user/:user_id",{},{login:{url:r+"/user/login",method:"POST",params:{}},createManager:{url:r+"/user/createManager",method:"POST",params:{}},getEmployees:{url:r+"/manager/:manager_id/employees",method:"GET",params:{manager_id:"@manager_id"}},get:{url:r+"/user/:user_id",method:"GET",params:{user_id:"@user_id"}}})}angular.module("arboplaats.api").factory("UserAPI",e),e.$inject=["$resource","CONSTANTS"]}(),function(){function e(e,n){var r=n.API_BASE;return e(r,{},{create:{url:r+"/employee/:user_id/answers",method:"POST",params:{user_id:"@user_id"}},byUser:{url:r+"/employee/:user_id/answers",method:"GET",params:{user_id:"@user_id"}}})}angular.module("arboplaats.api").factory("AnswerAPI",e),e.$inject=["$resource","CONSTANTS"]}(),function(){function e(e,n){var r=n.API_BASE;return e(r+"",{},{getAll:{url:r+"/manager/:manager_id/questions",method:"GET",params:{}},create:{url:r+"/manager/:manager_id/questions",method:"POST",params:{manager_id:"@manager_id"}}})}angular.module("arboplaats.api").factory("QuestionAPI",e),e.$inject=["$resource","CONSTANTS"]}(),function(){function e(){}angular.module("arboplaats").controller("HomeController",e),e.$inject=[]}(),function(){function e(e,n,r){e.User=n}angular.module("arboplaats").controller("NavbarController",e),e.$inject=["$scope","User","$state"]}(),function(){function e(e,n,r,s){n.form={email:"test@manager.nl",password:"test"},n.test="",n.login=function(){console.log("Logging in"),e.login({email:n.form.email,password:n.form.password}).then(function(e){"success"==e.status?s.isManager()?r.go("manager"):r.go("answering"):alert("Onjuiste inloggegevens.")})}}angular.module("arboplaats").controller("LoginController",e),e.$inject=["UserManager","$scope","$state","User"]}(),function(){function e(e,n,r,s,a){n.viewState={current:"start",possible:["start","answers-sending","answers-sent"],set:function(e){return _.contains(this.possible,e)?void(this.current=e):void console.error("impossible view state; "+e)},is:function(e){return _.contains(this.possible,e)?this.current==e:(console.error("impossible view state; "+e),!1)}};var t=function(){s.questions(a.user.employee_manager_id).then(function(e){if("success"==e.status){var r=e.questions;for(var s in r)r[s].score=5;n.questions=r}else alert("Er is iets mis gegaan bij het ophalen van de vragen.")})};n.questions=[],n.isLoading=!1,n.sendAnswers=function(){var e=n.questions;for(var r in e)e[r].question_id=e[r].id;n.viewState.set("answers-sending"),s.answer(a.user.id,n.questions).then(function(e){"success"==e.status?n.viewState.set("answers-sent"):(console.error(e),alert("Er is iets mis gegaan bij het opslaan van de antwoorden."))})},t()}angular.module("arboplaats").controller("AnsweringController",e),e.$inject=["UserManager","$scope","$state","SurveyManager","$localStorage"]}(),function(){function e(){var e={restrict:"E",templateUrl:"app/answering/defaultSlider.directive.html",scope:{question:"="},link:function(e,n,r,s){e.slider={options:{showTicks:!0,showTicksValues:!0,floor:1,ceil:10,getTickColor:function(e){return e<3?"red":e<6?"orange":e<9?"yellow":"#2AE02A"}}}}};return e}angular.module("arboplaats").directive("defaultSlider",e)}(),function(){function e(e,n,r,s){e.employees=[],e.questions=[],e.test="",e.addingQuestionText="";var a=function(){r.questions(n.user.manager_id).then(function(n){"success"==n.status?(e.questions=n.questions,console.log(e.questions)):alert("Er is iets mis gegaan bij het ophalen van de employees.")}),s.getEmployeesByManagerId(n.user.manager_id).then(function(n){"success"==n.status?(e.employees=n.employees,console.log(e.employees)):alert("Er is iets mis gegaan bij het ophalen van de vragen.")})};e.addQuestion=function(){r.addQuestion(n.user.manager_id,e.addingQuestionText).then(function(n){console.log(n),"success"==n.status?e.questions.push(n.question):alert("Er is iets mis gegaan bij het ophalen van de vragen.")})},a()}angular.module("arboplaats").controller("ManagerPortalController",e),e.$inject=["$scope","$localStorage","SurveyManager","UserManager"]}(),function(){function e(e,n,r,s,a,t){e.employee={},e.questions=[];var o=[],i=[];e.addingQuestionText="";var u=function(){s.questions(r.user.manager_id).then(function(n){"success"==n.status?(e.questions=n.questions,console.log(e.questions)):alert("Er is iets mis gegaan bij het ophalen van de employees.")}),t.byUser(n.user_id).then(function(n){"success"==n.status?(e.answers=n.answers,i=n.answers,l(n.answers)):alert("Er is iets mis gegaan bij het ophalen van de vragen.")}),a.getByUserId(n.user_id).then(function(n){"success"==n.status?e.employee=n.user:alert("Er is iets mis gegaan bij het ophalen van de vragen.")})};e.addQuestion=function(){s.addQuestion(r.user.manager_id,e.addingQuestionText).then(function(n){console.log(n),"success"==n.status?e.questions.push(n.question):alert("Er is iets mis gegaan bij het ophalen van de vragen.")})},e.labels=["Week 1","Week 2","Week 3","Week 4","Week 5","Week 6","Week 7"],e.series=["Series A","Series B"],e.data=[[65,59,80,81,56,55,40],[28,48,40,19,86,27,90]],e.datasetOverride=[{yAxisID:"y-axis-1"}],e.options={scales:{yAxes:[{id:"y-axis-1",type:"linear",display:!0,position:"left"}]}};var l=function(n){var r=n;e.series=[],e.data=[];for(question_id in n)if(console.log(o),console.log(question_id),_.indexOf(o,parseInt(question_id))<0&&console.log("aaaaa"),!(_.indexOf(o,parseInt(question_id))<0)){var r=n[question_id],s=[];for(j in r){var a=r[j];s.push(a.score)}e.data.push(s),e.series.push("Vraag "+r[0].question_id)}};e.questionIsActive=function(e){return!(_.indexOf(o,e)<0)},e.toggleQuestion=function(e){_.indexOf(o,e)<0?o.push(e):o=_.without(o,e),l(i)},e.getAnswerCount=function(e){return console.log(_.keys(i)),_.contains(_.keys(i),String(e))?_.size(i[e]):0},u()}angular.module("arboplaats").controller("ManagerEmployeeController",e),e.$inject=["$scope","$stateParams","$localStorage","SurveyManager","UserManager","ResultsManager"]}(),function(){function e(e,n){var r=["manager","employee"];this.getUser=function(){return!_.isNull(e.user)&&e.user},this.getUserType=function(){return!_.isNull(e.user.type)&&e.user.type},this.setUserType=function(n){_.indexOf(r,n)==-1?console.warn("impossible user type"):e.user.type=n},this.logout=function(r){e.$reset(),r&&n.go("login")},this.isLoggedIn=function(){return!!_.isObject(e.user)},this.isManager=function(){return!!this.isLoggedIn()&&"manager"==e.user.type},this.isEmployee=function(){return!!this.isLoggedIn()&&"employee"==e.user.type}}angular.module("arboplaats.api").service("User",e),e.$inject=["$localStorage","$state"]}(),function(){function e(e,n,r,s,a){this.login=function(e,t){var o=r.login({email:e,password:t});return o.$promise.then(function(e){var r=a.defer();if("success"==e.status){var t=e,o=e.user;n.user=o,_.isNull(o.employee_id)?(s.setUserType("manager"),t.user.type="manager"):(s.setUserType("employee"),t.user.type="employee"),n.company=e.company,r.resolve(e)}}),o.$promise},this.getEmployeesByManagerId=function(e){var n=r.getEmployees({manager_id:e});return n.$promise.then(function(e){var n=a.defer();"success"==e.status&&n.resolve(e)}),n.$promise},this.getByUserId=function(e){var n=r.get({user_id:e});return n.$promise.then(function(e){var n=a.defer();"success"==e.status&&n.resolve(e)}),n.$promise}}angular.module("arboplaats.api").service("UserManager",e),e.$inject=["$resource","$localStorage","UserAPI","User","$q"]}(),function(){function e(e,n,r,s){this.questions=function(e){var n=r.getAll({manager_id:e});return n.$promise.then(function(e){var n=s.defer();"success"==e.status&&console.log(e.questions),n.resolve(e)}),n.$promise},this.answer=function(e,r){var a=n.create({user_id:e,answers:r});return a.$promise.then(function(e){var n=s.defer();"success"==e.status,n.resolve(e)}),a.$promise},this.addQuestion=function(e,n){var a=r.create({manager_id:e,question:n});return a.$promise.then(function(e){var n=s.defer();"success"==e.status,n.resolve(e)}),a.$promise}}angular.module("arboplaats.api").service("SurveyManager",e),e.$inject=["$resource","AnswerAPI","QuestionAPI","$q"]}(),function(){function e(e,n,r,s){this.byUser=function(e){var r=n.byUser({user_id:e});return r.$promise.then(function(e){var n=s.defer();"success"==e.status,n.resolve(e)}),r.$promise}}angular.module("arboplaats.api").service("ResultsManager",e),e.$inject=["$resource","AnswerAPI","QuestionAPI","$q"]}();