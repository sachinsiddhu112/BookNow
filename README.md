Overview
BookNow is a MERN stack application designed for booking accommodations online. It functions similarly to platforms like AIRBNB or Booking.com.

WORKING:User can explore the accomodations like villas, hotels,cabins etc without any login or signup.But if he/she want to visit a paritcular accomodation or book it ,then he/she needs to be logged in.User can search the accommodation with it's type, price or city.You can check the available roomse in any accomodation by visiting the accommodation page.Payment system is integrated with the help of RAZORPAY.Users can pay with their VISA CARD ,MASTER CARD or with many more payment methods.All payments are secure and verified and stored in database.

USAGE:Anyone can use it to book accommodations online in three cities: Delhi, Goa, and Mumbai. You can choose or filter your accommodation by its type (e.g., villa, hotel), price, or city. You can check out hotel details to see if it suits your preferences, such as its suitability and location. However, you must pay online using only the payment methods supported by this app

NOTE:all data is dummy data and payment system is in test mode so no real money involved.

INSTALLATION:If you want to run this web app locally in you system.It is very simple.You just need to follow the following instructions:
    a.Clone the Repository:
        Open a terminal or command prompt.
        Navigate to the directory where you want to clone the repository.
        Run the following command:
        git clone https://github.com/sachinsiddhu112/BookNow
    b. Navigate to the Project Directory
        After cloning, navigate into the project folder:
        cd <project-folder>
    c.Install Backend Dependencies
        Navigate to the backend or server directory:
        cd API
        Install the required dependencies using npm :
        npm install
    d. Set Up Environment Variables
        Create a .env file in the API directory (if it doesn't already exist).
        Add the necessary environment variables RAZORPAY_SECRET,RAZORPAY_ID,JWT,MONGO.  
    e.Start the Backend Server
        npm start or node Index.js
        Ensure that the backend server is running successfully.
    f.Install Frontend Dependencies
        Navigate to the frontend or client directory:
        cd ../client
        Install the required dependencies:
        npm install
    g.Start the Frontend Application
        Start the frontend application:
        npm start
        The frontend will typically run on http://localhost:3000.

NOW YOUR APPLICATION SHOULD BE RUNNING.

NOTE:It may take some time to load data from the database. Please be patient. This is because I hosted the backend on a free service, which may cause it to go down occasionally.

FEATURES:
    Frontend:In frontend ,I used reactjs with custome css.
    Pages:
        Home:It's landing page of application.
        Hotel:This is the hotel page,where you visit a specific accommodation.
        List:It shows list all accommodations and here you can perfrom filter also.
        Login:Login page.
        Signup:Signup page.
    Components:
        Alert:
        Featured
        FeaturedProperties
        Footer
        Header
        Loading
        MailList
        Navbar
        Register
        SearchItem
    Context:AuthContext:Context api to handled data related to user authentication.
        SearchContext:This context handle data with search performed by user.
    Custom Hooks:useFetch:Basic general function to fetch data from provided url.

    Backend:Index.js:An express application
        Routes:
            auth:routes related to authentication.
            hotel:routes related to hotel.
            payment:routes for routing payment request.
            rooms:rooms related routes
            users:user related routes (ONLY FOR ADMIN).
        Models:
            Hotel.js:data model for storing hotels data.
            Room.js:Defining the room data object stored in database.
            User.js:User data model.
        Controllers:Controllers for handling all requests comming to server.  
        
Deployment:
    Backend deployed on render.com and frontend deployed on vercel.com.