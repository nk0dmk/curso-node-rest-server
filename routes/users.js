
const { Router } = require('express');
const { check } = require('express-validator');
const cors = require('cors');

const { validateFields } = require('../middlewares/validate-fields');
const { isValidRole, emailExistsInDB, userExistInDB } = require('../helpers/db-validators');

const { getUsers, putUsers, postUsers, deleteUsers, patchUsers } = require('../controllers/users');
const router = Router();


router.get('/', getUsers);

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( userExistInDB ),
    check('role').custom( isValidRole ),
    validateFields
], putUsers);

// Agregamos el check de express-validator
router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('pwd', 'La contraseña debe tener + de 6 caracteres.').isLength( { min:6 } ),
    check('mail', 'El correo no es válido').isEmail(),
    check('mail').custom( emailExistsInDB ),
    //check('role', 'No es un rol válido').isIn( ['USER_ROLE','ADMIN_ROLE'] ),
    //check('role').custom( (role) => isValidRole(role)), // Es igual A
    check('role').custom( isValidRole ),
    validateFields
], postUsers);

router.patch('/', patchUsers);

router.delete('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( userExistInDB ),
    validateFields
], deleteUsers);


module.exports = router;