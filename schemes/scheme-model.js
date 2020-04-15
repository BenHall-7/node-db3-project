const db = require("../data/dbConfig");

const out = {
    find: function() {
        return db("schemes")
    },

    findById: function(id) {
        return db("schemes").where({id})
            .then(res => {
                if (res.length > 0) {
                    return res[0]
                } else {
                    return null;
                }
            })
    },

    findSteps: schemeId => {
        return db("steps")
            .where({scheme_id: schemeId})
            .join("schemes", "steps.scheme_id", "schemes.id")
            .select(
                "steps.id",
                "schemes.scheme_name",
                "steps.step_number",
                "steps.instructions"
            )
            .orderBy("steps.step_number")
    },

    add: scheme => {
        return db("schemes")
            .insert(scheme)
            .then(([id]) => out.findById(id))
    },

    update: (changes, id) => {
        return db("schemes")
            .where({id})
            .update(changes)
            .then(() => out.findById(id))
    },

    remove: id => {
        return db("schemes")
            .where({id})
            .del()
            .then(res => {
                if (res) {
                    return id;
                } else {
                    return null;
                }
            })
    },

    addStep: (step, schemeId) => {
        return db("steps")
            .insert({ ...step, scheme_id: schemeId })
            .then(([id]) => id)
    },
};

module.exports = out;