'use strict';

window.onload = function() {

    window.entryPoiint = new EntryPoint();

};



function EntryPoint() {

    console.log("function EntryPoiint() ");
    this.userName = document.getElementById('user-name');
    this.signInButton = document.getElementById('sign-in');
    this.signOutButton = document.getElementById('sign-out');

    document.getElementById('file').addEventListener('change', this.handleFileSelect, false);
    document.getElementById('file').disabled = true;

    this.message_form_container = document.getElementById('message_form_container');
    this.message_form = document.getElementById('message_form');
    this.message = document.getElementById('message');

    this.run_queryButton = document.getElementById('run_query');

    // Create new message.
    this.message_form.onsubmit = function(e) {
        e.preventDefault();

        firebase.database().ref('messages').push({
            text: message.value,
            author: firebase.auth().currentUser.displayName
        })

        this.message.value = '';
        this.message.parentElement.MaterialTextfield.boundUpdateClassesHandler();
    };

    this.signOutButton.addEventListener('click', this.signOut.bind(this));
    this.signInButton.addEventListener('click', this.signIn.bind(this));
    this.run_queryButton.addEventListener('click', this.runQuery.bind(this));

    this.initFirebase();
};

var storageRef ;

EntryPoint.prototype.initFirebase = function() {

    console.log("function EntryPoiint calls initFirebase ");
    // Shortcuts to Firebase SDK features.
    this.auth = firebase.auth();
    this.database = firebase.database();
    this.storage = firebase.storage();
    storageRef = firebase.storage().ref();
    // Initiates Firebase auth and listen to auth state changes.
    this.auth.onAuthStateChanged(this.onAuthStateChanged.bind(this));
};

EntryPoint.prototype.runQuery = function() {

    var recentMessagesRef = firebase.database().ref('messages').limitToLast(100);

    var fetchMessages = function(recentMessagesRef) {
        recentMessagesRef.on('child_added', function(data) {

            console.log(data.val().text+' '+data.val().author);
        });
    };

    fetchMessages(recentMessagesRef);

};


//<editor-fold defaultstate="collapsed"  desc="==  storgae code  ==" >
EntryPoint.prototype.handleFileSelect = function(evt) {

    console.log(storageRef);

    evt.stopPropagation();
    evt.preventDefault();
    var file = evt.target.files[0];

    console.log(file);

    var metadata = {
        'contentType': file.type
    };

    // Push to child path.
    // https://firebase.google.com/docs/storage/web/create-reference
    var uploadTask = storageRef.child('images/' + file.name).put(file, metadata);

    // Listen for errors and completion of the upload.
    uploadTask.on('state_changed', null, function(error) {
        // [START onfailure]
        console.error('Upload failed:', error);
        // [END onfailure]
    }, function() {
        console.log('Uploaded',uploadTask.snapshot.totalBytes,'bytes.');
        console.log(uploadTask.snapshot.metadata);
        var url = uploadTask.snapshot.metadata.downloadURLs[0];
        console.log('File available at', url);

        document.getElementById('linkbox').innerHTML = '<a href="' +  url + '">Click For File</a>';

    });

};
//</editor-fold>


//<editor-fold defaultstate="collapsed"  desc="==  auth code  ==" >
// Triggers when the auth state changed
EntryPoint.prototype.onAuthStateChanged = function(user) {

    if (user) {
        // User  exists so is signed in!
        //<editor-fold defaultstate="collapsed"  desc="==  gui code ==" >
        var userName = user.displayName;
        this.userName.textContent = userName;
        this.userName.removeAttribute('hidden');
        this.signOutButton.removeAttribute('hidden');
        this.signInButton.setAttribute('hidden', 'true');
        document.getElementById('file').disabled = false;
        document.getElementById('file_upload').removeAttribute('hidden');
        this.message_form_container.removeAttribute('hidden');
        //</editor-fold>

    } else {
        //<editor-fold defaultstate="collapsed"  desc="==  gui code ==" >
        this.userName.setAttribute('hidden', 'true');
        this.signOutButton.setAttribute('hidden', 'true');
        this.signInButton.removeAttribute('hidden');
        document.getElementById('file').disabled = true;
        document.getElementById('file_upload').setAttribute('hidden', 'true');
        this.message_form_container.setAttribute('hidden', 'true');
        //</editor-fold>
    }

};


// Signs-in
EntryPoint.prototype.signIn = function() {
    // Sign in Firebase using popup auth and Google as the identity provider.
    var provider = new firebase.auth.GoogleAuthProvider();
    this.auth.signInWithPopup(provider);
};

// Signs-out
EntryPoint.prototype.signOut = function() {
    // Sign out of Firebase.
    this.auth.signOut();
};
//</editor-fold>