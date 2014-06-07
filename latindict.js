//Create a new collection for all dictionary entries. 
Dictionary = new Meteor.Collection('dictionary');


if (Meteor.isClient) {

    //Subscribes to the dicionary collection, which is published in the 
    //Meteor server methods. 
    dictionarySub = Meteor.subscribe('dictionary');

    Template.DictionaryPanel.helpers({

        //Handlebar helper that returns items as the 'searchedWords' session, 
        //variable, which is generated in the Dictionary panel events and 
        //contains the matching results for the user's search input.
        items: function() {
            return Session.get("searchedWords");
        },

        //Boolean handlebar helpers to sort words by type when 
        //dislayed in the table.
        isVerb: function() {
            return (this.type == "verb");
        },
        isNoun: function() {
            return (this.type == "noun");
        },
        isAdjective: function() {
            return (this.type == "adjective");
        }

    });


    Template.DictionaryPanel.events({

        //Creates an array with matching search words everytime the user 
        //types into the search field
        'keyup': function(e, tmpl) {
            var searchWord = $('#searchWord').val().toLowerCase();
            var array = Dictionary.find({
                word: {
                    $regex: ".*" + searchWord + ".*"
                }

            }, {
                sort: {
                    word: 1
                }
            }).fetch();

            //If the search field is blank, all words placed into the array.
            if (searchWord == "") {
                array = Dictionary.find({}, {
                    sort: {
                        word: 1
                    }
                }).fetch();
            }

            //Sets the session variable 'searchedWords' to the array 
            //generated above
            Session.set('searchedWords', array);

        }
    });



    Template.DictionaryItem.helpers({

        //Boolean handlebar helpers to sort words by type when 
        //dislayed in the table. 
        isVerb: function() {
            return (this.type == "verb");
        },
        isNoun: function() {
            return (this.type == "noun");
        },
        isAdjective: function() {
            return (this.type == "adjective");
        }

    });



    Template.CreateDictionaryItem.events({

        //Takes input from admin interface, and assigns them to variables.  
        'submit form': function(e, tmpl) {
            e.preventDefault();
            var word = tmpl.find('input[name=word]').value;
            var definition = tmpl.find('input[name=definition]').value;
            var type = tmpl.find('input[name=type]').value;
            var gender = tmpl.find('input[name=gender]').value;
            var conj = tmpl.find('input[name=conj]').value;

            //Takes variables above and creates a item and adds the item
            //to the Dictionary collection.
            Dictionary.insert({
                word: word,
                definition: definition,
                type: type,
                gender: gender,
                conj: conj,
                created_at: new Date
            });

            //Resets form once item is added to the Dictionary.
            var form = tmpl.find('form');
            form.reset();
        }
    });

    Template.DictionaryCount.helpers({

        //Returns the total number of items in the Dictionry collection
        totalCount: function() {
            return Dictionary.find({}).count();
        }
    })

}

if (Meteor.isServer) {

    //Manually publishes the Dictionary collection with all the entries included.
    Meteor.publish('dictionary', function() {
        return Dictionary.find({});
    });

    //Set permissions for adding, removing, and updating words.
    Dictionary.allow({
        insert: function(userId, doc) {
            return userId;
        },

        update: function(userId, doc, fieldNames, modifier) {
            return doc.user_id == userId;
        },

        remove: function(userId, doc) {
            return doc.user_id == userId;
        }
    });

}