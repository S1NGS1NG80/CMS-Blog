const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');
// Gets all comments
router.get('/', async (req, res) => {
try{
   const findComments =  await Comment.findAll({})
        const foundComments = await findComments
            
            res.json(foundComments)
}
        catch(err) {
            console.log(err);
            res.status(500).json(err);
        }
});
// Express.js router that handles HTTP GET requests to retrieve comments by ID
router.get('/:id', async (req, res) => {
try{
    const findCommentByID = await Comment.findAll({
            where: {
                id: req.params.id
            }
        })
    const foundCommentbyID = await findCommentByID

         res.json(foundCommentbyID)
    }
        catch(err) {
            console.log(err);
            res.status(500).json(err);
        }
});

// Handles HTTP POST requests to create a new comment
router.post('/', withAuth, async (req, res) => {
    if (req.session) {
      try{  
        const createNewComment = await Comment.create({
                comment_text: req.body.comment_text,
                post_id: req.body.post_id,
                user_id: req.session.user_id,
            })
            const createdComment = await createNewComment
                
                res.json(createdComment)
        }
            catch(err) {
                console.log(err);
                res.status(400).json(err);
            }
    }
});

// Handles HTTP PUT requests to update an existing comment
router.put('/:id', withAuth, async (req, res) => {
try{
    const updateComment = await Comment.update({
        comment_text: req.body.comment_text
    }, {
        where: {
            id: req.params.id
        }
    })
    
    const updatedComment = await updateComment
        if (!updatedComment) {
            res.status(404).json({ message: 'No comment found with this id' });
            return;
        }
        res.json(updatedComment);
    }
    catch(err) {
        console.log(err);
        res.status(500).json(err);
    };
});

// Handles HTTP DELETE requests to delete a comment by ID
router.delete('/:id', withAuth, async (req, res) => {
try{
    const deleteComment = await Comment.destroy({
        where: {
            id: req.params.id
        }
    })
    
    const deletedComment = await deleteComment
        if (!deletedComment) {
            res.status(404).json({ message: 'No comment found with this id' });
            return;
        }
        res.json(deletedComment);
    }

    catch(err) {
        console.log(err);
        res.status(500).json(err);
    };
});
module.exports = router;