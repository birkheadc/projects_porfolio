# Projects Portfolio

This is the new version of application for managing and serving a portfolio of my projects.

At first, it was supposed to be a standard CRUD application. The front end would allow anonymous viewing of projects and their information, while also supplying access to admin resources to create, update, and delete projects.

This was also my first time learning Nest js.

While creating the app, I began to wonder if there was a way I could automatically create entries for each project, rather than having to manually do so, while also remembering to update them every time I updated the project. After all, they are in public repositories on Github. Could I maybe use those repositories directly?

In the end, I ended up creating a package to do just that. Most of the back end and all of the front end became unnecessary at that point. The front end is now completely unused, and the backend only parses and caches the data from the package.

You can view the packages source code here: https://github.com/birkheadc/github-repo-parser