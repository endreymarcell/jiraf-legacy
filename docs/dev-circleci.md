# CircleCI config

## Mock services
#### Startup  
Locally, the mock services are started by the Dockerfile's entrypoint. On CircleCI, they have to be started manually during the build.
#### Background
Simply putting `&` after the command doesn't work on CCI because of the way it handles shells in build steps; the step has to be marked as 'background'.  
#### Waiting for startup
The mock services also start slower than locally, introducing a race condition with the tests. This is solved by build steps that wait until the services respond.  

## GitHub authentiaction
The integration test creates pull requests in https://github.com/endreymarcell/jiraf-integration-test which is a private repository, therefore CircleCI needs to be authenticated and granted write access.  
#### API token
_(Required for the HTTP requests made both from the code and from the integration test shell scripts.)_  
The generated API token is stored in environment variables locally, passed to the container in the relevant shell files issuing the `docker run` commands. On CircleCI, they were added as environment variables to the job configuration, and passed to the container in a rather awkward manner in a separate build step, as CCI doesn't yet have a proper way of doing this.  
#### SSH key
_(Required for calling git push in the shell.)_  
For `git push` to work, I had to generate an SSH key pair with an empty passphrase, add the public key to the test repository on GitHub, add the private key to the job config on CircleCI, and specifying the fingerprint of the key in the build config.  
