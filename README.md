<h1>Life Of The Party app</h1>

<h3>Collaboration steps:</h3>

<ol>
   <li>create a branch <git checkout -b branch-name></li>
   <li>make changes to your code</li>
   <li>git add . (to add all file changes)</li>
   <li>git commit -m "message goes here"</li>
   <li>git pull origin master (to make sure you have the most up to data code)</li>
   <li>if there are any conflicts then fix the conflicts in your editor
      <ol>
         <li>git add . (to add the changes made on conflicts)</li>
         <li>git commit -m "message of what changed and that conflicts have been corrected"</li>
         <li>git pull origin master (pull again to make sure no changes while working on conflicts)</li>
      </ol>
   </li>
   <li>conflicts resolved or no conflicts found - git push origin <your-branch-name></li>
   <li>create pull request from your branch to the master branch</li>
   <li>If no more conflicts found then merge your pull request</li>
</ol>