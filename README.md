# Blog - Client side
Client side code of MERN stack based simple blogging system </br>
<i> Server side : https://github.com/Abdulla-Shadeer/blog-server </i> </br>
<br/>

<h2> Project setup </h2>
1. add proxy to the package.json </br>
2. proxy value should be url of your server (Ex: http://localhost:3001) </br>
3. npm install tinyMCE package and run postinstall.js (to move tinyMCE to public folder) </br>
4. update the path to your tinyMCE in <blockquote> src/components/dashboard/editPost.js , postwriter.js </blockquote> 
where < Editor > component is rendered
