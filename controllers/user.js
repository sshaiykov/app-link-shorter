const bc = require('bcryptjs');
const { UserModel } = require('../models/user');

const SALT_ROUND = 10;


exports.registerUser = async(req, res) => {
    try {
        const { email, password, username } = req.body;

        if (!email || !password) {
           return res.status(400).json({
            message: 'Нужно указать необходимые поля для регистрации!'})
        }
        const userExists = await UserModel.findOne({email: email}); // shaiykov7@mail.ru

        if(userExists) {
            return res.status(400).json({
                message: 'Пользователь с такой почтой уже зарегистрирован'
            });
        }

     

            const hashedPassword = await bc.hash(password, SALT_ROUND);

   
        await UserModel.create({
            email: email,
            password: hashedPassword,
            username: username
        });


        res.status(201).json('Регистрация прошла успешно!')
    } catch(e) {
        res.status(500).json(e);
    }
}

exports.loginUser = async(req, res)  => {
    try {
        const { email, password }  = req.body;
  
        const existingUser = await UserModel.findOne({email: email });
        // const { numbers } = require('./checksymbols')

        if (!existingUser) {
            return res.status(400).json({
                message: "Пользователя с такой почтой нет!"
            });
        }
             const passwordCompared = await bc.compare(password, existingUser.password);

             if (!passwordCompared) {
                 return res.status(400).json({
                     message: "Введен не верный пароль!"
                 });
             }

             

//             const checkPass = password => {
//                 const includeNum = checkSymbol(password, numbers)
//                 const includeLetter = checkSymbol(password, letters)
//                 const includeSpecSym = checkSymbol(password, specSymbols)
//                 !includeNum ? console.log('Пароль должен содержать не менее 8 символов!') : null
//                 !includeLetter ? console.log('Пароль не содержит буквы') : null
//                 !includeSpecSym ? console.log('Пароль не содержит символы') : null
//          }
            

// checkPass(user.password)

             res.status(201).json({
                 message: "Вход выполнен успешно!"
             });
            } catch(e) {
                res.status(500).json(e.message)
            }
        }


