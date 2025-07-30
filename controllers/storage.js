const {
    prisma
} = require("../prisma/prisma-client");

/**
 * @route GET /api/storage
 * @desc Получение всех сотрудников
 * @access Private
 */
const all = async (req, res) => {
    try {
        const storedItems = await prisma.storehouseA.findMany();

        res.status(200).json({
            data: {
                storedItems,
                stuff: req.stuff
            }
        });
    } catch {
        res.status(500).json({
            message: "Failed to get items from storehouse A"
        });
    }
};

/**
 * @route POST /api/employees/add
 * @desc Добавление сотрудника
 * @access Private
 */
const add = async (req, res) => {
    try {
        const data = req.body;

        const count = Number(data.count)
        const uniqKey = data.uniqKey

        if (Number.isNaN(count)) {
            return res.status(400).json({
                message: "Not number",
                typeOfCount: typeof (count)

            });
        }


        if (!data.brand || !data.model || !count || !data.uniqKey || !data.image || !data.location) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }

        
        const checkDoesUniqKeyExist = await prisma.storehouseA.findFirst({
            where: {
                uniqKey
            }
        });

        if (checkDoesUniqKeyExist) {
             return res.status(400).json({
                message: "Item just existed with that uniqKey",
            });
        }

        const storedNewItem = await prisma.storehouseA.create({
            data: {
                ...data,
                count: count,
                stuffId: req.stuff.id,
            },
        });

        return res.status(201).json(storedNewItem);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Sorry, something went wrong"
        });
    }
};

/**
 * @route POST /api/empoyees/remove/:id
 * @desc Удаление сотрудника
 * @access Private
 */
const remove = async (req, res) => {
    // const {
    //     id
    // } = req.body;
    const id = req.query.id;

    try {
        await prisma.storehouseA.delete({
            where: {
                id,
            },
        });

        res.status(204).json("OK");
    } catch {
        res.status(500).json({
            message: "Failed to delete item"
        });
    }
};

/**
 * @route PUT /api/empoyees/edit/:id
 * @desc Редактирование сотрудника
 * @access Private
 */
const edit = async (req, res) => {
    const data = req.body;
    const id = data.id;

    try {
        await prisma.storehouseA.update({
            where: {
                id,
            },
            data,
        });

        res.status(204).json("OK");
    } catch (err) {
        res.status(500).json({
            message: "Failed to edit employee"
        });
    }
};

/**
 * @route GET /api/employees/:id
 * @desc Получение сотрудника
 * @access Private
 */
const currentItem = async (req, res) => {
    // const {id} = req.params; // http://localhost:8000/api/employees/9fe371c1-361f-494a-9def-465959ecc098
    const id = req.query.id; // http://localhost:8000/api/employees/9fe371c1-361f-494a-9def-465959ecc098
    // const { id } = req.body;


    // console.log(req.query.id)
    try {
        const storedItem = await prisma.storehouseA.findUnique({
            where: {
                id,
            },
        });

        res.status(200).json(storedItem);
    } catch {
        res.status(500).json({
            message: "Failed to get item stored in storehouse"
        });
    }
};

module.exports = {
    all,
    add,
    remove,
    edit,
    currentItem,
};