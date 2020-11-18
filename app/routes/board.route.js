  
const express = require("express");
const router = express.Router();
const Board = require('../../app/models/board.model');


router.get("/getByUid/:id", async (req, res) => {
    //const id = req.user.id ;
    const id =req.params.id;
    try {
        await Board.find({ uid: id })
            .then(data => {
                res.send(data)
                console.log('find')
            })
            .catch(err => {
                console.log('can not get board by user_id ', err)
            })
    } catch (error) {
        res.send(error)
    }


});
router.get("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        await Board.findById(id)
            .then(data => {
                res.send(data)
            })
            .catch(err => {
                console.log('can not get board by id', err)
            })
    } catch (error) {
        res.send(error)
    }


});



router.post("/", async (req, res) => {
    const body = me;

    if (body) {
        try {
            const board = new Board({
                ...body
            })
            const result = await board.save()
                .then(data => {
                    res.send(data)
                })
                .catch(err => {
                    console.log('can not update board', err)
                })
        } catch (error) {
            res.send(error)
        }

    }
    else {
        res.sendStatus(500);

    }
});
router.post("/createBoard", async (req, res) => {
    const body = req.body;
    if (body) {
        try {
            const board = new Board({
                ...body
            })
            const result = await board.save()
                .then(data => {
                    res.send(data)
                })
                .catch(err => {
                    console.log('can not save board ', err)
                })
        } catch (error) {
            res.send(error)
        }

    }
    else {
        res.sendStatus(500);

    }
});
router.post("/delete/:id", async (req, res) => {
    const id = req.params.id;
    if (id) {
        try {
            const res = await Board.findByIdAndDelete(id)
            res.sendStatus(200);
        } catch (error) {
            res.send(error)
        }

    }
    else {
        res.sendStatus(500);

    }
});

router.post("/edit/:id", async (req, res) => {
    const body = req.body;
    const id = req.params.id;
    console.log('body', body)
    if (body) {
        try {
            await Board.findByIdAndUpdate(id,
                { $set: { ...body } })
        } catch (error) {
            res.send(error)
        }

    }
    else {
        res.sendStatus(500);

    }
});



module.exports = router;