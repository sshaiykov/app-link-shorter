const { Linkmodel } = require('../models/link');
const shortId = require('shortId');


exports.createShortLink = async (req, res) => {
    try {
     

        const { link, ownerId } = req.body;
        const idForShortedLink = shortId.generate();

        const shortedLink = `http://${req.hostname}:5050/sl/${idForShortedLink}`;

        await Linkmodel.create({
            ownerId: ownerId,
            redirectId: idForShortedLink,
            from: shortedLink,
            to: link
        });

        res.status(200).json({
            genereatedLink: shortedLink,
            message: "Ссылка создана!"
        });
    } catch (e) {
        console.log('Controller Error:', e);

        res.status(500).json({
            message: e.message
        });
    }
}

exports.redirectToLink = async (req, res) => {
    try {
        const { shortid } = req.params;

        const existingLink  = await Linkmodel.findOne({ redirectId: shortid });

        if (!existingLink) {
            return res.status(404).json({
                message: "Ссылка не найдена!"
            });
        }

        return res.redirect(existingLink.to);
    } catch(e) {
        console.log('Controller Error:', e);

        res.status(500).json({
            message: e.message
        });
    }
}


exports.allLinks = async (req, res) => {
    try {

        const { userId } = req.params
        const findUserId = await LinkModel.find({ ownerId: userId })
        res.status(200).json({
            message: `Все ссылки которые есть по этому ID адресу, ${userId}`,
            links: findUserId
        })


    } catch (error) {
        console.log("Пользователя не существует ", error)
        res.status(400).json({
            message: "Пользователя не существует"
        })

    }

}
/* 2) Реализовать API метод [Удаление ссылки по ее _id] */
exports.DeleteId = async (req, res) => {
    try {
        const { id } = req.body
        const DeleteUser = await LinkModel.findByIdAndDelete(id)
        res.status(200).json({
            message: "Ссылка удалена",
            user: DeleteUser
        })
    } catch (e) {
        console.log("Error!! ", e)
    }
}