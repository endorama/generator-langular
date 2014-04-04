<!DOCTYPE html>
<html lang="en" ng-app="<%= opts.angularAppName %>">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title><%= _.humanize(opts.angularAppName) %></title>

    <!-- build:css(assets/) /styles.css -->
    <link href="/css/style.css" rel="stylesheet">
    <!-- endbuild -->

    <!-- build:js(assets/) /vendors.js -->
    <script src="/vendor/jquery/dist/jquery.js"></script>
    <script src="/vendor/angular/angular.js"></script>
    <script src="/vendor/underscore/underscore.js"></script>
    <script src="/vendor/angular-underscore-module/angular-underscore-module.js"></script>
    <!-- endbuild -->

    <!-- build:js /angularapp.js -->
    <script src="/angularapp/app.js"></script>
    <script src="/angularapp/config.js"></script>
    <script src="/angularapp/routes.js"></script>
    <!-- endbuild -->
  </head>
  <body>

    <div></div>

      <!-- process:template
      <script>
          (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
          (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
          m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
          })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
          ga('create', '<%%= ga.uid %>', '<%%= ga.url %>');
          ga('send', 'pageview');
      </script>
      /process -->

  </body>
</html>
