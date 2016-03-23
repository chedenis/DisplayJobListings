
       //changes ip
    var appName = "jobsearch";
        angular.module(appName)
        .service('jobService', [
            "$resource", "jobFactory", 
            function ($resource, jobFactory) {
               
                return $resource("http://localhost:3000/getJobs/:publisher/:jobTitle/:location/:start/:limit/:channel", {},
                    {
                        list: { method: "GET", params: { publisher: "2878037053725137", jobTitle: jobFactory.getJobTitle, channel: "FJR", location: jobFactory.getLocation, start: jobFactory.getStart, limit: jobFactory.getLimit } }
                    }
                );
        }]);
    