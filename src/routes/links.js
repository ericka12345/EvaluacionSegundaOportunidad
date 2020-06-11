const express = require('express');
const router = express.Router();
const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/add', isLoggedIn, (req, res) => {
    res.render('links/add');
});

router.post('/add', isLoggedIn, async (req, res) => {
    const {id, cvlMaestro, cvlMateria, NombreMateria, Grupo, DiaHorario, Aula } = req.body;
    const newmateria = {
        cvlMaestro,
        cvlMateria,
        NombreMateria,
        Grupo,
        DiaHorario,
        Aula,
        newmateria_id: req.newmateria.id
    };
await pool.query('INSERT INTO materias set ?', [newmateria]);
req.flash('success', 'Link saved successfully');
    res.redirect('/links');

});

router.get('/', isLoggedIn, async (req, res) => {
    const mat = await pool.query('SELECT * FROM materias WHERE id = ?', [req.newmateria.id]);
    
    res.render('links/list', {mat});
});

router.get('/delete/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM materias WHERE ID = ? ', [id]);
    req.flash('success', 'Link Removed successfully');
    res.redirect('/links');

})

router.get('/edit/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const mat = await pool.query('SELECT * FROM materias WHERE ID = ?', [id]);
    console.log(mat);
    res.render('links/edit', {mat: mat[0]});

});

router.post('/edit/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const { cvlMaestro, cvlMateria, NombreMateria, Grupo, DiaHorario, Aula } = req.body;
    const newmateria = {
        cvlMaestro,
        cvlMateria,
        NombreMateria,
        Grupo,
        DiaHorario,
        Aula
    };
    await pool.query('UPDATE materias set ? WHERE id = ?', [newmateria, id]);
    req.flash('success', 'materia Updated successfully');
    res.redirect('/links');
});
module.exports = router;