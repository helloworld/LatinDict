Dictionary = new Meteor.Collection('dictionary');


if (Meteor.isClient) {

    dictionarySub = Meteor.subscribe('dictionary');

    Template.DictionaryPanel.helpers({
        items: function() {
            return Session.get("searchedWords"); // return Dictionary.find({}, {
            //     sort: {
            //         created_at: -1
            //     }
            // });

        },
    });

    Template.DictionaryPanel.events({
        'keydown': function(e, tmpl) {
            var searchWord = $('#searchWord').val().toLowerCase();
            var array = Dictionary.find({
                word: searchWord
            }, {
                sort: {
                    word: -1
                }
            }).fetch();
            console.log(array);
            array = array.length > 0 ? array : ["No results"]; //make sure the whole "No results" thing is in an object form, or just code around it
            Session.set('searchedWords', array);

        }
    });

    Template.DictionaryItem.helpers({

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