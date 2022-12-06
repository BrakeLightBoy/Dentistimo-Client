const navbar = {
    title: 'BOKA TANDLÄKARE ÖVER HELA GÖTEBORG',
    loginButtonText: 'Logga in',
    aboutButtonText: 'Om oss',
    contactText: 'Kontakta oss', 
    p1Text: 'Sömlös, enkelt att använda, effektiv -- Bara välj en tid och se vad som är tillgängligt.',
    p2Text: 'Våra tänder är en av våra mäst värdefulla verktyg.' 
    + 'Vi brukar inte upskatta dem tilst det är för sent.'
    + 'Vi rekommenderar årliga tandvårdsbesök, och vill göra det så enkelt som möjligt.',
    p3Text: 'För någon som flyttar till Sverige eller inom Sverige, det är inte altid lätt att få en tid hos tandläkaren '
    + 'eftersom många tandvårdskliniker är fullbokade.' 
    + 'Istället för att söka manuelt online, Project Titan söker tider åt dig!',
    p4Text: 'Genom våra sömlosa GUI, vi låter dig se tider inom en tidsperiod som du väljer, '
    + 'eftersom vår system håller koll på tillgänglighet av tider för alla kliniker!'
    + 'Inkluderande Dan Tist, the Tooth Fairy, Carmen Corona, och Glen Hysen.',
    quoteText: '"Tid och hälsa är två värdefulla egendomar som vi upskattar inte tills vi har förlorat dem."',
    contactDescriptionText: 'Vi är en liten grupp av studenter med varierade kunskaper från över hela världen!',
    fullStackText: 'Full-Stack',
    backendText: 'Back-end',
    frontendText: 'Front-end',
    toTopText: 'Gå till början',
}

const login = {
    loginButtonText: 'Logga in',
    registerButtonText: 'Registrera',
    uIDText: 'Person Nummer',
    passwordText: 'Lösenord',
    checkboxText: 'Tandläkare',
    loginErrorPopup: 'Fel person nummer eller lösernord',
    blankInputPopup: 'Inget box få vara tomt!',
    registrationSuccess: 'Konto skapad!',
    registrationFailed: 'Det gick inte o skapa din konto!',
}

const mainpage = {
    successfulDelete: 'Tid avbokat!',
    unsuccessfulDelete: 'Din tid kunde inte avbokas!'
}

const bookings = {
    bookingTitle: 'Tillgängliga Tider',
    retrieveBookings: 'Sök'
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

module.exports = {
    navbar, login, mainpage, bookings, appointments, availableappointments
}