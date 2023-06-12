# app_1


# Product Requirement

 # APp: app is a time tracking tool that tracks time spent on  # #tasks and provides users with productivity reports and analytics.

# Target Audience
  The target audience for App includes both individuals and businesses who want to improve their productivity and time management. App is particularly suitable for remote workers and distributed teams who need to track their work hours and stay productive while working from different locations.

  - First target --> For individuals, App can be useful for freelancers, consultants, and other professionals who want to track their own work hours and productivity. The app can help them manage their time more efficiently, set realistic goals, and analyze their productivity and time usage.

  - Second target --> For businesses, App can be useful for managing and monitoring the productivity of remote teams and contractors. The app allows managers to track their team's work hours, analyze their productivity and efficiency, and generate reports for billing, payroll, or project management purposes.

  Overall, App can benefit a wide range of users, including individuals, small businesses, and larger enterprises who want to improve their time management and productivitys.

# Project Structure
<img src="/assets/app_1_project_structure.png" alt="Alt text" title="Optional title">

 
service throw only APierror("API ERROR", NOTFOUND, error) 404

middleware will handle error.message

in repository throw APIR error with internal server errror
throw only APierror("API ERROR", INTERNAL_SERVIER_ERROR, error) 500

let user fill in phone number
 and limit user to use reminder only 5 accounts 
 per user
send reminder in email
i need to let user subscribe and unsubscribe
Todo:
  back-end 
    accept: phone number
          : {
            taskName:"taskname",
            taskDescription:"taskdescription"
            taskCreateDate:"mm/dd/yyy"
            taskStatus:"Progress or Done"
            taskDueDate:"mm/dd/yyyy"

          }







need to store user phone number consent in database so what we can know
whether they have tick it 

when sending the text, you need to give user the ability to stop receiving the message 
from you.

1. ask for consent from whoever fill out the phone number
2. send the message to let user opt out of the text (no longer need to receieve it )
3. Be default , Twilio has the feature of stop and cancel

4. cost of using twilio
  assume i have 500 users
  each user send text 3 times
  user will use text message 500 * 3 = 1500 using text message
  each message cost 0.00074
  total cost = 11.84$ for 500 users

table user_consents(
  id (primary key)
user_id (foreign key referencing the user table)
consent_type (e.g., "phone_number")
consent_given_at (timestamp)
consent_revoked_at (timestamp, nullable)
)
Todo
   - Back-end
     
when hit the server when empty , 
it wil cache one
cace become empty.
