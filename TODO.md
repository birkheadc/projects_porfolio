# TODO

Moved away from a standard CRUD application. Now I store project details in the project's repository on github, and retrieve that data with GithubRepoParser.

This application no longer handles creation or deletion, so those functions need to be cut away. Authentication is therefore no longer needed either.

The only thing that needs to be built, is a cache system. Github API is rate limited, so I don't want to call it every time someone calls this api. Instead, I want to cache the results in memory, and only query github every, say, 10 minutes max.

Oh, also, the front end is completely unneeded now, so, delete that too. The amplify app on aws with it.

And the dynamoDB tables are not needed anymore either... or the secret key that I was using for authentication