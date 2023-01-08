const navbar = {
    title: 'BOKA TANDLÄKARE ÖVER HELA GÖTEBORG',
    loginButtonText: 'Logga in',
    aboutButtonText: 'Om oss',
    contactText: 'Kontakta oss', 
    p1Text: 'Sömlös, enkel att använda, effektiv -- Bara välj en tid och se vad som är tillgängligt.',
    p2Text: 'Våra tänder är ett av våra mest värdefulla verktyg.' 
    + 'Vi upskattar dem sällan tills det är för sent.'
    + 'Vi rekommenderar årliga tandvårdsbesök och vill göra det så enkelt som möjligt att boka tider.',
    p3Text: 'För någon som flyttat till en ny stad i Sverige är det inte alltid lätt att få en tid hos tandläkaren '
    + 'eftersom många tandvårdskliniker är fullbokade.' 
    + 'Istället för att söka manuellt online, söker Project Titan tider åt dig!',
    p4Text: 'Genom våran sömlosa GUI låter vi dig se tider på ett enkelt och förståeligt vis, '
    + ' vårt system håller koll på tillgängliga tider hos flertalet tandläkare!'
    + 'Några exempel är Dan Tist, the Tooth Fairy, Carmen Corona, och Glen Hysen.',
    quoteText: '"Tid och hälsa är två värdefulla egenskaper som vi inte upskattar tills vi har förlorat dem."',
    contactDescriptionText: 'Vi är en grupp studenter med mångsidig kompetens och medlemmar från hela världen!',
    fullStackText: 'Full-Stack',
    backendText: 'Back-end',
    frontendText: 'Front-end',
    toTopText: 'Gå till början',
}

const login = {
    loginButtonText: 'Log in',
    registerButtonText: 'Skapa',
    uIDText: 'Personnummer',
    passwordText: 'Lösenord',
    regFName: 'Namn',
    regLName: 'Efternamn',
    username: 'Användarnamn',
    regMail: 'Mailadress',
    checkboxText: 'Tandläkare',
    loginErrorPopup: 'Fel personnummer eller lösernord',
    blankInputPopup: 'Ingen box får vara tom!',
    registrationSuccess: 'Konto skapat!',
    registrationFailed: 'Det gick inte att skapa ditt konto!',
}

const mainpage = {
    pageTitle: 'Upkommande Bokningar',
    successfulDelete: 'Tid avbokad!',
    unsuccessfulDelete: 'Din tid kunde inte avbokas!'
}

const bookings = {
    ownerTitle: 'Ägare',
    openingTitle: 'Oppet Tider',
    monday: 'Måndag',
    tuesday: 'Tisdag',
    wednesday: 'Onsdag',
    thursday: 'Torsdag',
    friday: 'Fridag',
    address: 'Adress',
    city: 'Stad',
    chooseClinic: 'Valj Klinik',
    nextButton: 'Nästa',
    previousButton: 'Tidigare',
    noAppointments: 'INGA BOKNINGAR',
    dayTitle: 'Dag',
    bookingSuccess: 'Bokat!',
    bookingUnsuccess: 'Kunde inte boka!'
}

const appointments = {
    appointmentTitle: 'Bokning',
    dentist: 'Tandläkare',
    patient: 'Patient',
    clinic: 'Klinik',
    request: 'Request',
    issuance: 'Utfärdande',
    date: 'Datum',
    time: 'Tid',
    deleteButtonText: 'Radera'
}

const availableappointments = {
    date: 'Datum',
    time: 'Tid',
    book: 'Boka'
}

const navpanel = {
    home: 'Hem',
    makeAppointments: 'Göra en Bokning',
    settings: 'Inställningar',
    logOut: 'Logga ut'
}

const userSettings = {
    settingsTitle: 'Inställningar',
    fNameTitle: 'Förnamn',
    lNameTitle: 'Efternamn',
    pNumTitle: 'Personnummer',
    languageButton: 'Språk',
    editDetails: 'Ändra detaljer',
    emailTitle: 'Email adress',
    passwordTitle: 'Lösernord',
    saveButton: 'Spara',
    modifySuccess: 'Updaterat!'
}

const dentistSettings = {
    settingsTitle: 'Inställningar',
    nameTitle: 'Namn',
    fikaTimeTitle: 'Fika tid',
    lunchTimeTitle: 'Lunch tid',
    languageButton: 'Språk',
    editDetails: 'Ändra detaljer',
    usernameTitle: 'Andvändarnamn',
    passwordTitle: 'Lösernord',
    saveButton: 'Spara',
    modifySuccess: 'Updaterat!'
}

module.exports = {
    navbar, login, mainpage, bookings, appointments, availableappointments, navpanel, userSettings, dentistSettings
}
