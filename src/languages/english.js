const navbar = {
    title: 'BOOK DENTISTS ALL OVER GOTHENBURG',
    loginButtonText: 'Log in',
    aboutButtonText: 'About',
    contactText: 'Contact Us', 
    p1Text: 'Seamless, easy to use, efficient -- Just pick a preferred time and we\'ll let you know what\'s available.',
    p2Text: 'Our teeth are one of our most precious tools.' 
    + 'We often don\'t appreciate them enough until we lose them, for instance due to bad dental care.'
    + 'We recommend annual checks with a dentist, and strive to make it as simple as possible.',
    p3Text: 'For someone moving to Sweden, or within Sweden, it is not always easy to get a dentist appointment '
    + 'as many practices are working on full capacity already and will reject you as a new care-taker.' 
    + 'Rather than a manual search online, Project Titan automates as much of the hard work we can, for you!',
    p4Text: 'Through a seamless graphical user interface, we let you find available times in user-specified time '
    + 'windows, as our system keeps track of the availability of free time-slots for a number of dentists, '
    + 'including Dan Tist, the Tooth Fairy, Carmen Corona, and Glen Hysen',
    quoteText: '"Time and health are two precious assets that we don\'t recognize and '
    + 'appreciate until they have been depleted."',
    contactDescriptionText: 'We\'re a small group of students with a wide variety of skills from all over the world!',
    fullStackText: 'Full-Stack',
    backendText: 'Back-end',
    frontendText: 'Front-end',
    toTopText: 'Back to Top',
}

const login = {
    loginButtonText: 'Log in',
    registerButtonText: 'Register',
    uIDText: 'Personal Number',
    passwordText: 'Password',
    regFName: 'First Name',
    regLName: 'Last Name',
    username: 'Username',
    regMail: 'Email',
    checkboxText: 'Dentist',
    loginErrorPopup: 'Wrong personal number or password',
    blankInputPopup: 'No input field can be blank',
    registrationSuccess: 'Account successfully created',
    registrationFailed: 'Registration failed'
}

const mainpage = {
    pageTitle: 'Upcoming Appointments',
    successfulDelete: 'Appointment successfully deleted!',
    unsuccessfulDelete: 'Appointment could not be deleted!'
}

const bookings = {
    ownerTitle: 'Owner',
    openingTitle: 'Opening Hours',
    monday: 'Monday',
    tuesday: 'Tuesday',
    wednesday: 'Wednesday',
    thursday: 'Thursday',
    friday: 'Friday',
    address: 'Address',
    city: 'City',
    chooseClinic: 'Choose Clinic',
    nextButton: 'Next',
    previousButton: 'Previous',
    noAppointments: 'NO APPOINTMENTS',
    dayTitle: 'Day',
    bookingSuccess: 'Appointment booked successfully!',
    bookingUnsuccess: 'Appointment booked unsuccessfully!'
}

const appointments = {
    appointmentTitle: 'Appointment',
    dentist: 'Dentist',
    patient: 'Patient',
    clinic: 'Clinic',
    request: 'Request',
    appointment: 'Appointment',
    issuance: 'Issuance',
    date: 'Date',
    time: 'Time',
    deleteButtonText: 'Delete'
}

const availableappointments = {
    date: 'Date',
    time: 'Time',
    book: 'Book'
}

const navpanel = {
    home: 'Home',
    makeAppointments: 'Make Appointments',
    settings: 'Settings',
    logOut: 'Log Out'
}

const userSettings = {
    settingsTitle: 'Settings',
    fNameTitle: 'First name',
    lNameTitle: 'Last name',
    pNumTitle: 'Personal number',
    languageButton: 'Language',
    editDetails: 'Edit details',
    emailTitle: 'Email address',
    passwordTitle: 'Password',
    saveButton: 'Save',
    modifySuccess: 'Updated information!'
}

const dentistSettings = {
    settingsTitle: 'Settings',
    nameTitle: 'Name',
    fikaTimeTitle: 'Fika time',
    lunchTimeTitle: 'Lunch time',
    languageButton: 'Language',
    editDetails: 'Edit details',
    usernameTitle: 'Username',
    passwordTitle: 'Password',
    saveButton: 'Save',
    modifySuccess: 'Updated information!'
}

module.exports = {
    navbar, login, mainpage, bookings, appointments, availableappointments, navpanel, userSettings, dentistSettings
}