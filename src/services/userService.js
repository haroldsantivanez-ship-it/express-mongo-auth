import userRepository from "../repositories/userRepository.js";

const getAll = () => userRepository.getAll();

const getById = (id) => userRepository.getById(id);

const create = (data) => userRepository.create(data);

const update = (id, data) => userRepository.update(id, data);

const remove = (id) => userRepository.remove(id);

export default {
    getAll,
    getById,
    create,
    update,
    remove
};