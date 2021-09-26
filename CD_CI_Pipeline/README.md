# CD/CI Pipeline

- Checking out code into private workspace.
- Commiting the changes to the repository.
- CI server monitors the repository and checks out changes when they occur.
- Release the deployable code for testing.
- CI server builds the system and runs a unit testing.
- CI server assigns a build label to the version of the code it just built.
- The server informs the developer(me) about successfull build.
- If the build task fails,the server informs the developer(me).
- The developer fixes the issue at the earliest opportunity.
- Continue to integrate and test throughtout the project.
