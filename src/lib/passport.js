const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool =require('../database');
const helpers = require('../lib/helpers');

passport.use('local.login', new LocalStrategy ({
    usernameField: 'numControl',
    passwordField:'password',
    passReqToCallback: true
},  async (req, numControl, password, done) => {
    console.log(req.body);
   const rows = await pool.query('SELECT *FROM alumnos WHERE numControl = ?', [numControl]);
   if(rows.length > 0) {
       const alumno = rows[0];
       const validPassword = await helpers.matchPassword(password, alumno.password)
       if(validPassword) {
           done(null, alumno, req.flash('success', 'Welcome' + alumno.username));
       } else {
           done(null, false, req.flash('message', 'Incorrect Password'));
       } 
   } else {
    return done(null, false, req.flash('message', 'The Username does not exists'));
}

}));

passport.use('local.sesion', new LocalStrategy ({
 usernameField: 'numControl',
 passwordField: 'password',
 passReqToCallback: true
}, async (req, numControl, password, done) => {
    const { username, Email, semestre, carrera } = req.body;
    const newUser = {
        username,
        password,
        Email,
        numControl,
        semestre,
        carrera
    };
    newUser.password = await helpers.encryptPassword(password);
    const result =await pool.query('INSERT INTO alumnos SET ?', [newUser]);
    newUser.id = result.insertId;
    return done (null, newUser);
}));

passport.serializeUser((user, done) => {
    done (null, user.id);

});

passport.deserializeUser(async (id, done) => {
    const rows= await pool.query('SELECT * FROM alumnos WHERE id= ?', [id]);
    done(null, rows[0]);

});