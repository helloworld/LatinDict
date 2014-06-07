Dictionary = new Meteor.Collection('dictionary');


if (Meteor.isClient) {

    dictionarySub = Meteor.subscribe('dictionary');

    Template.DictionaryPanel.helpers({
        items: function() {
            return Session.get("searchedWords");
            // return Dictionary.find({}, {
            //     sort: {
            //         created_at: -1
            //     }
            // });
        },

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
            console.log(searchWord);
            if (searchWord == "") {
                array = Dictionary.find({}, {
                    sort: {
                        word: 1
                    }
                }).fetch();
            }
            Session.set('searchedWords', array);

        }
    });



    Template.DictionaryItem.helpers({

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
        'submit form': function(e, tmpl) {
            e.preventDefault();
            var word = tmpl.find('input[name=word]').value;
            var definition = tmpl.find('input[name=definition]').value;
            var type = tmpl.find('input[name=type]').value;
            var gender = tmpl.find('input[name=gender]').value;

            Dictionary.insert({
                word: word,
                definition: definition,
                type: type,
                gender: gender,
                created_at: new Date
            });

            var form = tmpl.find('form');
            form.reset();
        }
    });

    Template.DictionaryCount.helpers({
        totalCount: function() {
            return Dictionary.find({}).count();
        }
    })

}

if (Meteor.isServer) {
    Meteor.publish('dictionary', function() {
        return Dictionary.find({});
    });

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