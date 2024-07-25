const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
router.get('/', (req, res) => {
    User.findAll({
            attributes: { exclude: ['[password'] }
        })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
}); //routes to actual user pages, excludes returning their pwd for security.

router.get('/:id', (req, res) => {
    User.findOne({
            attributes: { exclude: ['password'] },
            where: {
                id: req.params.id
            },
            include: [{
                    model: Post,
                    attributes: [
                        'id',
                        'title',
                        'content',
                        'created_at'
                    ]
                },

                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'created_at'],
                    include: {
                        model: Post,
                        attributes: ['title']
                    }
                },
                {
                    model: Post,
                    attributes: ['title'],
                }
            ]
        }) //search users by ID, returns the attached comments and posts 
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return; //if no user found
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


router.post('/', (req, res) => {

    User.create({
        username: req.body.username,
        password: req.body.password
    }) //create a new user in teh db saving their user and password

    .then(dbUserData => {
            req.session.save(() => {
                req.session.user_id = dbUserData.id; //session id = user ID
                req.session.username = dbUserData.username; //session username = db username
                req.session.loggedIn = true; //set them to formally logged in

                res.json(dbUserData); //parses db user into json
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/login', (req, res) => {
    User.findOne({
            where: {
                username: req.body.username
            } //on login find the username as typed in search bar
        }).then(dbUserData => {
            if (!dbUserData) {
                res.status(400).json({ message: 'No user with that username!' });
                return; //no user, 400 error
            }
            const validPassword = dbUserData.checkPassword(req.body.password);

            if (!validPassword) {
                res.status(400).json({ message: 'Incorrect password!' });
                return; //wrong pass? error, I know this is bad but w/e
            }
            req.session.save(() => {

                req.session.user_id = dbUserData.id;
                req.session.username = dbUserData.username; //as above sets session ids
                req.session.loggedIn = true; //all good, logged in

                res.json({ user: dbUserData, message: 'You are now logged in!' });
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) { //if logged in, destroy session
      req.session.destroy(() => {
        res.status(204).end(); //ends the session after destriyng
      });
    } else {
      res.status(404).end();
    }
  });


router.put('/:id', (req, res) => {

    User.update(req.body, {
            individualHooks: true,
            where: {
                id: req.params.id //updates based on user ID
            }
        })
        .then(dbUserData => {
            if (!dbUserData[0]) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });

});

router.delete('/:id', (req, res) => {
    User.destroy({
            where: {
                id: req.params.id
            } //delete based off user id
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData); //formally updates
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router; //and exports