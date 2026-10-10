import userService from "../services/userService.js";

const getAll = async (req, res, next) => {
    try {
        const users = await userService.getAll();
        res.json(users);
    } catch (error) {
        next(error);
    }
};

const getById = async (req, res, next) => {
    try {
        const user = await userService.getById(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: "Usuario no encontrado"
            });
        }

        res.json(user);
    } catch (error) {
        next(error);
    }
};

const create = async (req, res, next) => {
    try {
        const { name, email } = req.body;
        const user = await userService.create({ name, email });

        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
};

const update = async (req, res, next) => {
    try {
        const data = {};

        if (req.body.name !== undefined) {
            data.name = req.body.name;
        }

        if (req.body.email !== undefined) {
            data.email = req.body.email;
        }

        const user = await userService.update(req.params.id, data);

        if (!user) {
            return res.status(404).json({
                message: "Usuario no encontrado"
            });
        }

        res.json(user);
    } catch (error) {
        next(error);
    }
};

const remove = async (req, res, next) => {
    try {
        const user = await userService.remove(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: "Usuario no encontrado"
            });
        }

        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

export default {
    getAll,
    getById,
    create,
    update,
    remove
};