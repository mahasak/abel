# ABEL

## How to install

### environment variable
Setup by `.env` file

### cloud function 403 forbidden error
If you are getting 403 forbidden error like below

Error: Forbidden Your client does not have permission to get URL /api/test from this server.

Please follow below steps to grant access to all users. Basically this is to allow unauthenticated clients to access your api endpoint.

Go to https://console.cloud.google.com/functions/list
Select the function to which you want to give public access
Click on PERMISSIONS
Click on ADD MEMBER
Type allUsers
Select role Cloud Functions -> Cloud Functions Invoker
Save
That's it, now test your api.
see documentation: https://cloud.google.com/functions/docs/securing/managing-access-iam#allowing_unauthenticated_function_invocation