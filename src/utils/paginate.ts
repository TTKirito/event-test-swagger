
export const paginate = async (req: any, model: any) => {
    let query
   const reqQuery = {...req.query}

   const removeFields = ['select','sort','page','limit']

   removeFields.forEach(param => delete reqQuery[param])

   let queryStr = JSON.stringify(reqQuery)

   queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g,match => `$${match}`)

    query = model.find(JSON.parse(queryStr))

    if(req.query.select){
        const fields = (req.query.select as string).split(',').join(' ')
        query = query.select(fields)
    }
    if(req.query.sort){
        const sortBy = (req.query.sort as string).split(',').join(' ')
        query = query.sort(sortBy)
    }else{
        query = query.sort('-createdAt')
    }

    const page = parseInt((req.query.page as string), 10) || 1
    const limit = parseInt((req.query.limit as string), 10) || 100
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    const total = await model.countDocuments()
    const totalPage = Math.ceil(total/limit)
    query = query.skip(startIndex).limit(limit)
    let pagination: {
        totalPage?: number,
        next?: {page: number, limit: number},
        pre?: {page: number, limit: number}
    }= {}
    pagination.totalPage = totalPage

    if(endIndex < total) {
        pagination.next = {
            page: page + 1,
            limit
        }
    }
    if(startIndex > 0) {
        pagination.pre = {
            page: page -1,
            limit
        }
    }

    return { query, pagination }
}