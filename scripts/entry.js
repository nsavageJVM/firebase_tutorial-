'use strict';

window.onload = function() {

    window.entryPoiint = new EntryPoint();

};



function EntryPoint() {


    console.log("function EntryPoiint() ");
    this.userName = document.getElementById('user-name');
    this.signInButton = document.getElementById('sign-in');
    this.signOutButton = document.getElementById('sign-out');

    this.signOutButton.addEventListener('click', this.signOut.bind(this));
    this.signInButton.addEventListener('click', this.signIn.bind(this));

    this.initFirebase();
};


EntryPoint.prototype.initFirebase = function() {

    console.log("function EntryPoiint calls initFirebase ");
    // Shortcuts to Firebase SDK features.
    this.auth = firebase.auth();
    this.database = firebase.database();
    this.storage = firebase.storage();
    // Initiates Firebase auth and listen to auth state changes.
    this.auth.onAuthStateChanged(this.onAuthStateChanged.bind(this));
};

// Triggers when the auth state change for instance when the user signs-in or signs-out.
EntryPoint.prototype.onAuthStateChanged = function(user) {

    if (user) {
        // User  exists so is signed in!
        //<editor-fold defaultstate="collapsed"  desc="==  gui code ==" >
        var userName = user.displayName;
        this.userName.textContent = userName;
        this.userName.removeAttribute('hidden');
        this.signOutButton.removeAttribute('hidden');
        this.signInButton.setAttribute('hidden', 'true');
        //</editor-fold>

    } else {
        //<editor-fold defaultstate="collapsed"  desc="==  gui code ==" >
        this.userName.setAttribute('hidden', 'true');
        this.signOutButton.setAttribute('hidden', 'true');
        this.signInButton.removeAttribute('hidden');
        //</editor-fold>
    }

};


// Signs-in Friendly Chat.
EntryPoint.prototype.signIn = function() {
    // Sign in Firebase using popup auth and Google as the identity provider.
    var provider = new firebase.auth.GoogleAuthProvider();
    this.auth.signInWithPopup(provider);
};

// Signs-out of Friendly Chat.
EntryPoint.prototype.signOut = function() {
    // Sign out of Firebase.
    this.auth.signOut();
};