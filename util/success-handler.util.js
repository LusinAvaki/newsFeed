export function handleGet(res, result) {
    const responseData = {
        message: 'OK',
        status: 200,
        data: result || null
    };
    res.status(200).json(responseData);
}

export function handleDelete(res, result) {
    const responseData = {
        message: 'OK',
        status: 200,
        data: result || null
    };
    res.status(200).json(responseData);
}

export function handleCreate(res, result) {
    const responseData = {
        message: 'Created',
        status: 201,
        data: result || null
    };
    res.status(201).json(responseData);
}

export function handleList(res, result) {
    const responseData = {
        message: 'OK',
        status: 200,
        data: result || []
    };
    res.status(200).json(responseData);
}

export function handleUpdate(res, result) {
    const responseData = {
        message: 'OK',
        status: 200,
        data: result || null
    };
    res.status(200).json(responseData);
}