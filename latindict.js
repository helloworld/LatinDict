Dictionary = new Meteor.Collection('dictionary');


if (Meteor.isClient) {

    dictionarySub = Meteor.subscribe('dictionary');

    Template.DictionaryPanel.helpers({
        items: function() {
            var searchWord = $("#searchWord").val();
            console.log(searchWord);
            return Dictionary.find({}, {
                sort: {
                    created_at: -1
                }
            });
        },
    });

    Template.DictionaryItem.helpers({
        isDoneChecked: function() {
            return this.is_done ? 'checked' : '';
        },
    });

    Template.DictionaryItem.events({

    });

    Template.CreateDictionaryItem.events({
        'submit form': function(e, tmpl) {
            e.preventDefault();
            var word = tmpl.find('input[name=word]').value;
            var definition = tmpl.find('input[name=definition]').value;


            Dictionary.insert({
                word: word,
                definition: definition,
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