#devTinder APis

auth Rounter
-post /signup
-post/login
-post/logout

profileRouter
-get/profile/view
-Patch/profile/edit
-patch/profile/password

connection Request Rounter
-Post /request/send/interested/:user
-Post / request/send/ignored/:userId
-post /request/review/accepted/:requestId
-Post /request/review/rejected/:requestId

-Get / user/connections
-Get / user/requests
-Get / user/Feed -Gets me the profiles of the  other users on the platforms

Status:ignore,Intrested, accepted, rejected

 