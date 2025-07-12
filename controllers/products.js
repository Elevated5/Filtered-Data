const Product = require(`../models/product`)


const getAllProductsStatic = async (req, res) => {
    const search = 'albany'
    const products = await Product.find({}).sort("-name price")
    res.status(200).json({ products, nbHits: products.length })
}

const getAllProducts = async (req, res) => {
    const { featured, company, name, sort, field, numericFilters } = req.query
    const queryObject = {}

    if (featured) {
        queryObject.featured = featured === 'true' ? true : false
    }
    if (company) {
        queryObject.company = company
    }
    if (name) {
        queryObject.name = { $regex: name, $options: 'i' }
    }
    if (numericFilters) {
        console.log(numericFilters)
        const operatorMap = {
            '>': '$gt',
            '<': '$lt',
            '>=': '$gte',
            '<=': '$lte',
            '=': '$eq',
        }
        const regEx = /\b(<|>|>=|=|<|<=)\b/g;
        let filters = numericFilters.replace(regEx, (match) => {
            `${operatorMap[match]}`
        })
        const opitions = ['price', 'rating']
        filters = filters.split(',').forEach((item) => {
            const [feild, operator, value] = item.split('-')
            if (opitions.includes(feild)) {
                queryObject[feild] = { [operator]: Number(value) }
            }
        })

    }

    let result = Product.find(queryObject)

    if (sort) {
        const sortList = sort.split(',').join(' ')
        result = result.sort(sortList)
    } else {
        result = result.sort('createdOn')
    }

    if (field) {
        const fieldList = field.split(',').join(' ')
        result = result.select(fieldList)
    }

    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit;

    result = result.skip(skip).limit(limit)
    const products = await result
    res.status(200).json({ products, nbHits: products.length })
}

module.exports = {
    getAllProducts,
    getAllProductsStatic
}