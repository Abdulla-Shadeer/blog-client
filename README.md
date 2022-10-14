# Blog - Client side - React
Client side code of MERN stack based simple blogging system </br>
<i> Server side : https://github.com/Abdulla-Shadeer/blog-server </i> </br>
<br/>

<p> ===================== &copy Abdullah Shadeer =====================</p>

<h2> future update </h2> 
<p>All of the components are currently rendered by individual useEffect hooks and their own fetch calls. This leads the app to use more bandwidth and load time when the user switches a component. This issue will be solved by the useContext hook (global data parser) in the future.</p>

<h2> Project setup </h2>
1. add proxy to the package.json </br>
2. proxy value should be url of your server (Ex: http://localhost:3001) </br>
3. npm install tinyMCE package and run postinstall.js (to move tinyMCE to public folder) </br>
4. update the path to your tinyMCE in <blockquote> src/components/dashboard/editPost.js , postwriter.js </blockquote> 
where < Editor > component is rendered
